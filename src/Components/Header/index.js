
import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Drawer from '@mui/material/Drawer';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Avatar, Button, Typography, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import person from '../../assets/images/DashBoard/person.png';
import { fetchUser, updateUserStatus } from '../../Services/Login/actions';
import { connect } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../AuthProvider';
import { auth } from '../../firebase';

function Header({ fetchUser, updateUserStatus }) {
    const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
    const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchUser().then((data) => {
            const filteredUser = data.filter((p) => p.status === 'Logged_In');
            setUser(filteredUser);
        })
    }, [user]);

    const toggleNotificationDrawer = () => {
        setNotificationDrawerOpen(!notificationDrawerOpen);
    };

    const closeNotificationDrawer = () => {
        setNotificationDrawerOpen(false);
    };


    const toggleProfileDrawer = () => {
        setProfileDrawerOpen(!profileDrawerOpen);
    };

    const closeProfileDrawer = () => {
        setProfileDrawerOpen(false);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : 'rgba(233, 233, 233, 0.425)',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    

    const handleLogout = (id, status) => {
        updateUserStatus(id, status);
        navigate('/')
        auth.signOut()
            .then(() => {
                console.log('User signed out successfully');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }
    const notificationDrawer = (
        <Box
            sx={{ width: 300, marginTop: '70px', padding: '20px' }}
            role="presentation"
            onClick={closeNotificationDrawer}
            onKeyDown={closeNotificationDrawer}>


            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div className='notification'>
                    <Typography className='title' variant='p'>Notifications</Typography><br />
                    <Button sx={{ color: 'gray', ml: 20 }} onClick={closeNotificationDrawer}><CloseIcon /></Button>
                </div>
                {/* <Grid container spacing={2}>
                    
                        <Grid xs={12}>
                            <Item className='corner-field'>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Avatar sx={{ background: 'none' }}><img src={corner_field} className='photo'></img></Avatar>
                                    <div>
                                        <Typography variant='p' className='title'>Corner field : Sorghum photos</Typography><br />
                                        <Typography variant='p' className='text'>04 Jun, 2022 | 04:00 PM</Typography>
                                    </div>
                                    <Button sx={{ color: 'black' }}><PhotoLibraryIcon /></Button>
                                </div>
                            </Item>
                        </Grid>

                    <Grid xs={12}>
                        <Item className='lake-edge-field'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar sx={{ background: 'none' }}><img src={lake_edge} className='photo'></img></Avatar>
                                <div>
                                    <Typography variant='p' className='title'>Lake edge : Finger Millet photos</Typography><br />
                                    <Typography variant='p' className='text'>04 Jun, 2022 | 04:00 PM</Typography>
                                </div>
                                <Button sx={{ color: 'black' }}><PhotoLibraryIcon /></Button>
                            </div>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item className='operator-approved'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar sx={{ background: 'none' }}><img src={operator_approved} className='photo'></img></Avatar>
                                <div>
                                    <Typography variant='p' className='title'>Operator onboard approved</Typography><br />
                                    <Typography variant='p' className='text'>04 Jun, 2022 | 04:00 PM</Typography>
                                </div>
                                <Button sx={{ color: 'green' }}><CheckCircleOutlineIcon /></Button>
                            </div>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item className='desha'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar sx={{ background: 'none' }}><img src={desha} className='photo'></img></Avatar>
                                <div>
                                    <Typography variant='p' className='title'>Desha Thirupataiah onboarding</Typography><br />
                                    <Typography variant='p' className='text'>04 Jun, 2022 | 04:00 PM</Typography>
                                </div>
                                <Button sx={{ color: 'red' }}><ErrorOutlineIcon /></Button>
                            </div>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item className='operator-processing'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar sx={{ background: 'none' }}><img src={operator_processing} className='photo'></img></Avatar>
                                <div style={{ justifyContent: 'center' }}>
                                    <Typography variant='p' className='title'>Operator onboarding processing</Typography><br />
                                    <Typography variant='p' className='text'>04 Jun, 2022 | 04:00 PM</Typography>
                                </div>
                                <Button sx={{ color: 'orange' }}><HourglassTopIcon /></Button>
                            </div>
                        </Item>
                    </Grid>
                </Grid> */}
            </div>
        </Box>
    );

    const profileDrawer = (
        user.map((user, index) => (
            <Box
                sx={{ marginTop: '70px', padding: '20px' }}
                className='drawer'
                role="presentation"
                onClick={closeProfileDrawer}
                onKeyDown={closeProfileDrawer}>

                <Button sx={{ color: 'gray' }} onClick={closeProfileDrawer}><CloseIcon className='close-icon' /></Button>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Avatar sx={{ width: '70px', height: '70px' }} className='user-image-drawer'><AccountCircleIcon sx={{ width: '70px', height: '70px' }} /></Avatar>
                    <div className='user-in-drawer'>
                        <Typography className='user-name' variant='p'>{user.name}</Typography><br />
                        <Typography className='agent' variant='p'>Agent</Typography>
                    </div>

                </div>
                <hr />
                <div className='contact'>
                    <Typography className='title' variant='p'>Contact</Typography>
                    <div className='address-details'>
                        <Button sx={{ color: 'black' }}><BusinessIcon /></Button>
                        <div>
                            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</Typography><br />
                            <Typography variant='p' sx={{ color: 'gray' }}>{user.address}</Typography>
                        </div>
                    </div>
                    <div className='contact-details'>
                        <Button sx={{ color: 'black' }}><SmartphoneIcon /></Button>
                        <div>
                            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Contact</Typography><br />
                            <Typography variant='p' sx={{ color: 'gray' }}>{user.contact}</Typography>
                        </div>
                    </div>
                    <div className='email-details'>
                        <Button sx={{ color: 'black' }}><AlternateEmailIcon /></Button>
                        <div>
                            <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mail</Typography><br />
                            <Typography variant='p' sx={{ color: 'gray' }}>{user.email}</Typography>
                        </div>
                    </div>
                </div>
                <hr />

                <div className='actions'>
                    <Typography variant='p' className='title'>Actions</Typography>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='logout-details'>
                            <Button sx={{ color: 'black' }}><LogoutIcon /></Button>
                            <div>
                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Logout</Typography><br />
                                <Typography variant='p' sx={{ color: 'gray' }}>{user.contact}</Typography>
                            </div>
                            <Button sx={{ color: 'black' }} onClick={() => handleLogout(user.id, "Logged_Out")}><ArrowForwardIosIcon className='arrowforward-icon' /></Button>
                        </div>
                    </Link>
                </div>

            </Box>
        ))
    );

    return (
        <>

            <Box>
                <Grid container >
                    <div className='header'>
                        <Grid xs={1}>

                            <Button sx={{ color: 'gray', display: "flex", justifyContent: 'flex-start' }}><ArrowBackIosIcon /></Button>
                        </Grid>
                        <Grid xs={7}>
                        </Grid>

                        <Grid xs={4} sx={{ justifyContent: 'flex-end', display: 'flex', marginRight: '20px' }}>
                            <div className='notification' onClick={toggleNotificationDrawer}>
                                {notificationDrawerOpen ?
                                    (<Button sx={{ color: 'white', backgroundColor: 'green', borderRadius: '80px', height: '40px' }}>
                                        <NotificationsNoneIcon className='notification-icon' />
                                    </Button>)
                                    : (<Button sx={{ color: 'black', borderRadius: '50px', height: '40px' }}>
                                        <Badge color='success' variant="dot">
                                            <NotificationsNoneIcon badge className='notification-icon' />
                                        </Badge>
                                    </Button>)
                                }
                            </div>
                            <Drawer
                                anchor="right"
                                open={notificationDrawerOpen}
                                onClose={toggleNotificationDrawer}
                                sx={{ zIndex: 199 }}
                            >
                                {notificationDrawer}
                            </Drawer>
                            {user.map((user, index) => (
                                <div style={{ display: 'flex', cursor: 'pointer' }} onClick={toggleProfileDrawer}>
                                    <Avatar sx={{ ml: 1, border: profileDrawerOpen ? '3px solid green' : 'none' }}><AccountCircleIcon /></Avatar>
                                    <div className='user'>
                                        <Typography className='user-name' variant='p'>{user.name}</Typography><br />
                                        <Typography className='agent' variant='p'>Agent</Typography>
                                    </div>
                                </div>
                            ))}
                            <Drawer
                                anchor="right"
                                open={profileDrawerOpen}
                                onClose={toggleProfileDrawer}
                                sx={{ zIndex: 199 }}
                            >
                                {profileDrawer}
                            </Drawer>
                        </Grid>
                    </div>
                </Grid>
            </Box>



        </>
    );
}
const mapStateToProps = (state) => {
    return {
        login: state.login.users
    }
}

const mapDispatchToProps = {
    fetchUser: () => fetchUser(),
    updateUserStatus: (id, status) => updateUserStatus(id, status),
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)