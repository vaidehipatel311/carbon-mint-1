import React, { useState, useEffect } from 'react'
import './style.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Avatar, Button, TextField, Typography } from '@mui/material'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditIcon from '@mui/icons-material/Edit'
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crop from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import vector from '../../assets/images/LandOwners/vector.png'
import avatar from '../../assets/images/LandOwners/avatar.png'
import chart from '../../assets/images/LandOwners/Chart.png'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { fetchLandOwners } from '../../Services/LandOwners/actions';
import { fetchCrops } from '../../Services/Operator/actions'
import { fetchEvents } from '../../Services/Events/actions'
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


function LandOwners({ fetchLandOwners, fetchCrops, fetchEvents }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [landOwners, setlandOwners] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [showTable, setshowtable] = useState(true);
    const [pageLandowner, setPageLandowner] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);
    const [crops, setCrops] = useState([]);
    const [event, setEvent] = useState([]);
    const [acres, setAcres] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [villageF, setVillageF] = useState('');
    const [districtF, setdistrictF] = useState('');
    const [stateF, setstateF] = useState('');
    const [countryF, setcountryF] = useState('');
    const [filterCriteria, setFilterCriteria] = useState([]);

    const [filterLandOwners, setFilterLandOwners] = useState([]);
    const [filterOnboarding, setFilterOnboarding] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFilterValue, setshowFilterValue] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { currentUser } = useAuth();

    const query = new URLSearchParams(location.search).get('query');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedLandOwners, setSearchedLandOwners] = useState("");
    const [searchedOnboarding, setSearchedOnboarding] = useState("");




    useEffect(() => {
        fetchLandOwners()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setlandOwners(approved);

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

    }, [landOwners, onboarding]);

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


    const handleSearch = () => {
        if (searchQuery.length == 1) {
            navigate('/landowners');
        }

        else {
            navigate('/landowners?query=' + `${encodeURIComponent(searchQuery)}`);
        }
    };


    useEffect(() => {
        if (query) {
            const sLO = landOwners.filter((item) => {
                return (
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.ownerID.toLowerCase().includes(query.toLowerCase()) ||
                    item.contact_number_1.toLowerCase().includes(query.toLowerCase()) ||
                    item.village.toLowerCase().includes(query.toLowerCase())
                );
            });

            const sO = onboarding.filter((item) => {
                return (
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.ownerID.toLowerCase().includes(query.toLowerCase()) ||
                    item.contact_number_1.toLowerCase().includes(query.toLowerCase()) ||
                    item.village.toLowerCase().includes(query.toLowerCase())
                );
            });

            setSearchedLandOwners(sLO);
            setSearchedOnboarding(sO);
        } else {
            // Reset the searched lists if query is empty
            setSearchedLandOwners([]);
            setSearchedOnboarding([]);
        }
    }, [query, searchedLandOwners, searchedOnboarding]);



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
            const newfilteredLandOwners = paginatedProductLandowner.filter(owner => {
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


            setFilterLandOwners(newfilteredLandOwners);
            setFilterOnboarding(newfilteredOnboarding);
            setshowFilterValue(true);
        }
    }

    const itemsPerPageLandowner = 1;
    const startIndexLandowner = (pageLandowner - 1) * itemsPerPageLandowner;
    const endIndexLandowner = pageLandowner * itemsPerPageLandowner;
    const paginatedProductLandowner = landOwners.slice(startIndexLandowner, endIndexLandowner);

    const handleChangePageLandowner = (event, newPageLandparcel) => {
        setPageLandowner(newPageLandparcel);
    };

    const itemsPerPageOnboarding = 1;
    const startIndexOnboarding = (pageOnboarding - 1) * itemsPerPageOnboarding;
    const endIndexOnboarding = pageOnboarding * itemsPerPageOnboarding;
    const paginatedProductOnboarding = onboarding.slice(startIndexOnboarding, endIndexOnboarding);

    const handleChangePageOnboarding = (event, newPageOnboarding) => {
        setPageOnboarding(newPageOnboarding);
    };

    const handleFilterSubmit = () => {
        const filteredLandOwners = paginatedProductLandowner.filter(owner => {
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

        setFilterLandOwners(filteredLandOwners);
        setFilterOnboarding(filteredOnboarding);
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

    const handleGrid = () => { setshowtable(false); console.log("handle") }

    const handleTable = () => { setshowtable(true); console.log("handle") }

    const handleClickOpen = () => {
        setOpen(true)
    };
    function handleClose() {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            const updatedCartjson = [...landOwners];
            setlandOwners(updatedCartjson);
            await axios.delete(urls.landOwnersUrl + `/${id}`);
            setOpen(false);

        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }

    };

    const handleProfile = (id) => {
        navigate('/landowners' + `/${id}`)
    }

    const generateLandOwners = () => {

        return paginatedProductLandowner.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderBottom: 'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.passbook_refno}</TableCell>
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
                        <Link href={'/landowners/add-landowner/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
            </TableBody >
        ))
    }
    const generateOnBoarding = () => {

        return onboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p' sx={{ mt: 1, ml: 1 }}>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.aadhar_no}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>

                    <TableCell align='center' sx={{ cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <RemoveRedEyeIcon />
                    </TableCell>


                </TableRow>
            </TableBody>
        ));
    }

    const generateFilterLandOwners = () => {

        return filterLandOwners.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderBottom: 'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.passbook_refno}</TableCell>
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
                        <Link href={'/landowners/add-landowner/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
            </TableBody >
        ))
    }
    const generateFilterOnboarding = () => {
        return filterOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.passbook_refno}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><button className="grid-button" >{owners.crops[0]}</button><button className="grid-button" >{owners.crops[1]}</button></TableCell>
                    <TableCell align='center'>
                        <Link href={'/landowners/add-landowner/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
            </TableBody >
        ))
    }

    const generateSearchedLandOwners = () => {

        return searchedLandOwners.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderBottom: 'none', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.passbook_refno}</TableCell>
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
                        <Link href={'/landowners/add-landowner/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
            </TableBody >
        ))
    }
    const generateSearchedOnboarding = () => {
        return searchedOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>

                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerID}</TableCell>
                    <TableCell align='center'>{owners.passbook_refno}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><button className="grid-button" >{owners.crops[0]}</button><button className="grid-button" >{owners.crops[1]}</button></TableCell>
                    <TableCell align='center'>
                        <Link href={'/landowners/add-landowner/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
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
            </TableBody >
        ))
    }


    const generateGridItems = () => {

        return landOwners.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item' justifyContent='center'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }}  onClick={()=>handleProfile(owner.id)}>
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>

                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };
    const generateGridItemsOnboarding = () => {

        return onboarding.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }}  onClick={()=>handleProfile(owner.id)}>
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>
                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };

    const generateFilterGridItems = () => {

        return filterLandOwners.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item' justifyContent='center'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }}  onClick={()=>handleProfile(owner.id)}>
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>

                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };
    const generateFilterGridItemsOnboarding = () => {

        return filterOnboarding.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }}  onClick={()=>handleProfile(owner.id)}>
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>
                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };

    const generateSearchedGridItems = () => {

        return searchedLandOwners.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item' justifyContent='center'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }}  onClick={()=>handleProfile(owner.id)}>
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>

                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };
    const generateSearchedGridItemsOnboarding = () => {

        return searchedOnboarding.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }} onClick={()=>handleProfile(owner.id)} >
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Grid container xs={12} textAlign='center' display='grid'>
                        <Grid container xs={12} justifyContent='center' display='grid'><AccountCircleIcon className='avatar_lo' /></Grid>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button" title={owner.crops}>
                                {owner.crops.length} crops
                            </button>
                        </div>
                    </Grid>
                </Paper>
                <br></br>
            </Grid >

        ));
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));


    const generateTable = () => {
        return (
            <>
                {showTable ? (
                    <>

                        <Grid container>
                            {landOwners.length > 0 ? (<>
                                <TableContainer>
                                    <Table className='table' >
                                        <TableBody >
                                            <TableRow className='th'>
                                                <TableCell className='tc' align='center'>Land Owners</TableCell>
                                                <TableCell align='center'>ID</TableCell>
                                                <TableCell align='center'>PassBook Ref No.</TableCell>
                                                <TableCell align='center'>Contact No</TableCell>
                                                <TableCell align='center'>Village</TableCell>
                                                <TableCell align='center'>Crops</TableCell>
                                                <TableCell align='center'>Actions</TableCell>
                                            </TableRow>
                                        </TableBody>

                                        {generateLandOwners()}

                                    </Table>
                                </TableContainer>
                                <Grid container sx={{ mt: 3 }} >
                                    <Grid xs={9} className='total-events'>
                                        <Typography sx={{ color: 'gray' }}>{landOwners.length} {landOwners.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                    </Grid>
                                    <Grid xs={3} className='pagination'>
                                        <Stack spacing={2}>
                                            <Pagination
                                                count={Math.ceil(landOwners.length / itemsPerPageLandowner)}
                                                variant='outlined'
                                                page={pageLandowner}
                                                onChange={handleChangePageLandowner} />

                                        </Stack>
                                    </Grid>
                                </Grid>
                            </>) : (<></>)}

                        </Grid>

                        <br></br>

                        <Grid container>
                            {onboarding.length > 0 ? (<>
                                <TableContainer>
                                    <Table className='table' >
                                        <TableBody >
                                            <TableRow className='th'>
                                                <TableCell className='tc' align='center'>Onboarding Land Owners</TableCell>
                                                <TableCell align='center'>ID</TableCell>
                                                <TableCell align='center'>PassBook Ref No.</TableCell>
                                                <TableCell align='center'>Contact No</TableCell>
                                                <TableCell align='center'>Village</TableCell>
                                                <TableCell align='center'>Crops</TableCell>
                                                <TableCell align='center'>Actions</TableCell>
                                            </TableRow>
                                        </TableBody>

                                        {generateOnBoarding()}

                                    </Table>
                                </TableContainer>
                                <Grid container sx={{ mt: 3 }} >
                                    <Grid xs={9} className='total-events'>
                                        <Typography sx={{ color: 'gray' }}>{onboarding.length} {onboarding.length <= 1 ? 'Operator' : 'Operators'}</Typography>
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
                            </>) : (<></>)}

                        </Grid>


                    </>)
                    : (
                        <div style={{ marginTop: '20px' }}>

                            <Grid container>
                                {filterCriteria.length > 0 || (query && searchQuery) ?

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
                                        {filterLandOwners.length > 0 ? (
                                            <>
                                                <Typography variant='body1' fontWeight='bold'>Land Owners</Typography>
                                                <Grid container>
                                                    {generateFilterGridItems()}
                                                </Grid>
                                            </>):(<></>)}<br />
                                        {filterOnboarding.length > 0 ? (
                                            <>
                                                <Typography variant='body1' fontWeight='bold' >Onboarding Land Owners</Typography>

                                                <Grid container>
                                                    {generateFilterGridItemsOnboarding()}
                                                </Grid>
                                            </>):(<></>)}

                                        {searchedLandOwners.length > 0 ? (
                                            <>
                                                <Typography variant='body1' fontWeight='bold'>Land Owners</Typography>
                                                <Grid container>
                                                    {generateSearchedGridItems()}
                                                </Grid>
                                            </>):(<></>)}<br />
                                        {searchedOnboarding.length > 0? (
                                            <>
                                                <Typography variant='body1' fontWeight='bold' >Onboarding Land Owners</Typography>

                                                <Grid container>
                                                    {generateSearchedGridItemsOnboarding()}
                                                </Grid>
                                            </>):(<></>)}




                                    </>) : (<>
                                        <Typography variant='body1' fontWeight='bold' >Land Owners</Typography>
                                        <Grid container>
                                            {generateGridItems()}
                                        </Grid><br />

                                        < Typography variant='body1' fontWeight='bold' >Onboarding Land Owners</Typography>
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

    return (
        <>
            {currentUser ? (
                <>

                    <Header />
                    <Sidebar />

                    <Box sx={{ margin: '100px 20px 50px 300px' }}>
                        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                            <Alert sx={{ ml: 70, mt: -10 }} onClose={handleCloseAlert} severity="success">
                                LandOwners details added successfully
                            </Alert>
                        </Snackbar>
                        <Grid container className='right-part-landowner'>
                            <Grid xs={5.4}>
                                <Typography className='title' variant='p'>Land Owners</Typography>
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
                                <Badge color='success' variant='dot' className='filter-icon'><FilterAltIcon onClick={handleClick} sx={{ color: Boolean(anchorEl) ? 'lightgreen' : 'black' }} /></Badge>
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
                                    sx={{ color: showTable ? 'black' : 'lightgreen' }}></GridViewIcon>
                            </Grid>
                            <Grid xs={0.5}>
                                <ListIcon className='list-icon' fontSize='medium' onClick={() => { handleTable() }}
                                    sx={{ color: showTable ? 'lightgreen' : 'black' }}></ListIcon>
                            </Grid>
                            <Grid xs={2}>
                                <Link href='/landowners/add-landowner/0' style={{ textDecoration: "none", color: "black" }}>
                                    <Button variant='contained' className='add-landowner-btn' sx={{ "&:hover": { color: 'white' } }}>Add Land Owner</Button>
                                </Link>
                            </Grid>


                        </Grid>

                        <Grid container className='cards'>
                            <Grid item xs={2.3}>
                                <Item className='operators'>
                                    <img src={operators}></img>
                                    <div className='information'>
                                        <Typography className='operators-text' variant='p'>Land Owners</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{landOwners.length + onboarding.length}</Typography></b>
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
                                    <img src={chart} className='information'></img>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='events'>
                                    <img src={events}></img>
                                    <div className='information'>
                                        <Typography className='events-text' variant='p'>Events</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{event.length}</Typography></b>
                                    </div>
                                    <img src={vector} className='information2'></img>
                                </Item>
                            </Grid>

                        </Grid>


                        {(filterCriteria.length > 0 && showTable) || (query && searchQuery && showTable) ?
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
                                                                        <CloseIcon fontSize='small'
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
                                    {filterLandOwners.length > 0 ? (<>
                                        <Grid container>
                                            <TableContainer>
                                                <Table className='table' >
                                                    <TableBody >
                                                        <TableRow className='th'>
                                                            <TableCell className='tc' align='center'>Land Owners</TableCell>
                                                            <TableCell align='center'>ID</TableCell>
                                                            <TableCell align='center'>PassBook Ref No.</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateFilterLandOwners()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {filterLandOwners.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{filterLandOwners.length} {filterLandOwners.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(filterLandOwners.length / itemsPerPageLandowner)}
                                                            variant='outlined'
                                                            page={pageLandowner}
                                                            onChange={handleChangePageLandowner} />

                                                    </Stack>
                                                </Grid>
                                            </>) : (<></>)}
                                        </Grid>
                                    </>) : (<></>)}

                                    {filterOnboarding.length > 0 ?
                                        (
                                            <>
                                                <Grid container>
                                                    <TableContainer>
                                                        <Table className='table'>
                                                            <TableBody >
                                                                <TableRow className='th'>
                                                                    <TableCell className='tc' align='center'>Onboarding Land Owners</TableCell>
                                                                    <TableCell align='center'>ID</TableCell>
                                                                    <TableCell align='center'>PassBook Ref No.</TableCell>
                                                                    <TableCell align='center'>Contact No</TableCell>
                                                                    <TableCell align='center'>Village</TableCell>
                                                                    <TableCell align='center'>Crops</TableCell>
                                                                    <TableCell align='center'>Actions</TableCell>
                                                                </TableRow>
                                                            </TableBody>

                                                            {generateFilterOnboarding()}

                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid container sx={{ mt: 3 }}>
                                                    {filterOnboarding.length > 0 ?
                                                        (
                                                            <>
                                                                <Grid xs={9} className='total-events'>
                                                                    <Typography sx={{ color: 'gray' }}>{filterOnboarding.length} {filterOnboarding.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                                </Grid>
                                                                <Grid xs={3} className='pagination'>
                                                                    <Stack spacing={2}>
                                                                        <Pagination
                                                                            count={Math.ceil(filterOnboarding.length / itemsPerPageLandowner)}
                                                                            variant='outlined'
                                                                            page={pageLandowner}
                                                                            onChange={handleChangePageLandowner} />

                                                                    </Stack>
                                                                </Grid>
                                                            </>)
                                                        : (<></>)
                                                    }
                                                </Grid>
                                            </>
                                        ) : (<></>)}

                                    {searchedLandOwners.length > 0 ? (<>
                                        <Grid container>
                                            <TableContainer>
                                                <Table className='table' >
                                                    <TableBody >
                                                        <TableRow className='th'>
                                                            <TableCell className='tc' align='center'>Land Owners</TableCell>
                                                            <TableCell align='center'>ID</TableCell>
                                                            <TableCell align='center'>PassBook Ref No.</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateSearchedLandOwners()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {searchedLandOwners.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{searchedLandOwners.length} {searchedLandOwners.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(searchedLandOwners.length / itemsPerPageLandowner)}
                                                            variant='outlined'
                                                            page={pageLandowner}
                                                            onChange={handleChangePageLandowner} />

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
                                                            <TableCell className='tc' align='center'>Onboarding Land Owners</TableCell>
                                                            <TableCell align='center'>ID</TableCell>
                                                            <TableCell align='center'>PassBook Ref No.</TableCell>
                                                            <TableCell align='center'>Contact No</TableCell>
                                                            <TableCell align='center'>Village</TableCell>
                                                            <TableCell align='center'>Crops</TableCell>
                                                            <TableCell align='center'>Actions</TableCell>
                                                        </TableRow>
                                                    </TableBody>

                                                    {generateSearchedOnboarding()}

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
                                                            count={Math.ceil(searchedOnboarding.length / itemsPerPageLandowner)}
                                                            variant='outlined'
                                                            page={pageLandowner}
                                                            onChange={handleChangePageLandowner} />

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
    fetchLandOwners: () => fetchLandOwners(),
    fetchCrops: () => fetchCrops(),
    fetchEvents: () => fetchEvents()
}

export default connect(mapStateToProps, mapDispatchToProps)(LandOwners);