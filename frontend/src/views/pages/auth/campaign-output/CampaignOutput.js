import React from "react";

// MUI
import { Box, Card, CardContent, CardHeader, Divider, Typography, Backdrop, CircularProgress } from "@mui/material";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// MOMENT
import moment from 'moment';

// THEME
import Layout from '../../../layout/auth/Layout';
import { theme } from "../../../layout/Theme";

// CUSTOM COMPONENT
import SelectCop from "../../../components/form/SelectCop";
import TableCop from "../../../components/table/TableCop";
import SwitchCop from "../../../components/table/SwitchCop";
import VideoViewCop from "../../../components/VideoViewCop";
import CheckBoxCop from "../../../components/form/CheckBoxCop";
import AnchorLinkCop from "../../../components/AnchorLinkCop";
import AlertCop from "../../../components/AlertCop";

// LANG
import { t } from '../../../../common/SwitchLang';


const CampaignOutput = (props) => {

    const dispatch = useDispatch()
    // const { campaigns, isLoading, message, isUpdatedVisibility, isUpdatedPriority } = useSelector((state) => state.campaignOutput)
    const { campaigns, isLoading, message, isUpdatedVisibility, isUpdatedPriority } = ''
  
    // Onchange campaing type
    const [campaignType, setCampaignType] = React.useState('all')
    const [tableFilter, setTableFilter] = React.useState({
      columnField: 'campaignName',
      operatorValue: 'isNotEmpty',
      value: 'all',
    })
    const [campaignMenuItems, setCampaignMenuItems] = React.useState([
      {name: t('campaignOutput.selectAllCampaign'), value: 'all' }
    ])
    const [tableRows, setTableRows] = React.useState([])
  
    const handleChangeCampaignType = (event) => {
  
      setCampaignType(event.target.value);
      if(event.target.value !== 'all') {
        // set the table filter
        setTableFilter({
          columnField: 'campaignName',
          operatorValue: 'equals',
          value: event.target.value,
        })
      } else {
        // set the table filter
        setTableFilter({
          columnField: 'campaignName',
          operatorValue: 'isNotEmpty',
          value: event.target.value,
        })
      }
    }
  
    // Editable rows editing
    const [editRowsModel, setEditRowsModel] = React.useState({});
  
    // update link
    const handleEditRowsModelChange = React.useCallback((newModel) => {
      const updatedModel = { ...newModel };
      Object.keys(updatedModel).forEach((id) => {
        if (updatedModel[id].link) {
          const isValid = validateEmail(updatedModel[id].link.value);
          updatedModel[id].link = { ...updatedModel[id].link, error: !isValid }
  
          if(isValid) {
            const camapignData = {
              id: id,
              data: {
                  linkUrl: updatedModel[id].link.value
              }
            }
            // dispatch(updateLinkUrl(camapignData))
          }
  
        }
  
      });
  
      setEditRowsModel(updatedModel);
    }, [dispatch]);
  
    function validateEmail(urlString) {
      try { 
        return Boolean(new URL(urlString)); 
      }
      catch(e){ 
        return false; 
      }
    }
  
    // TABLE BODY
  
    // fetch the campaigns
    
  
    // set the table data
    
  
    // handle change the public and private
    const handleChangeVisibility = (event) => {
  
      setTableRows(prevState => {
          const pState = prevState.map((ps) => {
              if(ps.id === Number(event.target.value)) {
  
                  const row = {
                      ...ps,
                      visibility: event.target.checked
                  }
  
                  return row
              }
  
              return ps
  
          })
  
          return pState
      })
  
      // update visibility
      const camapignData = {
          id: event.target.value,
          data: {
              visibility: event.target.checked
          }
      }
    //   dispatch(updateVisibility(camapignData))
  
    }
  
    // handle change the priority
    const handleChangePriority = (event) => {
  
      setTableRows(prevState => {
        const pState = prevState.map((ps) => {
            if(ps.id === Number(event.target.value)) {
  
                const row = {
                    ...ps,
                    priority: event.target.checked
                }
  
                return row
            }
  
            return ps
  
        })
  
        return pState
      })
  
      // update priority
      const camapignData = {
        id: event.target.value,
        data: {
            priority: event.target.checked
        }
      }
    //   dispatch(updatePriority(camapignData))
    }
  
    // TABLE HEADER
    const columns = [
      { field: 'id', type: 'number' },
      { field: 'visibility', headerName: t('campaignOutput.tablePublicPrivate'), minWidth: 100, renderCell: (params) => <SwitchCop onChange={handleChangeVisibility} checked={params.row.visibility} value={params.row.id} />},
      { field: 'campaignName', type: 'string', headerName: t('campaignOutput.tableName'),flex: 1, minWidth: 150, renderCell: (params) => <Typography variant="subtitle" sx={{ fontFamily: '"GothamBold", sans-serif', fontWeight: 'bold' }}>{params.row.campaignName}</Typography> },
      { field: 'tiktok', headerName: t('campaignOutput.tableTikTok'),flex: 1, minWidth: 70, renderCell: (params) => <VideoViewCop controls={true} url={params.row.tiktok} /> },
      { field: 'created', headerName: t('campaignOutput.tablePostDate'),flex: 1, minWidth: 100 },
      { field: 'account', headerName: t('campaignOutput.tableAccount'),flex: 1, minWidth: 100 },
      { field: 'hashtag', headerName: t('campaignOutput.tableHashtag'),flex: 1, minWidth: 100 },
      { field: 'views', headerName: t('campaignOutput.tableView'),flex: 1, minWidth: 70 },
      { field: 'link', headerName: t('campaignOutput.tableLink'),flex: 1, minWidth: 200, editable: true },
      { field: 'priority', headerName: t('campaignOutput.tablePriority'),flex: 1, minWidth: 70, renderCell: (params) => <CheckBoxCop onChange={handleChangePriority} checked={params.row.priority} value={params.row.id} /> },
      { field: 'url', headerName: '', minWidth: 30, renderCell: (params) => <AnchorLinkCop href={ params.row.url } /> }
    ]
  
    return (
      <>
        {
          isLoading ? (
            <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
              <CircularProgress />
            </Backdrop>
          ) : ''
        }
        {
  
          isUpdatedVisibility ? (
            <AlertCop severity="success" open={isUpdatedVisibility} message={message?.success?.updatedVisibility} />
          ) : ''
        }
        {
  
          isUpdatedPriority ? (
            <AlertCop severity="success" open={isUpdatedPriority} message={message?.success?.updatedPriority} />
          ) : ''
        }
        <Layout>
          <Typography variant="h2" sx={theme.typography.pageTitle}>{t('campaignOutput.pageTitle')}</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Card sx={theme.card}>
              <CardHeader 
                sx={theme.card.header}
                title={
                  <Typography variant="h3" sx={theme.typography.contentTitle}>
                    {t('campaignOutput.tableTitle')}
                  </Typography>
                }
                action={
                  <SelectCop
                    size="small"
                    minWidth='300px'
                    data={{ change: handleChangeCampaignType, value: campaignType }}
                    menuitems={campaignMenuItems}
                  />
                }
              />
              <Divider />
              <CardContent sx={{ padding: '0px', marginTop: '13px' }}>
                <TableCop 
                  rows={tableRows}
                  columns={columns}
                  pageSize={12}
                  rowsPerPageOptions={[12]}
                  editRowsModel={editRowsModel}
                  onEditRowsModelChange={handleEditRowsModelChange}
                  filterModel={{
                    items: [
                      tableFilter
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </Layout>
      </>
    )
  }
  
    
  export default CampaignOutput

