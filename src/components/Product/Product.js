import React, { useContext, useEffect, useState } from 'react';
import  { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import ItemCount from './ItemCount/ItemCount';

import './Product.css';

import { CartContext } from '../../context/cartContext';
import { CartItemsContext } from '../../context/cartItemsContext';
import { CartPriceContext } from '../../context/cartPriceContext';
import { CartTotalContext } from '../../context/cartTotalContext';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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


function Product ({products}) {
    const classes = useStyles();

    const { id } = useParams();

    const [cart, setCart] = useContext(CartContext);

    const [cartItems, setCartItems] = useContext(CartItemsContext);

    //const [cartItemsFinal, setCartItemsFinal] = useContext(CartItemsContext);

    const [price, setPrice] = useContext(CartPriceContext);

    const [totalPrice, setTotalPrice] = useContext(CartTotalContext);

    //const [totalPrice, setTotalPrice] = useState('');

    const addToCart = () => {
        var existingEntries = JSON.parse(sessionStorage.getItem("cartId"));
        if(existingEntries == null) existingEntries = [''];


        const found = existingEntries.find(element => element === id);
        if(found == id) {
            document.querySelector(".container-cantidad").innerHTML = "";
            document.querySelector(".container-cantidad").innerHTML = `
                                <Typography variant="caption" display="block" gutterBottom>
                                    Este producto ya fue agregado
                                </Typography>
                            ` 
            return;
        }

        sessionStorage.setItem("cartId", JSON.stringify(id));
    
        existingEntries.push(id);
        sessionStorage.setItem("cartId", JSON.stringify(existingEntries));
            

        products.map(product =>{
                if(id===product.id) {
                            product.qty = cartItems;

                            const selectedProduct = product;
                            setCart(currentCart => [...currentCart, selectedProduct])
                            
                            const selectedPrice = parseFloat(product.price);
                            let qtyPrice = (selectedPrice * cartItems);
                            setPrice(currentPrice => [...currentPrice, qtyPrice])
                                                        
                            setCartItems(1)

                            document.querySelector(".container-cantidad").innerHTML = `
                                <Typography variant="caption" display="block" gutterBottom>
                                    Agregaste ${cartItems} productos
                                </Typography>
                            ` 
            }
            
        })          
    }

    useEffect(() => {
    }, [price])

    useEffect(() => {
    }, [cart])

    useEffect(() => {
    }, [totalPrice])

    return(
        <>
            <div style={{ padding: 20 }} > 
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}
                    >
                    {
                        products ?
                        products.map(product =>{
                            if(id===product.id) {
                                return(
                                    <div class="productcont">
                                        <Typography variant="caption">
                                            home / {product.categoryId} 
                                        </Typography>
                                        <div class="productcolumns">
                                
                                            <div class="productimg"> 
                                                <div class="img-container">
                                                    <img src={product.image} alt={product.title} />
                                                </div>
                                            </div>
                                            <Card id="transparent" variant="outlined" class="productcard">
                                                <CardContent>
                                                    <Typography variant="h5" color="secondary" gutterBottom style={{fontWeight: 600}}>
                                                        {product.title}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <span class="tituloitem">Autor. </span> {product.author}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <span class="tituloitem">Precio. </span> ${product.price}
                                                    </Typography>

                                                    <ItemCount /> 
                                                    <br/>
                                                                                
                                                    <Button color="secondary" variant="contained" onClick = {addToCart}> 
                                                        Agregar <ShoppingCartIcon fontSize="small" />
                                                    </Button>

                                                    <br/><br/>
                                                    <div class="container-cantidad"></div>
                                                    <br/>
                                                    <span class="tituloitem">Descripción. </span>
                                                    <Typography variant="body2" gutterBottom>
                                                        {product.description}
                                                    </Typography>
                                                    <br/>
                                                    <Typography variant="body2" gutterBottom>
                                                        <span class="tituloitem">Isbn. </span>  {product.isbn}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                )                            
                            }}
                        )
                        :
                        <div> cargando ... </div>
                    }
                </Grid>
            </div>
        </>
    )
}

export default withRouter(Product);
