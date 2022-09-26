import React from "react";

// MUI
import { Button, Box, Card, CardHeader, Typography, CardContent, Divider, Grid, Container, Stack, Backdrop, CircularProgress, Snackbar, Alert, Slide, RadioGroup, FormHelperText } from "@mui/material";

// ROUTER
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// HELPER
import Validation from '../../../../../common/FormValidation';

// THEME
import {theme} from "../../../../layout/Theme";
import Layout from '../../../../layout/auth/Layout';


// COMPONENTS
import CheckBoxGroupCop from "../../../../components/form/checkBoxGroup/CheckBoxGroupCop";
import InputCop from "../../../../components/form/InputCop";
import SelectCop from "../../../../components/form/SelectCop";

const NewCampaign = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { campaigns } = useSelector((state) => state.campaign)
    const { campaigns } = ''

    // const { tiktokOfCampaign, isCreated, isError, isLoading, message } = useSelector((state) => state.linkSetting)
    const { tiktokOfCampaign, isCreated, isError, isLoading, message } = ''

    const [campaignSelect, setCampaignSelect] = React.useState('')
    const [tiktokSelect, setTiktokSelect] = React.useState('')
    const [tiktoksOfCampaign, setTiktoksOfCampaign] = React.useState([])
    const [formData, setFormData] = React.useState({
        campaignId: '',
        tiktokId: '',
        hashtag: '',
        imageUrl: '',
        title: '',
        pageUrl: ''
    })
    const { campaignId, tiktokId, hashtag, imageUrl, title, pageUrl } = formData
    const [dataValidation, setDataValidation] = React.useState({
        isErrorCampaignId: false,
        isErrorTikTokId: false,
    })
    const { isErrorCampaignId, isErrorTikTokId } = dataValidation
    const [errorMessage, setErrorMessage] = React.useState({
        messageCampaignId: '',
        messageTikTokId: '',
    })
    const { messageCampaignId, messageTikTokId } = errorMessage
    

    // change collectionType to menu items
    const campaignMenuItems = []
    // if(campaigns.length > 0) {
    //     const unUsedCt = campaigns.map((cp) => {
    //         campaignMenuItems.push({ name: cp.campaignName, value: cp.id })
    //     })
    // }

    // fetch the campaigns


    const handleChangeCampaign = (event) => {
        setCampaignSelect(event.target.value)
        // dispatch(getTiktoksOfCampaign(event.target.value))
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const handleChangeTikTok = (event) => {
        setTiktokSelect(event.target.value)
        event.target.classList.add('selected')
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const handleFormDataChange = (event) => {

        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))

        // re-validation
        if(event.target.name === 'campaignId') {
            const cN = Validation.required(event.target.value) || Validation.reset;
            validateByEach('isErrorCampaignId', 'messageCampaignId', cN)
        }

        if(event.target.name === 'tiktokId') {
            const acc = Validation.required(event.target.value) || Validation.reset;
            validateByEach('isErrorTiktokId', 'messageTiktokId', acc)
        }

    }

    const handleClickNewLinkSetting = (event) => {
        handleFormSubmit(event)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        
        const validationRes = validateForm(campaignId, tiktokId, hashtag, imageUrl, title, pageUrl)
        if(validationRes) {
            // store the linkSetting
            // dispatch(store(formData))
        }
    }

    function resetForm() {
        setFormData({
            campaignId: '',
            tiktokId: '',
            hashtag: '',
            imageUrl: '',
            title: '',
            pageUrl: ''
        })
    }

    function validateByEach(validationKey, errorKey, value) {
        setDataValidation((prevState) => ({
          ...prevState,
          [validationKey]: value.error,
        }))
        setErrorMessage((prevState) => ({
          ...prevState,
          [errorKey]: value.error === true ? value.message:'',
        }))
    }

    function validateForm(campaignId, tiktokId) {

        const cIdError = Validation.required(campaignId) || Validation.reset;
        const tIdError = Validation.required(tiktokId) || Validation.reset;

        setDataValidation({
            isErrorCampaignId: cIdError.error,
            isErrorTikTokId: tIdError.error,
        })
    
        setErrorMessage({
            messageCampaignId: cIdError.error === true ? cIdError.message:'',
            messageTikTokId: tIdError.error === true ? tIdError.message:'',
        })
    
        return !cIdError.error && !tIdError.error
    
    }

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

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

            isCreated ? (
                <div>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={1000} TransitionComponent={TransitionUp} open>
                        <Alert severity="success" sx={{ width: '100%', minWidth: '200px'}} elevation={6} variant="filled" >{message?.success?.stored}</Alert>
                    </Snackbar>
                </div>
            ) : ''
        }
        {

            isError ? (
                <div>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={1000} TransitionComponent={TransitionUp} open>
                        <Alert severity="error" sx={{ width: '100%', minWidth: '200px'}} elevation={6} variant="filled" >{message?.error?.required || message?.error?.camapignExists || message?.error?.invalid }</Alert>
                    </Snackbar>
                </div>
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
                        New Link Setting
                        </Typography>
                    }
                    action={ 
                        <Button 
                                onClick={handleClickNewLinkSetting}
                                variant="outlined"
                                sx={theme.button.contentHeader}
                            >
                            Create
                        </Button>
                    }
                />
                <Divider />
                <CardContent sx={{ padding: '0px', marginTop: '13px' }}>
                    <Container sx={{ padding: '20px 35px 0px' }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <form onSubmit={handleFormSubmit}>
                                    <Stack spacing={3}>
                                        <SelectCop name="campaignId" error={isErrorCampaignId} helperText={messageCampaignId} placeholder="Campaign" data={{ change: handleChangeCampaign, value: campaignSelect }} menuitems={campaignMenuItems} required="true" />
                                        <RadioGroup>
                                            <Grid container spacing={2}  sx={ !isErrorCampaignId && isErrorTikTokId ? { paddingRight: '10px', paddingBottom: '10px',border: '1px solid #d32f2f', borderRadius: '5px' } : {}}>
                                                {
                                                    tiktoksOfCampaign.map((tiktok) => {
                                                        return (
                                                            <CheckBoxGroupCop name="tiktokId" error={isErrorTikTokId} helperText={messageTikTokId} key={tiktok.id} value={tiktok.id} url={tiktok.videoUrl} onChange={handleChangeTikTok} />
                                                        )
                                                    })
                                                }
                                            </Grid>
                                            {
                                                !isErrorCampaignId && isErrorTikTokId ? (
                                                    <FormHelperText sx={{ color: '#d32f2f' }}>{messageTikTokId}</FormHelperText>
                                                ) : ''
                                            }
                                        </RadioGroup>
                                        <InputCop name="hashtag" value={hashtag} onChange={handleFormDataChange} placeholder="Hashtag" required="required" />
                                        <InputCop name="imageUrl" value={imageUrl} onChange={handleFormDataChange} placeholder="Image URL" required="required" />
                                        <InputCop name="title" value={title} onChange={handleFormDataChange} placeholder="Title" required="required" />
                                        <InputCop name="pageUrl" value={pageUrl} onChange={handleFormDataChange} placeholder="PageURL" required="required" />
                                    </Stack>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </CardContent>
            </Card>
        </Box>
      </Layout>
    </>
    )
}

  
export default NewCampaign;