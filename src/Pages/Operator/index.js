import React, { useState, useEffect } from 'react'
import './operator.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Link from '@mui/material/Link'
import { Avatar, Button, Menu, MenuItem, TextField, Typography } from '@mui/material'
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
import chart from '../../assets/images/LandOwners/Chart.png'

import * as action from '../../Services/Operator/actions';
import { fetchEvents } from '../../Services/Events/actions'
import { fetchCrops } from '../../Services/Operator/actions';
import axios from 'axios';
import * as urls from '../../Config/urls';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
function Operators({ fetchOperator, fetchCrops, fetchEvents }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { addOperatorId } = useParams();
    const [operator, setOperator] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [pageOperator, setPageOperator] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);
    const [c, setC] = useState([]);
    const [e, setE] = useState([]);
    const [acres, setAcres] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { currentUser } = useAuth();

    const [villageF, setVillageF] = useState('');
    const [districtF, setdistrictF] = useState('');
    const [stateF, setstateF] = useState('');
    const [countryF, setcountryF] = useState('');
    const [filterCriteria, setFilterCriteria] = useState([]);

    const [filterOperator, setFilterOperator] = useState([]);
    const [filterOnboarding, setFilterOnboarding] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFilterValue, setshowFilterValue] = useState(false);

    const query = new URLSearchParams(location.search).get('query');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedOperators, setSearchedOperators] = useState("");
    const [searchedOnboarding, setSearchedOnboarding] = useState("");





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

        fetchCrops()
            .then((data) => {
                console.log(data);
                setC(data);
            })
            .catch(err => console.log(err));


        fetchEvents()
            .then((data) => {
                setE(data);
            })
            .catch(err => console.log(err));

    }, [operator]);

    const handleSearch = () => {
        if (searchQuery.length == 1) {
            navigate('/operator');
        }

        else { navigate('/operator?query=' + `${encodeURIComponent(searchQuery)}`); }
    };

    useEffect(() => {
        if (query) {
            const sOP = operator.filter((item) => {
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

            setSearchedOperators(sOP);
            setSearchedOnboarding(sO);
        }
        else {
            setSearchedOperators([]);
            setSearchedOnboarding([]);
        }
    }, [query, searchedOperators, searchedOnboarding]);

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
            const newfilteredOperators = paginatedProductOperator.filter(owner => {
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


            setFilterOperator(newfilteredOperators);
            setFilterOnboarding(newfilteredOnboarding);
            setshowFilterValue(true);
        }
    }

    const handleFilterSubmit = () => {
        const filteredOperators = paginatedProductOperator.filter(owner => {
            return (
                owner.village.toLowerCase().includes(villageF.toLowerCase()) &&
                owner.district.toLowerCase().includes(districtF.toLowerCase()) &&
                owner.state.toLowerCase().includes(stateF.toLowerCase()) &&
                owner.country.toLowerCase().includes(countryF.toLowerCase())
            );

        });

        console.log(filteredOperators);

        const filteredOnboarding = paginatedProductOnboarding.filter(owner => {
            return (
                owner.village.toLowerCase().includes(villageF.toLowerCase()) &&
                owner.district.toLowerCase().includes(districtF.toLowerCase()) &&
                owner.state.toLowerCase().includes(stateF.toLowerCase()) &&
                owner.country.toLowerCase().includes(countryF.toLowerCase())
            );
        });

        setFilterOperator(filteredOperators);
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
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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

    const generateFilterOperators = () => {
        return filterOperator.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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
    const generateFilterOnBoarding = () => {
        return filterOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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

    const generateSearchedOperators = () => {
        return searchedOperators.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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
    const generateSearchedOnBoarding = () => {
        return searchedOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7' }}>
                        <Avatar className='avatar_lp'><AccountCircleIcon sx={{ width: '100%', height: '100%' }} /></Avatar>
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

    const generateTable = () => {
        return (
            <>
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
                                Operator details added successfully
                            </Alert>
                        </Snackbar>
                        <Grid container className='right-part-landowner'>
                            <Grid xs={6.5}>
                                <Typography className='title' variant='p'>Operators</Typography>
                            </Grid>
                            <Grid xs={3}>
                                <SearchIcon className='search-icon' />
                                <input type='text' placeholder='Search..'
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        handleSearch(e.target.value);
                                    }} />
                            </Grid>
                            <Grid xs={0.5}>
                                <Badge color='success' variant='dot' className='filter-icon' onClick={handleClick}><FilterAltIcon /></Badge>
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

                            <Grid xs={2}>

                                <Link href='/operator/add-operator/0'>
                                    <Button variant='contained' className='add-landowner-btn' sx={{"&:hover":{color:'white'}}}>Add Operator</Button>
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
                                        <b><Typography variant='p' className='numbers'>{c.length}</Typography></b>
                                    </div>
                                    <img src={chart} className='information'></img>
                                </Item>
                            </Grid>
                            <Grid item xs={2.3}>
                                <Item className='events'>
                                    <img src={events}></img>
                                    <div className='information'>
                                        <Typography className='events-text' variant='p'>Events</Typography><br />
                                        <b><Typography variant='p' className='numbers'>{e.length}</Typography></b>
                                    </div>
                                    <img src={vector} className='information'></img>
                                </Item>
                            </Grid>

                        </Grid>


                        {filterCriteria.length > 0 || (query && searchQuery) ?
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
                                    {filterOperator.length > 0 ? (<>
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

                                                    {generateFilterOperators()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {filterOperator.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{filterOperator.length} {filterOperator.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(filterOperator.length / itemsPerPageOperator)}
                                                            variant='outlined'
                                                            page={pageOperator}
                                                            onChange={handleChangePageOperator} />

                                                    </Stack>
                                                </Grid>
                                            </>) : (<></>)}
                                        </Grid>
                                    </>) : (<></>)}

                                    {filterOnboarding.length > 0 ? (
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
                                                {filterOnboarding.length > 0 ?
                                                    (
                                                        <>
                                                            <Grid xs={9} className='total-events'>
                                                                <Typography sx={{ color: 'gray' }}>{filterOnboarding.length} {filterOnboarding.length == 1 ? 'Onboarding Operator' : 'Onboarding Operators'}</Typography>
                                                            </Grid>
                                                            <Grid xs={3} className='pagination'>
                                                                <Stack spacing={2}>
                                                                    <Pagination
                                                                        count={Math.ceil(filterOnboarding.length / itemsPerPageOnboarding)}
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

                                    {searchedOperators.length > 0 ? (<>
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

                                                    {generateSearchedOperators()}

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid container sx={{ mt: 3 }} >
                                            {searchedOperators.length > 0 ? (<>
                                                <Grid xs={9} className='total-events'>
                                                    <Typography sx={{ color: 'gray' }}>{searchedOperators.length} {searchedOperators.length == 1 ? 'Operator' : 'Operators'}</Typography>
                                                </Grid>
                                                <Grid xs={3} className='pagination'>
                                                    <Stack spacing={2}>
                                                        <Pagination
                                                            count={Math.ceil(searchedOperators.length / itemsPerPageOperator)}
                                                            variant='outlined'
                                                            page={pageOperator}
                                                            onChange={handleChangePageOperator} />

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