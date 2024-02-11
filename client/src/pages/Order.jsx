import { useEffect, useState } from 'react';
import { Card, ListGroup, Table } from 'flowbite-react';
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
        <div className='w-80 mx-auto' >
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
                <Card className='mt-2'>
                  <ListGroup>
                    Items
                    {order.products.map((item,index)=>(
                      <Table.Body key={index}>
                        <Table.Row>
                          <Table.Cell>
                            {item.product.name}
                          </Table.Cell>
                          <Table.Cell>
                            {item.qty}&nbsp;x&nbsp;${item.product.price}=&nbsp; ${item.qty*item.product.price}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    ))}
                  </ListGroup>
                </Card>
              </Table.Row>
              <Table.Row>
                <p className='p-3'>
                  <strong>Total:&nbsp;$</strong>
                  {order.totalPrice}
                </p>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

      </FormContainer>
    </>
  )
}
