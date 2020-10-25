import React, { useState } from 'react';

export const CartItemsContext = React.createContext([]);

export const CartItemsProvider = (props) => {
    const [cartItems, setCartItems] = useState([1]);
    console.log('aca soy el cartContext de tu item!!!! funcionando')
    console.log(cartItems)
    //const [cartItemsFinal, setCartItemsFinal] = useState([1]);
    

    return (
        <CartItemsContext.Provider value = {[cartItems, setCartItems]}>
            {props.children}
        </CartItemsContext.Provider>
    )
}