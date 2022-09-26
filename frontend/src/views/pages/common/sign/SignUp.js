import React from "react";

// MUI
import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography, FormHelperText, Tooltip, Backdrop, CircularProgress } from "@mui/material";

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// ROUTER
import { useNavigate, useLocation, Link } from "react-router-dom";

// SLICE
import { signup, reset } from '../../../../features/auth/authSlice';

// FORM VALIDATION
import Validation from '../../../../common/FormValidation';

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/common/Layout';

// SCSS
import '../common.scss';

// LANG
import { t } from '../../../../common/SwitchLang';

const SignUp = () => {

    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      tel: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    })
  
    const { firstName, lastName, tel, email, userName, password, confirmPassword } = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    React.useEffect(() => {
    
      if(isError) {
        if(message?.error?.emailExists) {
          serverSideValidationError('isErrorEmail', 'messageEmail', t('error.emailExists'))
        }
  
        if(message?.error?.userNameExists) {
          serverSideValidationError('isErrorUserName', 'messageUserName', t('error.userExists'))
        }
  
      }

      if(isSuccess) {
        navigate('/sign-in')
      }
  
      dispatch(reset())
  
    }, [isError, isSuccess])
  
    const [dataValidation, setDataValidation] = React.useState({
      isErrorFirstName: false,
      isErrorLastName: false,
      isErrorEmail: false,
      isErrorUserName: false,
      isErrorPassword: false,
      isErrorConfirmPassword: false,
      isErrorAgree: false
    })
    const { isErrorFirstName, isErrorLastName, isErrorEmail, isErrorUserName, isErrorPassword, isErrorConfirmPassword } = dataValidation
  
    const [errorMessage, setErrorMessage] = React.useState({
      messageFirstNmae: '',
      messageLastName: '',
      messageEmail: '',
      messageUserName: '',
      messagePassword: '',
      messageConfirmPassword: '',
      messageAgree: ''
    })
    const { messageFirstNmae, messageLastName, messageEmail, messageUserName, messagePassword, messageConfirmPassword, messageAgree } = errorMessage
  
    // Onchange agree switch
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    } 
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
  
      let fn = firstName;
      let ln = lastName;
      let em = email;
      let un = userName;
      let ps = password;
      let cnPs = confirmPassword;
  
      if(e.target.name === 'firstName') {
        fn = Validation.required(e.target.value) || Validation.reset;
        validateByEach('isErrorFirstName', 'messageFirstNmae', fn)
      }
  
      if(e.target.name === 'lastName') {
        ln = Validation.required(e.target.value) || Validation.reset;
        validateByEach('isErrorLastName', 'messageLastName', ln)
      }
  
      if(e.target.name === 'email') {
        em = Validation.required(e.target.value) || Validation.isEmail(e.target.value) || Validation.reset;
        validateByEach('isErrorEmail', 'messageEmail', em)
      }
  
      if(e.target.name === 'userName') {
        un = Validation.required(e.target.value)  || Validation.username(e.target.value)|| Validation.reset;
        validateByEach('isErrorUserName', 'messageUserName', un)
      }
  
      if(e.target.name === 'password') {
        ps = Validation.required(e.target.value) || Validation.min(e.target.value, 8) || Validation.reset;
        validateByEach('isErrorPassword', 'messagePassword', ps)
      }
  
      if(e.target.name === 'confirmPassword') {
        cnPs = Validation.required(e.target.value) || Validation.min(e.target.value, 8) || Validation.reset;
        validateByEach('isErrorConfirmPassword', 'messageConfirmPassword', cnPs)
      }
      
    }
  
    // submit the form
    const onSubmit = (e) => {
      e.preventDefault()
  
      const validationRes = validateForm(firstName, lastName, email, userName, password, confirmPassword, checked)
  
      // no validation errors submit the form
      if(validationRes === true) {
        const userData = {
          firstName,
          lastName,
          tel,
          email,
          userName,
          password,
          confirmPassword
        }
    
        dispatch(signup(userData))
      }
    }
  
    function serverSideValidationError(validationKey, errorKey, message) {
      setDataValidation((prevState) => ({
        ...prevState,
        [validationKey]: true,
      }))
      setErrorMessage((prevState) => ({
        ...prevState,
        [errorKey]: message,
      }))
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
  
    function validateForm(firstName, lastName, email, userName, password, confirmPassword, checked) {
  
      const fnError = Validation.required(firstName) || Validation.reset;
      const lnError = Validation.required(lastName) || Validation.reset;
      const emailError = Validation.required(email) || Validation.isEmail(email) || Validation.reset;
      const unError = Validation.required(userName) || Validation.username(userName) || Validation.reset;
      const psError = Validation.required(password) || Validation.min(password, 8) || Validation.isConfirmed(password, confirmPassword) || Validation.reset;
      const cnPsError = Validation.required(confirmPassword) || Validation.min(confirmPassword, 8) || Validation.isConfirmed(password, confirmPassword) || Validation.reset;
      const agError = Validation.requiredWithTag(checked, 'checkbox') || Validation.reset;
  
      setDataValidation({
        isErrorFirstName: fnError.error,
        isErrorLastName: lnError.error,
        isErrorEmail: emailError.error,
        isErrorUserName: unError.error,
        isErrorPassword: psError.error,
        isErrorConfirmPassword: cnPsError.error,
        isErrorAgree: agError.error
      })
  
      setErrorMessage({
        messageFirstNmae: fnError.error === true ? fnError.message:'',
        messageLastName: lnError.error === true ? lnError.message:'',
        messageEmail: emailError.error === true ? emailError.message:'',
        messageUserName: unError.error === true ? unError.message:'',
        messagePassword: psError.error === true ? psError.message:'',
        messageConfirmPassword: cnPsError.error === true ? cnPsError.message:'',
        messageAgree: agError.error === true ? agError.message:'',
      })
  
      return !fnError.error && !lnError.error && !emailError.error && !unError.error && !psError.error && !cnPsError.error && !agError.error
  
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
        <Layout>
          <Grid container justifyContent='center'>
            <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
              <Card sx={{ background: '#F7FAFC', borderRadius: '10px' }}>
                <CardContent sx={{ padding: '20px 40px' }}>
                  <Stack spacing={5}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h1" sx={theme.typography.logo}>{process.env.REACT_APP_NAME}</Typography>
                      <Typography variant="subtitle" sx={{ fontFamily: '"GothamBook", sans-serif', fontWeight: '350', fontSize: '15px', color: '#172B4D', marginTop: '15px' }}>Welcome! Thank you for joining us.</Typography>
                    </Box>
                    <Box>
                      <form onSubmit={onSubmit}>
                        <Stack spacing={3}>
                          <FormGroup >
                            <FormControl className="register-input">
                              <TextField type="text" placeholder={t('signUp.inputFirstNamePlaceholder')} name="firstName" error={isErrorFirstName} helperText={messageFirstNmae} value={firstName} onChange={onChange} variant="outlined" size="small" />
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl className="register-input">
                              <TextField type="text" placeholder={t('signUp.inputLastNamePlaceholder')} name="lastName" error={isErrorLastName} helperText={messageLastName} value={lastName} onChange={onChange} variant="outlined" size="small" />
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl required className="register-input">
                              <TextField type="tel" placeholder={t('signUp.inputTelPlaceholder')} name="tel"  value={tel} onChange={onChange} variant="outlined" size="small" />
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl className="register-input">
                              <TextField type="email" placeholder={t('signUp.inputEmailPlaceholder')} name="email" error={isErrorEmail} helperText={messageEmail} value={email} onChange={onChange} variant="outlined" size="small" />
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl className="register-input">
                              <Tooltip title="Username can only include letters, numbers, underscores and periods." placement="top" arrow>
                                <TextField type="text" placeholder={t('signUp.inputUsernamePlaceholder')} name="userName" error={isErrorUserName} helperText={messageUserName} value={userName} onChange={onChange} variant="outlined" size="small" />
                              </Tooltip>
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl  className="register-input">
                              <Tooltip title="At least 8 chracters" placement="top" arrow>
                                <TextField type="password" placeholder={t('signUp.inputPasswordPlaceholder')} name="password" error={isErrorPassword} helperText={messagePassword} value={password} onChange={onChange} variant="outlined" size="small" />
                              </Tooltip>
                            </FormControl>
                          </FormGroup>
                          <FormGroup sx={theme.form.box}>
                            <FormControl  className="register-input">
                              <TextField type="password" placeholder={t('signUp.inputConfirmPasswordPlaceholder')} name="confirmPassword" error={isErrorConfirmPassword} helperText={messageConfirmPassword} value={confirmPassword} onChange={onChange} variant="outlined" size="small" />
                            </FormControl> 
                          </FormGroup>
                          <Grid container alignItems="center">
                            <Grid item>
                                <FormControlLabel control={<Checkbox name="agree" value={checked !== '' ? true:false} checked={checked} onChange={handleChange} />} className="remember-me" sx={{ marginRight: '0px' }} />
                            </Grid>
                            <Grid item className="agree-txt">
                                <Typography>{t('signUp.agreeWithTerms')} <Link to="/" rel="noreferrer" target="_blank">{t('signUp.termsAndConditions')}</Link></Typography>
                            </Grid>
                            { !checked ? <Grid item xs={12} ><FormHelperText sx={{ color: '#d32f2f' }}>{messageAgree}</FormHelperText></Grid>:'' }
                          </Grid>
                          <Box sx={{ textAlign: 'center' }}>
                            <Button sx={theme.form.authButton} type="submit" variant="contained" size="large">{t('signUp.btnSignUp')}</Button>
                          </Box>
                        </Stack>
                      </form>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              <Box className="register-link">
                <Typography>
                {t('signUp.alreadyMember')}<Link to="/sign-in"> {t('signUp.linkSignIn')}</Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Layout>
      </>
    )
  }
  
    
  export default SignUp;