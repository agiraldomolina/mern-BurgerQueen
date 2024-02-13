import { Button, DropdownItem, Label, Select, TextInput } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Product from '../components/Product'
import { setTable } from '../redux/shoppingCart/shoppingCartSlice'
import FormContainer from '../components/FormContainer';

export default function CreateOrder() {
  const dispatch =useDispatch()
  const navigate = useNavigate()
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
  
  console.log(products)

  const addTableHandler=(table) => {
    dispatch(setTable(table))
  }

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
  };

  const SeeOrderHandler =()=>{
    navigate('/shopping-cart')
  }
   
  useEffect(() => {
    fetchProducts();
    handleQuery(formData.type)
  }, [formData.type]);

  
  return (
    <FormContainer>
      <h1
        className='text-center font-semibold text-3xl my-7'
      >
        Create Order
      </h1>
      <form
        className='flex flex-col gap-4  pt-4 border rounded-md border-gray-200 '
      >
        <div className='flex flex-col w-10/12 sm:w-1/2 gap-4 mx-auto'>
          <Select
            id='table'
            onChange={(event)=>(addTableHandler(event.target.value))} 
          >
            <option value="">Table</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
          <Select
            id='type'
            defaultValue='none'
            onChange = {(event)=> setFormData({...formData, type: event.target.value})}
          >
            <option value='none'>Choose a Type</option>
            <option value='breakfast'>Breakfast</option>
            <option value='lunch'>Lunch</option>
            <option value='dinner'>Dinner</option>
            <option value='beverage'>Beverages</option>
            <option value='slide'>Slides</option>
            <option value='dessert'>Desserts</option>       
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-6" >
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
      </form>   
      <div className='mt-3'>
        <Button
          gradientDuoTone='pinkToOrange'
          outline
          id='addToCart'
          onClick={SeeOrderHandler}
        >
          See Order
        </Button>
      </div>
    </FormContainer>
  )
}
