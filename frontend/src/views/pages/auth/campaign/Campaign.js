import React from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// SLICE
import { index, updateVisibility, destroy, reset } from "../../../../features/campaign/CampaignSlice";

// MUI
import { Button, Box, Card, CardHeader, Typography, CardContent, Backdrop, CircularProgress } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

// ROUTER
import { Link, useNavigate } from "react-router-dom";

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

// LANG
import { t } from '../../../../common/SwitchLang';

const Campaign = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { campaigns, isLoading, isSuccess, isStored, isUpdated, isDestroy, isError, message } = useSelector((state) => state.campaign)
    const [tableRows, setTableRows] = React.useState([])

    // fetch the campaigns
    React.useEffect(()=> {
        dispatch(index())
    }, [navigate, isDestroy])

    // set the table data
    React.useEffect(() => {

        
        if(campaigns) {
            setTableRows(campaigns.map((campaign) => {
                const row = { 
                    id: campaign.id, 
                    campaignName: campaign.campaignName, 
                    createTimestamp: moment(campaign.createTimestamp).format('DD/MM/YYYY'), 
                    collectionType: campaign.collectionType?.type, 
                    account: campaign.account ? campaign.account : '-', 
                    hashtag: campaign.hashtag ? campaign.hashtag : '-', 
                    linkType: campaign.linkType?.type, 
                    visibility: !campaign.visibility
                }
        
                return row
            }))
        }

    }, [campaigns])

    // reset the messages
    React.useEffect(() => {
        
        if(isDestroy) {
            setCampaignIdDelete('')
            handleClickCloseDialog()
        }

        const timerAll = setTimeout(() => {
            dispatch(reset())
        }, 1000);

        return () => clearTimeout(timerAll)


    }, [isStored, isUpdated, isError, isDestroy])

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
        dispatch(updateVisibility(campaignData))

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
            dispatch(destroy(campaignIdDelete))
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
            { field: 'campaignName', headerName: t('campaign.tableName'), flex: 1, minWidth: 100, renderCell: (params) => <Typography variant="subtitle" sx={{ fontFamily: '"GothamBold", sans-serif', fontWeight: 'bold' }}>{params.row.campaignName}</Typography> },
            { field: 'createTimestamp', headerName: t('campaign.tableCreated'),flex: 1, minWidth: 100 },
            { field: 'collectionType', headerName: t('campaign.tableCollectionType'),flex: 1, minWidth: 150 },
            { field: 'account', headerName: t('campaign.tableAccount'),flex: 1, minWidth: 100 },
            { field: 'hashtag', headerName: t('campaign.tableTags'),flex: 1, minWidth: 70 },
            { field: 'linkType', headerName: t('campaign.tableLinkType'),flex: 1, minWidth: 100 },
            { field: 'visibility', type: 'boolean', headerName: t('campaign.tablePublicPrivate'), minWidth: 150, renderCell: (params) => <SwitchCop onChange={handleChangeVisibility} checked={params.row.visibility} value={params.row.id} />},
            { field: 'actions', type: 'actions', width: 50, getActions: (params) => [ 
                <GridActionsCellItem label={t('table.edit')} showInMenu onClick={toggleAdmin(params.id, 'edit')} sx={{ fontFamily: '"GothamMedium", sans-serif', fontSize: '10px' }} />,
                <GridActionsCellItem label={t('table.delete')} showInMenu onClick={toggleAdmin(params.id, 'delete')} sx={{ fontFamily: '"GothamMedium", sans-serif', fontSize: '10px' }} />,
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

            isUpdated ? (
                <AlertCop severity="success" open={isUpdated} message={t('message.campaignUpdate'+message?.success?.updatedVisibility)} />
            ) : ''
        }
        {

            isStored ? (
                <AlertCop severity="success" open={isStored} message={t('message.campaignStored')} />
            ) : ''
        },
        {

            isDestroy ? (
                <AlertCop severity="success" open={isDestroy} message={t('message.campaignDestroy')} />
            ) : ''
        }
      <Layout>
        <Typography variant="h2" sx={theme.typography.pageTitle}>{t('campaign.pageTitle')}</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Card sx={theme.card}>

                <CardHeader 
                    sx={theme.card.header}
                    title={
                        <Typography 
                            variant="h3" 
                            sx={theme.typography.contentTitle}
                        >
                        {t('campaign.tableTitle')}
                        </Typography>
                    }
                    action={ 
                        <Link to='/campaign/create'>
                            <Button 
                                variant="outlined"
                                sx={theme.button.contentHeader}
                            >
                            {t('campaign.btnNewCampaign')}
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
            loading={isLoading}
            success={isDestroy}
            handleClose={handleClickCloseDialog} 
            handleClickDelete={handleClickDelete}
        />
      </Layout>
    </>
    )
}

  
export default Campaign;