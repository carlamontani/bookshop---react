import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';



import LocalMallIcon from '@material-ui/icons/LocalMall';

import { CartItemsContext } from '../../context/cartItemsContext';
import { CartContext } from '../../context/cartContext';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function NavBar() {
    const classes = useStyles();
  
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [cartItems, setCartItems] = useContext(CartItemsContext);

    const [cart, setCart] = useContext(CartContext);

  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>

                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                      <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      >
                      <MenuItem onClick={handleClose}>
                        <NavLink to={`/fiction`}>
                          Ficción
                        </NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to={`/nonfiction`}>
                          No Ficción
                        </NavLink>
                      </MenuItem>
                      
                      </Menu>
                  </IconButton>

                  <Typography variant="h3" className={classes.title} id="title">
                    <NavLink to={`/`}>
                      Lorem Librum
                    </NavLink>
                  </Typography>

                  <NavLink to={`/cart`}>
                    <IconButton className={classes.menuButton} aria-label="show new notifications" color="inherit">
                      { (cart.length > 0 ) ?
                          <Badge color="primary" variant="dot">
                            <LocalMallIcon />
                          </Badge>
                        :
                        
                        <LocalMallIcon />
                        
                      }
                      
                    </IconButton>
                  </NavLink>

                </Toolbar>
            </AppBar>
        </div>
    )
}


//free
/*
<MenuItem onClick={handleClose}>Free</MenuItem>
<Button color="primary" className={classes.menuButton} >
                    FREE
                  </Button>

                  
                  
                  <SearchIcon className={classes.menuButton} ></SearchIcon>

                  <NavLink to={`/account/login`}>
                    <PersonIcon className={classes.menuButton} >
                    </PersonIcon>
                  </NavLink>
*/