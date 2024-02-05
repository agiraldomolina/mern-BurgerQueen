import { useEffect, useState } from 'react';
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
