import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Header from '../../Components/Header';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import './events.css'
import { Button, Menu, MenuItem, Badge, TextField, Breadcrumbs, Alert, Snackbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import vector from '../../assets/images/LandOwners/vector.png';
import Sidebar from '../../Components/Sidebar';
import vectorgroup from '../../assets/images/Events/vector-group.png'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CallIcon from '@mui/icons-material/Call';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { addEvent, fetchAddedEvents, fetchEvents } from '../../Services/Events/actions';
import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crops from '../../assets/images/DashBoard/crops.png'
import event from '../../assets/images/DashBoard/events.png'
import chart from '../../assets/images/LandOwners/Chart.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Events({ fetchEvents, addEvent, fetchAddedEvents }) {
    const navigate = useNavigate();

    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const [addedevents, setaddedEvents] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [eventGroup, setEventGroup] = useState('');
    const [eventName, setEventName] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formVisible, setformVisible] = useState(false);
    const [submitbutton, setsubmitbutton] = useState(false);
    const [filterValue, setFiltervalue] = useState('');
    const [showFilterValue, setshowFilterValue] = useState(false);
    const [isDraft, setisDraft] = useState(false);
    const [draftdata, setDraftData] = useState([]);
    const [norecord, setnorecord] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setshowFilterValue(true)
    };

    useEffect(() => {
        fetchEvents()
            .then((data) => {
                setEvents(data);
            })
            .catch(err => console.log(err));

        fetchAddedEvents()
            .then((data) => {
                setaddedEvents(data);
                const filteredEvent = addedevents.find(p => p.id === parseInt(2, 10));
                setDraftData(filteredEvent);
            })
            .catch(err => console.log(err));
    }, [draftdata]);

    const formik = useFormik({
        initialValues: {
            seedlings: '',
            nursery: '',
            nursery_bed: '',
            house: '',
            soil_treatment: '',
            chemicals: '',
            quantity: '',
            seed_treatment: '',
            variety: '',
            crop_duration: '',
            seed_rate: '',
            sowing_method: '',
            irrigation_method: '',
            intercultural_operations: '',
            recommended_competent: '',
            scarcification: '',
            soaking_hot_water: '',
            soaking_chemicals: '',
            soaking_cool_water: '',
            wetting_drying: '',
            others: '',
            evidence: ""
        },
        onSubmit: (values) => {
            if (eventGroup !== "Seed & Seedlings" || eventName !== 'Seed') {
                alert('Please select the field!');

            }
            else {
                addEvent(values)
                navigate('/dashboard', { state: { showAlert: true } });
            }
        }
    })

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = [];
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64data = reader.result;
                fileArray.push(base64data);
                if (fileArray.length === files.length) {
                    setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
                    formik.setFieldValue('evidence', [...selectedFiles, ...fileArray]);
                }
            };
        });
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };
    const handleEventForm = () => {
        setnorecord(false);
        setformVisible(true);
        setsubmitbutton(true);
    };
    const handleDraftForm = () => {
        if (addedevents.length <= 1) {
            setnorecord(true);
        }
        else {
            setisDraft(true);
            setEventGroup("Seed & Seedlings");
            setEventName("Seed");
            setformVisible(true);
            setsubmitbutton(true);
        }

    };

    const handleDiscard = () => {
        setformVisible(false);
        setsubmitbutton(false);
        setisDraft(false);
        setEventGroup(null);
        setEventName(null);
        setnorecord(false);
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: "20px",
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
    });

    const generateGridItems = () => {

        return events.map((event, index) => (

            <Grid xs={4} key={event.id}>
                <Link href={'/events/eventDescription/' + `${event.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="events-cards" style={{ boxShadow: '0px 0px 12px 0px #3834341f' }}>
                        <Grid xs={9}>
                            <div style={{ display: 'grid' }}>
                                <div style={{ display: "flex" }} align="center">
                                    <Typography variant="p" className='fieldname' >
                                        {event.field} :
                                    </Typography>
                                    <Typography variant="p" className='crop-name' >
                                        {event.name}
                                    </Typography>

                                </div>
                                <div style={{ display: "flex" }} >

                                    <Typography variant="p" className='date' >
                                        {event.date} ,
                                    </Typography>
                                    <Typography variant="p" className='time'>
                                        {event.time}
                                    </Typography>
                                </div>
                            </div>

                        </Grid>

                        <Grid xs={3}>
                            <img className='vector-img' src={vectorgroup} alt={vector}></img>
                        </Grid>
                    
                </div>
                </Link>
            </Grid >

        ));
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Header />
            <Sidebar />

                <Box sx={{ margin: '100px 20px 50px 300px' }}>
                    <Grid container className='right-part-landowner'>
                        <Grid xs={8.5}>
                            <Typography className='title' variant='p'>Events</Typography>
                        </Grid>
                        <Grid xs={3}>
                            <SearchIcon className='search-icon' />
                            <input type='text' placeholder='Search..' />
                        </Grid>
                        <Grid xs={0.5}>
                            <Badge color='success' variant='dot' className='filter-icon'><FilterAltIcon onClick={handleClick} /></Badge>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >

                                <Typography type="p" className='filter' fontWeight='bold'>Filter</Typography>

                                <MenuItem >
                                    <input type='text' placeholder="Operator" className='textfield' />
                                </MenuItem>

                                <MenuItem>
                                    <input type='text' placeholder="Land Parcel" className='textfield' value={filterValue} onChange={((event) => setFiltervalue(event.target.value))} />
                                </MenuItem>

                                <MenuItem>
                                    <input type='text' placeholder='Location' className='textfield' />
                                </MenuItem>

                                <MenuItem >
                                    <select className='select' placeholder='Type of Event'>

                                        <option>Corner Field</option>
                                        <option>Lake Edge</option>
                                    </select>
                                </MenuItem>

                                <Button variant='outlined' className="buttons" sx={{ ml: "95px", mr: "15px" }}>Clear</Button>
                                <Button variant='contained' className="buttons" onClick={handleClose}>Submit</Button>

                            </Menu >
                            {showFilterValue ? (<Typography>{filterValue}</Typography>) : (<></>)}
                        </Grid>
                    </Grid>

                    <Grid container className='cards'>
                        <Grid item xs={2.3}>
                            <Item className='operators'>
                                <img src={operators} alt='event-images'></img>
                                <div className='information'>
                                    <Typography className='operators-text' variant='p'>Land Owners</Typography><br />
                                    <b><Typography variant='p' className='numbers'>359</Typography></b>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={2.3}>
                            <Item className='no-acrs'>
                                <img src={noacrs} alt='event-images'></img>
                                <div className='information'>
                                    <Typography className='no-acrs-text' variant='p'>No. Acrs</Typography><br />
                                    <b><Typography variant='p' className='numbers'>20583</Typography></b>
                                </div>
                            </Item>
                        </Grid>

                        <Grid item xs={2.3}>
                            <Item className='yields'>
                                <img src={yields} alt='event-images'></img>
                                <div className='information'>
                                    <Typography className='yields-text' variant='p'>Leased(Acres)</Typography><br />
                                    <b><Typography variant='p' className='numbers'>489</Typography></b>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={2.3}>
                            <Item className='crops'>
                                <img src={crops} alt='event-images'></img>
                                <div className='information'>
                                    <Typography className='crops-text' variant='p'>Crops</Typography><br />
                                    <b><Typography variant='p' className='numbers'>359</Typography></b>
                                </div>
                                <img src={chart} className='information' alt='event-images'></img>
                            </Item>
                        </Grid>
                        <Grid item xs={2.3}>
                            <Item className='events'>
                                <img src={event} alt='event-images'></img>
                                <div className='information'>
                                    <Typography className='events-text' variant='p'>Events</Typography><br />
                                    <b><Typography variant='p' className='numbers'>86</Typography></b>
                                </div>
                                <img src={vector} className='information' alt='event-images'></img>
                            </Item>
                        </Grid>

                    </Grid>

                    <Typography variant='body1' align='left' sx={{ mt: 2 }} fontWeight="bold">Events</Typography>
                    <br />
                    <Grid container>
                        {generateGridItems()}
                    </Grid>
                    <Grid container sx={{ mt: 3 }} >
                        <Grid xs={9} className='total-events'>
                            <Typography sx={{ color: 'gray' }}>{events.length} {events.length == 1 ? 'Event' : "Events"}</Typography>
                        </Grid>
                        <Grid xs={3} className='pagination'>
                            <Stack spacing={2}>
                                <Pagination count={3} variant="outlined" />
                            </Stack>
                        </Grid>
                    </Grid>

                    
                </Box >

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
    addEvent: (formik) => addEvent(formik),
    fetchAddedEvents: () => fetchAddedEvents(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);