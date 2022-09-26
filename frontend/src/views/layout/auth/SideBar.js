import React from "react";

// ROUTER
import { Link, useLocation } from "react-router-dom";

// MUI
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {  Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";

// THEME
import {theme} from "../Theme";

// SCSS
import './authLayout.scss';

// LANG
import { t } from '../../../common/SwitchLang';

const SideBar = (props) => {

    const routes = ['/dashboard', '/campaign', '/campaign-output', '/report', '/link-setting', '/input-code', '/setting'];
    const menuList = [t('nav.home'), t('nav.campaign'), t('nav.campaignOutput'), t('nav.report'), t('nav.linkSetting'), t('nav.inputCode'), t('nav.setting')];
    const iconList = [
      <HomeOutlinedIcon sx={{ color: '#7764E4', fontSize: 26 }} />, 
      <MailOutlinedIcon sx={{ color: '#F53C56' }} />, 
      <Inventory2OutlinedIcon sx={{ color: '#11CDEF' }} />, 
      <DescriptionOutlinedIcon sx={{ color: '#FB6340' }} />, 
      <ChatBubbleOutlineOutlinedIcon sx={{ color: '#FEB969' }} />, 
      <InputOutlinedIcon sx={{ color: '#FB6340' }} />,
      <SettingsOutlinedIcon sx={{ color: '#FB6340' }} />,
    ];
  
  
    // check active URL
    const location = useLocation();
    const locationPath = location.pathname.split('/');
  
    return (
      <Box
        component="nav"
        sx={{ width: { md: props.data.drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="nav links"
      >
          <Drawer 
            container={props.data.container}
            variant="temporary"
            open={props.data.mobileOpen}
            onClose={props.data.handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.data.drawerWidth },
            }}
          >
            <Toolbar>
              <Typography variant="h1" sx={theme.typography.logo}>{process.env.REACT_APP_NAME}</Typography>
            </Toolbar>
            <Divider />
            <List>
              {
                menuList.map((text, index) => (
                  <ListItem key={text} disablePadding className="sidebar-item" >
                    <Link to={routes[index]}>
                      <ListItemButton className={'/'+locationPath[1] === routes[index] ? 'active sidebar-item-btn': ' sidebar-item-btn'}>
                        <ListItemIcon className="sidebar-item-icon">{iconList[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))
              }
            </List>
          </Drawer>
          <Drawer 
            variant='permanent'
            sx={{
              display: { xs: 'none', sm:'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.data.drawerWidth },
            }}
            open
          >
            <Toolbar>
              <Typography variant="h1" sx={theme.typography.logo}>{process.env.REACT_APP_NAME}</Typography>
            </Toolbar>
            <Divider />
            <List className="sidebar">
              {
                menuList.map((text, index) => (
                  <ListItem key={text} disablePadding className="sidebar-item">
                    <Link to={routes[index]}>
                      <ListItemButton className={'/'+locationPath[1] === routes[index] ? 'active sidebar-item-btn': 'sidebar-item-btn'}>
                        <ListItemIcon  className="sidebar-item-icon">{iconList[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))
              }
            </List>
          </Drawer>
        </Box>
    )
  }
    
  export default SideBar;