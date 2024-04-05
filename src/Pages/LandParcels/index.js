import React, { useState, useEffect } from 'react'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Avatar, Button, Typography, TextField } from '@mui/material'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit'
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crop from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import avatar from '../../assets/images/LandParcels/avatar.png'
import Banner from '../../assets/images/LandParcels/Banner.png'
import axios from 'axios';
import * as urls from '../../Config/urls';
import * as action from '../../Services/LandParcels/actions';
import { fetchCrops } from '../../Services/Operator/actions'
import { fetchEvents } from '../../Services/Events/actions'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function LandParcels({ fetchLandParcel, fetchCrops, fetchEvents }) {
    const navigate = useNavigate()
    const location = useLocation();

    const [landParcels, setLandParcels] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [showTable, setshowtable] = useState(true);
    const [pageLandparcel, setPageLandparcel] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);
    const [crops, setCrops] = useState([]);
    const [event, setEvent] = useState([]);
    const [acres, setAcres] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const [villageF, setVillageF] = useState('');
    const [districtF, setdistrictF] = useState('');
    const [stateF, setstateF] = useState('');
    const [countryF, setcountryF] = useState('');
    const [filterCriteria, setFilterCriteria] = useState([]);

    const [fL, setFL] = useState([]);
    const [fO, setFO] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFilterValue, setshowFilterValue] = useState(false);
    const { currentUser } = useAuth();

    const query = new URLSearchParams(location.search).get('query');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedLandParcels, setSearchedLandParcels] = useState("");
    const [searchedOnboarding, setSearchedOnboarding] = useState("");



    useEffect(() => {
        fetchLandParcel()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setLandParcels(approved);
                const pending = data.filter((p) => p.status === "Pending");
                setonboarding(pending);

                const acresa = approved.reduce((total, owner) => total + owner.acres, 0);
                const acresp = pending.reduce((total, owner) => total + owner.acres, 0);
                const total = parseInt(acresa) + parseInt(acresp)
                setAcres(total)
            })
            .catch(err => console.log(err))

        fetchCrops()
            .then((data) => {
                const c = landParcels.map((p)=>p.id);

                const allFilteredCrops = [];

                c.forEach((landParcelId) => {
                    const filteredCrops = data.filter((crop) => crop.landparcel_id == landParcelId);
                    allFilteredCrops.push(...filteredCrops);
                });
                setCrops(allFilteredCrops);
                console.log(allFilteredCrops);
                setCrops(allFilteredCrops)
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

    }, [landParcels]);

    useEffect(() => {
        if (location.state && location.state.showAlert && !openAlert) {
            setOpenAlert(true);
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.length == 1) {
            navigate('/landparcels');
        }

        else {
            navigate('/landparcels?query=' + `${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        if (query) {
            const sLP = landParcels.filter((item) => {
                return (
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.district.toLowerCase().includes(query.toLowerCase()) ||
                    item.contact_number_1.toLowerCase().includes(query.toLowerCase()) ||
                    item.village.toLowerCase().includes(query.toLowerCase())
                );
            });


            const sO = onboarding.filter((item) => {
                return (
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.district.toLowerCase().includes(query.toLowerCase()) ||
                    item.contact_number_1.toLowerCase().includes(query.toLowerCase()) ||
                    item.village.toLowerCase().includes(query.toLowerCase())
                );
            });

            setSearchedLandParcels(sLP);
            setSearchedOnboarding(sO);
        }
        else {
            setSearchedLandParcels([]);
            setSearchedOnboarding([]);
        }
    }, [query, searchedLandParcels, searchedOnboarding]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const itemsPerPageLandparcel = 1;
    const startIndexLandparcel = (pageLandparcel - 1) * itemsPerPageLandparcel;
    const endIndexLandparcel = pageLandparcel * itemsPerPageLandparcel;
    const paginatedProductLandparcel = landParcels.slice(startIndexLandparcel, endIndexLandparcel);

    const handleChangePageLandparcel = (event, newPageLandparcel) => {
        setPageLandparcel(newPageLandparcel);
    };

    const itemsPerPageOnboarding = 1;
    const startIndexOnboarding = (pageOnboarding - 1) * itemsPerPageOnboarding;
    const endIndexOnboarding = pageOnboarding * itemsPerPageOnboarding;
    const paginatedProductOnboarding = onboarding.slice(startIndexOnboarding, endIndexOnboarding);

    const handleChangePageOnboarding = (event, newPageOnboarding) => {
        setPageOnboarding(newPageOnboarding);
    };

    const handleGrid = () => { setshowtable(false); console.log("handle") }

    const handleTable = () => { setshowtable(true); console.log("handle") }

    const handleClickOpen = () => {
        setOpen(true)
    };

    function handleClose() {
        setOpen(false);
    };

    const handleCloseF = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteFilter = (index, value) => {
        const updated = filterCriteria.filter((_, i) => i !== index);
        setFilterCriteria(updated);

        if (updated.length >= 1) {
            const value = updated[0];
            const newfilteredLandOwners = paginatedProductLandparcel.filter(owner => {
                return (
                    owner.village.toLowerCase().includes(value.toLowerCase()) ||
                    owner.district.toLowerCase().includes(value.toLowerCase()) ||
                    owner.state.toLowerCase().includes(value.toLowerCase()) ||
                    owner.country.toLowerCase().includes(value.toLowerCase())
                );
            });
            const newfilteredOnboarding = paginatedProductOnboarding.filter(owner => {
                return (
                    owner.village.toLowerCase().includes(value.toLowerCase()) ||
                    owner.district.toLowerCase().includes(value.toLowerCase()) ||
                    owner.state.toLowerCase().includes(value.toLowerCase()) ||
                    owner.country.toLowerCase().includes(value.toLowerCase())
                );
            });


            setFL(newfilteredLandOwners);
            setFO(newfilteredOnboarding);
            setshowFilterValue(true);
        }
    }

    const handleFilterSubmit = () => {
        const filteredLandParcels = paginatedProductLandparcel.filter(owner => {
            return (
                owner.village.toLowerCase().includes(villageF.toLowerCase()) &&
                owner.district.toLowerCase().includes(districtF.toLowerCase()) &&
                owner.state.toLowerCase().includes(stateF.toLowerCase()) &&
                owner.country.toLowerCase().includes(countryF.toLowerCase())
            );

        });

        const filteredOnboarding = paginatedProductOnboarding.filter(owner => {
            return (
                owner.village.toLowerCase().includes(villageF.toLowerCase()) &&
                owner.district.toLowerCase().includes(districtF.toLowerCase()) &&
                owner.state.toLowerCase().includes(stateF.toLowerCase()) &&
                owner.country.toLowerCase().includes(countryF.toLowerCase())
            );
        });

        setFL(filteredLandParcels);
        setFO(filteredOnboarding);
        setAnchorEl(null);

        const newFilterCriteria = [...filterCriteria];

        if (villageF.trim() !== "" && !newFilterCriteria.includes(villageF)) {
            newFilterCriteria.push(villageF);
        }

        if (districtF.trim() !== "" && !newFilterCriteria.includes(districtF)) {
            newFilterCriteria.push(districtF);
        }
        if (stateF.trim() !== "" && !newFilterCriteria.includes(stateF)) {
            newFilterCriteria.push(stateF);
        }
        if (countryF.trim() !== "" && !newFilterCriteria.includes(countryF)) {
            newFilterCriteria.push(countryF);
        }
        setVillageF('');
        setdistrictF('');
        setstateF('');
        setcountryF('');
        setFilterCriteria(newFilterCriteria);
        setshowFilterValue(newFilterCriteria.length > 0);
    };

    const handleDelete = async (id) => {
        try {
            const updatedCartjson = [...landParcels];
            setLandParcels(updatedCartjson);
            await axios.delete(urls.landParcelsUrl + `/${id}`);

        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    const handleProfile = (id) => {

        navigate('/landparcels' + `/${id}`)
    }
    const generateLandParcels = () => {
        return paginatedProductLandparcel.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex',borderBottom:'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>


                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell>
                        <div style={{ display: "flex" }}>
                            {crops.slice(0,1).map((crop, index) => (
                                <button className="grid-button" key={index}>{crop.crop_name}</button>
                            ))}
                            {crops.length >= 2 ? (
                                <button className="grid-button" title={crops.slice(1).map((c)=>c.crop_name)}>+{crops.length - 1} more</button>
                            ):(<></>)}
                        </div>
                    </TableCell>
                    <TableCell align='center'>
                        <Link href={'/landparcels/add-landparcel/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>

                    <TableCell align='center' sx={{ cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}><RemoveRedEyeIcon /></TableCell>


                </TableRow>
            </TableBody>
        ));
    }

    const generateFilterLandParcels = () => {
        return fL.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex',borderBottom:'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>


                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell>
                        <div style={{ display: "flex" }}>
                            {owners.crops.slice(0, 1).map((crop, index) => (
                                <button className="grid-button" key={index}>{crop}</button>
                            ))}
                            {owners.crops.length >= 2 && (
                                <button className="grid-button" title={owners.crops.slice(1)}>+{owners.crops.length - 1} more</button>
                            )}
                        </div>
                    </TableCell>
                    <TableCell align='center'>
                        <Link href={'/landparcels/add-landparcel/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
    const generateFilterOnBoarding = () => {
        return fO.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>

                    <TableCell align='center' sx={{ cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}><RemoveRedEyeIcon /></TableCell>


                </TableRow>
            </TableBody>
        ));
    }

    const generateSearchedLandParcels = () => {
        return searchedLandParcels.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex',borderBottom:'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>


                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell>
                        <div style={{ display: "flex" }}>
                            {owners.crops.slice(0, 1).map((crop, index) => (
                                <button className="grid-button" key={index}>{crop}</button>
                            ))}
                            {owners.crops.length >= 2 && (
                                <button className="grid-button" title={owners.crops.slice(1)}>+{owners.crops.length - 1} more</button>
                            )}
                        </div>
                    </TableCell>
                    <TableCell align='center'>
                        <Link href={'/landparcels/add-landparcel/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
    const generateSearchedOnBoarding = () => {
        return searchedOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>

                    <TableCell align='center' sx={{ cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}><RemoveRedEyeIcon /></TableCell>


                </TableRow>
            </TableBody>
        ));
    }

    const generateGridItems = () => {

        return landParcels.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='landparcel-grid'>

                <Grid item xs={12}>
                    <Paper className="grid-lower">
                        <Grid container xs={12} display='grid' textAlign='center'>
                            <Typography variant='p' fontWeight='bold'>{owner.name} - Sy.no.:{owner.SyNo}</Typography>
                            <Typography variant='body1' color='gray'>{owner.village}, {owner.district}</Typography>
                            <Typography variant='body1' color='gray'>{owner.state}</Typography>
                        </Grid><br />
                        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.acres}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.area_owned}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.crops.length}</Typography></Grid>
                        </Grid>
                        <Grid container sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex', color: 'gray' }}>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Acres</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Area Owned</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Crops</Typography></Grid >
                        </Grid>
                    </Paper >
                </Grid>
                <br></br>
            </Grid >
        ));
    };
    const generateGridItemsOnboarding = () => {

        return onboarding.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='landparcel-grid'>
                <Grid item xs={12}>
                    <Paper className="grid-lower">
                        <Grid container xs={12} display='grid' textAlign='center'>
                            <Typography variant='p' fontWeight='bold'>{owner.name} - Sy.no.:{owner.SyNo}</Typography>
                            <Typography variant='body1' color='gray'>{owner.village}, {owner.district}</Typography>
                            <Typography variant='body1' color='gray'>{owner.state}</Typography>
                        </Grid><br />
                        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.acres}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.area_owned}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.crops.length}</Typography></Grid>
                        </Grid>
                        <Grid container sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex', color: 'gray' }}>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Acres</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Area Owned</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Crops</Typography></Grid >
                        </Grid>
                    </Paper >
                </Grid>
                <br></br>
            </Grid >
        ));
    };

    const generateFilterGridItems = () => {
        return fL.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='landparcel-grid'>

                <Grid item xs={12}>
                    <Paper className="grid-lower">
                        <Grid container xs={12} display='grid' textAlign='center'>
                            <Typography variant='p' fontWeight='bold'>{owner.name} - Sy.no.:{owner.SyNo}</Typography>
                            <Typography variant='body1' color='gray'>{owner.village}, {owner.district}</Typography>
                            <Typography variant='body1' color='gray'>{owner.state}</Typography>
                        </Grid><br />
                        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.acres}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.area_owned}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.crops.length}</Typography></Grid>
                        </Grid>
                        <Grid container sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex', color: 'gray' }}>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Acres</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Area Owned</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Crops</Typography></Grid >
                        </Grid>
                    </Paper >
                </Grid>
                <br></br>
            </Grid >
        ));
    };
    const generateFilterGridItemsOnboarding = () => {

        return fO.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='landparcel-grid'>
                <Grid item xs={12}>
                    <Paper className="grid-lower">
                        <Grid container xs={12} display='grid' textAlign='center'>
                            <Typography variant='p' fontWeight='bold'>{owner.name} - Sy.no.:{owner.SyNo}</Typography>
                            <Typography variant='body1' color='gray'>{owner.village}, {owner.district}</Typography>
                            <Typography variant='body1' color='gray'>{owner.state}</Typography>
                        </Grid><br />
                        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.acres}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.area_owned}</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">{owner.crops.length}</Typography></Grid>
                        </Grid>
                        <Grid container sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex', color: 'gray' }}>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Acres</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Area Owned</Typography></Grid>
                            <Grid xs={4} className='text'>
                                <Typography variant='p'>Crops</Typography></Grid >
                        </Grid>
                    </Paper >
                </Grid>
                <br></br>
            </Grid >
        ));
    };

    const generateTable = () => {
        return (
            <>
                {showTable ? (
                    <>
                        <Grid container>
                            <TableContainer>
                                <Table className='table' >
                                    <TableBody >
                                        <TableRow className='th'>
                                            <TableCell className='tc' align='center'>Land Parcels</TableCell>
                                            <TableCell align='center'>Sy.no</TableCell>
                                            <TableCell align='center'>No. of Acres</TableCell>
                                            <TableCell align='center'>Contact No</TableCell>
                                            <TableCell align='center'>Village</TableCell>
                                            <TableCell align='center'>Crops</TableCell>
                                            <TableCell align='center'>Actions</TableCell>
                                        </TableRow>
                                    </TableBody>

                                    {generateLandParcels()}

                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid container sx={{ mt: 3 }} >
                            <Grid xs={9} className='total-events'>
                                <Typography sx={{ color: 'gray' }}>{landParcels.length} {landParcels.length <= 1 ? 'Land Parcel' : 'Land Parcels'} </Typography>
                            </Grid>
                            <Grid xs={3} className='pagination'>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={Math.ceil(landParcels.length / itemsPerPageLandparcel)}
                                        variant='outlined'
                                        page={pageLandparcel}
                                        onChange={handleChangePageLandparcel} />

                                </Stack>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container>
                            <TableContainer>
                                <Table className='table'>
                                    <TableBody >
                                        <TableRow className='th'>
                                            <TableCell align='center'>Onboarding Land Parcels</TableCell>
                                            <TableCell align='center'>Sy.no</TableCell>
                                            <TableCell align='center'>No. of Acres</TableCell>
                                            <TableCell align='center'>Contact No</TableCell>
                                            <TableCell align='center'>Village</TableCell>
                                            <TableCell align='center'>Status</TableCell>
                                            <TableCell align='center'>Actions</TableCell>
                                        </TableRow>
                                    </TableBody>

                                    {generateOnBoarding()}

                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid container sx={{ mt: 3 }} >
                            <Grid xs={9} className='total-events'>
                                <Typography sx={{ color: 'gray' }}>{onboarding.length} {onboarding.length <= 1 ? 'Land Parcel' : 'Land Parcels'} </Typography>
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
                    </>)
                    : (
                        <div style={{ marginTop: '20px' }}>

                            <Grid container>
                                {filterCriteria.length > 0 ?
                                    (<>
                                        {filterCriteria.length > 0 ? (
                                            <Grid container>
                                                <Grid xs={12} sx={{ justifyContent: 'right', mt: 3, width: '100%', display: 'flex' }}>
                                                    {filterCriteria.length > 0 ? (<>
                                                        <Typography variant='p' fontWeight='bold'>Filter : </Typography>
                                                        {showFilterValue && (<>
                                                            {filterCriteria.map((field, index) => (
                                                                <>
                                                                    {field !== "" && (
                                                                        <button className="grid-button" style={{ display: 'flex' }}>
                                                                            {field}
                                                                            <CloseIcon sx={{ color: 'black' }} fontSize='small'
                                                                                onClick={() => handleDeleteFilter(index, field)}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </>
                                                            ))}
                                                        </>
                                                        )}
                                                    </>) : (<></>)}
                                                </Grid>
                                            </Grid>
                                        ) : (<></>)}
                                        {fL.length > 0 && (
                                            <>
                                                <Typography variant='body1' fontWeight='bold'>Land Parcels</Typography>
                                                <Grid container>
                                                    {generateFilterGridItems()}
                                                </Grid>
                                            </>)}<br/>
                                        {fO.length > 0 && (
                                            <>
                                                <Typography variant='body1' fontWeight='bold' >Onboarding Land Parcels</Typography>

                                                <Grid container>
                                                    {generateFilterGridItemsOnboarding()}
                                                </Grid>
                                            </>)}
                                    </>) : (<>
                                        <Typography variant='body1' fontWeight='bold' >Land Parcels</Typography>
                                        <Grid container>
                                            {generateGridItems()}
                                        </Grid><br />

                                        < Typography variant='body1' fontWeight='bold' >Onboarding Land Parcels</Typography>
                                        <Grid container>
                                            {generateGridItemsOnboarding()}
                                        </Grid></>)}
                            </Grid>
                        </div>
                    )
                }
            </>
        )
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
                                Landparcels details added successfully
                            </Alert>
                        </Snackbar>
                        <Grid container className='right-part-landowner'>
                            <Grid xs={5.4}>
                                <Typography className='title' variant='p'>Land Parcels</Typography>
                            </Grid>
                            <Grid xs={3.1}>
                                <SearchIcon className='search-icon' />
                                <input type='text' placeholder='Search..'
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        handleSearch(e.target.value);
                                    }} />
                            </Grid>
                            <Grid xs={0.5}>
                                <Badge color='success' variant='dot' className='filter-icon'><FilterAltIcon onClick={handleClick} sx={{color:Boolean(anchorEl)?'lightgreen':'black',cursor:'pointer'}}/></Badge>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseF}
                                >

                                    <Typography type="p" className='filter' fontWeight='bold'>Filter</Typography>


                                    <MenuItem >
                                        <TextField
                                            type='text'
                                            label="Village"
                                            name='village'
                                            onChange={(e) => setVillageF(e.target.value)}
                                            value={villageF}
                                        />
                                    </MenuItem>

                                    <MenuItem >
                                        <TextField
                                            type='text'
                                            label="District"
                                            name='district'
                                            onChange={(e) => setdistrictF(e.target.value)}
                                            value={districtF}
                                        />
                                    </MenuItem>

                                    <MenuItem >
                                        <TextField
                                            type='text'
                                            label="State"
                                            name='state'
                                            onChange={(e) => setstateF(e.target.value)}
                                            value={stateF}
                                        />
                                    </MenuItem>

                                    <MenuItem >
                                        <TextField
                                            type='text'
                                            label="Country"
                                            name='country'
                                            onChange={(e) => setcountryF(e.target.value)}
                                            value={countryF}
                                        />
                                    </MenuItem>


                                    <Button variant='outlined' className="buttons" sx={{ ml: 13, mt: 2 }}>Clear</Button>
                                    <Button variant='contained' className="buttons" onClick={handleFilterSubmit} sx={{ mt: 2 }}>Submit</Button>

                                </Menu >
                            </Grid>
                            <Grid xs={0.5}>
                                <GridViewIcon className='grid-icon' fontSize='medium' onClick={() => { handleGrid() }}
                                    sx={{ color: showTable ? 'black' : 'lightgreen', cursor: 'pointer' }}></GridViewIcon>
                            </Grid>
                            <Grid xs={0.5}>
                                <ListIcon className='list-icon' fontSize='medium' onClick={() => { handleTable() }}
                                    sx={{ color: showTable ? 'lightgreen' : 'black', cursor: 'pointer' }}></ListIcon>
                            </Grid>
                            <Grid xs={2}>
                                <Link href='/landparcels/add-landparcel/0' style={{ textDecoration: "none", color: "black" }}>
                                    <Button sx={{"&:hover":{color:'white'}}}
                                     variant='contained' className='add-landowner-btn'>Add Land Parcel</Button>
                                </Link>
                            </Grid>

                        </Grid>

                        <Grid container className='cards'>
                            <Grid item xs={2.3}>
                                <Item className='operators'>
                                    <img src={operators}></img>
                                    <div className='information'>
                                        <Typography className='operators-text' variant='p'>Land Parcels</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{landParcels.length + onboarding.length}</Typography></b>
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
                                        <Typography className='yields-text' variant='p'>Leased(Acres)</Typography><br />
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
                        {(filterCriteria.length > 0 && showTable) || (query && searchQuery) ?
                            (
                                <>
                                    {filterCriteria.length > 0 ? (
                                        <Grid container>
                                            <Grid xs={12} sx={{ justifyContent: 'right', mt: 3, width: '100%', display: 'flex' }}>
                                                {filterCriteria.length > 0 ? (<>
                                                    <Typography variant='p' fontWeight='bold'>Filter : </Typography>
                                                    {showFilterValue && (<>
                                                        {filterCriteria.map((field, index) => (
                                                            <>
                                                                {field !== "" && (
                                                                    <button className="grid-button" style={{ display: 'flex' }}>
                                                                        {field}
                                                                        <CloseIcon sx={{ color: 'black' }} fontSize='small'
                                                                            onClick={() => handleDeleteFilter(index, field)}
                                                                        />
                                                                    </button>
                                                                )}
                                                            </>
                                                        ))}
                                                    </>
                                                    )}
                                                </>) : (<></>)}
                                            </Grid>
                                        </Grid>
                                    ) : (<></>)}
                                    {fL.length > 0 ? (<>
                                        <Grid container>
                                            <TableContainer>
                                                <Table className='table' >
                                                    <TableBody >
                                                        <TableRow className='th'>
                                                            <TableCell className='tc' align='center'>Land Parcels</TableCell>
                                                            <TableCell align='center'>Sy.no</TableCell>
                                                            <TableCell align='center'>No. of Acres</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateFilterLandParcels()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {fL.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{fL.length} {fL.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(fL.length / itemsPerPageLandparcel)}
                                                            variant='outlined'
                                                            page={pageLandparcel}
                                                            onChange={handleChangePageLandparcel} />

                                                    </Stack>
                                                </Grid>
                                            </>) : (<></>)}
                                        </Grid>
                                    </>) : (<></>)}

                                    {fO.length > 0 ?
                                        (
                                            <>
                                                <Grid container>
                                                    <TableContainer>
                                                        <Table className='table'>
                                                            <TableBody >
                                                                <TableRow className='th'>
                                                                    <TableCell className='tc' align='center'>Onboarding Land Parcels</TableCell>
                                                                    <TableCell align='center'>Sy.no</TableCell>
                                                                    <TableCell align='center'>No. of Acres</TableCell>
                                                                    <TableCell align='center'>Contact No</TableCell>
                                                                    <TableCell align='center'>Village</TableCell>
                                                                    <TableCell align='center'>Crops</TableCell>
                                                                    <TableCell align='center'>Actions</TableCell>
                                                                </TableRow>
                                                            </TableBody>

                                                            {generateFilterOnBoarding()}

                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid container sx={{ mt: 3 }}>
                                                    {fO.length > 0 ?
                                                        (
                                                            <>
                                                                <Grid xs={9} className='total-events'>
                                                                    <Typography sx={{ color: 'gray' }}>{fO.length} {fO.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                                </Grid>
                                                                <Grid xs={3} className='pagination'>
                                                                    <Stack spacing={2}>
                                                                        <Pagination
                                                                            count={Math.ceil(fO.length / itemsPerPageOnboarding)}
                                                                            variant='outlined'
                                                                            page={pageOnboarding}
                                                                            onChange={handleChangePageOnboarding} />

                                                                    </Stack>
                                                                </Grid>
                                                            </>)
                                                        : (<></>)
                                                    }
                                                </Grid>
                                            </>
                                        ) : (<></>)}

                                    {searchedLandParcels.length > 0 ? (<>
                                        <Grid container>
                                            <TableContainer>
                                                <Table className='table' >
                                                    <TableBody >
                                                        <TableRow className='th'>
                                                            <TableCell className='tc' align='center'>Land Parcels</TableCell>
                                                            <TableCell align='center'>Sy.no</TableCell>
                                                            <TableCell align='center'>No. of Acres</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateSearchedLandParcels()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {searchedLandParcels.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{searchedLandParcels.length} {searchedLandParcels.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(searchedLandParcels.length / itemsPerPageLandparcel)}
                                                            variant='outlined'
                                                            page={pageLandparcel}
                                                            onChange={handleChangePageLandparcel} />

                                                    </Stack>
                                                </Grid>
                                            </>) : (<></>)}
                                        </Grid>
                                    </>) : (<></>)}

                                    {searchedOnboarding.length > 0 ? (<>
                                        <Grid container>
                                            <TableContainer>
                                                <Table className='table' >
                                                    <TableBody >
                                                        <TableRow className='th'>
                                                            <TableCell className='tc' align='center'>Onboarding Land Parcels</TableCell>
                                                            <TableCell align='center'>Sy.no</TableCell>
                                                            <TableCell align='center'>No. of Acres</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateSearchedOnBoarding()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {searchedOnboarding.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{searchedOnboarding.length} {searchedOnboarding.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(searchedOnboarding.length / itemsPerPageOnboarding)}
                                                            variant='outlined'
                                                            page={pageOnboarding}
                                                            onChange={handleChangePageOnboarding} />

                                                    </Stack>
                                                </Grid>
                                            </>) : (<></>)}
                                        </Grid>
                                    </>) : (<></>)}
                                </>
                            )
                            : (<>
                                {generateTable()}
                            </>)
                        }


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
        landOwners: state.landowners.landowners,
        landParcels: state.landparcels.landparcels,

    };
};

const mapDispatchToProps = {
    fetchLandParcel: () => action.fetchLandParcel(),
    fetchCrops: () => fetchCrops(),
    fetchEvents: () => fetchEvents()
}

export default connect(mapStateToProps, mapDispatchToProps)(LandParcels);