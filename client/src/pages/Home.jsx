import { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Product from '../components/Product'
import burgerIcon from '../assets/images/burgerIcon.png'
import axios from 'axios'
import FormContainer from '../components/FormContainer';

export default function Home() {
  const [products, setProducts] = useState([]);
  console.log(products)

  const fetchProducts = async () => {
    const { data }= await axios.get('/api/product?limit=100')
    setProducts(data.products)
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <div className="h-56 sm:h-[28rem] lg:h-[30rem]" >
    { products.length > 0? (
      <Carousel >
        {products.map((product) => (
          <div key={product._id} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src={product.image}  className='w-full'/>
        </div>
        ))}
      </Carousel>
    ): <p>There are no products to show</p> }
    </div>
    <FormContainer>
      <div className='flex flex-col mx-auto gap-3 '>
        <Link to='/menu'>
          <span className='flex items-end'>
            <img src={burgerIcon} alt='burger icon' className='h-10 w-10' />
            <span>BurgerQueen</span>
          </span>
        </Link>
        <h1 className='text-slate-600 text-lg font-bold text-3xl lg:text-5xl'>
        Where Every Bite Tells a Flavorful <span className='text-orange-400'>Tale</span>

        </h1>
      </div>
      <div className='flex flex-col p-10 max-w-6xl mx-auto'>
        <h1 className="text-center mb-5 text-3xl font-bold text-gray-900 dark:text-white">
          Our Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Product 
              key={product._id} 
              product={product} 
              showDescription={false} 
              showButton={false}
              showQty={false}
            />
          ))}
        </div>

      </div>
    </FormContainer>
  </>
  )
}
