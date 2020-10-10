
import React, { useContext } from 'react';
//ROUTER
import { NavLink } from 'react-router-dom'

//CONTEXT
import { CartContext } from '../../context/cartContext';

//MATERIAL
import Button from '@material-ui/core/Button';

const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    console.log(cart)

    var totalprice = 0;

    var price = cart.map(itemprice =>{

        var originalprice = itemprice.price;
        totalprice += parseFloat(originalprice);
    }) 
    console.log(price)

    return (
        <div className="Home">
            <h2 className="Home-Title">Cart</h2>
            <p>
                {
                    cart.length ?
                        <div>
                            <span>Items in cart: {cart.length}</span>
                            <hr></hr>
                            {
                                cart.map(item => {
                                    return(
                                        <div>
                                            <p>{item.title}</p>    
                                            <span>Price: {item.price} </span>
                                        </div> 
                                    ) 
                                }                            
                            )}
                            <hr></hr>
                            <span>Total Price: {totalprice} </span>                                       
                        </div>
                    :
                    <div>
                        <div>
                            <p>Tu Carrito esta vacío</p>  
                            <br/> 
                            <NavLink to={`/`}>
                                <Button color="primary"> 
                                    Volver al menu
                                </Button>
                            </NavLink>
                        </div> 
                    </div>
                }
            </p>
        </div>
    )
}

export default Cart;