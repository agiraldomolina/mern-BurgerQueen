import React from 'react'

export default function ShoppingCartProduct({product, deleteFromCart}) {
  return (
    <div>
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <button onClick={()=>deleteFromCart(product._id)}>Remove from Cart</button>
    </div>
  )
}
