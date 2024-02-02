import {Button, Card} from 'flowbite-react'
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
export default function ProductDetails() {
    const { id } = useParams()
    console.log(`/api/product/get?productId=${id}`)
    const [product, setProduct] = useState({})
    console.log(product)

    // const capitalizeFirstLetter = (str) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    //   };

    const fetchProduct = async () => {
        console.log('hi from fetchProduct')
        try {
        const response = await fetch(`/api/product/get?productId=${id}`);
        console.log(response)
        const data = await response.json();
        if (response.ok) {
            setProduct(data.products[0]);
        }
        return data;
        } catch (error) {
        setProduct([]);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);
   
    return (
        <>
            <div className='min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-2 p-6'>
                <img src={product.image} alt={product.name}  className='rounded-lg p-4'/>
                <ul className='flex flex-col flex-1'>
                    <li className='border-b border-gray-200 text-3xl p-3'>
                        <h1>{product.name}</h1>
                    </li>
                    <li  className='border-b border-gray-200  p-3'>Type: {product.type}</li>
                    <li  className='border-b border-gray-200  p-3'>Price: {product.price}</li>
                    <li  className='border-b border-gray-200  p-3'>{product.description}</li>
                </ul>
            </div>
        </>
  )
}