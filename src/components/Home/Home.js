import React from 'react';
import ItemList from './ItemList/ItemList'; 


function Home(props){
    console.log(props)
    return (
        <div>
            <ItemList product={props} ></ItemList>
        </div>
    )
}

export default Home;