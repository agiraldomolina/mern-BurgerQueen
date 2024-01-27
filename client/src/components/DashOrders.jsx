import { Table } from 'flowbite-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function DashOrders() {
    const {currentUser} = useSelector(state => state.user)
    const [orders, setOrders] = useState([])
    console.log(orders)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order/get')
                const data = await response.json()
                if(response.ok) {
                    setOrders(data.orders)
                }
                return data
            } catch (error) {
                setOrders([])
            }
        }
        fetchOrders()
    }, [currentUser])


  return (
    <div
        className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
        {currentUser &&(
            <>
                <Table
                    hoverable
                    className='shadow-md'
                >
                    <Table.Head>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Client</Table.HeadCell>
                        <Table.HeadCell>User</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
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
                                    {order.client}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.user && order.user.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.status}
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
