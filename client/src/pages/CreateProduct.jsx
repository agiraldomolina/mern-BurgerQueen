import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";



export default function CreateProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      if(response.ok) navigate('/products')
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    event.preventDefault()
    setFormData({...formData, [event.target.id]: event.target.value.trim()})
  }
  
  return (
    <main className="p-3 max-w-4xl mx-auto" >
      <h1 className="text-3xl font-semibold text-center my-7">
        New Product
      </h1>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        <div className='flex flex-col gap-3'>
          <TextInput
            type='text'
            placeholder='Product Name'
            id='name'
            onChange={handleChange}
          />
          <select 
            id="type" 
            className="w-full"
            onChange={handleChange}>             
              <option value=''>Choose a type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
          </select>
          <TextInput
            type='number'
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
          <p>Load image</p>

          <Button
            type='submit'
            gradientDuoTone='pinkToOrange'
            disabled={loading}
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
