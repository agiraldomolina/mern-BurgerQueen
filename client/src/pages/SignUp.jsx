import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import burgerIcon from '../assets/images/burgerIcon.png'
import { Alert, Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import {FaEye, FaEyeSlash} from'react-icons/fa'
import Oauth from '../components/Oauth'
//import hatChef from '../assets/images/hatChef.png'

export default function SignUp() {
  //const roleIcon = role=== 'waiter'? <FaEyeSlash /> : <faHatChef />
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  console.log(formData)

  const handleChange =(event) => {
    event.preventDefault()
    setFormData({...formData, [event.target.id]: event.target.value.trim()})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!formData.email ||!formData.password || !formData.role || formData.email==='' || formData.password === '' || formData.role ==='') {
      return setErrorMessage('All fields are required')
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success === false) {
        setLoading(false)
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(response.ok) navigate('/signin')
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div
      className='min-h-screen mt-20 gap-5'
    >
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md: items-center gap-5'>
      {/* div for the left side */}
        <div className='flex-1'> 
          <Link to='/' className='flex text-sm sm:text-xl font-bold dark:text-white '>
            <span className='flex items-center'>
              <img src={burgerIcon} alt='burger icon' className='h-20 w-20' />
            <span className='text-2xl sm:text-4xl
            '>BurgerQueen</span>
          </span>
          </Link>
          <p className='text-sm mt-5'>
            This a demo project.<br/> You can sign up with your email and password or with Google
          </p>
        </div>
        {/* div for the right side */}
        <div className='flex flex-col w-full  px-20 max-w-3xl  sm:flex-1'>
          <form 
            className='flex flex-col gap-4 w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col'>         
              <Label value="Your role"/>
                <select 
                  id="role" 
                  onChange={handleChange}>             
                    <option value=''>Choose your role</option>
                    <option value="waiter">Waiter</option>
                    <option value="chef">Chef</option>
                </select>
            </div>
            <div>
            <Label value='Your Email' />
              <TextInput
                type='email'
                rightIcon={HiMail}
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <div onClick={()=> setShowPassword(!showPassword)}>
                {showPassword?(
                  <TextInput
                    type='password'
                    placeholder='password'
                    id='password'
                    onChange={handleChange}
                    rightIcon={FaEye}
                  />
                  ):
                  (
                    <TextInput
                      type='text'
                      placeholder='password'
                      id='password'
                      onChange={handleChange}
                      rightIcon={FaEyeSlash}
                    />
                  )}
              </div>
            </div>
            <Button 
              gradientDuoTone='redToYellow' 
              type='submit'
              disabled={loading}
            >
              {
                loading? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign Up'
                )
              }
            </Button>
            <Oauth/>          
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Already have an account?</span>
            <Link to='/signin' className='text-blue-500 hover:underline'>Sign In</Link>                
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
