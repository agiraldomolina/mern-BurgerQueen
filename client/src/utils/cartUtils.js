export const addDecimals =(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart=(state)=>{
        //calculate items price
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))
        
        state.totalPrice = (addDecimals(Number(state.cartItems.reduce((acc, item) => acc + item.price * item.qty,0))));

        localStorage.setItem('cart', JSON.stringify(state));
        return
}