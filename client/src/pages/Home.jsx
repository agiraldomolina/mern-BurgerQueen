import { useEffect } from 'react';
import Product from '../components/Product'
import { useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  console.log(products)

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product/get?limit=100');
      console.log(response)
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
      return data;
    } catch (error) {
      setProducts([]);
    }
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
            <Product key={product._id} product={product} showButton={false}/>
          ))}
        </div>

      </div>
    </>
  )
}
