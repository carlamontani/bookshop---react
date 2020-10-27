import React, { useState, useEffect } from 'react';
import { getFirestore } from './firebase';
import './App.css';

//COMPONENTES
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Login from './components/Account/Login/Login';
import NewUser from './components/Account/NewUser/NewUser';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Fiction from './components/Fiction/Fiction';
import NonFiction from './components/NonFiction/NonFiction';
import Footer from './components/Footer/Footer';

//ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//CONTEXT
import { CartProvider } from './context/cartContext';
import { CartItemsProvider } from './context/cartItemsContext';
import { UserProvider } from './context/userContext';
import { CartPriceProvider } from './context/cartPriceContext';
import { CartTotalProvider } from './context/cartTotalContext';

//MATERIAL
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f48fb1',
      main: '#ff1744',
      dark: '#f50057',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d1ff33',
      main: '#c6ff00',
      dark: '#aeea00',
      contrastText: '#ff1744',
    },
  },
  typography: {
    "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 200,
    "fontWeightRegular": 400,
    "fontWeightMedium": 600,
   },
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
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

const App = () => {
  //MATERIAL
  const classes = useStyles();

  //ESTADO
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection("books")
    
    itemCollection.get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('No data!');
      }
      setItems(querySnapshot.docs.map(doc => {
        return ({ id: doc.id, ...doc.data() });
      }));
    })
    .catch((error) => {
      console.log("There was an error trying to get items: ", error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if (!loading) {

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>  
          <CartItemsProvider>
              <CartProvider>
                <UserProvider> 
                  <CartPriceProvider>
                    <CartTotalProvider>
                      <NavBar/>
                      <Switch>            
                      <Route exact path="/">
                        <div style={{ padding: 20 }} > 
                        <Typography variant="h4" color="primary" align="center" >
                            Novedades
                        </Typography>
                          <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '50vh' }}
                            >
                            {
                            items.map(product => (
                              <Home key={product.id} product={product}/>
                            ))
                            }            
                          </Grid>
                        </div>
                      </Route>

                      <Route path="/account/login">
                        <Login/>
                      </Route>

                      <Route path="/account/newuser">
                        <NewUser/>
                      </Route>

                      <Route path='/product/:id'>
                        <Product products={items} />
                      </Route>
                      
                      <Route exact path='/cart'>
                        <Cart/>
                      </Route>

                      <Route exact path='/fiction'>
                        <Fiction/>
                      </Route>

                      <Route exact path='/nonfiction'>
                        <NonFiction/>
                      </Route>
                    
                      </Switch>
                    </CartTotalProvider>
                  </CartPriceProvider>
                </UserProvider>
              </CartProvider>
            </CartItemsProvider>
          <Footer/>   
        </ThemeProvider>    
      </BrowserRouter>
    );
  }
  if (loading) {
    return (
      <div className={classes.root} class="loadingflex">
        <CircularProgress color="secondary"/>
      </div>
    );
  }
}

export default App;