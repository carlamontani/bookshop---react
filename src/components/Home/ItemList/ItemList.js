import React from 'react';
//import ItemCount from '../ItemCount/ItemCount';
import './ItemList.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions'; //borrar
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//import { sizing } from '@material-ui/system';
//import Box from '@material-ui/core/Box';


import { NavLink } from 'react-router-dom';

const values = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

const theme = {
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      up: key => `@media (min-width:${values[key]}px)`,
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      flexGrow: 1,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      fontWeight: 200,
      letterSpacing: 0.5,
    },
    pos: {
      marginBottom: 12,
    },
}));

function ItemList(props) {
    
    const classes = useStyles();

    console.log("estoy en Products con", props)

    return(
        <div className={classes.root} style={{ padding: 20 }} >
            
                {props ?
                    <Grid item sm={4}>
                        <Card className={classes.root} id="transparent" variant="outlined">
                            <CardContent container>
                                <div key={props.product.product.id} id={props.product.product.id} className = "centerflex">
                                    <div className='some-style'>
                                        <img src={props.product.product.image} alt={props.product.product.title} />
                                    </div>
                                        
                                    <Typography className={classes.title} align="center" gutterBottom>
                                        {props.product.product.title}
                                    </Typography>
                                        
                                    <Typography className={classes.title} align="center" gutterBottom>
                                        ${props.product.product.price}
                                    </Typography>
                                        
                                        
                                    <NavLink to= {`/product/${props.product.product.id}`}>
                                        <Button color="secondary" alignItems="center"> 
                                            Ver Más
                                        </Button>
                                    </NavLink>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    :
                    <div> cargando ... </div>
                }
        </div>
    )
}

export default ItemList