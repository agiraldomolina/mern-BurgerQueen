import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import productsImage from '../assets/images/productsImage.png'
import { Button, FileInput, Spinner, TextInput, Textarea } from "flowbite-react";
import { useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function CreateProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const [imagefile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(JSON.stringify(formData))
  console.log(imageUploadProgress)

  const uploadImage= async() => {
    setImageFileUploading(true);
    setImageUploadError(null);
    try {
      if (!imagefile) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imagefile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imagefile);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',(snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setImageUploadProgress(progress.toFixed(0));
        },(error) => {
          setImageUploadError(error.message);
          setImageUploadProgress(null);
          setImageFileUploading(false);
          setImageFile(null);
        },() => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setImageFileUrl(downloadURL);
            setFormData({...formData, image: downloadURL });
            setImageFileUploading(false);
          })
        }
      )
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploadProgress(null);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    //handleUploadImage()
    if(!formData.name ||!formData.description ||!formData.price || formData.name==='') return setErrorMessage('All fields are required')
    try {
      setLoading(true)
      setErrorMessage(null)
      const response = await fetch('/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success === false) {
        setLoading(false)
        return setErrorMessage('invalid data')
      }
      setLoading(false)
      if(response.ok) navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    event.preventDefault()
    setFormData({...formData, [event.target.id]: event.target.value.trim()})
  }

  useEffect(() => {
    if (imagefile) uploadImage()
  }, [imagefile])
  
  return (
    <main className="p-3 max-w-4xl mx-auto" >
      <h1 className="text-3xl font-semibold text-center my-7b ">
        New Product
      </h1>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex flex-col border rounded-xl gap-4 w-full p-10  sm:flex-row">
          <div className='flex flex-col flex-1 gap-3'>
            <TextInput
              type='text'
              placeholder='Product Name'
              id='name'
              onChange={handleChange}
            />
            <select 
              id="type" 
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 rounded-md"
              onChange={handleChange}>             
                <option value=''>Choose a type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="slide">Slides</option>
                <option value="beverage">Beverages</option>
            </select>
            <TextInput
              type='float'
              placeholder='Price'
              id='price'
              onChange={handleChange}
            />
            <Textarea
              placeholder='Description'
              id='description'
              onChange={handleChange}
            />

          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div>
              <FileInput
                type='file'
                accept="image/*"
                onChange={(event)=> setImageFile(event.target.files[0])}
                className="file mb-3"
              />
              <div
                className="relative self-center cursor-pointer overflow-hidden"
              >
                {imageUploadProgress && (
                  <CircularProgressbar
                    value={imageUploadProgress || 0}
                    text={`${imageUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root:{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      },
                      path: {
                        stroke:`rgba(62,152,199,${imageUploadProgress/100})`,
                      }
                    }}
                  />
                )}
              </div>
              <div className="flex h-40 justify-center align-middle">
                <img
                  src={imageFileUrl || productsImage}
                  alt="product image"
                  className={`rounded-full  h-full object-cover border-8 border-[lightgray] ${
                    imageUploadProgress &&
                    imageUploadProgress < 100 &&
                    'opacity-60'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:px-20">
          <Button
            type='submit'
            gradientDuoTone='pinkToOrange'
            disabled={loading}
            className="justify-center mt-10 w-full"
          >
            {loading?(
              <>
                <Spinner size='sm'/>
                <span className="pl-3">Loading...</span>
              </>
            ):(
              'Save Product'
            )}
          </Button>
        </div>
      </form>
    </main>
  )
}
