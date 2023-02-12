import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React from 'react'

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Inputs = ( { name, handelChange, label, autoFocus, type, handelShowPassword, half, variant }) => {

    return ( <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handelChange}
                variant={variant}
                fullWidth
                required
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={ name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handelShowPassword}>
                                { type === "password" ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid> )
}

export default Inputs;