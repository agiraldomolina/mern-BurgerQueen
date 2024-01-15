import {Button, Navbar, TextInput} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import burgerIcon from '../assets/images/burgerIcon.png'
import {AiOutlineSearch} from'react-icons/ai'
import {FaMoon} from'react-icons/fa'


export default function Header() {
  const path= useLocation().pathname
  return (
    //div>Header</div>
    <Navbar className='border-b-2'>
       <Link to='/' className='flex text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='flex items-end'>
          <img src={burgerIcon} alt='burger icon' className='h-10 w-10' />
          <span>BurgerQueen</span>
        </span>
        </Link> 
        <form>
          <Link 
            to='/search' 
          >
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
            >   
            </TextInput>
          </Link>
        </form>
        <Link to='/search'>
          <Button 
              className='w-12 h-10 lg:hidden' 
              color='gray' 
              pill
          >
              <AiOutlineSearch />
          </Button>
      </Link>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10' color='gray' pill>
          <FaMoon/>
        </Button>
        <Link to='/signin'>
          <Button 
            gradientDuoTone='pinkToOrange'
            pill
          >Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path ==='/'} as='div'>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/profile'} as='div'>
          <Link to='/profile'>Profile</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/menu'} as='div'>
          <Link to='/menu'>Our Menu</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as='div'>
          <Link to='/about'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
