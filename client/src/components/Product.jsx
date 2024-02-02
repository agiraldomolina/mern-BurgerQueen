import {Card} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function Product( {product, showButton} ) {
  return (
    <Card 
      className='my-3 p-3 rounded-lg'
      imgSrc={product.image}
    >
    <Link to={`/product/${product._id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      <p>{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-md  text-gray-900 dark:text-white">Price: ${product.price}</span>
        {showButton && (
            <>
              <a
              href="#"
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Add to cart
            </a>
          </>
        )}
        
      </div>
    </Card>
  )
}
