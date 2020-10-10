import React, { useState } from 'react';

export const CartItemsContext = React.createContext([]);

export const CartItemsProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    console.log('aca soy el cartContext de tu item!!!! funcionando')
    console.log(cartItems)

    return (
        <CartItemsContext.Provider value = {[cartItems, setCartItems]}>
            {props.children}
        </CartItemsContext.Provider>
    )
}