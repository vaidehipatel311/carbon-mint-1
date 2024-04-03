import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link';
import { Badge, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import avatar from '../../assets/images/Operators/avatar.png'
import { fetchLandParcel, updateLandParcelStatus } from '../../Services/LandParcels/actions';
import { connect } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

function Profile({ fetchLandParcel, updateLandParcelStatus }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [landOwners, setlandOwners] = useState([]);
    const [approved, setApproved] = useState(false)
    const { currentUser } = useAuth();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        fetchLandParcel()
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
            })
            .catch(err => console.log(err))
    }, [landOwners]);

    const handleApprove = (id, status) => {
        updateLandParcelStatus(id, status);
        navigate('/landparcels')

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

                                        <Link underline='hover' color='inherit' href="/landparcels">Land Parcels</Link>
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
                                        <Grid xs={3} sx={{ mt: 7 }}>
                                            <div className='profile-grid'>
                                                <Badge color='success' badgeContent=" " size="large"
                                                    className='badge'
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}></Badge>
                                                <Avatar className='avatar_lo'><AccountCircleIcon className='acc' /></Avatar><br />
                                                <Typography variant='p' className='name'>{owners.name}</Typography>
                                                <Typography variant='p' className='id'>{owners.SyNo}</Typography><br />
                                                <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                                    <Grid xs={4} className='n'>
                                                        <Typography variant='p' fontWeight='bold'>{owners.acres}</Typography>
                                                    </Grid>
                                                    <Grid xs={4} className='n'>
                                                        <Typography variant='p' fontWeight='bold'>{owners.area_owned}</Typography>
                                                    </Grid>
                                                    <Grid xs={4} className='n'>
                                                        <Typography variant='p' fontWeight='bold'>{owners.area_leased}</Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container sx={{ textAlign: 'center' }}>
                                                    <Grid xs={4} className='t'>
                                                        <Typography variant='p'>Acres</Typography>
                                                    </Grid>
                                                    <Grid xs={4} className='t'>
                                                        <Typography variant='p'>Area Owned</Typography>
                                                    </Grid>
                                                    <Grid xs={4} className='t'>
                                                        <Typography variant='p'>Area Leased</Typography>
                                                    </Grid>

                                                </Grid>
                                            </div></Grid>
                                        <hr style={{ margin: '20px' }} />
                                        <Grid xs={9} sx={{ mt: 2 }}>
                                            <div className='contact'>

                                                <Typography className='title' variant='p'>Contact</Typography>
                                                <div className='address-details'>
                                                    <Button sx={{ color: 'black' }}><BadgeIcon /></Button>
                                                    <div>
                                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Operator Name</Typography><br />
                                                        <Typography variant='p'>{owners.operator_name}</Typography>
                                                    </div>
                                                </div>
                                                <div className='address-details'>
                                                    <Button sx={{ color: 'black' }}><BusinessIcon /></Button>
                                                    <div>
                                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Address</Typography><br />
                                                        <Typography variant='p'>{owners.house_no}, {owners.village}, {owners.district}, {owners.state}, {owners.country} - {owners.postal_code}</Typography>
                                                    </div>
                                                </div>
                                                <div className='contact-details'>
                                                    <Button sx={{ color: 'black' }}><SmartphoneIcon /></Button>
                                                    <div>
                                                        <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '15px' }}>Contact</Typography><br />
                                                        <Typography variant='p'>{owners.contact_number_1}</Typography>
                                                    </div>
                                                </div>

                                            </div>
                                            <hr style={{ margin: '20px' }} />

                                            <div className='details'>
                                                <Typography variant='p' className='title'>Details</Typography>
                                                <div className='fathername'>
                                                    <Typography variant='p'>Survey number</Typography>

                                                    <b><Typography variant='p'>{owners.SyNo}</Typography></b>
                                                </div>

                                                <div className='farming'>
                                                    <Typography variant='p'>Neighboring Farm</Typography>

                                                    <b><Typography variant='p'>{owners.neighbouring_farm}</Typography></b>

                                                </div>
                                                <div className='organic-farming'>
                                                    <Typography variant='p'>Farming system</Typography>

                                                    <b><Typography variant='p'>{owners.farming_system}</Typography></b>

                                                </div>

                                                <div className='organic-farming'>
                                                    <Typography variant='p'>Infrastructure</Typography>

                                                    <b><Typography variant='p'>{owners.infrastructure}</Typography></b>

                                                </div>

                                                <div className='organic-farming'>
                                                    <Typography variant='p'>Water resources</Typography>

                                                    <b><Typography variant='p'>{owners.water_resources}</Typography></b>

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
    fetchLandParcel: () => fetchLandParcel(),
    updateLandParcelStatus: (id, status) => updateLandParcelStatus(id, status),

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);