import React, { useState, useEffect } from 'react';
import { getFirestore } from '../../firebase';

//componentes
import Home from '../Home/Home';

//material
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
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
  })
);

const NonFiction = () => {
    //MATERIAL
    const classes = useStyles();
  
    //ESTADO
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      setLoading(true);
      const db = getFirestore();
      const itemCollection = db.collection("books");
      const nonfiction = itemCollection.where('categoryId', '==', 'nonfiction')
      
      nonfiction.get()
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
    console.log(items)
  
    if (!loading) {
  
      return (
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
              items.map(product => (
                <Home key={product.id} product={product}/>
              ))
            }      
          </Grid>
        </div>
      );
    }
    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress color="primary" />
        </div>
      );
    }
  }
  
  export default NonFiction;