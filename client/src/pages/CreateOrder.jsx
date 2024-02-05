import { Button, DropdownItem, Label, Select, TextInput } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Product from '../components/Product'

export default function CreateOrder() {
  //const { currentUser } = useSelector(state => state.user)
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilteredProducts, setShowFilteredProducts] = useState(false)

  console.log(formData)
  console.log(products)
  console.log(filteredProducts)
  console.log(filteredProducts[0])
  //console.log(filteredProducts[0].available)
  

  // const subMenuComponent=()=>{
  //   const [showSubMenu, setShowSubMenu] = useState(false)
  // }

  console.log(products)

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product?limit=100');
      if (data.products.length > 0) {
        setProducts(data.products);
      }
      return data;
    } catch (error) {
      setProducts([]);
    }
  }
  
  
  const handleQuery = async (termQuery) => {
    try {
      const { data }= await axios.get(`/api/product?type=${termQuery}`)
      if (data.products.length > 0) {
        setFilteredProducts(data.products);
        setShowFilteredProducts(true);
      }
    } catch (error) {
      setFilteredProducts([]);
    }
  }
   
  useEffect(() => {
    fetchProducts();
    handleQuery(formData.type)
  }, [formData.type]);

  
  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
    >
      <h1
        className='text-center font-semibold text-3xl my-7'
      >
        Create Order
      </h1>
      <form
        className='flex flex-col gap-4'
      >
        <div className='mb-2 block'>
          <Label value='Client'/>
          <TextInput
            type='text'
            id='client'
            placeholder='Client name'
          />
        </div>
        <div className='flex-end'>
          <Select
            id='type'
            onChange = {(event)=> setFormData({...formData, type: event.target.value})}
          >
            <option selected>Choose a Type</option>
            <option value='breakfast'>Breakfast</option>
            <option value='lunch'>Lunch</option>
            <option value='dinner'>Dinner</option>
            <option value='beverage'>Beverages</option>
            <option value='slide'>Slides</option>
            <option value='dessert'>Desserts</option>       
          </Select>
        </div>
        <div>
          <h2>{formData.type}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
          {showFilteredProducts && filteredProducts.map((product) => (
            <div key={product._id}>
              <Product 
                key={product._id} 
                product={product} 
                showDescription={false} 
                showButton={true}
                showQty={true}
              />
            </div>
          ))}
        </div>
        <div>
          <Button>
            Total Price
          </Button>
          <Button>
            Clear Cart
          </Button>
        </div>
        <div className='container_grid_shopping_cart'>

        </div>

      </form>
      
    </div>
  )
}
