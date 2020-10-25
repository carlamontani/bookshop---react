import React from 'react';
//import ItemCount from './ItemCount/ItemCount'; //BORRAR PASA A PRODUCT
import ItemList from './ItemList/ItemList'; 
//import Loading from './Loading/Loading'; // CREAR Y MOVER LOADING

//import axios from "axios";
//import { Typography } from '@material-ui/core';

function Home(props){
    console.log(props)
    return (
        <div>
            <ItemList product={props} ></ItemList>
        </div>
    )
}

export default Home;