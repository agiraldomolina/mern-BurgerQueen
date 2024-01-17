import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
import burgerIcon from '../assets/images/burgerIcon.png';

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-2 border-teal-500 py-2'>
      <div className="flex flex-col w-full sm:justify-between sm:grid sm:grid-cols-2">
        {/* div right side */}
        <div className='flex flex-col justify-start sm:items-start'>
          <div className="flex align-items-center">
            <Link to='/' className='flex text-sm sm:text-xl font-semibold dark:text-white'>
              <span className='flex items-end'>
                <img src={burgerIcon} alt='burger icon' className='h-10 w-10' />
                <span>BurgerQueen</span>
              </span>
            </Link>
          </div>
          <div>
            <Footer.Copyright
              href='#'
              by="Alba Giraldo"
              year={new Date().getFullYear()}
            />
          </div>
        </div>
        {/* div left side */}
        <div className="flex gap-6 mt-4 items-center sm:mt-0 sm:justify-end">
          <Footer.Icon href='https://www.facebook.com/alba.n.giraldo.1' icon={BsFacebook} target='_blank' />
          <Footer.Icon href='https://www.instagram.com/albitagiraldo2019/' icon={BsInstagram} target='_blank' />
          <Footer.Icon href='https://www.github.com/agiraldomolina' icon={BsGithub} />
          <Footer.Icon href='https://linkedin.com/in/alba-giraldo-6086a046/' icon={BsLinkedin} />
        </div>
      </div>
    </Footer>
  );
}
