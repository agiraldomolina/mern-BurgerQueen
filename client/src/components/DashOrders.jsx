import { Table } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link} from'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

export default function DashOrders() {
    const {currentUser} = useSelector(state => state.user)
    const [orders, setOrders] = useState([])
    const [orderToEdit, setOrderToEdit] = useState('')
    console.log(orders)
    console.log(orderToEdit)

    useEffect(() => {
        const fetchOrders = async () => {
            if (currentUser.isAdmin || currentUser.role === 'chef') {
                try {
                    const res = await axios.get('/api/order')
                    setOrders(res.data)
                } catch (error) {
                    setOrders([]);
                    toast.failure('Cannot load orders')
                }
            }else{
                try {
                    const res= await axios.get('/api/order/myorders');
                    setOrders(res.data);
                } catch (error) {
                    setOrders([]);
                    toast.failure('Cannot load orders')
                }
            }
            // try {
            //     const response = await fetch('/api/order/get')
            //     const data = await response.json()
            //     if(response.ok) {
            //         setOrders(data.orders)
            //     }
            //     return data
            // } catch (error) {
            //     setOrders([])
                
            // }
        }
        if (currentUser) fetchOrders()
    }, [currentUser, orderToEdit])


  return (
    <div
        className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
        {currentUser &&(
            <>
                <Table
                    hoverable
                    striped
                    className='shadow-md'
                >
                    <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>table</Table.HeadCell>
                        {(currentUser.isAdmin || currentUser.role === 'chef') &&(
                            <Table.HeadCell>User</Table.HeadCell>
                        )}
                        <Table.HeadCell>Total</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Details</Table.HeadCell>                           
                    </Table.Head>
                    {orders.map((order,index)=>(
                        <Table.Body
                            key={index}
                            className='divide-y'
                        >
                            <Table.Row
                                className='bg-white dark:border-gray-700 dark:bg-gray-800'
                            >
                                <Table.Cell>
                                    {new Date(order.dataEntry).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.table}
                                </Table.Cell>
                                {(currentUser.isAdmin || currentUser.role === 'chef') && (
                                    <Table.Cell>
                                        {order.user.email}
                                    </Table.Cell>
                                )}
                                <Table.Cell>
                                    {order.totalPrice}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.status}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/order/${order._id}`}>
                                        <button>
                                            Details
                                        </button>
                                    </Link>
                                </Table.Cell>

                            </Table.Row>

                        </Table.Body>
                    ))}

                </Table>
            </>
        )}
        
    </div>
  )
}
