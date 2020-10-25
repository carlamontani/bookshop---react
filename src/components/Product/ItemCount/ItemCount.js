import React, { useState, useContext, useEffect }  from 'react';

import { CartItemsContext } from '../../../context/cartItemsContext';

import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 'auto%',
      },
    },
  }));

function ItemCount(){

    const classes = useStyles();

    const [value, setCount] = useState(1);
    const [valueError, setValueError] = useState(false); 

    const [cartItems, setCartItems] = useContext(CartItemsContext);

    //const [cartItemsFinal, setCartItemsFinal] = useContext(CartItemsContext);


    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])


    function increase_quantity() {
        if (value < 20 && value > 0) {
            setValueError(false);
            setCount(parseInt(value)+1); 
            setCartItems( parseInt(value)+1);
            //setCartItemsFinal( parseInt(value)+1);
        }   else if (value > 19) {
            setValueError(true);
        }   else { 
            setCount((value)+1); 
            setCartItems((value)+1); 
            //setCartItemsFinal((value)+1); 
            setValueError(false);
        }
    }

    function decrease_quantity() {
        if (value < 20 && value > 1) {
            setValueError(false);
            setCount((value)-1);
            setCartItems((value)-1);
            //setCartItemsFinal((value)-1);
        } else if (value === 0){
            setCount(value);
            setValueError(true);
        } else {
            setCount((value)-1);
            setCartItems((value)-1);
            //setCartItemsFinal((value)-1);
            setValueError(true);
        }
    }

    function handleChange(value){
        if (value < 20  && value > 0){
            setValueError(false);
            setCount(value);
        }   else if (value === 0){
            setValueError(true);
        }   else if (value > 20){
            setValueError(true);
        }   else {
            value = 1;
            setCount((value)); 
            setValueError(true);
        }
    }
    console.log(value)    

    return(
        <div className={classes.root} >
            <Button color="secondary" size="small" onClick={() => decrease_quantity()}>
                <RemoveIcon/>
            </Button>

            <Input 
                type="text"
                id="quantity" 
                name="quantity" 
                onChange={ (e) => handleChange(e.target.value)}
                value={value}
                param={valueError}
            />
            <Button color="secondary" size="small" onClick={() => increase_quantity()}>
                <AddIcon/>
            </Button>
            <div class="container-cantidad2"> {valueError && 
                    <Typography variant="caption" display="block" gutterBottom className='error-message'>
                        El valor debe ser de 1 a 20 
                    </Typography>
                } 
            </div>
        </div>
    );
}

export default ItemCount;