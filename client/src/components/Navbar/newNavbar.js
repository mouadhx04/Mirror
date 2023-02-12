import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import newLogo from "../../images/newLogo.png";

import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

function ResponsiveAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  const toHomePage = () => {
    history('/');
    setUser(null);
  };

  const setSettings = () => {
    console.log('Ready!');
};

  useEffect( () => {
      const token = user?.token;
      if (token) {
          const decodedToken = jwt_decode(token);
          if ( decodedToken.exp * 1000 < new Date().getTime() ) logoutbtn();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const settings = [''];

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className={classes.heading}
            variant="h2"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Andalé Mono',
              fontWeight: 400,
              color: '',
              textDecoration: 'none',
            }}
          >
            Trusty
          </Typography>
          <img className={classes.image} src={newLogo} alt="think" height='60' style={{marginLeft: "0", cursor: 'pointer'}} onClick={toHomePage} ></img>


          <Typography
          
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 0,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'cursive',
              fontWeight: 400,
              color: 'rgba(0,183,255, 1)',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 0 }} style={{marginLeft: "auto"}}>
            { user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Badge
                    color='primary'
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar style={{backgroundColor: '#00B7FF'}} className={classes.purple} src={user?.result?.imageUrl}> {user.result.name.charAt()} </Avatar>
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <Button className={classes.button} component={Link} to='/auth' variant='contained' color='primary'> Sign in </Button>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <AccountCircleIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                    <Typography variant='p' className={classes.heading} >{user?.result?.name}</Typography>
                </MenuItem>
              ))}

              <MenuItem onClick={handleCloseUserMenu}>
                <TuneOutlinedIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                <Typography variant='p' className={classes.heading} onClick={setSettings} > Settings </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <LogoutIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                <Typography variant='p' className={classes.heading} onClick={logoutbtn} > Logout </Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;