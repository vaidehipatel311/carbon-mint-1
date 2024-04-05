import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link';
import { Avatar, Badge, Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import avatar from '../../assets/images/Operators/avatar.png'
import * as action from '../../Services/LandOwners/actions';
import { connect } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

function Profile({ fetchLandOwners, updateLandOwnerStatus }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [landOwners, setlandOwners] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [approved, setApproved] = useState(false);
    const { currentUser } = useAuth();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        fetchLandOwners()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved" && p.id === parseInt(id, 10));
                const pending = data.filter((p) => p.status === "Pending" && p.id === parseInt(id, 10));
                if (approved.length != 0) {
                    setlandOwners(approved);
                    setApproved(true)
                }
                else {
                    setlandOwners(pending);
                }

                console.log(approved);

                // setonboarding(pending);
            })
            .catch(err => console.log(err))

    }, [landOwners]);

    const handleApprove = (id, status) => {
        updateLandOwnerStatus(id, status);
        navigate('/landowners')

    }

    return (
        <>
        {currentUser ? (
                <>
            <Header />
            <Sidebar />


            {landOwners.map((owners, index) => (
                <Box sx={{ margin: '100px 20px 50px 300px' }}>
                    <Grid container>
                        <Grid xs={10}>
                            <Breadcrumbs sx={{
                                textDecoration: 'none'
                            }}
                                separator={<NavigateNextIcon fontSize="small" />}
                                aria-label="breadcrumb">

                                <Link underline='hover' color='inherit' href="/landowners">Land Owners</Link>
                                <Link underline='hover' color='inherit' href="/operator/profile">Profile</Link>

                            </Breadcrumbs>
                            <div className='title'>
                                <Typography variant='p'>Profile</Typography>
                            </div>
                        </Grid>
                        <Grid xs={2}>
                            {approved ? (<></>) : (<Button variant='contained'
                                sx={{
                                    width: '100%',
                                    fontSize: '12px',
                                    height: '40px',
                                    color: 'green',
                                    background: 'lightgreen',
                                    border: '1px solid green',
                                    borderRadius: '5px',
                                    "&:hover": {
                                        color: 'green',
                                        background: 'lightgreen',
                                        border: '1px solid green',
                                    }
                                }} onClick={() => { handleApprove(owners.id, "Approved") }} startIcon={<CheckCircleOutlineIcon sx={{ color: 'green' }} />}>Approve</Button>)}

                        </Grid>

                    </Grid>
                    <Grid container sx={{ mt: 3 }} className='cards3'>
                        <Grid xs={12} sx={{ mb: 5 }}>
                            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2, display: 'flex' }}>
                                <Grid xs={3} sx={{ mt: 15 }}>
                                    <div className='profile-grid'>
                                        
                                        <AccountCircleIcon className='acc'/>
                                        <Typography variant='p' className='name'>{owners.name ? owners.name : "-"}</Typography>
                                        <Typography variant='p' className='id'>{owners.ownerID ? owners.ownerID : "-"}</Typography><br />
                                        <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                            <Grid xs={4} className='n'>
                                                <Typography variant='p' fontWeight='bold'>{owners.acres ? owners.acres : "-"}</Typography>
                                            </Grid>
                                            <Grid xs={4} className='n'>
                                                <Typography variant='p' fontWeight='bold'>{owners.landparcels ? owners.landparcels : "-"}</Typography>
                                            </Grid>
                                            <Grid xs={4} className='n'>
                                                <Typography variant='p' fontWeight='bold'>{owners.crops ? owners.crops : "-"}</Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container sx={{ textAlign: 'center' }}>
                                            <Grid xs={4} className='t'>
                                                <Typography variant='p'>Acres</Typography>
                                            </Grid>
                                            <Grid xs={4} className='t'>
                                                <Typography variant='p'>Landparcels</Typography>
                                            </Grid>
                                            <Grid xs={4} className='t'>
                                                <Typography variant='p'>Crops</Typography>
                                            </Grid>

                                        </Grid>
                                    </div></Grid>
                                <hr style={{ margin: '20px' }} />
                                <Grid xs={9} sx={{ mt: 2 }}>
                                    <div className='contact'>

                                        <Typography className='title' variant='p'>Contact</Typography>
                                        <div className='address-details'>
                                            <Button sx={{ color: 'black' }}><BusinessIcon /></Button>
                                            <div>
                                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</Typography><br />
                                                <Typography variant='p'>{owners.house_no ? owners.house_no : "-"}, {owners.village ? owners.village : "-"}, {owners.district ? owners.district : "-"}, {owners.state ? owners.state : "-"}, {owners.country ? owners.country : "-"} - {owners.postal_code ? owners.postal_code : "-"}</Typography>
                                            </div>
                                        </div>
                                        <div className='contact-details'>
                                            <Button sx={{ color: 'black' }}><SmartphoneIcon /></Button>
                                            <div>
                                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Contact</Typography><br />
                                                <Typography variant='p'>{owners.contact_number_1 ? owners.contact_number_1 : "-"}</Typography>
                                            </div>
                                        </div>
                                        <div className='email-details'>
                                            <Button sx={{ color: 'black' }}><AlternateEmailIcon /></Button>
                                            <div>
                                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Mail</Typography><br />
                                                <Typography variant='p'>{owners.email_id ? owners.email_id : "-"}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '20px' }} />

                                    <div className='documents'>
                                        <Typography variant='p' className='title'>Documents</Typography>
                                        <div className='aadhar'>
                                            <Button sx={{ color: 'black' }}><BadgeIcon /></Button>
                                            <div>
                                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Aadhar</Typography><br />
                                                <Typography variant='p'>{owners.aadhar_no ? owners.aadhar_no : "-"}</Typography>
                                            </div>
                                            <div style={{ marginLeft: '30px' }}>
                                                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Passbook Ref No.</Typography><br />
                                                <Typography variant='p'>{owners.passbook_refno ? owners.passbook_refno : "-"}</Typography>
                                            </div>
                                        </div>

                                    </div>
                                    <hr style={{ margin: '20px' }} />

                                    <div className='details'>
                                        <Typography variant='p' className='title'>Details</Typography>
                                        <div className='fathername'>
                                            <Typography variant='p'>Father's name</Typography>
                                            <b><Typography variant='p'>{owners.father_name ? owners.father_name : "-"}</Typography></b>
                                        </div>

                                        <div className='farming'>
                                            <Typography variant='p'>Total ex. in farming</Typography>
                                            <b><Typography variant='p'>{owners.total_farming_exp_year ? owners.total_farming_exp_year : "-"} years</Typography></b>

                                        </div>
                                        <div className='organic-farming'>
                                            <Typography variant='p'>Ex. in organic farming</Typography>
                                            <b><Typography variant='p'>{owners.organic_farming_exp_year ? owners.organic_farming_exp_year : "-"} years</Typography></b>

                                        </div>
                                    </div>
                                </Grid>
                            </Item>
                        </Grid>
                    </Grid>


                </Box >))}
                </>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        landOwners: state.landowners.landowners,
        // onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    fetchLandOwners: () => action.fetchLandOwners(),
    updateLandOwnerStatus: (id, status) => action.updateLandOwnerStatus(id, status),

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);