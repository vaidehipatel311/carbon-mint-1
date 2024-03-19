
import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Drawer from '@mui/material/Drawer';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Box from '@mui/material/Box';
import { Avatar, Button, Typography, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';



import person from '../../assets/images/DashBoard/person.png';
import corner_field from '../../assets/images/DashBoard/corner_field.png'
import operator_approved from '../../assets/images/DashBoard/operator_approved.png'
import operator_processing from '../../assets/images/DashBoard/operator_processing.png'
import desha from '../../assets/images/DashBoard/desha.png'
import lake_edge from '../../assets/images/DashBoard/lake_edge.png'

export default function Header() {
    const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
    const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);


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

    const notificationDrawer = (
        <Box
            sx={{ width: 350, marginTop: '70px', padding: '20px' }}
            role="presentation"
            onClick={closeNotificationDrawer}
            onKeyDown={closeNotificationDrawer}>


            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div className='notification'>
                    <Typography className='title' variant='p'>Notifications</Typography><br />
                    <Button sx={{ color: 'gray', ml: 22 }} onClick={closeNotificationDrawer}><CloseIcon /></Button>
                </div>
                <Grid container spacing={2}>
                    <Link to='/events/2' style={{ textDecoration: 'none' }}>
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
                    </Link>

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
                </Grid>
            </div>
        </Box>
    );

    const profileDrawer = (

        <Box
            sx={{ marginTop: '70px', padding: '20px' }}
            className='drawer'
            role="presentation"
            onClick={closeProfileDrawer}
            onKeyDown={closeProfileDrawer}>

            <Button sx={{ color: 'gray' }} onClick={closeProfileDrawer}><CloseIcon className='close-icon' /></Button>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Avatar sx={{ width: '70px', height: '70px' }} className='user-image-drawer'><img src={person}></img></Avatar>
                <div className='user-in-drawer'>
                    <Typography className='user-name' variant='p'>Subbarayudu KV</Typography><br />
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
                        <Typography variant='p' sx={{ color: 'gray' }}>H.no: 54b/TS, Main street, Megya Thanda, Rangareddy, Hyderabad,  Telangana - 500008</Typography>
                    </div>
                </div>
                <div className='contact-details'>
                    <Button sx={{ color: 'black' }}><SmartphoneIcon /></Button>
                    <div>
                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Contact</Typography><br />
                        <Typography variant='p' sx={{ color: 'gray' }}>+91 888 999 8989</Typography>
                    </div>
                </div>
                <div className='email-details'>
                    <Button sx={{ color: 'black' }}><AlternateEmailIcon /></Button>
                    <div>
                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mail</Typography><br />
                        <Typography variant='p' sx={{ color: 'gray' }}>kethavathlaxmanna@gmail.com</Typography>
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
                            <Typography variant='p' sx={{ color: 'gray' }}>847064392663</Typography>
                        </div>
                        <Button sx={{ color: 'black' }}><ArrowForwardIosIcon className='arrowforward-icon' /></Button>
                    </div>
                </Link>
            </div>

        </Box>
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



                            {/* </Grid> */}

                            {/* <Grid xs={2.5}> */}
                            <div style={{ display: 'flex', cursor: 'pointer' }} onClick={toggleProfileDrawer}>
                                <Avatar sx={{ ml: 1, border: profileDrawerOpen ? '3px solid green' : 'none' }}><img className='user-image' src={person} alt="Person" /></Avatar>
                                <div className='user'>
                                    <Typography className='user-name' variant='p'>Subbarayudu KV</Typography><br />
                                    <Typography className='agent' variant='p'>Agent</Typography>
                                </div>
                            </div>
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
