import React, { useState } from 'react';

export const CartContext = React.createContext([]);

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    //const [price, setPrice] = useState([]);
    console.log(cart)
    console.log('aca soy el cartContext funcionando')
    console.log(props)
    return (
        <CartContext.Provider value = {[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    )
}