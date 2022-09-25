import * as React from 'react';
import { Box, CssBaseline  } from '@mui/material';

const Layout = (props) => {

    return (
      <Box  sx={{ display: 'flex', background: props.background }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {props.children}
          </Box>
        </Box>
      </Box>
    );
  }
    
  export default Layout;