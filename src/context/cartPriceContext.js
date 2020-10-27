import React, { useState } from 'react';

export const CartPriceContext = React.createContext([]);

export const CartPriceProvider = (props) => {
    const [price, setPrice] = useState([]);

    return (
        <CartPriceContext.Provider value = {[price, setPrice]}>
            {props.children}
        </CartPriceContext.Provider>
    )
}