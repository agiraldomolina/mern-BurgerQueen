import {Link, json, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import {FaTrash} from  'react-icons/fa';
import Message from '../components/Message';
import {Button, Card, ListGroup, Table, TextInput} from 'flowbite-react'
import { addToCart, removeFromCart } from '../redux/shoppingCart/shoppingCartSlice';

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.shoppingCart);
    const {cartItems} = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}));
      }
    const removeCartHandler = (id) => {
        dispatch(removeFromCart(id));
      }

  return (
    <div className='flex flex-col :flex-mdrow mx-auto min-h-screen'>
        <div
            className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
            <h1 className="border-b text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
            Shopping Cart
            </h1>
            {
                cartItems.length === 0? (
                    <Message>
                        Shopping Cart is empty 
                        <Link to='/'>Go Back</Link>
                    </Message>
                ):(
                    <Table
                        hoverable
                        className='shadow-md'
                    >
                    {
                     cartItems.map((item, index)=>(
                        <Table.Body
                            key={index}
                            className='divide-y'
                        >
                            <Table.Row>
                                {/* <Table.Cell>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-10 w-20 object-cover bg-gray-500" 
                                    />
                                </Table.Cell> */}
                                <Table.Cell style={{ width: '30%' }}>
                                    <Link
                                        to={`/product/${item._id}`}
                                        className="text-teal-500 hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell style={{ width: '15%' }}>
                                    $ {item.price}
                                </Table.Cell>
                                <Table.Cell style={{ width: '20%' }}>
                                    <>
                                        <div className="flex flex-row gap-1 mx-auto">
                                            <Button 
                                                gradientDuoTone='pinkToOrange'
                                                id='downQty'
                                                onClick={() => addToCartHandler(item, item.qty - 1)}
                                                disabled={item.qty===0?true:false}
                                            >
                                                -
                                            </Button>
                                            <TextInput
                                                id='qtyText'
                                                style={{ textAlign: 'center',width: '40px' }}
                                                value={item.qty}
                                            >
                                                
                                            </TextInput>
                                            <Button 
                                                gradientDuoTone='pinkToOrange'
                                                id='upQty'
                                                onClick={() => addToCartHandler(item, item.qty + 1)}
                                                disabled={item.available===false?true:false}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </>
                                </Table.Cell>
                                <Table.Cell style={{ width: '10%' }}>
                                    <Button
                                        className='btn-block'
                                        type='button'
                                        gradientDuoTone='pinkToOrange'
                                        outline
                                        onClick={()=>removeCartHandler(item._id)}
                                    >
                                        <FaTrash/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                     ))   
                    }
                    </Table>
                )
            }
        </div>
        <div className='mt-6 mx-auto'>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2 >
                            SubTotal  &nbsp;({cartItems.reduce((acc,item)=>(acc+item.qty),0)})&nbsp; items&nbsp;
                        </h2>
                        ${cartItems.reduce((acc,item)=>(acc+item.qty*item.price),0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            gradientDuoTone='pinkToOrange'
                            outline
                            className='btn-block'
                            disabled={cartItems.length === 0}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    </div>
  )
}
