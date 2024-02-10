import { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Image, ListGroup, Row, Toast} from 'flowbite-react'

export default function PlaceOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [placeOrderError, setPlaceOrderError] = useState(null);

    const cart = useSelector((state) => state.shoppingCart);
    const {currentUser} = useSelector(state => state.user);

    const placeOrderHandler = async (order) => {
       try {
        const res= await fetch('/api/order',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                user: currentUser._id,
                table:cart.table,
                products:cart.cartItems,
                totalPrice:cart.totalPrice
            }
        })
        const data = await res.json()
        if(!res.ok || data.succes===false) {
            setPlaceOrderError(data.message)
            return
        }else{
            setPlaceOrderError(null)
        }
       } catch (error) {
        setPlaceOrderError('Something went wrong.')
       }
    }
    
  return (
    <div>PlaceOrder</div>
  )
}
