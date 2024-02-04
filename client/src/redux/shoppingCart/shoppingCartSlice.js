import { createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')?
    JSON.parse(localStorage.getItem('cart')) : 
    {cartItems:[]};

const addDecimals =(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

const shoppingCartSlice = createSlice({
   name:'shoppingCart',
   initialState,
   reducers:{
    addToCart:(state, action)=>{
        const item = action.payload;
        const existItem = state.cartItems.find((el) => el._id === item._id);
        if(existItem){
            state.carItems =state.cartItems.map((el) => el._id===existItem._id? item : el);
        }else{
            state.cartItems = [...state.cartItems, item];
        }

        //calculate items price
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))
        
        state.totalPrice = (addDecimals(Number(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))));

        localStorage.setItem('cart', JSON.stringify(state));
    }
   }
});

export const { addToCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;