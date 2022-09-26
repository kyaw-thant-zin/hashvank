import React from "react";

// MUI
import { Box, Card, CardHeader, Typography, CardContent, Grid } from "@mui/material";


// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/auth/Layout';

// LANG
import { t } from "../../../../common/SwitchLang";


const Setting = () => {
    return (
      <>
        <Layout>
          <Typography variant="h2" sx={theme.typography.pageTitle}>{t('setting.pageTitle')}</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Card sx={theme.card}>
  
                  <CardHeader 
                      sx={theme.card.header}
                      title={
                          <Typography 
                              variant="h3" 
                              sx={theme.typography.contentTitle}
                          >
                          {t('setting.pageTitle')}
                          </Typography>
                      }
                  />
  
                  <CardContent sx={{ padding: '0px', marginTop: '13px', height: '100%', maxHeight: 'calc(100% - 55px)'  }}>
                      <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ height: '100%' }}
                      >
                        <Grid item>
                          <Typography variant="h4" sx={theme.typography.pageTitle}>Coming Soon</Typography>
                        </Grid>
                      </Grid>
                  </CardContent>
  
              </Card>
          </Box>
        </Layout>
      </>
    )
}
  
    
export default Setting;