import React from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// MUI
import { Button, Box, Card, CardHeader, Typography, CardContent, Backdrop, CircularProgress } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

// ROUTER
import { Link } from "react-router-dom";

// MOMENT JS
import moment from 'moment';

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/auth/Layout';

// COMPONENT
import TableCop from "../../../components/table/TableCop";
import SwitchCop from "../../../components/table/SwitchCop";
import DialogDeleteCop from "../../../components/DialogDeleteCop";
import AlertCop from "../../../components/AlertCop";

const Campaign = (props) => {

    const dispatch = useDispatch()

    // const { campaigns, isLoading, message, isUpdatedVisibility, isDeletedCampaign, isDeleteCampaingLoading } = useSelector((state) => state.campaign)
    const { campaigns, isLoading, message, isUpdatedVisibility, isDeletedCampaign, isDeleteCampaingLoading } = ''
    const [tableRows, setTableRows] = React.useState([])

    // fetch the campaigns

    // set the table data

    // handle change the public and private
    const handleChangeVisibility = React.useCallback((event) => {

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
        const campaignData = {
            id: event.target.value,
            data: {
                visibility: event.target.checked
            }
        }
        // dispatch(updateVisibility(campaignData))

    }, [dispatch])

    // CALLBACK MENU - edit/delete

    // OPEN DIALOG
    const [campaignIdDelete, setCampaignIdDelete] = React.useState('')
    const [openDialoag, setOpenDialoag] = React.useState(false);
    const handleClickOpenDialog = (id) => {
        setOpenDialoag(true);
    };

    const handleClickCloseDialog = React.useCallback(() => {
        setOpenDialoag(false);
    }, [setOpenDialoag]);

    const handleClickDelete = () => {
        if(campaignIdDelete !== '') {
            // dispatch(destroy(campaignIdDelete))
        }
    }

    const toggleAdmin = React.useCallback(
        (id, action) => () => {
            if(action === 'delete') { 
                handleClickOpenDialog(id)
                setCampaignIdDelete(id)
            }else if(action === 'edit') {
                // navigate to edit page
            }
        },
        [],
    );

    // TABLE HEADER
    const columns = React.useMemo(
        () => [
            {field: 'id'},
            { field: 'campaignName', headerName: 'Campaign Name', flex: 1, minWidth: 100, renderCell: (params) => <Typography variant="subtitle" sx={{ fontFamily: '"GothamBold", sans-serif', fontWeight: 'bold' }}>{params.row.campaignName}</Typography> },
            { field: 'createTimestamp', headerName: 'Created',flex: 1, minWidth: 100 },
            { field: 'collectionType', headerName: 'Collection Type',flex: 1, minWidth: 150 },
            { field: 'account', headerName: 'Account',flex: 1, minWidth: 100 },
            { field: 'hashtag', headerName: 'Tags',flex: 1, minWidth: 70 },
            { field: 'linkType', headerName: 'Link Type',flex: 1, minWidth: 100 },
            { field: 'visibility', type: 'boolean', headerName: 'Public Private', minWidth: 150, renderCell: (params) => <SwitchCop onChange={handleChangeVisibility} checked={params.row.visibility} value={params.row.id} />},
            { field: 'actions', type: 'actions', width: 50, getActions: (params) => [ 
                <GridActionsCellItem label="Edit" showInMenu onClick={toggleAdmin(params.id, 'edit')} sx={{ fontFamily: '"GothamMedium", sans-serif', fontSize: '10px' }} />,
                <GridActionsCellItem label="Delete" showInMenu onClick={toggleAdmin(params.id, 'delete')} sx={{ fontFamily: '"GothamMedium", sans-serif', fontSize: '10px' }} />,
            ] },
    
        ],
        [toggleAdmin, handleChangeVisibility]
    )


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

            isDeletedCampaign ? (
                <AlertCop severity="success" open={isDeletedCampaign} message={message?.success?.deleted} />
            ) : ''
        }
      <Layout>
        <Typography variant="h2" sx={theme.typography.pageTitle}>{props.title}</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Card sx={theme.card}>

                <CardHeader 
                    sx={theme.card.header}
                    title={
                        <Typography 
                            variant="h3" 
                            sx={theme.typography.contentTitle}
                        >
                        Campaing List
                        </Typography>
                    }
                    action={ 
                        <Link to='/campaign/create'>
                            <Button 
                                variant="outlined"
                                sx={theme.button.contentHeader}
                            >
                            New Campaign
                            </Button>
                        </Link>
                    }
                />

                <CardContent sx={{ padding: '0px', marginTop: '13px' }}>
                    <TableCop 
                        rows={tableRows} 
                        columns={columns} 
                        pageSize={5}  
                        rowsPerPageOptions={[5]}
                    />
                </CardContent>

            </Card>
        </Box>
        <DialogDeleteCop
            open={openDialoag} 
            loading={isDeleteCampaingLoading}
            success={isDeletedCampaign}
            handleClose={handleClickCloseDialog} 
            handleClickDelete={handleClickDelete}
        />
      </Layout>
    </>
    )
}

  
export default Campaign;