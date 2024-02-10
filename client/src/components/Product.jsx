import {Button, Card, TextInput} from 'flowbite-react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/shoppingCart/shoppingCartSlice'



export default function Product( {product,showDescription, showButton, showQty} ) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}));
  }

  return (
    <Card 
      className='my-3 p-3 rounded-lg'
    >
    <img 
      src={product.image} alt={product.name} 
      className="rounded-lg h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" 
    />
    <Link to={`/product/${product._id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      {showDescription && (
        <p>{product.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-md  text-gray-900 dark:text-white">Price: ${product.price}</span>
        {showButton && (
            <>
              <Button
                gradientDuoTone='pinkToOrange'
                outline
                disabled={product.available===false?true:false}
                onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </>
        )}      
      </div>
      <div className="flex flex-row gap-4">
        {showQty && (
            <div className="flex flex-row gap-1 mx-auto">
              <Button 
                gradientDuoTone='pinkToOrange'
                id='downQty'
                onClick={()=> {setQty(qty-1)}}
                disabled={qty===0?true:false}
              >
                -
              </Button>
              <TextInput
                type='text'
                id='qtyText'
                value={qty}
                style={{ textAlign: 'center', width: '40px'}}
              >

              </TextInput>
              <Button 
                gradientDuoTone='pinkToOrange'
                id='upQty'
                onClick={()=> setQty(qty+1)}
                disabled={product.available===false?true:false}
              >
                +
              </Button>
            </div>
          )}
      </div>
    </Card>
  )
}
