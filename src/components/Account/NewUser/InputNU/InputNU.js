import React from 'react';
import TextField from '@material-ui/core/TextField';

const LoginInput = ({attribute, handleChange}) =>{
    return (
        <div>
            <TextField 
            id= {attribute.id}
            name= {attribute.name}
            label= {attribute.label} 
            fullWidth= {attribute.fullWidth} 
            onChange= { (e) => handleChange(e.target.name, e.target.value) }
            type= {attribute.type} 
            />
        </div>
    )
}

export default LoginInput;