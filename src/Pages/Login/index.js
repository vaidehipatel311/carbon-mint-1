import React, { useState, useEffect } from 'react'
import './style.css'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import finalLogo from '../../assets/images/Login/Final Logo.png'
import googleicon from '../../assets/images/Login/Socail Links.png'
import graphicSide from '../../assets/images/Login/image 50.png'
import { Button } from '@mui/material';
import { connect } from 'react-redux'
import * as action from '../../Services/Login/actions';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import {auth} from '../../firebase';
import PhoneInput from 'react-phone-input-2';
import { MuiOtpInput } from 'mui-one-time-password-input'

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
function Login({ fetchUser, updateUserStatus }) {
    const navigate = useNavigate();

    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [phoneNo, setPhoneNo] = useState('')
    const [user, setUser] = useState([])
    const [phoneOtp, setPhoneOtp] = useState(null)
    const [remainingTime, setRemainingTime] = useState(60);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);


    useEffect(() => {
        fetchUser().then((data) => {
            const filteredUser = data.filter((p) => p.contact === phoneNo);
            setUser(filteredUser);
        })
        let timer;
        if (showOtp) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setShowOtp(false);
                        return prevTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            setRemainingTime(60);
        }

        return () => clearInterval(timer);
    }, [phoneNo,showOtp]);


    
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



    const handleClick = async () => {
        try {
            if(user.length > 0){
            
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
                size: 'invisible',
                'callback': () => { }
            })

            setRecaptchaVerifier(recaptcha);

            setShowOtp(true);

            const confirmationResult = await signInWithPhoneNumber(auth, `+${phoneNo}`, recaptcha);
            console.log(confirmationResult);
            setPhoneOtp(confirmationResult);
        }
        else{
            alert('No user found');
        }

        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOTP = async (id,status) => {
        try {
            if (otp === '') {
                alert('Please enter otp.')
            }
            else {
                const userCredential = await phoneOtp.confirm(otp)
                console.log(userCredential);
                if (userCredential && userCredential.user) {
                    updateUserStatus(id,status);
                    navigate('/dashboard');
                } else {
                    console.error('Invalid user credential.');
                }
            }

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
                    <Grid xs={12}>
                        <PhoneInput
                            country={'in'}
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(phoneNo) => setPhoneNo(phoneNo)}
                            inputProps={{
                                name: 'phoneNo',
                                required: true,
                                autoFocus: true
                            }}
                            inputStyle={{ width: '95%' }}
                            inputClass="login-textfield"
                            error={formik.errors.phoneNo ? true : false}
                        />
                    </Grid>

                    <div id="recaptcha"></div>
                    {showOtp && (
                        <>
                            <Grid xs={12}>
                                
                                <MuiOtpInput
                                    name="otp"
                                    value={otp}
                                    onChange={(newValue) => setOtp(newValue)}
                                    TextFieldsProps={{ placeholder: '-' }}
                                    length={6}
                                    className="login-textfield"
                                    sx={{ marginTop: '16px' }}
                                />


                            </Grid>
                            <Grid xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant='p' sx={{ fontSize: 'small', color: 'red' }}>{remainingTime} seconds remaining</Typography>
                            </Grid>
                            <Grid xs={12} sx={{ textAlign: 'center' }}>
                                {user.map((b,index)=>(
                                <Button
                                    sx={{
                                        backgroundColor: '#8CD867',
                                        border: '1px solid black',
                                        borderRadius: '8px'
                                    }}
                                    size="large"
                                    variant="filled"
                                    className="button"
                                    onClick={()=>handleVerifyOTP(b.id,"Logged_In")}
                                >Sign In</Button>
                                ))}
                            </Grid>

                        </>)}


                    {!showOtp && (<Grid xs={12} sx={{ textAlign: 'center' }}>
                        <Button
                            className="button"
                            sx={{
                                backgroundColor: '#8CD867',
                                border: '1px solid black',
                                borderRadius: '8px',
                                color: 'black'
                            }}
                            variant="filled"
                            onClick={handleClick}
                        >Send OTP</Button>
                    </Grid>)}


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
    fetchUser: () => action.fetchUser(),
    updateUserStatus: (id, status) => action.updateUserStatus(id, status),
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)