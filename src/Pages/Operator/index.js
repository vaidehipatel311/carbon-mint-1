import React, { useState, useEffect } from 'react'
import './operator.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link'
import { Avatar, Button, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crop from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import vector from '../../assets/images/LandOwners/vector.png'
import avatar from '../../assets/images/LandOwners/avatar.png'
import chart from '../../assets/images/LandOwners/Chart.png'

import * as action from '../../Services/Operator/actions';
import { fetchEvents } from '../../Services/Events/actions'
import { fetchCrops } from '../../Services/Operator/actions';
import axios from 'axios';
import * as urls from '../../Config/urls';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Operators({ fetchOperator, fetchCrops, fetchEvents }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { addOperatorId } = useParams();
    const [operator, setOperator] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [pageOperator, setPageOperator] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);
    const [crops, setCrops] = useState([]);
    const [event, setEvent] = useState([]);
    const [acres, setAcres] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { currentUser } = useAuth();




    useEffect(() => {
        fetchOperator()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setOperator(approved);
                const pending = data.filter((p) => p.status === "Pending");
                setonboarding(pending);

                const acresa = approved.reduce((total, owner) => total + owner.acres, 0);
                const acresp = pending.reduce((total, owner) => total + owner.acres, 0);
                const total = parseInt(acresa) + parseInt(acresp);
                setAcres(total);
            })
            .catch(err => console.log(err));

        // fetchCrops()
        //     .then((data) => {
        //         console.log(data);
        //         setCrops(data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching total operator:', error);
        //     });


        // fetchEvents()
        //     .then((data) => {
        //         setEvent(data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching total operator:', error);
        //     });

    }, [operator]);

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

    const itemsPerPageOperator = 1;
    const startIndexOperator = (pageOperator - 1) * itemsPerPageOperator;
    const endIndexOperator = pageOperator * itemsPerPageOperator;
    const paginatedProductOperator = operator.slice(startIndexOperator, endIndexOperator);

    const handleChangePageOperator = (event, newPageOperator) => {
        setPageOperator(newPageOperator);
    };

    const itemsPerPageOnboarding = 1;
    const startIndexOnboarding = (pageOnboarding - 1) * itemsPerPageOnboarding;
    const endIndexOnboarding = pageOnboarding * itemsPerPageOnboarding;
    const paginatedProductOnboarding = onboarding.slice(startIndexOnboarding, endIndexOnboarding);

    const handleChangePageOnboarding = (event, newPageOnboarding) => {
        setPageOnboarding(newPageOnboarding);
    };

    const handleClickOpen = () => {
        setOpen(true)
    };

    function handleClose() {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            const updatedCartjson = [...operator];
            setOperator(updatedCartjson);
            await axios.delete(urls.operatorUrl + `/${id}`);

        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    const handleProfile = (id) => {
        navigate('/operator/' + `${id}`)
    }
    const generateLandOwners = () => {
        return paginatedProductOperator.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)", borderRight: '1px solid #d7d7d7' }}>{owners.ownerID}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.passbook_refno}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.contact_number_1}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.village}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>
                        {owners.crops.split(',').map((crop, cropIndex) => (
                            <button key={cropIndex} className="grid-button" style={{ marginRight: '5px' }}>{crop.trim()}</button>
                        ))}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>
                        <Link href={'/operator/add-operator/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
                        <DeleteOutlineIcon onClick={handleClickOpen} sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} /></TableCell>

                </TableRow>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <b>Are you sure you want to delete ?</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={() => handleDelete(owners.id)}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </TableBody>
        ));
    }
    const generateOnBoarding = () => {
        return paginatedProductOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7' }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)", borderRight: '1px solid #d7d7d7' }}>{owners.ownerID}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.aadhar_no}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.contact_number_1}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>{owners.village}</TableCell>
                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>

                    <TableCell align='center' sx={{ cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}><RemoveRedEyeIcon /></TableCell>



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
                        Operator details added successfully
                    </Alert>
                </Snackbar>
                <Grid container className='right-part-landowner'>
                    <Grid xs={6.5}>
                        <Typography className='title' variant='p'>Operators</Typography>
                    </Grid>
                    <Grid xs={3}>
                        <SearchIcon className='search-icon' />
                        <input type='text' placeholder='Search..' />
                    </Grid>
                    <Grid xs={0.5}>
                        <Badge color='success' variant='dot' className='filter-icon'><FilterAltIcon /></Badge>
                    </Grid>

                    <Grid xs={2}>

                        <Link href='/operator/add-operator/0'>
                            <Button variant='contained' className='add-landowner-btn'>Add Operator</Button>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container className='cards'>
                    <Grid item xs={2.3}>
                        <Item className='operators'>
                            <img src={operators}></img>
                            <div className='information'>
                                <Typography className='operators-text' variant='p'>Operators</Typography><br />
                                <b><Typography variant='p' className='numbers'>{operator.length + onboarding.length}</Typography></b>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={2.3}>
                        <Item className='no-acrs'>
                            <img src={noacrs}></img>
                            <div className='information'>
                                <Typography className='no-acrs-text' variant='p'>No. Acrs</Typography><br />
                                <b><Typography variant='p' className='numbers'>{acres}</Typography></b>
                            </div>
                        </Item>
                    </Grid>

                    <Grid item xs={2.3}>
                        <Item className='yields'>
                            <img src={yields}></img>
                            <div className='information'>
                                <Typography className='yields-text' variant='p'>Active Crops</Typography><br />
                                <b><Typography variant='p' className='numbers'>-</Typography></b>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={2.3}>
                        <Item className='crops'>
                            <img src={crop}></img>
                            <div className='information'>
                                <Typography className='crops-text' variant='p'>Crops</Typography><br />
                                <b><Typography variant='p' className='numbers'>{crops}</Typography></b>
                            </div>
                            <img src={chart} className='information'></img>
                        </Item>
                    </Grid>
                    <Grid item xs={2.3}>
                        <Item className='events'>
                            <img src={events}></img>
                            <div className='information'>
                                <Typography className='events-text' variant='p'>Events</Typography><br />
                                <b><Typography variant='p' className='numbers'>{event}</Typography></b>
                            </div>
                            <img src={vector} className='information'></img>
                        </Item>
                    </Grid>

                </Grid>


                <Grid container>
                    <TableContainer>
                        <Table className='table' >
                            <TableBody >
                                <TableRow className='th'>

                                    <TableCell className='tc' align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Operators</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>ID</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>PassBook Ref No.</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Contact No</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Village</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Crops</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Actions</TableCell>
                                </TableRow>
                            </TableBody>

                            {generateLandOwners()}

                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container sx={{ mt: 3 }} >
                    <Grid xs={9} className='total-events'>
                        <Typography sx={{ color: 'gray' }}>{operator.length} {operator.length <= 1 ? 'Operator' : 'Operators'} </Typography>
                    </Grid>
                    <Grid xs={3} className='pagination'>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(operator.length / itemsPerPageOperator)}
                                variant='outlined'
                                page={pageOperator}
                                onChange={handleChangePageOperator} />

                        </Stack>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container>
                    <TableContainer>
                        <Table className='table'>
                            <TableBody >
                                <TableRow className='th'>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Onboarding Operators</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>ID</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Aadhar Card</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Contact No</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Village</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Status</TableCell>
                                    <TableCell align='center' sx={{ borderRight: '1px solid #d7d7d7' }}>Actions</TableCell>
                                </TableRow>
                            </TableBody>

                            {generateOnBoarding()}

                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container sx={{ mt: 3 }} >
                    <Grid xs={9} className='total-events'>
                        <Typography sx={{ color: 'gray' }}>{onboarding.length} {onboarding.length <= 1 ? 'Operator' : 'Operators'} </Typography>
                    </Grid>
                    <Grid xs={3} className='pagination'>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(onboarding.length / itemsPerPageOnboarding)}
                                variant='outlined'
                                page={pageOnboarding}
                                onChange={handleChangePageOnboarding} />


                        </Stack>
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
        landOwners: state.landowners.landowners,
    };
};

const mapDispatchToProps = {
    fetchOperator: () => action.fetchOperator(),
    fetchCrops: () => fetchCrops(),
    fetchEvents: () => fetchEvents()
}

export default connect(mapStateToProps, mapDispatchToProps)(Operators);