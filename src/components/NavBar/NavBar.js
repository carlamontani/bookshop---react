
import React from 'react';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LocalMallIcon from '@material-ui/icons/LocalMall';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';



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
                      <MenuItem onClick={handleClose}>Free</MenuItem>
                      </Menu>
                  </IconButton>

                  <Typography variant="h3" className={classes.title}>
                    <NavLink to={`/`}>
                      Lorem Librum
                    </NavLink>
                  </Typography>
                  
                  <SearchIcon className={classes.menuButton} ></SearchIcon>
                  <NavLink to={`/account/login`}>
                    <PersonIcon className={classes.menuButton} >
                    </PersonIcon>
                  </NavLink>
                  <NavLink to={`/cart`}>

                    <LocalMallIcon className={classes.menuButton} ></LocalMallIcon>
                  </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}


//free
/*
<Button color="primary" className={classes.menuButton} >
                    FREE
                  </Button>
*/