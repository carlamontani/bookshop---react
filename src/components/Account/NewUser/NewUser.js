import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import InputNU from './InputNU/InputNU';



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
  const [newId, setNewId ] = useState(''); 


  function handleChange(name, value){
    if (name === 'newId'){
      setNewId(value)
    } else {
      setNewName(value)
    }
  }

  function handleSubmit(){
    let newPlayer = { newName, newId }
    console.log(newPlayer)
    let savePlayer = JSON.stringify(newPlayer);
    localStorage.setItem('player', savePlayer )
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h5">
            Crear una cuenta
        </Typography>

        <InputNU 
        attribute= {{
            id: 'newName',
            name: 'newName',
            label: 'Dirección de Email',
            type: 'text'
        }}
            handleChange={handleChange}
        />
        
        <InputNU 
        attribute= {{
            id: 'newName',
            name: 'newName',
            label: 'Nombre',
            type: 'text'
        }}
            handleChange={handleChange}
        />

        <InputNU 
        attribute= {{
            id: 'newName',
            name: 'newName',
            label: 'Apellido',
            type: 'text'
        }}
            handleChange={handleChange}
        />

        <InputNU 
        attribute= {{
            id: 'newId',
            name: 'newId',
            label: 'Contraseña',
            type: 'password'
        }}
            handleChange={handleChange}
        />

        <Button color="primary" variant="contained" onClick = { handleSubmit } >
            Crear cuenta
        </Button>
        
    </form>
  );
}