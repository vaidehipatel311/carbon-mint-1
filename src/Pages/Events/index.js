import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Header from '../../Components/Header';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import './events.css'
import { Button, Menu, MenuItem, Badge, TextField, Breadcrumbs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import vector from '../../assets/images/LandOwners/vector.png';
import Sidebar from '../../Components/Sidebar';
import vectorgroup from '../../assets/images/Events/vector-group.png'
import img1 from '../../assets/images/Events/Image1.png'
import img2 from '../../assets/images/Events/Image2.png'
import img3 from '../../assets/images/Events/Image3.png'
import img4 from '../../assets/images/Events/Image4.png'
import Checkbox from '@mui/material/Checkbox';
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
            })
            .catch(err => console.log(err));

        const filteredEvent = addedevents.find(p => p.id === parseInt(1, 10))
        setDraftData(filteredEvent);
        console.log(draftdata)

    }, []);

    const [formData, setFormData] = useState({
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
        evidence: []
    });

    const handleChange = (event, key) => {
        setFormData({
            ...formData,
            [key]: event.target.value
        });
    };

    const handleAdd = () => {
        if (eventGroup !== "Seed & Seedlings" || eventName !== 'Seed') {
            alert('Please select the field!')
        }
        else{
            addEvent(formData)
            navigate('/dashboard', { state: { showAlert: true } });
        }
        
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...files]);
        console.log(selectedFiles.path);
    };
    const handleDeleteFile = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };
    const handleEventForm = () => {
        setformVisible(true);
        setsubmitbutton(true);
    };
    const handleDraftForm = () => {
        setisDraft(true);
        setEventGroup("Seed & Seedlings");
        setEventName("Seed");
        setformVisible(true);
        setsubmitbutton(true);

    };


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: "20px",
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        // width: 1,
    });



    const generateGridItems = () => {

        return events.map((event, index) => (

            <Grid xs={4} key={event.id}>
                <div className="events-cards" sx={{ boxShadow: '0px 0px 12px 0px #3834341f' }}>
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
            <Header></Header>
            <Sidebar></Sidebar>

            {id == 1 ? (

                <>
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
                                    <img src={operators}></img>
                                    <div className='information'>
                                        <Typography className='operators-text' variant='p'>Land Owners</Typography><br />
                                        <b><Typography variant='p' className='numbers'>359</Typography></b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='no-acrs'>
                                    <img src={noacrs}></img>
                                    <div className='information'>
                                        <Typography className='no-acrs-text' variant='p'>No. Acrs</Typography><br />
                                        <b><Typography variant='p' className='numbers'>20583</Typography></b>
                                    </div>
                                </Item>
                            </Grid>

                            <Grid item xs={2.3}>
                                <Item className='yields'>
                                    <img src={yields}></img>
                                    <div className='information'>
                                        <Typography className='yields-text' variant='p'>Leased(Acres)</Typography><br />
                                        <b><Typography variant='p' className='numbers'>489</Typography></b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='crops'>
                                    <img src={crops}></img>
                                    <div className='information'>
                                        <Typography className='crops-text' variant='p'>Crops</Typography><br />
                                        <b><Typography variant='p' className='numbers'>359</Typography></b>
                                    </div>
                                    <img src={chart} className='information'></img>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='events'>
                                    <img src={event}></img>
                                    <div className='information'>
                                        <Typography className='events-text' variant='p'>Events</Typography><br />
                                        <b><Typography variant='p' className='numbers'>86</Typography></b>
                                    </div>
                                    <img src={vector} className='information'></img>
                                </Item>
                            </Grid>

                        </Grid>

                        <Typography variant='body1' align='left' sx={{ mt: 2 }} fontWeight="bold">Events</Typography>
                        <br></br>
                        <Grid container>
                            {generateGridItems()}
                        </Grid>
                        <Grid container sx={{ mt: 3 }} >
                            <Grid xs={9} className='total-events'>
                                <Typography sx={{ color: 'gray' }}>128 Events</Typography>
                            </Grid>
                            <Grid xs={3} className='pagination'>
                                <Stack spacing={2}>
                                    <Pagination count={3} variant="outlined" />

                                </Stack>
                            </Grid>
                        </Grid>
                    </Box >
                </>)
                :
                (<>
                    <Box sx={{ margin: '100px 20px 50px 300px' }}>
                        <Grid container>
                            <Grid xs={9}>
                                <div className='links'>
                                    <Grid>
                                        <Breadcrumbs
                                            separator={<NavigateNextIcon fontSize="small" />}
                                            aria-label="breadcrumb"

                                        >
                                            <Link underline='hover' color='inherit' href="/operator/profile">
                                                Kethavath Laxmanna
                                            </Link>
                                            <Link underline='hover' color='inherit' href="/operator/profile/landparcel">
                                                Chennaiah Polam
                                            </Link>
                                            <Link underline='hover' color='inherit' href="/operator/profile/landparcel/crops">
                                                Sorghum
                                            </Link>
                                            <Link underline='hover' color='inherit' href="/events/2">
                                                Events
                                            </Link>


                                        </Breadcrumbs>
                                    </Grid>

                                    <div className='title'>
                                        <Typography variant='p'>Corner Field : Sourgham Photos</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={3}>
                                <div className='call-icon'>
                                    <CallIcon />
                                    <Typography variant='p'>Operator: <b>+91 999 888 9898</b></Typography>
                                </div>

                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={8} className='event-images' sx={{mt:2}}>
                                <Typography variant='p' fontWeight='bold'>Event images</Typography>
                                <Grid container className='images4'>
                                    <Grid xs={3}>
                                        {isDraft ? (<><Checkbox {...label} defaultChecked color="success"
                                            sx={{ position: 'absolute', ml: -3, backgroundColor: 'white' }} /
                                        ><img src={img1}></img></>) :
                                            (<img src={img1}></img>)}
                                    </Grid>
                                    <Grid xs={3}>
                                        {isDraft ? (<><Checkbox {...label} defaultChecked color="success"
                                            sx={{ position: 'absolute', ml: -3, backgroundColor: 'white' }} /
                                        ><img src={img2}></img></>) :
                                            (<img src={img2}></img>)}
                                    </Grid>
                                    <Grid xs={3}>
                                        {isDraft ? (<><Checkbox {...label} defaultChecked color="success"
                                            sx={{ position: 'absolute', ml: -3, backgroundColor: 'white' }} /
                                        ><img src={img3}></img></>) :
                                            (<img src={img3}></img>)}
                                    </Grid>
                                    <Grid xs={3}>
                                        {isDraft ? (<><Checkbox {...label} defaultChecked color="success"
                                            sx={{ position: 'absolute', ml: -3, backgroundColor: 'white' }} /
                                        ><img src={img4}></img></>) :
                                            (<img src={img4}></img>)}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} sx={{mt:2}}>
                                <Typography variant='p' fontWeight='bold' className='notes-title'>Notes</Typography>
                                <div className='notes'>
                                    {isDraft ?
                                        (<div style={{ display: 'flex' }}>
                                            <Checkbox {...label} defaultChecked color="success" sx={{ mt: -10 }} />
                                            <Typography variant='p'>I want to present my clients the Figma files first, so it would be great if you add those as well, more manual downloads.</Typography>
                                        </div>) :
                                        (
                                            <Typography variant='p'>I want to present my clients the Figma files first, so it would be great if you add those as well, more manual downloads.</Typography>
                                        )}
                                </div>

                            </Grid>
                        </Grid>
                        {formVisible ?
                            (
                                <div className='event-form'>
                                    <div className='formheader' >
                                        <Grid container>
                                            <Grid xs={3.5}>
                                                <Typography variant='p' className='event-selection' fontWeight='bold'>Crop Event Selection
                                                </Typography>



                                            </Grid>
                                            <Grid xs={0.5}></Grid>
                                            <Grid xs={3.5} >
                                                <TextField
                                                    sx={{ width: '100%' }}
                                                    type='text'
                                                    select
                                                    label='Event Group'
                                                    onChange={(e) => setEventGroup(e.target.value)}
                                                    disabled={isDraft ? true : false}
                                                    defaultValue={isDraft ? "Seed & Seedlings" : ""}>
                                                    <MenuItem value='Seed & Seedlings'>Seed & Seedlings</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid xs={0.5}></Grid>
                                            <Grid xs={3.5}>
                                                <TextField
                                                    sx={{ width: '100%' }}
                                                    type='text'
                                                    select
                                                    label='Event Name'
                                                    onChange={(e) => setEventName(e.target.value)}
                                                    disabled={isDraft ? true : false}
                                                    defaultValue={isDraft ? "Seed" : ""}>
                                                    <MenuItem value='Seed'>Seed</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid xs={0.5}></Grid>
                                        </Grid>
                                    </div>
                                    {eventGroup && eventName ? (
                                        <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
                                            <Grid item xs={6}>
                                                <Box className='textfields'>
                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        fullWidth
                                                        // value={formData.seedlings}
                                                        onChange={(e) => handleChange(e, 'seedlings')}
                                                        label='Source of Seedlings'
                                                        sx={{ mt: "15px" }}
                                                        defaultValue={isDraft ? "On farm nursery" : ""}>
                                                        <MenuItem value='On farm nursery' >On farm nursery</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        fullWidth
                                                        label='Type of Nursery'
                                                        // value={formData.nursery}
                                                        onChange={(e) => handleChange(e, 'nursery')}
                                                        defaultValue={isDraft ? "Wet nursery" : ""}>
                                                        <MenuItem value='Wet nursery'>Wet nursery</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        fullWidth
                                                        label='Type of Nursery bed'
                                                        // value={formData.nursery_bed}
                                                        onChange={(e) => handleChange(e, 'nursery_bed')}
                                                        defaultValue={isDraft ? "Raised bed" : ""} >
                                                        <MenuItem value='Raised bed'>Raised bed</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        fullWidth
                                                        label='Type of in house (Framed structures)nursery'
                                                        // value={formData.house}
                                                        onChange={(e) => handleChange(e, 'house')}
                                                        defaultValue={isDraft ? "Open nursery" : ""}>
                                                        <MenuItem value='Open nursery'>Open nursery</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        fullWidth
                                                        label='Soil Treatment methods'
                                                        // value={formData.soil_treatment}
                                                        onChange={(e) => handleChange(e, 'soil_treatment')}
                                                        defaultValue={isDraft ? "Soil treatment by chemicals" : ""}>
                                                        <MenuItem value='Soil treatment by chemicals'>Soil treatment by chemicals</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        label='Chemicals applied'
                                                        // value={formData.chemicals}
                                                        onChange={(e) => handleChange(e, 'chemicals')}
                                                        defaultValue={isDraft ? "Chlorpyriphos" : ""}>
                                                        <MenuItem value='Chlorpyriphos'>Chlorpyriphos</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        label='Quantity applied (gm or ml)'
                                                        // value={formData.quantity}
                                                        onChange={(e) => handleChange(e, 'quantity')}
                                                        defaultValue={isDraft ? "300" : ""}>
                                                        <MenuItem value='200'>200</MenuItem>
                                                        <MenuItem value='300'>300</MenuItem>
                                                        <MenuItem value='400'>400</MenuItem>
                                                        <MenuItem value='500'>500</MenuItem>
                                                    </TextField>

                                                    <Typography variant='p' sx={{ mr: 42 }} fontWeight='bold'>Pre sowing seed Treatment</Typography>

                                                    <Grid container>
                                                        <Grid xs={6}>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Checkbox />} label="Scarification" />
                                                                <FormControlLabel control={<Checkbox color='success' defaultChecked />} label="Soaking in hot water" />
                                                                <FormControlLabel control={<Checkbox color='success' defaultChecked />} label="Soaking in chemicals" />
                                                            </FormGroup>
                                                        </Grid>
                                                        <Grid xs={6}>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Checkbox color='success' defaultChecked />} label="Soaking in cool water" />
                                                                <FormControlLabel control={<Checkbox />} label="wetting and drying " />
                                                                <FormControlLabel control={<Checkbox />} label="Others" />
                                                            </FormGroup>

                                                        </Grid>
                                                    </Grid>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        label='Variety/Hybrid name'
                                                        // value={formData.variety}
                                                        onChange={(e) => handleChange(e, 'variety')}
                                                        defaultValue={isDraft ? "Hybrid" : ""} />

                                                    <TextField
                                                        size='small'
                                                        type='number'
                                                        label='Crop Duration (Days)'
                                                        // value={formData.crop_duration}
                                                        onChange={(e) => handleChange(e, 'crop_duration')}
                                                        defaultValue={isDraft ? "90" : ""} />

                                                    <TextField
                                                        size='small'
                                                        type='number'
                                                        label='Seed rate (Kg/cent)'
                                                        // value={formData.seed_rate}
                                                        onChange={(e) => handleChange(e, 'seed_rate')}
                                                        defaultValue={isDraft ? "15" : ""} />

                                                    <TextField
                                                        size='small'
                                                        select
                                                        type='text'
                                                        label='Method of sowing'
                                                        // value={formData.sowing_method}
                                                        onChange={(e) => handleChange(e, 'sowing_method')}
                                                        defaultValue={isDraft ? "Sowing in pro-trays" : ""} >
                                                        <MenuItem value='Sowing in pro-trays'>Sowing in pro-trays</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        label='Method of irrigation'
                                                        // value={formData.irrigation_method}
                                                        onChange={(e) => handleChange(e, 'irrigation_method')}
                                                        defaultValue={isDraft ? "Flooding" : ""} />

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        select
                                                        label='Intercultural operations in nursery'
                                                        // value={formData.intercultural_operations}
                                                        onChange={(e) => handleChange(e, 'intercultural_operations')}
                                                        defaultValue={isDraft ? "Gap filling" : ""}>
                                                        <MenuItem value='Gap filling'>Gap filling</MenuItem>
                                                    </TextField>

                                                    <TextField
                                                        size='small'
                                                        type='text'
                                                        label='Recommended compitent authority'
                                                        // value={formData.recommended_competent}
                                                        onChange={(e) => handleChange(e, 'recommended_competent')}
                                                        defaultValue={isDraft ? "Chlorpyriphos" : ""}
                                                    />


                                                </Box>
                                            </Grid>


                                            <Grid item xs={6} sx={{ mt: 4 }}>
                                                <Typography variant='p' sx={{ marginLeft: "40px", marginTop: "50px" }} fontWeight='bold'>Evidence</Typography>
                                                <Grid container>

                                                    <Button
                                                        component="label"
                                                        role={undefined}
                                                        variant="contained"
                                                        tabIndex={-1}
                                                        startIcon={<CloudUploadIcon />}
                                                        size="small"
                                                        sx={{ width: "150px", marginBottom: "10px", backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348", marginLeft: "40px" }}
                                                        value={formData.evidence}
                                                        onChange={(e) => handleChange(e, 'evidence')}
                                                    >
                                                        Upload file
                                                        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                                                    </Button>

                                                    <Typography sx={{ marginLeft: "20px" }} display={isDraft ? "none" : ""}> {selectedFiles.length} Files selected </Typography>
                                                    <Grid xs={10} >
                                                        {selectedFiles.map((file, index) => (
                                                            <>
                                                                <img
                                                                    key={index}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Preview ${index}`}
                                                                    style={{ width: '100px', height: '100px', marginRight: '40px', marginLeft: "40px" }}
                                                                />
                                                                <CloseIcon className='ev-close-img' onClick={() => handleDeleteFile(index)} />
                                                            </>

                                                        ))}

                                                        {isDraft ? (<>
                                                            <Checkbox defaultChecked color="success"
                                                                sx={{ position: 'absolute', ml: 2, backgroundColor: 'white' }} />
                                                            <img
                                                                src={img1}
                                                                alt={img1}
                                                                style={{ width: '100px', height: '100px', marginRight: '40px', marginLeft: "40px" }}
                                                            />
                                                            <Checkbox defaultChecked color="success"
                                                                sx={{ position: 'absolute', ml: -3, backgroundColor: 'white' }} />
                                                            <img
                                                                src={img2}
                                                                alt={img2}
                                                                style={{ width: '100px', height: '100px', marginRight: '40px', }}
                                                            />

                                                        </>) : (<></>)}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ) : (<></>)}
                                </div>
                            ) : (<></>)
                        }

                        <div className={`myDiv ${formVisible ? 'formVisibleTrue' : 'formVisibleFalse'}`}>

                            <Button variant='outlined' className='three-buttons' sx={{ mr: 1, color: "#2B9348", border: "2px solid #2B9348" }} onClick={() => {
                                setformVisible(false); setsubmitbutton(false); setisDraft(false);
                                setEventGroup(null); setEventName(null)
                            }}>Discard</Button>

                            <Button variant='contained' className='three-buttons' sx={{ mr: 1, backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348" }} onClick={() => handleDraftForm()}>Add to Draft</Button>

                            <Button variant='contained' className='three-buttons' sx={{ backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348", display: submitbutton ? 'none' : "", }}
                                onClick={() => handleEventForm()}>Create a new event</Button>

                            {submitbutton ? (<>
                                {/* <Link href='/dashboard'> */}
                                <Button variant='contained' className='three-buttons' sx={{ backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348", display: !formVisible ? "none" : "" }} onClick={handleAdd}>Submit</Button>
                                {/* </Link> */}
                            </>) : (<></>)}
                        </div>
                    </Box >
                </>)
            }
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
    addEvent: (formData) => addEvent(formData),
    fetchAddedEvents: () => fetchAddedEvents(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);