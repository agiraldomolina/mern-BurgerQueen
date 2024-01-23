import { Alert, Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"
import userIcon from '../assets/images/userIcon.png'
import { useRef, useState } from "react"
import { useEffect } from "react"
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {app} from '../firebase'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    } from "firebase/storage"

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(null)
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadedError, setImageFileUploadedError]= useState(null)
    const [formData, setFormData]= useState({})
    const filePickerRef = useRef();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile( event.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file));
        }

    }

    useEffect(()=>{
        if (imageFile) {
            uploadImage();   
        }
    },[imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadedError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setImageFileUploadingProgress(progress.toFixed(0))
            },
            ()=>{
               setImageFileUploadedError('Could not upload image, file must be smaller than 2MB')
               setImageFileUploadingProgress(null)
               setImageFile(null)
               setImageFileUrl(null)
               setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL)=>{
                    setImageFileUrl(downLoadURL);
                                   
                })
            }
        )    
    }
    

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file"
                ref={filePickerRef}
                hidden
            />
            <div 
                className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full" 
                onClick={()=>filePickerRef.current.click()}
            >
                {imageFileUploadingProgress && (
                    <CircularProgressbar
                        value={imageFileUploadingProgress || 0}
                        text={`${imageFileUploadingProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            },
                            path: {
                                stroke: `rgba(62,152,199,${imageFileUploadingProgress/100})`,
                            }
                        }}
                     />
                )}
                <img 
                    src={imageFileUrl? imageFileUrl: currentUser.avatar === ""? userIcon : currentUser.avatar}  
                    alt="user mage"
                    className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-30'}`} 
                />
            </div>
            {imageFileUploadedError && <Alert color='failure'>{imageFileUploadedError}</Alert>}
            <TextInput
                type="text"
                id="email"
                placeholder="email address"
                defaultValue={currentUser.email}              
            />
            <TextInput
                type="text"
                id="role"
                placeholder="role"
                defaultValue={currentUser.role}              
            />
            <TextInput
                type="text"
                id="password"
                placeholder="password"              
            />
            <Button
                type="submit"
                gradientDuoTone='pinkToOrange'
                outline
            >
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5" >
            <span className="cursor-pointer">
                Delete Account
            </span>
            <span className="cursor-pointer">
                Sign Out
            </span>
        </div>
    </div>
  )
}

