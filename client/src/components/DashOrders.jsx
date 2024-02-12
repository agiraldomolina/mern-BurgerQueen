import { Table } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link} from'react-router-dom';
import { Select } from 'flowbite-react';
import axios from 'axios';
import {toast} from 'react-toastify';
import Loader from './Loader';

export default function DashOrders() {
    const {currentUser} = useSelector(state => state.user)
    const [orders, setOrders] = useState([])
    const [loading, setLoading]=useState(true)
    const [orderToEdit, setOrderToEdit] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [errorUpdatingStatus, setErrorUpdatingStatus] = useState('')
    console.log(orders)
    console.log(orderToEdit)
    console.log(newStatus)
    console.log(errorUpdatingStatus)

    const statusChangeHandler = async(orderId, status)=>{
        setOrderToEdit(orderId)
        setLoading(true)
        console.log(status)
        try {
            const res = await axios.put(`/api/order/${orderId}/update-status`, {
                status: status
            });
    
            if (res.data.success === false) {
                setLoading(false);
                toast.error(res.data.message);
            } else {
                setLoading(false);
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: status } : order
                    )
                );
                toast.success(`Status has been updated successfully to ${status}`);
            }
        } catch (error) {
            setLoading(false);
            let errorMessage = 'Cannot update status, please try again';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            if (currentUser.isAdmin || currentUser.role === 'chef') {
                try {
                    const res = await axios.get('/api/order')
                    setOrders(res.data)
                    setLoading(false);
                } catch (error) {
                    setOrders([]);
                    setLoading(false);
                    toast.failure('Cannot load orders')
                }
            }else{
                try {
                    const res= await axios.get('/api/order/myorders');
                    setOrders(res.data);
                    setLoading(false);
                } catch (error) {
                    setOrders([]);
                    setLoading(false);
                    toast.failure('Cannot load orders')
                }
            }
        }
        if (currentUser) fetchOrders()
    }, [currentUser, orderToEdit, newStatus])


  return loading? <Loader /> : (
    <>
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
                                    <Select
                                        value={order.status}
                                        onChange={(e)=>{
                                            setNewStatus(e.target.value)
                                            statusChangeHandler(order._id, e.target.value)
                                        }}
                                    >
                                        {/* <option selected>{order.status}</option> */}
                                        <option value="pending">Pending</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="prepared">Prepared</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </Select>
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
    </>
  )
    
    
}
