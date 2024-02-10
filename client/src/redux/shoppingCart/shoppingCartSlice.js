import { createSlice} from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem('cart')?
    JSON.parse(localStorage.getItem('cart')) : 
    {cartItems:[]};


const shoppingCartSlice = createSlice({
   name:'shoppingCart',
   initialState,
   reducers:{
    setTable: (state, action) => {
        state.table = action.payload;
        return updateCart(state); 
    },
    addToCart:(state, action)=>{
        const item = action.payload;
        const existItem = state.cartItems.find((el) => el._id === item._id);
        if(existItem){
            state.cartItems = state.cartItems.map((el) =>
                  el._id === existItem._id ? item : el
                );
        }else{
            state.cartItems = [...state.cartItems, item];
        }
        return updateCart(state);
    },
    removeFromCart:(state, action)=>{
        state.cartItems=state.cartItems.filter((item)=> item._id!== action.payload);
         return updateCart(state);
    },
    clearCartItems:(state, action)=>{
        state.cartItems = [];
        return updateCart(state);
    }
   }
});

export const { addToCart,
     removeFromCart,
     clearCartItems,
     setTable
     } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;