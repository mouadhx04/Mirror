import React, {useState, useEffect} from "react";

import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';

import { Link, useNavigate, useLocation } from "react-router-dom";

import Logo from "../../images/Logo.png";
import useStyles from './styles';

import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const logoutbtn = () => {
        dispatch( { type: 'LOGOUT' } );
        history('/auth');
        setUser(null);
    };

    useEffect( () => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwt_decode(token);
            if ( decodedToken.exp * 1000 < new Date().getTime() ) logoutbtn();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // 

    const updatePicture = () => {
        console.log(user.result);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2'>Trusty</Typography>
                <img className={classes.image} src={Logo} alt="think" height='60'></img>
            </div>
            <Toolbar className={classes.toolbar} xs={4}>
                {user ? (
                    <div className={classes.profile}>
                        <Badge
                            color='primary'
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                        <Avatar className={classes.purple} onClick={updatePicture} alt={user.result.name} src={user?.result?.imageUrl}> {user.result.name.charAt()} </Avatar>
                        </Badge>
                        <Typography className={classes.userName} variant="h6"> {user.result.name} </Typography>
                        <Button variant='contained' color="secondary" className={classes.logout} onClick={logoutbtn} > Logout </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'> Sign in </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;