import React from "react";

// MUI
import { Button, Box, Card, CardHeader, Typography, CardContent, Divider, Grid, Container, Stack, Backdrop, CircularProgress } from "@mui/material";

// ROUTER
import { useNavigate, Link, useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// SLICE
import { collectionTypeIndex } from '../../../../../features/collectionType/collectionTypeSlice';
import { linkTypeIndex } from '../../../../../features/linkType/linkTypeSlice';
import { edit, update, reset } from "../../../../../features/campaign/CampaignSlice";

// HELPER
import Validation from '../../../../../common/FormValidation';

// THEME
import Layout from "../../../../layout/auth/Layout";
import { theme } from "../../../../layout/Theme";

// COMPONENTS
import InputCop from "../../../../components/form/InputCop";
import SelectCop from "../../../../components/form/SelectCop";
import AlertCop from "../../../../components/AlertCop";

// LANG
import { t } from "../../../../../common/SwitchLang";


const EditCampaign = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const { collectionTypes } = useSelector((state) => state.collectionType)
    const { linkTypes } = useSelector((state) => state.linkType)
    const { campaign, isEdited, isError, isLoading, message } = useSelector((state) => state.campaign)

    React.useEffect(() => {

        // fectch the collection types
        dispatch(collectionTypeIndex())

        // fetch the link types
        dispatch(linkTypeIndex())

        // fetch the campaign
        dispatch(edit(id))

        if(campaign) {

            // changeCollectionType( 'collectionType', campaign.collectionType.id)
            // setLinkTypeSel('')

            setFormData((prevState) => ({
                ...prevState,
                campaignName: campaign.campaignName,
                account: campaign.account,
                hashtag: campaign.hashtag,
                linkType: campaign.linkType.id
            }))
        }

    }, [])

    React.useEffect(() => {

        if(isEdited) {
            resetForm()
            navigate('/campaign')
        }

        if(isError) {
            if(message?.error?.camapignExists) {
                const value = {
                    error: true,
                    message: message?.error?.camapignExists
                }
                validateByEach('isErrorCampaignName', 'messageCampaignName', value)
            }
        }

        const timerAll = setTimeout(() => {
            dispatch(reset())
        }, 1000);


        return () => clearTimeout(timerAll);


    }, [isEdited, isError])

    // change collectionType to menu items
    const collectionTypeMenuItems = []
    if(collectionTypes && collectionTypes.length > 0) {
        const unUsedCt = collectionTypes.map((ctype) => {
            collectionTypeMenuItems.push({ name: ctype.type, value: ctype.id })
        })
    }

    // change linkType to menu items
    const linkTypeMenuItems = []
    if(linkTypes && linkTypes.length > 0) {
        const unUsedLt = linkTypes.map((ltype) => {
            linkTypeMenuItems.push({ name: ltype.type, value: ltype.id })
        })
    }

    const [formData, setFormData] = React.useState({
        campaignName: '',
        collectionType: '',
        account: '',
        hashtag: '',
        linkType: ''
    })
    const { campaignName, collectionType, account, hashtag, linkType } = formData

    const [dataValidation, setDataValidation] = React.useState({
        isErrorCampaignName: false,
        isErrorCollectionType: false,
        isErrorAccount: false,
        isErrorHashtag: false,
        isErrorLinkType: false,
    })
    const { isErrorCampaignName, isErrorCollectionType, isErrorAccount, isErrorHashtag, isErrorLinkType } = dataValidation

    const [errorMessage, setErrorMessage] = React.useState({
        messageCampaignName: '',
        messageCollectionType: '',
        messageAccount: '',
        messageHashtag: '',
        messageLinkType: '',
    })
    const { messageCampaignName, messageCollectionType, messageAccount, messageHashtag, messageLinkType } = errorMessage

    const [inputAccountDisabled, setInputAccountDisabled] = React.useState(true);
    const [inputHashtagDisabled, setInputHashtagDisabled] = React.useState(true);
    const [collectionTypeSel, setCollectionTypeSel] = React.useState('');
    // const [linkTypeSel, setLinkTypeSel] = React.useState('');

    const handleFormDataChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))

        // re-validation
        if(e.target.name === 'campaignName') {
            const cN = Validation.required(e.target.value) || Validation.reset;
            validateByEach('isErrorCampaignName', 'messageCampaignName', cN)
        }

        if(e.target.name === 'account') {
            if(collectionType === 1) {
                const acc = Validation.required(e.target.value) || Validation.reset;
                validateByEach('isErrorAccount', 'messageAccount', acc)
            }
        }

        if(e.target.name === 'hashtag') {
            if(collectionType === 2) {
                const ht = Validation.required(e.target.value) || Validation.reset;
                validateByEach('isErrorHashtag', 'messageHashTag', ht)
            }
        }

    }

    const handleChangeCollectionType = (event) => {
        changeCollectionType(event.target.name, event.target.value);
    };

    const handleChangeLinkType = (event) => {
        // setLinkTypeSel(event.target.value);
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))

        const lT = Validation.required(event.target.value) || Validation.reset;
        validateByEach('isErrorLinkType', 'messageLinkType', lT)
    };

    const handleClickNewCampaign = (event) => {
        handleFormSubmit(event);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        let validationRes = false

        if(formData.hashtag !== '') {
            validationRes = validateForm(campaignName, hashtag, linkType)
        } else if(formData.account !== '') {
            validationRes = validateForm(campaignName, account, linkType)
        }

        if(validationRes) {
            // store the campaign
            // dispatch(update(formData))
        }


    }

    function changeCollectionType(name, value) {

        setCollectionTypeSel(value);
        if(value === 1) {
            setInputAccountDisabled(!inputAccountDisabled)
            setInputHashtagDisabled(true)
            setFormData((prevState) => ({
                ...prevState,
                hashtag: ''
            }))
            setDataValidation((prevState) => ({
                ...prevState,
                isErrorHashtag: false,
            }))
            setErrorMessage((prevState) => ({
                ...prevState,
                messageHashtag: ''
            }))
        }else if(value === 2) {
            setInputHashtagDisabled(!inputHashtagDisabled)
            setInputAccountDisabled(true)
            setFormData((prevState) => ({
                ...prevState,
                account: ''
            }))
            setDataValidation((prevState) => ({
                ...prevState,
                isErrorAccount: false,
            }))
            setErrorMessage((prevState) => ({
                ...prevState,
                messageAccount: ''
            }))
            
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        const cT = Validation.required(value) || Validation.reset;
        validateByEach('isErrorCollectionType', 'messageCollectionType', cT)
    }

    function resetForm() {
        setFormData({
            campaignName: '',
            collectionType: '',
            account: '',
            hashtag: '',
            linkType: ''
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

    function validateForm(campaignName, collectionType, account, hashtag, linkType) {

        const cnError = Validation.required(campaignName) || Validation.reset;
        const ctError = Validation.required(collectionType) || Validation.reset;
        const ltError = Validation.required(linkType) || Validation.reset;
        let accError = { error: false, message: '' }
        let htError = { error: false, message: '' }

        if(collectionType === '') {

        } else if(collectionType === 1) {
            accError = Validation.required(account) || Validation.reset;
        }else {
            htError = Validation.required(hashtag) || Validation.reset;
        }

        setDataValidation({
            isErrorCampaignName: cnError.error,
            isErrorCollectionType: ctError.error,
            isErrorAccount: accError.error,
            isErrorHashtag: htError.error,
            isErrorLinkType: ltError.error,
        })
    
        setErrorMessage({
            messageCampaignName: cnError.error === true ? cnError.message:'',
            messageCollectionType: ctError.error === true ? ctError.message:'',
            messageAccount: accError.error === true ? accError.message:'',
            messageHashtag: htError.error === true ? htError.message:'',
            messageLinkType: ltError.error === true ? ltError.message:'',
        })
    
        if(collectionType === 1) {
            return !cnError.error && !ctError.error && !accError.error && !ltError.error
        }else {
            return !cnError.error && !ctError.error && !htError.error && !ltError.error
        }
    
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

            isError ? (
                <AlertCop severity="error" open={isError} message={message?.error?.required || message?.error?.camapignExists || message?.error?.invalid || message?.error?.functionNotExists } />
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
                        {t('campaign.pageTitleEdit')}
                        </Typography>
                    }
                    action={ 
                        <Link to='/campaign/create'>
                            <Button 
                                onClick={handleClickNewCampaign}
                                variant="outlined"
                                sx={theme.button.contentHeader}
                            >
                            {t('campaign.btnUpdateCampaign')}
                            </Button>
                        </Link>
                    }
                />
                <Divider />
                <CardContent sx={{ padding: '0px', marginTop: '13px' }}>
                    <Container sx={{ padding: '20px 35px 0px' }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4}>
                                <form onSubmit={handleFormSubmit}>
                                    <Stack spacing={3}>
                                        <InputCop name="campaignName" value={campaignName} error={isErrorCampaignName} helperText={messageCampaignName} onChange={handleFormDataChange} placeholder={t('campaign.newCampaignName')} required="required" />
                                        {/* <SelectCop name="collectionType" error={isErrorCollectionType} helperText={messageCollectionType} placeholder={t('campaign.newCollectionType')} data={{ change: handleChangeCollectionType, value: collectionTypeSel }} menuitems={collectionTypeMenuItems} required="true" /> */}
                                        {
                                            campaign.collectionTypeId === 1 ? (
                                                <InputCop name="account" value={account} placeholder={t('campaign.newAccount')} error={isErrorAccount} helperText={messageAccount} onChange={handleFormDataChange} />
                                            ) : (
                                                <InputCop name="hashtag" value={hashtag} placeholder={t('campaign.newHashtag')} error={isErrorHashtag} helperText={messageHashtag} onChange={handleFormDataChange}  />
                                            )
                                        }
                                        <SelectCop defaultValue={campaign.linkTypeId} name="linkType" placeholder={t('campaign.newLinkType')} error={isErrorLinkType} helperText={messageLinkType}  data={{ change: handleChangeLinkType, value: campaign.linkTypeId }} menuitems={linkTypeMenuItems} required="true" />
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

  
export default EditCampaign;