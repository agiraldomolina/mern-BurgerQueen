import { createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')?
    JSON.parse(localStorage.getItem('cart')) : 
    {cartItems:[]};

const shoppingCartSlice = createSlice({
   name:'shoppingCart',
   initialState,
   reducers:{}
});

export default shoppingCartSlice.reducer;