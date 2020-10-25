import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import InputNU from './InputNU/InputNU';

//context
import { userContext } from '../../../context/userContext';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto%',
    },
  },
}));

export default function Login() {

  const classes = useStyles();

  const [newName, setNewName ] = useState(''); 
  const [newEmail, setNewEmail ] = useState(''); 
  const [newPhone, setNewPhone ] = useState(''); 

  const [user, setUser] = useContext(userContext);

  console.log(user)
  function handleChange(name, value){
    if (name === 'newName'){
      setNewName(value)
    } else if (name === 'newPhone'){
      setNewPhone(value)
    } else {
      setNewEmail(value)
    }

    let newPlayer = { newName, newEmail, newPhone }
    let savePlayer = JSON.stringify(newPlayer);
    localStorage.setItem('player', savePlayer )
  }

  

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h5" color="secondary" >
            Formulario de Compra
        </Typography>
        
        <InputNU 
        attribute= {{
            id: 'newName',
            name: 'newName',
            label: 'Nombre Completo',
            type: 'text'
        }}
            handleChange={handleChange}
        />

        <InputNU 
        attribute= {{
            id: 'newPhone',
            name: 'newPhone',
            label: 'Teléfono de Contacto',
            type: 'number'
        }}
            handleChange={handleChange}
        />

        <InputNU 
        attribute= {{
            id: 'newEmail',
            name: 'newEmail',
            label: 'Dirección de Email',
            type: 'text'
        }}
            handleChange={handleChange}
        />
    </form>
  );
}

/*

<Button color="primary" variant="contained" onClick = { handleSubmit } >
            Crear cuenta
        </Button>


        
        <InputNU 
        attribute= {{
            id: 'newId',
            name: 'newId',
            label: 'Contraseña',
            type: 'password'
        }}
            handleChange={handleChange}
        />


        function handleSubmit(){
    let newPlayer = { newName, newEmail, newPhone }
    setUser(newPlayer)
    console.log(newPlayer)
    let savePlayer = JSON.stringify(newPlayer);
    localStorage.setItem('player', savePlayer )

    onClick = { handleSubmit }
  }
*/