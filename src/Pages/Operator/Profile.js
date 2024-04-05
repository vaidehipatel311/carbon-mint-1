import React, { useState, useEffect } from 'react'
import './profile.css'
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link';
import { Avatar, Badge, Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import avatar from '../../assets/images/Operators/avatar.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import no_of_crops from '../../assets/images/Operators/no_of_crops.png'
import events from '../../assets/images/Operators/events.png'
import Banner from '../../assets/images/Operators/Banner.png'
import * as action from '../../Services/Operator/actions';
import { connect } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchLandParcel } from '../../Services/LandParcels/actions';
import { updateOperatorStatus, fetchCrops } from '../../Services/Operator/actions';
import { fetchAddedEvents } from '../../Services/Events/actions'
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Profile({ fetchOperator, fetchLandParcel, updateOperatorStatus, fetchCrops, fetchAddedEvents }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { landparcelid } = useParams();
    const location = useLocation();


    const [operators, setOperators] = useState([]);
    const [landparcel, setLandparcel] = useState([]);
    const [crops, setCrops] = useState([]);
    const [event, setEvent] = useState([]);
    const [approved, setApproved] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { currentUser } = useAuth();
    const [totalLandparcels, setTotalLandparcels] = useState([]);

    useEffect(() => {
        fetchOperator()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved" && p.id === parseInt(id, 10));
                const pending = data.filter((p) => p.status === "Pending" && p.id === parseInt(id, 10));
                if (approved.length != 0) {
                    setOperators(approved);
                    setApproved(true)
                }
                else {
                    setOperators(pending);
                }
            })
            .catch(err => console.log(err))
        fetchLandParcel()
            .then((data) => {
                const filtereddata = data.filter((p) => p.operator_id == id)
                setTotalLandparcels(filtereddata)
                setLandparcel(data);
            })
            .catch(err => console.log(err))

        fetchCrops()
            .then((data) => {
                const a = totalLandparcels.map((p) => p.id);
                const allFilteredCrops = [];

                a.forEach((landParcelId) => {
                    const filteredCrops = data.filter((crop) => crop.landparcel_id == landParcelId);
                    allFilteredCrops.push(...filteredCrops);
                });
                setCrops(allFilteredCrops);
            })
            .catch(err => console.log(err))

            fetchAddedEvents()
            .then((data) => {
                const c = crops.map((s) => s.id);
                const allFilteredEvents = [];

                c.forEach((CropId) => {
                    const filteredEvents = data.filter((e) => e.crop_id == CropId);
                    allFilteredEvents.push(...filteredEvents);
                });
                setEvent(allFilteredEvents);
            })
            .catch(err => console.log(err))

    }, [operators, landparcel]);

    useEffect(() => {
        if (location.state && location.state.showAlert && !openAlert) {
            setOpenAlert(true);
        }
    }, []);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    const genereateLandparcel = () => {
        return landparcel.map((land, index) => (
            (land.operator_id === id ? (
                <Grid xs={6}>
                    <Link href={'/operator/' + `${id}` + '/landparcel/' + `${land.id}`} style={{ textDecoration: 'none' }}>
                        <div className="grid-upper-profile">
                            <img src={Banner}></img>

                        </div >
                        <Item className='grid-lower-profile' sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                            <div style={{ display: 'grid', textAlign: 'center' }}>
                                <Typography variant='p' fontWeight='bold'>{land.name}</Typography>
                                <Typography variant='p' sx={{ color: 'rgb(175, 174, 174)' }}>{land.village}, {land.district}</Typography>
                            </div>

                            <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{land.acres}</b></Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{land.area_owned}</b></Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{land.area_leased}</b></Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ textAlign: 'center' }}>
                                <Grid xs={4}>
                                    <Typography variant='p' className='t'>Acres</Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='t'>Area Owned</Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='t'>Area Leased</Typography>
                                </Grid>
                            </Grid>
                        </Item>
                    </Link>
                </Grid>
            ) : (<></>))
        ))
    }

    const handleApprove = (id, status) => {
        updateOperatorStatus(id, status);
        navigate('/operator')

    }

    return (
        <>
            {currentUser ? (
                <>
                    <Header />
                    <Sidebar />
                    {operators.map((owners, index) => (
                        <Box sx={{ margin: '100px 20px 50px 300px' }}>
                            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                                <Alert sx={{ ml: 70, mt: -10 }} onClose={handleCloseAlert} severity="success">
                                    Landparcel details added successfully
                                </Alert>
                            </Snackbar>
                            <Grid container>
                                <Grid xs={8}>
                                    <Breadcrumbs sx={{
                                        textDecoration: 'none'
                                    }}
                                        separator={<NavigateNextIcon fontSize="small" />}
                                        aria-label="breadcrumb">

                                        <Link underline='hover' color='inherit' href="/operator">Operator</Link>
                                        <Link underline='hover' color='inherit' href={"/operator/" + `${id}` + "/profile"}>Profile</Link>

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
                                            color: 'black',
                                            background: 'rgba(140, 216, 103, 1)',
                                            border: '1px solid black',
                                            borderRadius: '5px',
                                            "&:hover": { color: 'white' }
                                        }} onClick={() => { handleApprove(owners.id, "Approved") }}>Approve</Button>)}

                                </Grid>
                                <Grid xs={2}>
                                    <Link href={'/operator/' + `${id}` + '/add-landparcel/0'}><Button variant='contained'
                                        sx={{
                                            ml: 2,
                                            fontSize: '12px',
                                            height: '40px',
                                            color: 'black',
                                            background: 'rgba(140, 216, 103, 1)',
                                            border: '1px solid black',
                                            borderRadius: '5px',
                                            "&:hover": { color: 'white' }
                                        }}>Add Land Parcel</Button></Link>
                                </Grid>

                            </Grid>

                            <Grid container sx={{ mt: 3 }} className='cards3'>
                                <Grid xs={4.3} sx={{ mb: 5 }}>
                                    <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                                        <div className='profile-grid'>

                                            <AccountCircleIcon className='acc' />
                                            <Typography variant='p' className='name'>{owners.name ? owners.name : "-"}</Typography>
                                            <Typography variant='p' className='id'>{owners.ownerID ? owners.ownerID : "-"}</Typography>
                                            <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                                <Grid xs={4} className='n'>
                                                    <Typography variant='p' fontWeight='bold'>{owners.acres ? owners.acres : "-"}</Typography>
                                                </Grid>
                                                <Grid xs={4} className='n'>
                                                    <Typography variant='p' fontWeight='bold'>{totalLandparcels.length ? totalLandparcels.length : "-"}</Typography>
                                                </Grid>
                                                <Grid xs={4} className='n'>
                                                    <Typography variant='p' fontWeight='bold'>{crops.length ? crops.length : "-"}</Typography>
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
                                        </div>
                                        <hr style={{ margin: '20px' }} />

                                        <div className='contact'>

                                            <Typography className='title' variant='p'>Contact</Typography>
                                            <div className='address-details'>
                                                <Button sx={{ color: 'black' }}><BusinessIcon /></Button>
                                                <div>
                                                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</Typography><br />
                                                    <Typography variant='p'>{owners.house_no ? owners.house_no : "-"}, {owners.village ? owners.village : "-"}, {owners.district ? owners.district : "-"}, {owners.state ? owners.state : "-"}, {owners.country ? owners.country : "-"} - {<br />} {owners.postal_code ? owners.postal_code : "-"}</Typography>
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
                                                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Passbook Ref No</Typography><br />
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
                                            <div className='familysize'>
                                                <Typography variant='p'>Family size</Typography>
                                                <b><Typography variant='p'>{owners.family_size ? owners.family_size : "-"}</Typography></b>

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
                                    </Item>

                                </Grid>
                                <Grid xs={7.5}>
                                    <div className='cards3' style={{ display: 'flex' }}>
                                        <Grid xs={4}>
                                            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                                                <div className='no-of-landparcels'>
                                                    <Avatar><img src={noacrs}></img></Avatar>
                                                    <div>
                                                        <Typography className='content'>No. Landparcels</Typography>
                                                        <Typography className='content'><b>{totalLandparcels.length ? totalLandparcels.length : "-"}</b></Typography>
                                                    </div>
                                                </div>

                                            </Item>

                                        </Grid>
                                        <Grid xs={4}>
                                            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                                                <div className='no-of-crops'>
                                                    <Avatar><img src={no_of_crops}></img></Avatar>
                                                    <div>
                                                        <Typography className='content'>No. Crops</Typography>
                                                        <Typography className='content'><b>{crops.length ? crops.length : "-"}</b></Typography>
                                                    </div>
                                                </div>

                                            </Item>

                                        </Grid>
                                        <Grid xs={4}>
                                            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                                                <div className='no-of-events'>
                                                    <Avatar><img src={events}></img></Avatar>
                                                    <div>
                                                        <Typography className='content'>Events</Typography>
                                                        <Typography className='content'><b>{event.length ? event.length : "-"}</b></Typography>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    </div>
                                    <Grid xs={12} sx={{ mt: 5 }}>
                                        <div className='landparcel'><Typography variant='p'>Land parcels</Typography></div>
                                        <Grid container>
                                            {genereateLandparcel()}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box >
                    ))}
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
    fetchOperator: () => action.fetchOperator(),
    fetchLandParcel: () => fetchLandParcel(),
    fetchCrops: () => fetchCrops(),
    fetchAddedEvents: () => fetchAddedEvents(),
    updateOperatorStatus: (id, status) => updateOperatorStatus(id, status)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);