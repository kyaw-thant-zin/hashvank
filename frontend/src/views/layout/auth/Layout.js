import * as React from 'react';

// HEADER
import Header from './Header';
// SIDEBAR
import SideBar from "./SideBar";

// MUI
import { Box, CssBaseline, Toolbar  } from '@mui/material';

// drawer width
const drawerWidth = 245;

const Layout = (props) => {
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box  sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header 
        data={{
          drawerWidth: drawerWidth,
          mobileOpen: mobileOpen,
          handleDrawerToggle: handleDrawerToggle
        }} 
      />
      <SideBar 
        data={{
          container: container,
          drawerWidth: drawerWidth,
          mobileOpen: mobileOpen,
          handleDrawerToggle: handleDrawerToggle
        }} 
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}
  
export default Layout;