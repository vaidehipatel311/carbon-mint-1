import React,{useState,useEffect} from 'react'
import Sidebar from '../../Components/Sidebar';
import { Box, Breadcrumbs, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Header from '../../Components/Header';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CallIcon from '@mui/icons-material/Call';
import img1 from '../../assets/images/Events/Image1.png'
import img2 from '../../assets/images/Events/Image2.png'
import img3 from '../../assets/images/Events/Image3.png'
import img4 from '../../assets/images/Events/Image4.png'
import { useParams } from 'react-router-dom';
import {fetchEvents} from '../../Services/Events/actions';
import { connect } from 'react-redux';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

function EventDescription({fetchEvents}) {
    const {id} = useParams();
    const [event, setEvent] = useState([]);
    const { currentUser } = useAuth();


    useEffect(() => {
        fetchEvents()
            .then((data) => {
                const filteredEvent = data.find(p => p.id === parseInt(1, 10));
                const a = filteredEvent;
                setEvent(a);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
        {currentUser ? (
                <>
            <Header />
            <Sidebar />
            <Box sx={{ margin: '100px 20px 50px 300px' }}>
                <Grid container>
                    <Grid xs={9}>
                        <div>
                            <Grid className='links'>
                                <Breadcrumbs
                                    separator={<NavigateNextIcon fontSize="small" />}
                                    aria-label="breadcrumb">
                                    <Link underline='hover' color='inherit' href="/operator/profile">
                                        {event.owner}
                                    </Link>
                                    <Link underline='hover' color='inherit' href="/operator/profile/landparcel">
                                        {event.landparcel}
                                    </Link>
                                    <Link underline='hover' color='inherit' href="/operator/profile/landparcel/crops">
                                        {event.crops}
                                    </Link>
                                    
                                </Breadcrumbs>
                            </Grid>

                            <div className='title'>
                                <Typography variant='p'>{event.field} : {event.name} Photos</Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={3}>
                        <div className='call-icon'>
                            <CallIcon />
                            <Typography variant='p'>Operator: <b>{event.contact}</b></Typography>
                        </div>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={8} className='event-images' sx={{ mt: 2 }}>
                        <Typography variant='p' fontWeight='bold'>Event images</Typography>
                        <Grid container className='images4'>
                            <Grid xs={3}>
                                
                                    <img src={event.img1} alt='event-images' />
                            </Grid>
                            <Grid xs={3}>
                                
                                    <img src={event.img2} alt='event-images' />
                            </Grid>
                            <Grid xs={3}>
                               
                                    <img src={event.img3} alt='event-images' />
                            </Grid>
                            <Grid xs={3}>
                                
                                    <img src={event.img4} alt='event-images' />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: 2 }}>
                        <Typography variant='p' fontWeight='bold' className='notes-title'>Notes</Typography>
                        <div className='notes'>

                            <Typography variant='p'>{event.notes}</Typography>

                        </div>
                    </Grid>
                </Grid>

            </Box >
            </>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {

        events: state.events.events
    };
};

const mapDispatchToProps = {

    fetchEvents: () => fetchEvents(),
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDescription);