import { useEffect, useState } from 'react';
import { Card, ListGroup, Table, Avatar, TableHead } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';

export default function Order() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(JSON.stringify(order))
  console.log(order)

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);
      console.log(data)
      if (data) {
        setOrder(data);
        setLoading(false);
      }
      return data;
    } catch (error) {
      setOrder([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  

  return loading? <Loader /> : (
    <>
      <FormContainer>
        <div className=' mx-auto' >
        <h1>Order &nbsp;{order._id}</h1>
          <Table>
            <Table.Body className='divide-y'>
              <Table.Row>
                <p className='p-3'>
                  <strong>Table:&nbsp;</strong>
                  {order.table}
                </p>
              </Table.Row>
              <Table.Row>
                <p className='p-3'>
                  <strong>User:&nbsp;</strong>
                  {order.user.email}
                </p>
              </Table.Row>
              <Table.Row>
                <p className='p-3'>
                  <strong>Status:&nbsp;</strong>
                  {order.status}
                </p>
              </Table.Row>
              
                
              
              <Table.Row>
                <p className='p-3'>
                  <strong>Total:&nbsp;$</strong>
                  {order.totalPrice}
                </p>
              </Table.Row>
            </Table.Body>
          </Table>
          <div
            className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
          >
            <h1 className='mt-3'>Order Items</h1>
            <Table >
              <TableHead>
                <Table.HeadCell>image</Table.HeadCell>
                <Table.HeadCell>Item</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Qty</Table.HeadCell>
                <Table.HeadCell>Total</Table.HeadCell>
              </TableHead>
              <Table.Body className='divide-y'>
                {order.products.map((item,index)=>(
                  <Table.Row key={index}>
                    <Table.Cell>
                      <img src={item.product.image} alt={item.name} 
                        className="h-10 w-20 object-cover bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{item.product.name}</Table.Cell>
                    <Table.Cell>${item.product.price}</Table.Cell>
                    <Table.Cell>{item.qty}</Table.Cell>
                    <Table.Cell>${(item.qty*item.product.price).toFixed(2)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

      </FormContainer>
    </>
  )
}
