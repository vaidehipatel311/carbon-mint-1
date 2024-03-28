import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import './landparcel.css'
import Link from '@mui/material/Link';
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

import Banner from '../../assets/images/Operators/Banner.png'
import Banner_crops_2 from '../../assets/images/Operators/Banner_crops_2.png'
import { connect } from 'react-redux';
import { fetchCrops } from '../../Services/Operator/actions';
import { useParams } from 'react-router-dom';





const apiKey = 'AIzaSyCg8i1Q_GVHIXChAbBgQerjyUgfNBvRfks';
const dots1 = [
    { lat: 20.5937, lng: 78.9629 },
    { lat: 20.5937, lng: 80.9629 },
    { lat: 21.9937, lng: 80.9629 },
    { lat: 21.9937, lng: 78.9629 },
    { lat: 20.5937, lng: 78.9629 }
];
const dots2 = [
    { lat: 20.5937, lng: 80.9629 },
    { lat: 20.5937, lng: 82.9629 },
    { lat: 21.9937, lng: 82.9629 },
    { lat: 21.9937, lng: 80.9629 },
    { lat: 20.5937, lng: 80.9629 }
];
const path1 = dots1.map(dot => ({ lat: dot.lat, lng: dot.lng }));
const path2 = dots2.map(dot => ({ lat: dot.lat, lng: dot.lng }));
const totalLat = dots2.reduce((sum, coord) => sum + coord.lat, 0);
const totalLng = dots2.reduce((sum, coord) => sum + coord.lng, 0);
const avgLat = totalLat / dots2.length;
const avgLng = totalLng / dots2.length;

// Center point
const whiteMarkerIcon = {
    url: 'https://maps.google.com/mapfiles/kml/paddle/wht-circle.png',
    // scaledSize: new window.google.maps.Size(32, 32),
};

function Landparcel({ fetchCrops }) {
    const {id} = useParams()
    const {cropid} = useParams()

    const [crops, setCrops] = useState([]);
    useEffect(()=>{
        fetchCrops()
            .then((data) => {
                setCrops(data);
            })
            .catch(err => console.log(err))
        }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    const generateCrops = () => {
        return crops.map((crop,index)=>(
        <Grid xs={6}>
            <Link href={'/operator/'+`${id}`+'/profile/landparcel/crops/'+`${crop.id}`} style={{ textDecoration: 'none' }}>
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
        ))
    }

    return (
        <>
            <Header />
            <Sidebar />
            <Box sx={{ margin: '100px 20px 50px 300px' }}>

                <Grid container>
                    <Grid xs={10}>
                        <Breadcrumbs sx={{
                            textDecoration: 'none'
                        }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb">

                            <Link underline='hover' color='inherit' href="/operator">Operator</Link>
                            <Link underline='hover' color='inherit' href={'/operator/'+`${id}`+'/profile'}>Profile</Link>
                            <Link underline='hover' color='inherit' href={'/operator/'+`${id}`+'/profile/landparcel'}>Landparcel</Link>

                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Chennaiah Polam</Typography>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <Link href={'/operator/'+`${id}`+'/profile/landparcel/add-crops/0'} sx={{ textDecoration: 'none' }}><Button variant='contained'
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

                <Grid container sx={{ mt: 3 }}>
                    <Grid xs={4.5} sx={{ mb: 5 }}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                            <div className='chennaiah-polam-details'>
                                <img src={Banner}></img>
                                <Typography variant='p' className='name'>Chennaiah Polam</Typography>
                                <Typography variant='p' className='address'>H.no: 54b/TS, Megya Thanda, Rangareddy, Hyderabad,  Telangana - 500008</Typography>
                                <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                    <Grid xs={4}>
                                        <Typography variant='p' className='n'><b>5.6</b></Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography variant='p' className='n'><b>3.4</b></Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography variant='p' className='n'><b>1.2</b></Typography>
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
                                    <b><Typography variant='p'>33/95, 34/95</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Neighboring Farm</Typography>
                                    <b><Typography variant='p'>North</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Distance from the nearest service road</Typography>
                                    <b><Typography variant='p'>5km</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Land under cultivation</Typography>
                                    <b><Typography variant='p'>Crops</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Cropping systems</Typography>
                                    <b><Typography variant='p'>Monocropping</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Farming system</Typography>
                                    <b><Typography variant='p'>Cropping</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Infrastructure</Typography>
                                    <b><Typography variant='p'>Buildings</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Water resources</Typography>
                                    <b><Typography variant='p'>Borewell</Typography></b>

                                </div>

                            </div>
                        </Item>

                    </Grid>
                    <Grid xs={7.5}>
                        <Grid xs={12} className='maps'>
                            <div sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2, ml: 4 }}>
                                <div style={{ height: '300px', marginLeft: '20px' }}>

                                    <LoadScript googleMapsApiKey={apiKey}>
                                        <GoogleMap
                                            mapContainerStyle={{ height: '100%', width: '100%' }}
                                            center={{ lat: 20.5937, lng: 78.9629 }}
                                            zoom={6}
                                            options={{ mapTypeId: 'satellite' }}
                                        >
                                            <Polygon
                                                path={path1}
                                                options={{
                                                    strokeColor: 'yellow',
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 2,
                                                    fillColor: 'yellow',
                                                    fillOpacity: 0.20
                                                }}
                                            />

                                            {dots1.map((dot, index) => (
                                                <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                            ))}
                                            <Polygon
                                                path={path2}
                                                options={{
                                                    strokeColor: 'lightgreen',
                                                    strokeOpacity: 0.8,
                                                    strokeWeight: 2,
                                                    fillColor: 'lightgreen',
                                                    fillOpacity: 0.20
                                                }}
                                            />

                                            {dots2.map((dot, index) => (
                                                <div key={index} position={{ lat: dot.lat, lng: dot.lng }} />
                                            ))}
                                            <Marker position={{ lat: avgLat, lng: avgLng }}
                                                label={{
                                                    text: 'Corner Field Sorghum',
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    className: 'marker-label'
                                                }}
                                                icon={whiteMarkerIcon}
                                            />

                                        </GoogleMap>
                                    </LoadScript>


                                </div>

                            </div>
                        </Grid>
                        <Grid xs={12}>
                            <div className='crops-heading'><Typography variant='p'>Crops</Typography></div>

                            <Grid container>

                                {generateCrops()}


                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        // operator: state.landowners.landowners,
        // onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    fetchCrops: () => fetchCrops(),

}

export default connect(mapStateToProps, mapDispatchToProps)(Landparcel);