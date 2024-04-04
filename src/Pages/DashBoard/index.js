import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import './style.css'
import ErrorPage from '../ErrorPage/ErrorPage'
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Avatar, Box, Grid, Typography } from '@mui/material'
import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crop from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import operator_chart from '../../assets/images/DashBoard/operator_chart.png'
import event_chart from '../../assets/images/DashBoard/event_chart.png'
import crops_chart from '../../assets/images/DashBoard/crops_chart.png'
import yield_chart from '../../assets/images/DashBoard/yield_chart.png'
import india from '../../assets/images/DashBoard/india.png'
import india_dotted from '../../assets/images/DashBoard/india_dotted.png'
import person_location from '../../assets/images/DashBoard/person_location.png'
import corner_field from '../../assets/images/DashBoard/corner_field.png'
import year_month from '../../assets/images/DashBoard/year_month.png'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PreviewIcon from '@mui/icons-material/Preview';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import { fetchOperator, fetchCrops } from '../../Services/Operator/actions'
import { fetchEvents } from '../../Services/Events/actions'
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../../AuthProvider';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function DashBoard({ fetchOperator, fetchCrops, fetchEvents }) {
    const location = useLocation();
    const [openAlert, setOpenAlert] = useState(false);
    const [operator, setOperator] = useState([]);
    const [crops, setCrops] = useState([]);
    const [event, setEvent] = useState([]);
    const { currentUser } = useAuth();


    useEffect(() => {
        fetchOperator()
            .then((data) => {
                setOperator(data)
            })
            .catch(error => {
                console.error('Error fetching total operator:', error);
            });

        fetchCrops()
            .then((data) => {
                setCrops(data)
            })
            .catch(error => {
                console.error('Error fetching total operator:', error);
            });
        fetchEvents()
            .then((data) => {
                setEvent(data)
            })
            .catch(error => {
                console.error('Error fetching total operator:', error);
            });
        if (location.state && location.state.showAlert) {
            setOpenAlert(true);
        }
    }, [location]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const generateTablerows = () => {
        return operator.map((data) => (
            <TableBody>
                <TableRow sx={{ fontSize: '10px' }}>
                    <TableCell component="th" scope="row" sx={{ display: 'flex', marginTop: '2px' }}>
                        <Avatar sx={{ background: 'none' }}><img src={corner_field} className='person-icon'></img></Avatar>
                        <Typography variant='p' sx={{ marginTop: '10px' }}>{data.name}</Typography>
                    </TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell sx={{ color: data.status === 'Approved' ? 'green' : 'orange' }}>{data.status}</TableCell>
                    <TableCell><PreviewIcon /></TableCell>
                </TableRow>

            </TableBody>
        ));
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            {currentUser ? (
                <>
                    <Header />
                    <Sidebar />
                    <Box sx={{ margin: '100px 20px 50px 300px' }}>
                        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                            <Alert sx={{ ml: 70, mt: -10 }} onClose={handleCloseAlert} severity="success">
                                Submitted the Field Preparation event details successfully
                            </Alert>
                        </Snackbar>
                        <Grid container sx={{ width: '100%' }}>
                            <Grid xs={9}>
                                <Typography className='title' variant='p'>Agent view</Typography>
                            </Grid>
                            <Grid xs={3}>
                                <SearchIcon className='search-icon' />
                                <input type='text' placeholder='Search..' />
                            </Grid>

                        </Grid>


                        <Grid container className='cards'>
                            <Grid item xs={2.3}>
                                <Item className='operators'>
                                    <img src={operators}></img>
                                    <div className='information'>
                                        <Typography className='operators-text' variant='p'>Operators</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{operator.length}</Typography></b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='no-acrs'>
                                    <img src={noacrs}></img>
                                    <div className='information'>
                                        <Typography className='no-acrs-text' variant='p'>No. Acrs</Typography><br />
                                        <b><Typography variant='p' className='numbers'>-</Typography></b>
                                    </div>
                                </Item>
                            </Grid>

                            <Grid item xs={2.3}>
                                <Item className='yields'>
                                    <img src={yields}></img>
                                    <div className='information'>
                                        <Typography className='yields-text' variant='p'>Yield</Typography><br />
                                        <b><Typography variant='p' className='numbers'>-</Typography></b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='crops'>
                                    <img src={crop}></img>
                                    <div className='information'>
                                        <Typography className='crops-text' variant='p'>Crops</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{crops.length}</Typography></b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='events'>
                                    <img src={events}></img>
                                    <div className='information'>
                                        <Typography className='events-text' variant='p'>Events</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{event.length}</Typography></b>
                                    </div>
                                </Item>
                            </Grid>

                        </Grid>



                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <div className='operator-chart'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Operator</Typography>
                                        <select className='country-dropdown'>
                                            <option>India</option>
                                            <option>U.S.A</option>
                                            <option>China</option>
                                            <option>Russia</option>
                                            <option>Australia</option>
                                        </select>
                                        <Typography className='date' variant='p'>July, 2022</Typography>
                                        <img src={year_month} className='year_month_img'></img>

                                        <img src={operator_chart} className='chart-img'></img>
                                        <Grid container className='lists'>
                                            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <li style={{ color: 'green' }}></li>Active-operators

                                            </Grid>
                                            <Grid xs={6} sx={{ display: 'flex' }}>
                                                <li style={{ color: '#8CD867' }}></li>Events Activity

                                            </Grid>
                                        </Grid>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3.5}>
                                <div className='event-chart'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Event</Typography>
                                        <select className='states-dropdown'>
                                            <option>Hyderabad</option>
                                            <option>Gujarat</option>
                                            <option>Rajasthan</option>
                                            <option>Kerela</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <img src={year_month} className='year_month_img'></img>

                                        <img src={event_chart} className='chart-img'></img>
                                        <Grid container className='lists'>
                                            <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <li style={{ color: 'green' }}></li>Events

                                            </Grid>
                                            <Grid xs={6} sx={{ display: 'flex' }}>
                                                <li style={{ color: '#FFC9B9' }}></li>Archive

                                            </Grid>
                                        </Grid>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3.5}>
                                <div className='crops-chart'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Crops</Typography>
                                        <select className='states-dropdown'>
                                            <option>Hyderabad</option>
                                            <option>Gujarat</option>
                                            <option>Rajasthan</option>
                                            <option>Kerela</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <select className='all-dropdown'>
                                            <option>All</option>
                                            <option>Hyderabad</option>
                                            <option>Gujarat</option>
                                            <option>Rajasthan</option>
                                            <option>Kerela</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <Grid container>
                                            <Grid xs={7}>
                                                <img src={crops_chart} className='chart-img'></img>
                                            </Grid>
                                            <Grid xs={5}>
                                                <Grid className='lists'>


                                                    <Grid xs={12}>
                                                        <li style={{ color: '#8CD867' }}><p style={{ color: 'black', position: 'relative', display: 'inline' }}>Sorgham</p></li>
                                                    </Grid>
                                                    <Grid xs={12}>
                                                        <li style={{ color: '#ED7D3A' }}><p style={{ color: 'black', position: 'relative', display: 'inline' }}>Finger Millet</p></li>
                                                    </Grid>
                                                    <Grid xs={12}>
                                                        <li style={{ color: '#EFEFF0' }}><p style={{ color: 'black', position: 'relative', display: 'inline' }}>Others</p></li>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </div>
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container spacing={1}>
                            <Grid item xs={3.5}>
                                <div className='upcoming'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Up Coming</Typography>
                                        <Typography className='date' variant='p'>July, 2022</Typography>
                                        <img src={year_month} className='year_month_img'></img>

                                        <Grid className='days'>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Mon</Typography>
                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' color='black'><b>Tue</b></Typography>
                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Wed</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Thu</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Fri</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Sat</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p'>Sun</Typography>

                                            </Grid>
                                        </Grid>

                                        <Grid className='numbers'>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' className='num-background'>10</Typography>
                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' className='num-background'>11</Typography>
                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' sx={{
                                                    height: '34px',
                                                    padding: '20px 5px 20px 5px',
                                                    borderRadius: '8px',
                                                    background: '#2B9348'
                                                }}>12</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' className='num-background'>13</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' className='num-background'>14</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' sx={{
                                                    height: '34px',
                                                    padding: '20px 5px 20px 5px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(140, 216, 103, 1)'
                                                }}>15</Typography>

                                            </Grid>
                                            <Grid xs={1.7}>
                                                <Typography variant='p' className='num-background'>16</Typography>

                                            </Grid>
                                        </Grid>


                                        <Grid>
                                            <div className='lists'>
                                                <Grid xs={12}>
                                                    <li style={{ color: '#8CD867' }}>
                                                        <Typography variant='p' className='upcoming-event'>Event Name Here </Typography >
                                                        <Typography variant='p' className='upcoming-datetime'>Wed 12, 10:30am</Typography >
                                                    </li>
                                                </Grid>
                                                <Grid xs={12}>
                                                    <li style={{ color: '#8CD867' }}>
                                                        <Typography variant='p' className='upcoming-event'>Event Name Here </Typography >
                                                        <Typography variant='p' className='upcoming-datetime'>Wed 15, 10:30am</Typography >
                                                    </li>
                                                </Grid>
                                            </div>

                                        </Grid>

                                    </div >
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div className='yield-chart'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Yield</Typography>
                                        <select className='states-dropdown'>
                                            <option>Hyderabad</option>
                                            <option>Gujarat</option>
                                            <option>Rajasthan</option>
                                            <option>Kerela</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <img src={year_month} className='year_month_img'></img>

                                        <Grid container>
                                            <Grid xs={9}>
                                                <img src={yield_chart} className='chart-img'></img>

                                            </Grid>
                                            <Grid xs={3}>
                                                <div className='lists'>
                                                    <li style={{ color: 'green', position: 'relative' }}>
                                                        <p style={{ color: 'black', position: 'relative', display: 'inline' }}>Sorghum</p></li>
                                                    <li style={{ color: 'red', position: 'relative' }}>
                                                        <p style={{ color: 'black', position: 'relative', display: 'inline' }}>Finger Millet</p></li>
                                                    <li style={{ color: '#EFEFF0', position: 'relative' }}>
                                                        <p style={{ color: 'black', position: 'relative', display: 'inline' }}>Add</p></li>
                                                </div>
                                            </Grid>
                                        </Grid>


                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3.5}>
                                <div className='status-chart'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>
                                        <Typography variant='p' className='title'>Status</Typography>
                                        <select className='operator-dropdown'>
                                            <option>Operators</option>
                                            <option>Gujarat</option>
                                            <option>Rajasthan</option>
                                            <option>Kerela</option>
                                            <option>Maharashtra</option>
                                        </select>
                                        <select className='country-dropdown'>
                                            <option>India</option>
                                            <option>U.S.A</option>
                                            <option>China</option>
                                            <option>Russia</option>
                                            <option>Australia</option>
                                        </select>
                                        <div style={{ display: 'flex', fontSize: '12px' }}>
                                            <img src={india} className='india-img'></img>
                                            <img src={india_dotted} className='india-dotted-img'></img>
                                            <img src={person_location} className='person-location-img'></img>
                                            <div className='lists'>
                                                <li style={{ color: '#8CD867', position: 'relative' }}>
                                                    <p style={{ color: 'black', position: 'relative', display: 'inline' }}>Active</p></li>
                                                <li style={{ color: '#ED7D3A', position: 'relative' }}>
                                                    <p style={{ color: 'black', position: 'relative', display: 'inline' }}>Inactive</p></li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <div className='onboarding'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f' }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow sx={{ background: 'rgba(249, 249, 249, 1)' }}>
                                                    <TableCell>Onboarding</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>View</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {generateTablerows()}

                                        </Table>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={3.5}>
                                <div className='events-lists'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>


                                        <Grid container>
                                            <Grid item xs={9}>
                                                <Typography className='title' variant='p'>Events</Typography><br />
                                                {event.map((event, index) => (

                                                    <Typography className='content' variant='p' sx={{ mt: 4 }}>{event.village}, {event.district}</Typography>

                                                ))}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <div className='viewall'>


                                                    <Typography className='title' variant='p' sx={{ color: 'rgb(52, 156, 52)' }}>View</Typography><br />
                                                    <b><Typography className='content' variant='p' sx={{ mt: 4 }}>{event.length}</Typography></b>
                                                    
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>


                                </div>

                            </Grid>
                            <Grid item xs={3.5}>
                                <div className='todo'>
                                    <div style={{ boxShadow: '0px 0px 12px 0px #3834341f', padding: '16px 16px' }}>

                                        <Typography className='title' variant='p'>Todo</Typography>
                                        <Typography className='viewall' variant='p' sx={{ color: 'rgb(52, 156, 52)', float: 'right' }}>View All</Typography>
                                        <div className='checkbox'>
                                            <Checkbox {...label} color="success" />Finish the Operator onboarding<br />
                                            <Checkbox {...label} color="success" />Attend the event in Kolluru<br />
                                            <Checkbox {...label} defaultChecked color="success" />Submit the events to blackbchain<br />
                                            <Checkbox {...label} defaultChecked color="success" />Label<br />
                                            <Checkbox {...label} color="success" />Label<br />
                                            <Checkbox {...label} color="success" />Label
                                        </div>
                                    </div>
                                </div>

                            </Grid>

                        </Grid>

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
    }
}

const mapDispatchToProps = {
    fetchOperator: () => fetchOperator(),
    fetchCrops: () => fetchCrops(),
    fetchEvents: () => fetchEvents()

}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
