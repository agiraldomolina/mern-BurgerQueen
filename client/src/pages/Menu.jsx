import { useEffect, useState } from "react";
import Product from "../components/Product"
import Loader from "../components/Loader";
import {toast} from "react-toastify";

import axios from "axios"

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(products)

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get("/api/product?limit=100");
      if (data.success === false) {
        setLoading(false);
        setProducts([]);
        toast.error(data.message);
    } else {
        setLoading(false);
        setProducts(data.products);
    }
    } catch (error) {
      setProducts([]);
      setLoading(false);
      let errorMessage = 'Cannot Upload products, please try again';
      if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    }
    // const { data }= await axios.get('/api/product?limit=100')
    // setProducts(data.products)
  }
  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className='flex flex-col p-10 max-w-6xl mx-auto'>
        <h1 
          className="subpixel-antialiased text-center mb-5 text-6xl font-bold text-gray-900 tracking-wide dark:text-white font-sans "
        >
          Our Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Product 
              key={product._id} 
              product={product}
              showRating={true} 
              showDescription={false} 
              showButton={false}
              showQty={false}
            />
          ))}
        </div>
        {loading && <Loader />}
      </div>
  )
}
