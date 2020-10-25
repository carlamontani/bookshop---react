import React, { useState } from 'react';

export const CartPriceContext = React.createContext([]);

export const CartPriceProvider = (props) => {
    //const [cart, setCart] = useState([]);
    const [price, setPrice] = useState([]);

    console.log('aca pricecontex')
    return (
        <CartPriceContext.Provider value = {[price, setPrice]}>
            {props.children}
        </CartPriceContext.Provider>
    )
}