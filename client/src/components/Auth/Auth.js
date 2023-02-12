import React, {useState, useEffect} from 'react';
import { Button, Typography, Container, Avatar, Paper, Grid} from '@material-ui/core';
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Inputs from "./Inputs";

import { GoogleLogin } from "react-google-login";
import Icon from "./icon";

import { loadGapiInsideDOM } from "gapi-script";

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


import { signUp, signIn } from "../../actions/auth";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  }

  const handelChange = (e) => { // 
    setFormData({  ...formData, [e.target.name]: e.target.value  })
  }

  const handelShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )

  const switchMode = () => {
    setIsSignup( (prevIsSignup) => !prevIsSignup );
    handelShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch( { type: 'AUTH', data: { result, token } } );
      history('/');
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = (error) => {
    console.log(console.log(error))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'> {isSignup ? 'Sign up' : 'Sign in'} </Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            { isSignup ? (
              <>
                <Inputs name='firstName' label='First Name' handelChange={handelChange} autoFocus half />
                <Inputs name='lastName' label='Last Name' handelChange={handelChange} half />
              </>
              ) : null }
            <Inputs name="email" label="Email Adress" handelChange={handelChange} type="email" />
            <Inputs name="password" label="Password" handelChange={handelChange} type={showPassword ? "text" : "password"} handelShowPassword={handelShowPassword} />
            { isSignup && <Inputs name="confirmPassword" label="Repeat Password" handelChange={handelChange} type="password" /> }
          </Grid>

          <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign up' : 'Sign in' }
          </Button>

          <GoogleLogin 
            clientId='23596516106-nffu2846hka5r2qtga0bm81f539h3gln.apps.googleusercontent.com'
            render={ (renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess} //
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />

          <Grid container justifyContent='flex-end'>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign in' : `Don't have an account? Sign up` }
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;