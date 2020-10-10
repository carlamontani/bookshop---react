import React, { useContext, useEffect } from 'react';
import  { useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import ItemCount from './ItemCount/ItemCount';

import { CartContext } from '../../context/cartContext';
import { CartItemsContext } from '../../context/cartItemsContext';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
    console.log(products)
    console.log(id)

    const [cart, setCart] = useContext(CartContext);

    const [cartItems, setCartItems] = useContext(CartItemsContext);

    console.log(cartItems)
    console.log(cart)

    const addToCart = () => {

        products.map(product =>{
            console.log(cartItems) 
            if(id===product.id) {
                console.log(cartItems) 
                console.log(product) 
                //for (var i = 0; i < cartItems.length; i++) {
                    const selectedProduct = product;
                    console.log(selectedProduct);
                    setCart(currentCart => [...currentCart, selectedProduct])
                //}
            }
        })
    }

    useEffect(() => {
        console.log(cart)
    }, [cart])

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
                            console.log(product)
                            if(id===product.id) {
                                return(
                                    <Card>
                                        <CardContent>
                                            <img src={product.image} alt={product.title} />
                                            <Typography variant="h5">
                                                {product.title}
                                            </Typography>
                                            <Typography variant="h6">
                                                {product.price}
                                            </Typography>
                                            <p>Agregaste {cartItems} productos</p>
                                            <ItemCount />                              
                                            <Button color="primary" variant="contained" onClick = {addToCart}> 
                                                Agregar
                                            </Button>
                                        </CardContent>
                                    </Card>
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