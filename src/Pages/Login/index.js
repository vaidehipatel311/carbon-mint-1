import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import finalLogo from '../../assets/images/Login/Final Logo.png'
import googleicon from '../../assets/images/Login/Socail Links.png'
import graphicSide from '../../assets/images/Login/image 50.png'
import { Button, TextField } from '@mui/material';
import { connect } from 'react-redux'
import * as action from '../../Services/Login/actions';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../../firebase';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login({ addUser }) {
    const navigate = useNavigate();

    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState('');

    const validate = values => {
        const errors = {};
        if (!values.phoneNo) {
            errors.phoneNo = 'Required'
        }
        else if (values.phoneNo.length !== 10) {
            errors.phoneNo = 'Must be 10 characters';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            phoneNo: '',
            otp: ''
        },
        validate,
        onSubmit: (values) => {
            navigate('/dashboard')
        }
    })


    // const handleClick = () => {

    //         const otp = (Math.floor(Math.random() * 1000000) + 1)
    //         setOtp(otp)
    //         addUser(formik.values.phoneNo, otp)
    //         setShowOtp(true);
    // }
    const handleClick = async () => {
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(`+91${formik.values.phoneNo}`);
            console.log(confirmationResult);
            if (confirmationResult.verificationId) {
                const verificationId = confirmationResult.verificationId;
                console.log(verificationId);
                setVerificationId(verificationId);
                setShowOtp(true);
            } else {
                console.error('Error obtaining verification ID');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };
    
    const handleVerifyOTP = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
            await firebase.auth().signInWithCredential(credential);
            console.log('OTP verification successful');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };


    return (
        <>

            <Grid container>
                <Grid item xs={6}>
                    <img className="graphicSide" src={graphicSide} alt="logo"></img>
                </Grid>
                <Grid item xs={6} className='signin-form' id='signinform'>
                    <Grid xs={12} sx={{ textAlign: 'center' }}>
                        <div className='logo'>
                            <img src={finalLogo} className='finalLogo' alt="logo"></img>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <Typography className="signintext" variant="p">Sign In</Typography>
                    </Grid>
                    {showOtp ? (
                        <>
                            <Grid xs={12}>
                                <TextField
                                    name="phoneNo"
                                    value={formik.values.phoneNo}
                                    onChange={formik.handleChange}
                                    type="text"
                                    sx={{ marginTop: '16px' }}
                                    label="Phone Number"
                                    required
                                    className="login-textfield"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    name="otp"
                                    value={otp}
                                    onChange={formik.handleChange}
                                    label="OTP"
                                    type="text"
                                    className="login-textfield"
                                    sx={{ marginTop: '16px' }}
                                />
                            </Grid>
                            <Grid xs={12} sx={{ textAlign: 'center' }}>
                                <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
                                    <Button
                                        sx={{
                                            backgroundColor: '#8CD867',
                                            border: '1px solid black',
                                            borderRadius: '8px'
                                        }}
                                        size="large"
                                        variant="filled"
                                        className="button"
                                        onClick={handleVerifyOTP}
                                    >Sign In</Button>
                                </Link>
                            </Grid>

                        </>)
                        : (
                            <>
                                <Grid xs={12}>
                                    <TextField
                                        name="phoneNo"
                                        value={formik.values.phoneNo}
                                        onChange={
                                            formik.handleChange
                                        }
                                        className="login-textfield"
                                        type="text"
                                        label="Phone number"
                                    />
                                </Grid>
                                {formik.errors.phoneNo ? <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>{formik.errors.phoneNo}</Typography> : null}
                                
                                <Grid xs={12} sx={{ textAlign: 'center' }}>
                                    <Button
                                        className="button"
                                        sx={{
                                            backgroundColor: '#8CD867',
                                            border: '1px solid black',
                                            borderRadius: '8px'
                                        }}
                                        variant="filled"
                                        onClick={handleClick}
                                    >Send OTP</Button>
                                </Grid>

                            </>)}

                    <br></br>
                    <Grid xs={12} sx={{ textAlign: 'center' }}>
                        <Typography className="otheracc" variant='p' >or sign in with other accounts?</Typography>
                    </Grid>
                    <Grid xs={12} sx={{ textAlign: 'center' }}>
                        <img className="googleicon" src={googleicon} alt="logo"></img>

                    </Grid>
                </Grid>


            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login.users
    }
}

const mapDispatchToProps = {
    addUser: (phoneNo, otp) => action.addUser(phoneNo, otp)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)