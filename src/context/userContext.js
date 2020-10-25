import React, { useState } from 'react';

export const userContext = React.createContext([]);

export const UserProvider = (props) => {
    const [user, setUser] = useState([]);
    console.log(user)
    console.log('aca soy el userContext funcionando')
    console.log(props)
    return (
        <userContext.Provider value = {[user, setUser]}>
            {props.children}
        </userContext.Provider>
    )
}