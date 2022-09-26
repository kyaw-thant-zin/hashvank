import React from "react";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { Box, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/auth/Layout';

// LANG
import { t } from '../../../../common/SwitchLang';

const Dashboard = () => {

    const dispatch = useDispatch()
  
    // const { user, isError } = useSelector((state) => state.dashboard)
    const { user, isError } = ''
    const [campaignArray, setCampaignArray] = React.useState(null)
  
    
  
    return (
      <>
        <Layout>
          <Typography variant="h2" sx={theme.typography.pageTitle}>{ t('home.pageTitle') }</Typography>
            {
              campaignArray ? (
                <Grid container spacing={2}>
                  {
                    campaignArray.map(cm => (
                      <Grid item xs={12} sm={6} md={4} key={cm.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h3" sx={theme.typography.contentTitle}>{cm.campaignName}</Typography>
                            <Box sx={theme.typography.homeTxt}>
                              <Typography variant="caption" display="block">Campaign ID: {cm.id}</Typography>
                              {
                                cm.hashtag !== '' ? (<Typography variant="caption" display="block">Hashtag: {cm.hashtag}</Typography>) :
                                                    (<Typography variant="caption" display="block">Account: {cm.account}</Typography>)
                              }
                            </Box>
                          </CardContent>
                          <CardActions sx={{ justifyContent: 'space-between' }}>
                            <Chip label="public" color="success" size="small" />
                            {/* <Link to="/">
                              <IconButton size="small">
                                <LaunchIcon />
                              </IconButton>
                            </Link> */}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
              ) : (<Typography variant="h3" sx={theme.typography.contentTitle}>......</Typography>)
            }
        </Layout>
      </>
    )
  }
  
    
  export default Dashboard;