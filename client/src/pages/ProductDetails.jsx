import {Button, Card} from 'flowbite-react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import Product from '../components/Product';
export default function ProductDetails() {
    const { id } = useParams()
    console.log(`/api/product/get?productId=${id}`)
    const [product, setProduct] = useState({})
    console.log(product)

    // const capitalizeFirstLetter = (str) => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    //   };

    const fetchProduct = async () => {
        const { data }= await axios.get(`/api/product/${id}`)
        setProduct(data)
    }
    useEffect(() => {
        fetchProduct();
    }, [id]);
   
    return (
        <Product product={product} showButton={true} showDescription={true} showQty={true} />
  )
}
