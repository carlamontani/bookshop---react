
import React, { useState, useContext, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import './Cart.css';

//ROUTER
import { NavLink } from 'react-router-dom';

//CONTEXT
//import { UserProvider } from '../../context/userContext';
import { userContext } from '../../context/userContext';
import { CartContext } from '../../context/cartContext';
import { CartPriceContext } from '../../context/cartPriceContext';
import { CartTotalContext } from '../../context/cartTotalContext';
import { CartItemsContext } from '../../context/cartItemsContext';

//MATERIAL
import Button from '@material-ui/core/Button';
import { getFirestore } from '../../firebase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



//COMPONENTES
import NewUser from '../Account/NewUser/NewUser';
//import ItemCount from '../Product/ItemCount/ItemCount';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const Cart = () => {
    const classes = useStyles();

    const [cart, setCart] = useContext(CartContext);

    const [user, setUser] = useContext(userContext);

    const [price, setPrice] = useContext(CartPriceContext);

    const [totalPrice, setTotalPrice] = useContext(CartTotalContext);
    
    const [cartItems, setCartItems] = useContext(CartItemsContext);

    const [id, setOrderId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const db = getFirestore();

    
    function createNewOrder(){        
        var user = JSON.parse(localStorage.getItem('player'));
        setUser(user)

        const orders = db.collection("orders");
        const newOrder = {
            items: cart,
            buyer: user,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: totalPrice
        }

        orders.add(newOrder).then(({id}) => {
            setOrderId(id)
        }).catch(err => {
            setError(err)
        }).finally(()=> {
            setLoading(false);
        });
    }

    function precioTotalSuma(){
        if (price.length > 1) {

            let sum = price.reduce(function (accumulator, currentValue) {
                return accumulator + parseFloat(currentValue);
            });
            setTotalPrice (sum);
        } else {
            setTotalPrice(price);
        }
    }
    precioTotalSuma()

    function deleteCart(){
        sessionStorage.clear();
        setCart([]);
        setPrice([]);
        setTotalPrice([]);
    }

    if(totalPrice[0] == 0){
        deleteCart()
    }

    function minOrder(id){
            for (let i = 0; i < cart.length; i++) {
                if (id === cart[i].id ){
                    
                    if (cart[i].qty === 0){
                        var removeItem = document.getElementById(`itemDiv${cart[i].id}`);
                        removeItem.innerHTML = '';

                        return
                    } else {
                        cart[i].qty = cart[i].qty -1;
                        
                        let precioResta = parseFloat(cart[i].price);
                    
                        setPrice([ totalPrice - precioResta ]);
                        if(cart[i].qty === 0){
                            var removeItem = document.getElementById(`itemDiv${cart[i].id}`);
                            removeItem.innerHTML = '';
                        }
                        precioTotalSuma()
                    }
                }
            }      
    }

    function sumOrder(id){
        for (let i = 0; i < cart.length; i++) {
            //const element = array[index];
            if (id === cart[i].id ){
                
                if (cart[i].qty === 0){
                    var removeItem = document.getElementById(`itemDiv${cart[i].id}`);
                    removeItem.innerHTML = '';

                    return
                } else {
                    cart[i].qty = parseFloat(cart[i].qty) +1;
                    let precioSuma = parseFloat(cart[i].price);
                    var totalPriceInt = parseFloat(totalPrice)
                    setPrice([ totalPriceInt + precioSuma ]);
                    if(cart[i].qty === 0){
                        var removeItem = document.getElementById(`itemDiv${cart[i].id}`);
                        removeItem.innerHTML = '';
                    }
                    precioTotalSuma()
                }
            }
        }      
    }


    return (
        <div className={classes.root} container style={{ padding: 20 }} class ="text-color ">
            
            <Typography variant="h4" color="secondary" align="center" >
                Carrito
            </Typography>
            <br/><br/>
            <div class="productcolumns" >
                {
                    cart.length ?
                        <div class="productcolumns">
                            <div class= "productcard">
                                {
                                    cart.map(item => {
                                            return(
                                                <div class="cart-flex" id = {"itemDiv" + item.id}>
                                                    <div class="img-container-cart">
                                                        <img src={item.image} alt={item.title} />
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" gutterBottom>
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            Cantidad: {item.qty}
                                                        </Typography>
                                                        <Typography variant="subtitle2" gutterBottom>
                                                            ${item.price}
                                                        </Typography>
                                                        <Button color="secondary" onClick = {() => minOrder(item.id)}>
                                                            -
                                                        </Button> 
                                                        <Button color="secondary" onClick = {() => sumOrder(item.id)}>
                                                            +
                                                        </Button>
                                                        <br/>
                                                    </div> 
                                                </div>
                                            )
                                    }                            
                                )}
                                <Typography variant="subtitle2" gutterBottom>
                                    Precio Total: ${totalPrice}
                                </Typography>
                                <br/>
                                <hr/>
                                <br/>
                                <Button color="secondary" onClick = {() => deleteCart()}>
                                    Vaciar carrito
                                </Button> 

                            </div>
                            
                            <div class= "productcard">
                                <NewUser/>
                                <br/>

                                <NavLink to={`/`}>
                                    <Button color="secondary"> 
                                        Volver
                                    </Button>
                                </NavLink> 

                                <Button color="secondary" variant="contained" onClick = { createNewOrder } >
                                    Realizar el pedido
                                </Button> 

                            </div>                               
                        </div>
                    :
                    <div className={classes.root}>
                        
                            <div>
                                <iframe src="https://giphy.com/embed/l3q2K5jinAlChoCLS" width="150" height="200" frameBorder="0"></iframe>
                            </div>
                            <br/>
                            <Typography variant="body2" gutterBottom class ="text-color">
                                Tu Carrito esta vacío
                            </Typography>
                            <NavLink to={`/`}>
                                <Button color="secondary"> 
                                    Volver
                                </Button>
                            </NavLink>
                         
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart;