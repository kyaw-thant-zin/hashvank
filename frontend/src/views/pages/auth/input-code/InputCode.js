import React from "react";

// MUI
import { Box, Card, CardContent, CardHeader, Typography, Backdrop, CircularProgress } from "@mui/material";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/auth/Layout';

// COMPONENTS
import TableCop from "../../../components/table/TableCop";
import CheckBoxGroupCop from "../../../components/table/CheckBoxGroupCop";
import IconWithTextCop from "../../../components/table/IconWithTextCop";
import AlertCop from "../../../components/AlertCop";

// LANG
import { t } from '../../../../common/SwitchLang';


const InputCode = (props) => {

    const dispatch = useDispatch()
  
    // const { inputCodes, isLoading, message, isUpdatedLayoutType, isUpdatedLayoutContent } = useSelector((state) => state.inputCode)
    const { inputCodes, isLoading, message, isUpdatedLayoutType, isUpdatedLayoutContent } = ''
    const [tableRows, setTableRows] = React.useState([])
  
    // FETCH INPUTCODES
  
    // SET THE INPUTCODES TABLE ROWS
  
    const processRowUpdate = React.useCallback(
      (newRow, oldRow) =>
        new Promise((resolve, reject) => {
          if (newRow.layoutType !== oldRow.layoutType) {
            // Save the new layout type
            const inputCodeData = {
              id: newRow.id,
              layoutType: newRow.layoutType
            }
            // dispatch(updateLayoutType(inputCodeData))
            resolve(newRow)
          } else {
            resolve(oldRow) // Nothing was changed
          }
        }),
      [dispatch],
    );
  
    // Handle layout content change
    const handleChangeLayoutContent = (event) => {
  
  
      // update the layout content
      const tagName = event.target.name
      const tagChecked = event.target.checked
      const rowId = event.target.value
  
      const inputCodeData = {
        id: rowId,
        [tagName]: tagChecked
      }
  
    //   dispatch(updateLayoutContent(inputCodeData))
  
      // change table row value
      setTableRows(prevState => {
        const pState = prevState.map((ps) => {
            if(ps.id === Number(rowId)) {
  
              if(tagName === 'showAccount') {
                ps.layoutContent.showAccount = tagChecked
              } else if(tagName === 'showTitle') {
                ps.layoutContent.showTitle = tagChecked
              } else if(tagName === 'showHashtag') {
                ps.layoutContent.showHashtag = tagChecked
              }
            }
            return ps
        })
        return pState
      })
  
  
    };
  
    // TABLE COLUMNS
    const columns = [
      {field: 'id'},
      { field: 'campaignName', headerName: t('inputCode.tableName'), flex: 1, minWidth: 100, renderCell: (params) => <Typography variant="subtitle" sx={{ fontFamily: '"GothamBold", sans-serif', fontWeight: 'bold' }}>{params.row.campaignName}</Typography> },
      { field: 'layoutType', type: 'number',headerName: t('inputCode.tableLayoutType'), minWidth: 150, editable: true },
      { field: 'layoutContent', headerName: t('inputCode.tableLayoutContent'),flex: 1, minWidth: 300, renderCell: (params) => <CheckBoxGroupCop checked={params.row.layoutContent} onChange={handleChangeLayoutContent} value={{showAccount: params.row.id, showTitle: params.row.id, showHashtag: params.row.id}} /> },
      { field: 'apiLink', headerName: t('inputCode.tableApiCode'),flex: 1, minWidth: 200, renderCell: (params) => <IconWithTextCop text={params.row.apiLink} /> },
    ];
  
  
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
          isUpdatedLayoutType ? (
            <AlertCop severity="success" open={isUpdatedLayoutType} message={message?.success?.updatedLayoutType} />
          ) : ''
        }
        {
          isUpdatedLayoutContent ? (
            <AlertCop severity="success" open={isUpdatedLayoutContent} message={message?.success?.updatedLayoutContent} />
          ) : ''
        }
        <Layout>
          <Typography variant="h2" sx={theme.typography.pageTitle}>{t('inputCode.pageTitle')}</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Card sx={theme.card}>
              <CardHeader 
                sx={theme.card.header}
                title={
                  <Typography 
                    variant="h3" 
                    sx={theme.typography.contentTitle}
                  >
                  {t('inputCode.tableTitle')}
                  </Typography>
                }
              />
  
              <CardContent sx={{ padding: '0px', marginTop: '13px' }}>
                <TableCop
                  columns={columns}
                  rows={tableRows}
                  pageSize={5}  
                  rowsPerPageOptions={[5]}
                  processRowUpdate={processRowUpdate}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </CardContent>
            </Card>
          </Box>
        </Layout>
      </>
    )
  }
  
    
export default InputCode;