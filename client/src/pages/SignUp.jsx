import  { useState } from 'react'
import { Link } from 'react-router-dom'
import burgerIcon from '../assets/images/burgerIcon.png'
import {HiMail, HiUserCircle} from'react-icons/hi'
import { Button, Label, TextInput } from 'flowbite-react'
import {FaEye, FaEyeSlash, } from'react-icons/fa'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div
      className='min-h-screen mt-20'
    >
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md: items-center gap-5'>
      {/* div for the left side */}
        <div className='flex-1'> 
          <Link to='/' className='flex text-sm sm:text-xl font-bold dark:text-white '>
            <span className='flex items-center'>
              <img src={burgerIcon} alt='burger icon' className='h-20 w-20' />
            <span className='text-4xl
            '>BurgerQueen</span>
          </span>
          </Link>
          <p className='text-sm mt-5'>
            This a demo project.<br/> You can sign up with your email and password or with Google
          </p>
        </div>
        {/* div for the right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
            <Label value='Your Username' />
              <TextInput
                type='text'
                rightIcon={HiUserCircle}
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
            <Label value='Your Email' />
              <TextInput
                type='email'
                rightIcon={HiMail}
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <div onClick={()=> setShowPassword(!showPassword)}>
                {showPassword?(
                  <TextInput
                    type='text'
                    placeholder='password'
                    id='password'
                    rightIcon={FaEye}
                  />
                  ):
                  (
                    <TextInput
                      type='password'
                      placeholder='password'
                      id='password'
                      rightIcon={FaEyeSlash}
                    />
                  )}
              </div>
            </div>
            <Button
              gradientDuoTone='redToYellow'
              type='submit'
            >
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Already have an account?</span>
            <Link to='/signin' className='text-blue-500 hover:underline'>Sign In</Link>
                    
          </div>
        </div>
      </div>
    </div>
  )
}
