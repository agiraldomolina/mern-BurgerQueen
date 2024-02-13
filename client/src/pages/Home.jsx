import { useEffect, useState } from 'react';
import { Carousel, Card } from 'flowbite-react';
import Product from '../components/Product'
import axios from 'axios'

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
    <div className="h-56 sm:h-96 xl:h-96 2xl:h-96 lg:h-screen/4 * 3" >
    { products.length > 0? (
      <Carousel style={{ background: "#212121" }}>
        {products.map((product) => (
          <div key={product._id} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src={product.image}  className='w-full'/>
        </div>
        ))}
      </Carousel>
    ): <p>There are no products to show</p> }
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
              showDescription={true} 
              showButton={false}
              showQty={false}
            />
          ))}
        </div>

      </div>
    </>
  )
}
