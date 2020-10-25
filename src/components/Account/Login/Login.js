import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import LoginInput from './LoginInput/LoginInput.js';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'auto%',
    },
    flexGrow: 1,
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
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '50vh' }}
    >
        <Grid item xs={3} >
          <Typography variant="h5">
            Inicio de sesión
          </Typography>
          <br/>

          <LoginInput 
          attribute= {{
            id: 'newName',
            name: 'newName',
            label: 'Nombre',
            type: 'text'
          }}
            handleChange={handleChange}
          />

          <br/>

          <LoginInput 
          attribute= {{
            id: 'newId',
            name: 'newId',
            label: 'Contraseña',
            type: 'password'
          }}
            handleChange={handleChange}
          />
          <br/>
          
          <Button color="primary" variant="contained" onClick = { handleSubmit } >
            Ingresar
          </Button>

          <br/>

          <Typography variant="caption" display="block" gutterBottom>
            <a href="http://localhost:3000/account/newUser">Usuario nuevo?</a>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}


