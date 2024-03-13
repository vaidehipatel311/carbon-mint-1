import React from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import './crops.css'
import Link from '@mui/material/Link';
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';

import field_area_map from '../../assets/images/Operators/field_area_map.png'
import Banner_crops_2 from '../../assets/images/Operators/Banner_crops_2.png'
import irrigation from '../../assets/images/Operators/irrigation.png'

export default function crops() {

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));
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
                            <Link underline='hover' color='inherit' href="/operator/profile">Profile</Link>
                            <Link underline='hover' color='inherit' href="/operator/profile/landparcel">Landparcel</Link>
                            <Link underline='hover' color='inherit' href="/operator/profile/landparcel/crops">Crops</Link>

                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Chennaiah Polam</Typography>
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <Button variant='contained'
                            sx={{
                                
                                fontSize: '12px',
                                height: '40px',
                                color: 'black',
                                background: 'rgba(140, 216, 103, 1)',
                                border: '1px solid black',
                                borderRadius: '5px',
                                width:'100%'
                            }}>Add Events</Button>
                    </Grid>
                </Grid>


                <Grid container sx={{ mt: 3 }}>
                    <Grid xs={4.5} sx={{ mb: 5 }}>
                        <Item sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2 }}>
                            <div className='sourgham-details'>

                                <img src={Banner_crops_2}></img>
                                <Typography variant='p' className='name'>Sourgham</Typography>
                                <Typography variant='p' className='address'>Chennaiah Polam Corner Field</Typography>
                                <Grid container sx={{ mt: 3, textAlign: 'center' }}>
                                    <Grid xs={4}>
                                        <Typography variant='p' className='n'><b>2.4</b></Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div>
                                            <Typography variant='p' className='n'><b>1</b></Typography>
                                        </div>
                                    </Grid>
                                    <Grid xs={4}>
                                        <div>
                                            <Typography variant='p' className='n'><b>2w/6m</b></Typography>
                                        </div>
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
                                        <Typography variant='p' className='t'>Crop age</Typography>
                                    </Grid>

                                </Grid>
                            </div>
                            <hr style={{ margin: '20px' }} />

                            <div className='details'>
                                <Typography variant='p' className='title'>Details</Typography>

                                <div className='content'>
                                    <Typography variant='p'>Cropping systems</Typography>
                                    <b><Typography variant='p'>Monocropping</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Water resources</Typography>
                                    <b><Typography variant='p'>Borewell</Typography></b>

                                </div>
                                <div className='content'>
                                    <Typography variant='p'>Water Sample Test</Typography>
                                    <b><Typography variant='p'>Ph.2983</Typography></b>

                                </div>

                            </div>
                        </Item>

                    </Grid>
                    <Grid xs={7.5}>
                        <Grid xs={12}>
                            <div sx={{ boxShadow: '0px 0px 12px 0px #0000001F', paddingBottom: 2, ml: 2 }}>
                                <img src={field_area_map} style={{ width: '100%' }}></img>
                            </div>
                        </Grid>
                        <Grid xs={12}>
                        <div className='crops-heading'><Typography variant='p'>Draft</Typography></div>

                        <Grid container>
                            <Grid xs={6}>
                                <Item className='irrigation'>
                                    <div style={{ display: 'grid' }}>
                                        <b><Typography variant='p'>Irrigation</Typography></b>
                                        <Typography variant='p'>Last updated on 24/04/2022, 4:30pm</Typography>
                                    </div>
                                    <img src={irrigation}></img>
                                </Item>
                            </Grid>
                        </Grid>

                        <div className='submitted-events-title'><Typography variant='p'>Submitted Events</Typography></div>

                            <Grid container>
                                <Grid xs={6}>
                                    <Item className='seed' sx={{ background: '#ebeaea1f' }}>
                                        <div style={{ display: 'grid' }}>
                                            <Typography variant='p' sx={{fontWeight:'bold'}}>Seed and Seedlings</Typography>
                                            <Typography variant='p'>Submited on 24/04/2022, 09:20am</Typography>
                                        </div>
                                        <DoneIcon sx={{ color: 'green' }} className='doneicon' />
                                    </Item>
                                </Grid>
                                <Grid xs={6}>
                                    <Item className='land-preparation' sx={{ background: '#ebeaea1f' }}>
                                        <div style={{ display: 'grid' }}>
                                            <Typography variant='p' sx={{fontWeight:'bold'}}>Land Preparation</Typography>
                                            <Typography variant='p'>Submited on 24/04/2022, 09:20am</Typography>
                                        </div>
                                        <DoneIcon sx={{ color: 'green' }} className='doneicon' />

                                    </Item>
                                </Grid>
                            </Grid>
                    </Grid>
                    </Grid>
                    

                </Grid>
            </Box>
        </>
    )
}
