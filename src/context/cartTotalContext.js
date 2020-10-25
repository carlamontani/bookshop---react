import React, { useState } from 'react';

export const CartTotalContext = React.createContext([]);

export const CartTotalProvider = (props) => {
    const [totalPrice, setTotalPrice] = useState([]);

    console.log('aca pricecontex')
    return (
        <CartTotalContext.Provider value = {[totalPrice, setTotalPrice]}>
            {props.children}
        </CartTotalContext.Provider>
    )
}