import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import {FaTrash} from  'react-icons/fa';
import Message from '../components/Message';
import {Button, Card, ListGroup, Table, TextInput, Modal, Toast} from 'flowbite-react'
import { addToCart, removeFromCart, clearCartItems } from '../redux/shoppingCart/shoppingCartSlice';
import {HiCheck, HiOutlineExclamationCircle, HiX} from'react-icons/hi';

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {currentUser} = useSelector(state => state.user);

    const [placeOrderError, setPlaceOrderError] = useState(null);
    const [placeOrderSuccess, setPlaceOrderSuccess] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const cart = useSelector((state) => state.shoppingCart);
    const {cartItems} = cart;
    console.log(cartItems.length)

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}));
        
    }

    const removeCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const clearOrderHandler =()=>{
        setShowModal(false)
        dispatch(clearCartItems())
        navigate('/')
    }

    const placeOrderHandler = async () => {
        try {
            const body=JSON.stringify({
                user: currentUser._id,
                 table:cart.table,
                 products:cart.cartItems,
                 totalPrice:cart.totalPrice
            })
            console.log(body)
         const res= await fetch('/api/order',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 user: currentUser._id,
                 table:cart.table,
                 products:cart.cartItems,
                 totalPrice:cart.totalPrice
             })
         })
         const data = await res.json()
         if(!res.ok || data.succes===false) {
             setPlaceOrderError('Something went wrong.')
             return
         }else{
             setPlaceOrderError(null)
             setPlaceOrderSuccess(true)
             dispatch(clearCartItems())
             navigate(`/order/${data._id}`)
             
         }
        } catch (error) {
            setPlaceOrderSuccess(false)
         setPlaceOrderError('Something went wrong.')
        }
     }

     useEffect(() => {}, [cartItems.qty]);

  return (
    <div className='flex flex-col :flex-md-row mx-auto min-h-screen'>
        <div
            className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
            <h1 className="border-b text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
            Order Cart
            </h1>
            {
                cartItems.length === 0? (
                    <Message>
                        Order Cart is empty 
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
                                            <div
                                                id='qtyText'
                                                className="flex items-center justify-center rounded-lg border border-gray-300"
                                                style={{ width: '40px', height: '40px' }}
                                            >
                                             {item.qty}   
                                            </div>
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
                                <Table.Cell  as='div' style={{ width: '10%' }}>
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
                    <li className='py-2'>
                        <div className='flex flex-row gap-2'>
                            <Button
                                type='button'
                                gradientDuoTone='pinkToOrange'
                                outline
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={()=>placeOrderHandler()}
                            >
                                Place Order
                            </Button>
                            <Button
                                type='button'
                                gradientDuoTone='pinkToOrange'
                                outline
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={()=> setShowModal(true)}
                            >
                                Clear Order
                            </Button>
                        </div>
                    </li>
                </ListGroup>
            </Card>
        </div>
        {placeOrderSuccess && (
            <div className="flex flex-col gap-4 mx-auto mt-5">
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Order Placed successfully.</div>
                    <Toast.Toggle />
                </Toast>
            </div>
        )}
        
        {placeOrderError !==null && (
            <Toast className='mt-5 flex mx-auto'>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{placeOrderError}</div>
                <Toast.Toggle />
              </Toast>
            )
        }
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
        >
            <Modal.Header />
            <Modal.Body>
            <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to clear the order?
                </h3>
                <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={()=> clearOrderHandler()}>
                    Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
