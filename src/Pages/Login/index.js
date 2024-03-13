import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import finalLogo from '../../assets/images/Login/Final Logo.png'
import googleicon from '../../assets/images/Login/Socail Links.png'
import graphicSide from '../../assets/images/Login/image 50.png'
import { Button, TextField } from '@mui/material';
import { connect } from 'react-redux'
import * as action from '../../Services/Login/actions';


function Login({ addUser }) {

    const [showOtp, setShowOtp] = useState(false);
    const [phoneNo, setPhoneNo] = useState('');
    const [otp, setOtp] = useState('');
    const [phoneNoError, setPhoneNoError] = useState('');


    const handleClick = () => {
        if (phoneNo.length !== 10) {
            setPhoneNoError('Please enter a valid phone number');
            return;
        }
        else {
            const otp = (Math.floor(Math.random() * 1000000) + 1)
            setOtp(otp)
            addUser(phoneNo, otp)
            setShowOtp(true);
        }
    }

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
                                <TextField value={phoneNo}
                                    type='text' sx={{ marginTop: "16px" }}
                                    label='Phone Number'
                                    required
                                    className='login-textfield'>
                                </TextField>
                            </Grid>
                            <Grid xs={12}>
                                <TextField label='OTP' type='text' value={otp}
                                    className='login-textfield'
                                    sx={{ marginTop: "16px" }}
                                >
                                </TextField>
                            </Grid>
                            <Grid xs={12} sx={{ textAlign: 'center' }}>
                                <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>
                                    <Button
                                        sx={{
                                            backgroundColor: '#8CD867',
                                            border: '1px solid black',
                                            borderRadius: '8px'
                                        }}
                                        size="large" variant="filled" className='button'>Sign In</Button>
                                </Link>
                            </Grid>

                        </>)
                        : (
                            <>
                                <Grid xs={12}>
                                    <TextField value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                                        className='login-textfield'
                                        type='text'
                                        label='Phone number'
                                        required
                                        InputLabelProps={{
                                            style: { fontSize: '20px' } // Adjust the font size as needed
                                        }}>
                                    </TextField>
                                </Grid>
                                {phoneNoError && <Typography color="error" sx={{textAlign:'center',mt:2}}>{phoneNoError}</Typography>}
                                <Grid xs={12} sx={{ textAlign: 'center' }}>
                                    <Button className='button'
                                        sx={{
                                            backgroundColor: '#8CD867',
                                            border: '1px solid black',
                                            borderRadius: '8px'
                                        }}
                                        variant="filled" onClick={handleClick}>Send OTP</Button>
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