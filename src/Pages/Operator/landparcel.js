import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import './landparcel.css'
import Link from '@mui/material/Link';
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

import Banner from '../../assets/images/Operators/Banner.png'
import Banner_crops_2 from '../../assets/images/Operators/Banner_crops_2.png'
import { connect } from 'react-redux';
import { fetchCrops, fetchMaps } from '../../Services/Operator/actions';
import { fetchLandParcel } from '../../Services/LandParcels/actions';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

function Landparcel({ fetchCrops, fetchLandParcel, fetchMaps }) {
    const { id } = useParams();
    const location = useLocation();
    const { cropid } = useParams()
    const { landparcelid } = useParams()
    const [crops, setCrops] = useState([]);
    const [landparcel, setLandparcel] = useState([]);
    const [maps, setMaps] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const { currentUser } = useAuth();



    useEffect(() => {
        fetchCrops()
            .then((data) => {

                setCrops(data);
            })
            .catch(err => console.log(err))


        fetchLandParcel()
            .then((data) => {
                const filtereddata = data.filter((p) => p.id === parseInt(landparcelid, 10))
                setLandparcel(filtereddata);
            })
            .catch(err => console.log(err))

        fetchMaps()
            .then((data) => {

                setMaps(data);
            })
            .catch(err => console.log(err))

    }, [crops, landparcel])

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

    const generateCrops = () => {
        return crops.map((crop, index) => (
            (crop.landparcel_id === landparcelid ? (
                <Grid xs={6}>
                    <Link href={'/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/' + `${crop.id}`} style={{ textDecoration: 'none' }}>
                        <div className="crops-grid-upper">
                            <img src={Banner_crops_2}></img>

                        </div >
                        <Item className='crops-grid-lower' sx={{ boxShadow: '0px 0px 12px 0px #0000001F' }}>
                            <div style={{ display: 'grid', textAlign: 'center' }}>
                                <b><Typography variant='p' >{crop.crop_name}</Typography></b>
                                <Typography variant='p'>Irrigation {crop.irrigation_status}</Typography>
                            </div>

                            <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{crop.acres}</b></Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{crop.area_owned}</b></Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography variant='p' className='n'><b>{crop.crop_age}</b></Typography>
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

    return (
        <>
        {currentUser ? (
                <>
            <Header />
            <Sidebar />
            <Box sx={{ margin: '100px 20px 50px 300px' }}>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert sx={{ ml: 70, mt: -10 }} onClose={handleCloseAlert} severity="success">
                        Crops details added successfully
                    </Alert>
                </Snackbar>

                <Grid container>
                    <Grid xs={10}>
                        <Breadcrumbs sx={{
                            textDecoration: 'none'
                        }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb">

                            <Link underline='hover' color='inherit' href="/operator">Operator</Link>
                            <Link underline='hover' color='inherit' href={'/operator/' + `${id}`}>Profile</Link>
                            <Link underline='hover' color='inherit' href={'/operator/' + `${id}` + '/landparcel/' + `${landparcelid}`}>Landparcel</Link>

                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Chennaiah Polam</Typography>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <Link href={'/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/add-crops/0'} sx={{ textDecoration: 'none' }}><Button variant='contained'
                            sx={{
                                width: '100%',
                                fontSize: '12px',
                                height: '40px',
                                color: 'black',
                                background: 'rgba(140, 216, 103, 1)',
                                border: '1px solid black',
                                borderRadius: '5px',
                            }}>Add Crop</Button>
                        </Link>
                    </Grid>
                </Grid>


                {landparcel.map((land, index) => (
                    <Grid container sx={{ mt: 3 }}>
                        <Grid xs={4.5} sx={{ mb: 5 }}>
                            <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                                <div className='chennaiah-polam-details'>
                                    <img src={Banner}></img>
                                    <Typography variant='p' className='name'>{land.landparcel_name}</Typography>
                                    <Typography variant='p' className='address'>{land.house_no}, {land.village}, {land.district}, {land.state}, {land.country} - {land.postal_code}</Typography>
                                    <Link href={'/operator/' + `${id}` + '/add-landparcel/' + `${land.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer', ml: 20, mt: -8, position: 'absolute' }} /></Link>
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
                                </div>
                                <hr style={{ margin: '20px' }} />

                                <div className='details'>
                                    <Typography variant='p' className='title'>Details</Typography>
                                    <div className='content'>
                                        <Typography variant='p'>Survey number</Typography>
                                        <b><Typography variant='p'>{land.SyNo}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Neighboring Farm</Typography>
                                        <b><Typography variant='p'>{land.neighbouring_farm}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Distance from the nearest service road</Typography>
                                        <b><Typography variant='p'>{land.distance}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Land under cultivation</Typography>
                                        <b><Typography variant='p'>{land.land_under_cultivation}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Cropping systems</Typography>
                                        <b><Typography variant='p'>{land.cropping_systems}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Farming system</Typography>
                                        <b><Typography variant='p'>{land.farming_system}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Infrastructure</Typography>
                                        <b><Typography variant='p'>{land.infrastructure}</Typography></b>

                                    </div>
                                    <div className='content'>
                                        <Typography variant='p'>Water resources</Typography>
                                        <b><Typography variant='p'>{land.water_resources}</Typography></b>

                                    </div>

                                </div>
                            </Item>

                        </Grid>
                        <Grid xs={7.5}>
                            {maps.slice(0, 1).map((maps, index) => (
                                <Grid xs={12} className='maps'>
                                    <div sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2, ml: 4 }}>
                                        <div style={{ height: '300px', marginLeft: '20px' }}>

                                            <LoadScript googleMapsApiKey={maps.api_key}>
                                                <GoogleMap
                                                    mapContainerStyle={{ height: '100%', width: '100%' }}
                                                    center={{ lat: maps.center_lat, lng: maps.center_lng }}
                                                    zoom={6}
                                                    options={{ mapTypeId: 'satellite' }}
                                                >
                                                    <Polygon
                                                        path={maps.dots1.map(dot => ({ lat: dot.lat, lng: dot.lng }))}
                                                        options={{
                                                            strokeColor: 'yellow',
                                                            strokeOpacity: 0.8,
                                                            strokeWeight: 2,
                                                            fillColor: 'yellow',
                                                            fillOpacity: 0.20
                                                        }}
                                                    />

                                                    {maps.dots1.map((dot, index) => (
                                                        <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                                    ))}
                                                    <Polygon
                                                        path={maps.dots2.map(dot => ({ lat: dot.lat, lng: dot.lng }))}
                                                        options={{
                                                            strokeColor: 'lightgreen',
                                                            strokeOpacity: 0.8,
                                                            strokeWeight: 2,
                                                            fillColor: 'lightgreen',
                                                            fillOpacity: 0.20
                                                        }}
                                                    />

                                                    {maps.dots2.map((dot, index) => (
                                                        <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                                    ))}
                                                    <Marker position={{
                                                        lat: maps.dots2.reduce((sum, coord) => sum + coord.lat, 0) / maps.dots2.length,
                                                        lng: maps.dots2.reduce((sum, coord) => sum + coord.lng, 0) / maps.dots2.length
                                                    }}
                                                        label={{
                                                            text: maps.text,
                                                            color: 'black',
                                                            fontWeight: 'bold',
                                                            className: 'marker-label'
                                                        }}
                                                        icon={{ url: maps.url }}
                                                    />

                                                </GoogleMap>
                                            </LoadScript>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                            <Grid xs={12}>
                                <div className='crops-heading'><Typography variant='p'>Crops</Typography></div>

                                <Grid container>

                                    {generateCrops()}


                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            </>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = {
    fetchCrops: () => fetchCrops(),
    fetchLandParcel: () => fetchLandParcel(),
    fetchMaps: () => fetchMaps()

}

export default connect(mapStateToProps, mapDispatchToProps)(Landparcel);