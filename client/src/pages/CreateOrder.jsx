import { Button, DropdownItem, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { useState, useEffect } from 'react'
import Dropdown from 'react-multilevel-dropdown'
import { useSelector } from 'react-redux'

export default function CreateOrder() {
  //const { currentUser } = useSelector(state => state.user)
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])

  console.log(formData)
  console.log(filteredProducts)
  

  // const subMenuComponent=()=>{
  //   const [showSubMenu, setShowSubMenu] = useState(false)
  // }

  const handleToggleSubMenu=()=>{
    setShowSubMenu(!showSubMenu)
  }
  console.log(products)

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product/get?limit=100');
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
      return data;
    } catch (error) {
      setProducts([]);
    }
  }

  const handleFilterProducts = (subject) => {
    const filteredProducts = products.filter(product => product.type === subject)
    console.log(filteredProducts)
    setFilteredProducts(filteredProducts)
  }

  
  
  const handleQuery = async (termQuery) => {
    try {
      const response = await fetch(`/api/product/get?${termQuery}`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      setProducts([]);
    }
  }
  
  
  useEffect(() => {
    fetchProducts();
    handleFilterProducts(formData.type)
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
