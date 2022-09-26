import React from "react";

// MUI
import { Box, Card, CardHeader, Typography, CardContent, Button, Grid } from "@mui/material";

// ROUTER
import { Link } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/auth/Layout';

// COMPONENTS
import TableCop from "../../../components/table/TableCop";
import ImageWithTextCop from "../../../components/table/ImageWithText";
import DialogCop from "../../../components/DialogCop";

// SCSS
import './LinkSetting.scss';

// LANG
import { t } from '../../../../common/SwitchLang';

const LinkSetting = () => {

    const dispatch = useDispatch()
  
    // const { linkSettings } = useSelector((state) => state.linkSetting)
    const { linkSettings } = ''
    const [tableRows, setTableRows] = React.useState([])
  
    // CSV IMPORT
    const [open, setOpen] = React.useState(false);
    const fileInputRef = React.useRef(null);
    const [fileName, setFileName] = React.useState("");
    const [fileObj, setFileObj] = React.useState(null);
  
    const [csvArray, setCsvArray] = React.useState([]);
  
    // OPEN DIALOG
    const handleClickOpenDialog = () => {
      setOpen(true);
    };
  
    const handleClickCloseDialog = () => {
        setOpen(false);
        // RESET FILE INPUT
        setFileName('');
        setCsvArray([]);
        fileInputRef.current.value = null;
    };
  
    // OPEN FILE UPLOAD
    const handleImportClick = (event) => {
      fileInputRef.current.click();
    }
  
    // HANDLE SET FILE NAME
    const handleSetFileName = (event) => {
      const file = fileInputRef.current.files && fileInputRef.current.files[0];
  
      if(!file) {
        return;
      }
      
      // set the global file object
      setFileObj(file);
      setFileName(file.name);
    }
  
    // CSV TO ARRAY & SET THE CSVARRAY
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
  
      const csvArray = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
  
      setCsvArray(csvArray);
    };
  
    // HANDLE FILE UPLOAD
    const handleFileUpload = (event) => {
  
      event.preventDefault();
  
      if(fileObj == null) {
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (evt) => {
        if(!evt.target.result) {
          return
        }
  
        const text = evt.target.result;
        csvFileToArray(text);
      }
  
      reader.readAsText(fileObj);
    
    } 
  
    // FETCH LINKSETTINGS
  
    // SET THE LINKSETTING TABLE ROWS
  
    // TABLE HEADER
    const columns = [
      { field: 'id'},
      { field: 'campaignName', headerName: t('linkSetting.tableCampaign'), flex: 1, minWidth: 150, renderCell: (params) => <Typography variant="subtitle" sx={{ fontFamily: '"GothamBold", sans-serif', fontWeight: 'bold' }}>{params.row.campaignName}</Typography> },
      { field: 'hashtag', headerName: t('linkSetting.tableHashtag'), flex: 1, minWidth: 100 }, 
      { field: 'img', headerName: t('linkSetting.tableImage'),flex: 1, minWidth: 250, renderCell: (params) => <ImageWithTextCop src={params.row.img} /> },
      { field: 'title', headerName: t('linkSetting.tableTitleCol'),flex: 1, minWidth: 100, renderCell: (params) => <Typography className="ellipsis-text tb-txt">{params.row.title}</Typography> },
      { field: 'pageUrl', headerName: t('linkSetting.tablePageURL'), minWidth: 200, renderCell: (params) => <Typography className="ellipsis-text tb-txt"><a href={params.row.pageUrl} className="underlineAnchor" rel="noreferrer" target="_blank" >{params.row.pageUrl}</a></Typography> },
    ];
  
    return (
      <>
        <Layout>
          <Typography variant="h2" sx={theme.typography.pageTitle}>{t('linkSetting.pageTitle')}</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Card sx={theme.card}>
  
              <CardHeader 
                sx={theme.card.header}
                title={
                  <Typography 
                    variant="h3" 
                    sx={theme.typography.contentTitle}
                  >
                  {t('linkSetting.pageTitle')}
                  </Typography>
                }
                action={ 
                  <Grid container spacing={2}>
                    <Grid item>
                      <Link to="/link-setting/create">
                        <Button variant="outlined" sx={theme.button.contentHeader} >
                        {t('linkSetting.linkNewLinkSetting')}
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" sx={theme.button.contentHeader} onClick={handleClickOpenDialog} >
                      {t('linkSetting.btnCSVImport')}
                      </Button>
                    </Grid>
                  </Grid>
                }
              />
  
              <CardContent sx={{ padding: '0px', marginTop: '13px'  }}>
                <TableCop
                  rows={tableRows} 
                  columns={columns} 
                  pageSize={5}  
                  rowsPerPageOptions={[5]}
                />
              </CardContent>
              </Card>
          </Box>
          <DialogCop 
            open={open} 
            fileName={fileName}
            fileInputRef={fileInputRef}
            handleSetFileName={handleSetFileName}
            handleFileUpload={handleFileUpload}
            handleClose={handleClickCloseDialog} 
            handleDialogClickImport={handleImportClick}   
          />
        </Layout>
      </>
    )
  }
  
    
export default LinkSetting;