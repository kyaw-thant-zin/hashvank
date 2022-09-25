import React, { useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';

// ROUTER
import { useNavigate, useLocation, Link } from "react-router-dom";

// FORM VALIDATION
import Validation from '../../../../common/FormValidation';

// MUI
import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// THEME
import {theme} from "../../../layout/Theme";
import Layout from '../../../layout/common/Layout';

// CMPONENTS
import LoadingComponent from '../../../components/Loading';

// SCSS
import '../common.scss';

// LANG
import { t } from '../../../../common/SwitchLang';


const SignIn = () => {

    // redux
    const dispatch = useDispatch();

    // navigation
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    const {id, password} = formData;

    // const { user, isLoaing, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { user, isLoaing, isError, isSuccess, message } = ''

    // Onchange rememberme switch
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    const [errorMessage, setErrorMessage] = React.useState({
        checkId: {
          error: false,
          message: ''
        },
        checkPassword: {
          error: false,
          message: ''
        },
      })
    const { checkId, checkPassword } = errorMessage
    
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
    
        const validationRes = validateForm(id, password)
    
        // no validation errors submit the form
        if(validationRes === true) {
          const userData = {
            id,
            password,
          }
      
        //   dispatch(signin(userData))
        }
    
    }

    
    function serverSideValidationError(errorKey, message) {
        setErrorMessage((prevState) => ({
          ...prevState,
          [errorKey]: {
            error: true,
            message: message
          },
        }))
    }
    
    function validateForm(id, password) {
    
        const idError = Validation.required(id) || Validation.reset;
        const psError = Validation.required(password) || Validation.reset;
    
    
        setErrorMessage({
          checkId: {
            error: idError.error,
            message: idError.error === true ? idError.message:''
          },
          checkPassword: {
            error: psError.error,
            message: psError.error === true ? psError.message:'',
          }
        })
    
        return !idError.error && !psError.error 
    
    }

    if(isLoaing) {
        return <LoadingComponent />
    }


    return (
        <>
            <Layout>
                <Grid container justifyContent='center'>
                    <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                        <Card sx={{ background: '#F7FAFC', borderRadius: '10px' }}>
                        <CardContent sx={{ padding: '20px 40px' }}>
                            <Stack spacing={5}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h1" sx={theme.typography.logo}>{process.env.REACT_APP_NAME}</Typography>
                                <Typography variant="subtitle" sx={{ fontFamily: '"GothamBook", sans-serif', fontWeight: '350', fontSize: '15px', color: '#172B4D', marginTop: '15px' }}>Welcome back! Please login to continue.</Typography>
                            </Box>
                            <Box>
                                { checkId.error === true ? <Box>
                                <FormHelperText sx={{ marginBottom: '10px', textAlign: 'center', color: '#d32f2f' }}>{checkId.message}</FormHelperText>
                                </Box> : '' }
                                <form onSubmit={onSubmit}>
                                <Stack spacing={2}>
                                    <FormGroup sx={theme.form.box}>
                                    <FormControl required className="login-input" sx={{ boxShadow: 2 }}>
                                        <TextField  placeholder={t('signIn.inputUserPlaceholder')} type="text" name="id" error={checkId.error} value={id} onChange={onChange} required variant="outlined" size="small" InputProps={{ startAdornment: ( <InputAdornment position="start"><EmailOutlinedIcon /></InputAdornment> ) }} />
                                    </FormControl>
                                    </FormGroup>
                                    <FormGroup sx={theme.form.box}>
                                    <FormControl required  className="login-input" sx={{ boxShadow: 2 }}>
                                        <TextField  placeholder={t('signIn.inputPasswordPlaceholder')} type="password" name="password" helperText={checkPassword.message} error={checkPassword.error} value={password} onChange={onChange} variant="outlined" size="small" InputProps={{ startAdornment: ( <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment> ) }} />
                                    </FormControl>
                                    </FormGroup>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Box sx={{ textAlign: 'right', marginTop: '5px' }}>
                                        <FormControlLabel control={<Checkbox name="remember" checked={checked} onChange={handleChange} />} label={t('signIn.rememberMe')} className="remember-me" />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{ textAlign: 'right', marginTop: '5px' }}>
                                        <Link to="/" className="forgot-password">
                                            <Typography variant="caption">{t('signIn.forgotPassword')}</Typography>
                                        </Link>
                                        </Box>
                                    </Grid>
                                    </Grid>
                                    <Box sx={{ textAlign: 'center' }}>
                                    <Button sx={theme.form.authButton} type="submit" variant="contained" size="large">{t('signIn.btnSignIn')}</Button>
                                    </Box>
                                </Stack>
                                </form>
                            </Box>
                            </Stack>
                        </CardContent>
                        </Card>
                        <Box className="register-link">
                        <Typography>
                            <Link to="/sign-up">{t('signIn.newToProduct')}</Link>
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );

}

export default SignIn;