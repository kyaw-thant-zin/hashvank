import React from "react";

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// MUI
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Menu, Toolbar, MenuItem, Typography, Avatar, Grid  } from "@mui/material";

// ROUTE
import { useNavigate } from "react-router-dom";


const Header = (props) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {user} = useSelector((state) => state.auth)
    const {user} = ''
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }
  
    const navigateToProfile = () => {
      setAnchorElUser(null);
      navigate('/dashboard')
    }
  
    const onSignOut = () => {
      setAnchorElUser(null);
    //   dispatch(signout())
    //   dispatch(reset())
      navigate('/sign-in')
    }
  
    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
  
    function stringAvatar(name) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
  
  
    return (
      <AppBar 
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${props.data.drawerWidth}px)` },
          ml: { md: `${props.data.drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.data.handleDrawerToggle}
            sx={{ mr:2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Box sx={{ display: 'flex', flexGrow: 0, justifyContent: "flex-end" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(`${user?.userInfo?.firstName} ${user?.userInfo?.lastName}`)} />
                </IconButton>
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
                  <MenuItem onClick={navigateToProfile}>
                    <Typography textAlign="center" >Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={onSignOut}>
                    <Typography textAlign="center" >Sign out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
    
  }
    
  export default Header;