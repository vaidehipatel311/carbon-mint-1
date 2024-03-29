import React, { useState, useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import WindowIcon from '@mui/icons-material/Window';
import ListIcon from '@mui/icons-material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crops from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import old_man from '../../assets/images/LandOwners/old_man.png'
import vector from '../../assets/images/LandOwners/vector.png'
import avatar from '../../assets/images/LandOwners/avatar.png'
import chart from '../../assets/images/LandOwners/Chart.png'

import * as action from '../../Services/LandOwners/actions';
import axios from 'axios';
import * as urls from '../../Config/urls';
function LandOwners({ fetchLandOwners }) {
    const navigate = useNavigate()
    const [landOwners, setlandOwners] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [showTable, setshowtable] = useState(true);
    const [pageLandowner, setPageLandowner] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);

    useEffect(() => {
        fetchLandOwners()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setlandOwners(approved);
                console.log(landOwners);
                const pending = data.filter((p) => p.status === "Pending");
                setonboarding(pending);
            })
            .catch(err => console.log(err))

    }, [landOwners]);

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


    const handleGrid = () => { setshowtable(false); console.log("handle") }

    const handleTable = () => { setshowtable(true); console.log("handle") }

    const handleDelete = async (id) => {
        try {
            const updatedCartjson = [...landOwners];
            setlandOwners(updatedCartjson);
            await axios.delete(urls.landOwnersUrl + `/${id}`);

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

                    <TableCell align='center' sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>

                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
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
                        <DeleteIcon onClick={() => handleDelete(owners.id)} sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} /></TableCell>

                </TableRow>
            </TableBody >
        ));
    }
    const generateOnBoarding = () => {
        return paginatedProductOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
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

    const generateGridItems = () => {

        return landOwners.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }} >
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <div style={{ display: 'grid', alignItems: 'center' }}>
                        <Avatar className='avatar' ><img src={old_man}></img></Avatar>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button">
                                {owner.crops.length} crops
                            </button>
                            <button className="grid-button" >32 events</button>
                        </div>
                    </div>
                </Paper>
                <br></br>
            </Grid >

        ));
    };

    const generateGridItemsOnboarding = () => {

        return onboarding.map((owner, index) => (

            <Grid xs={3} key={owner.id} className='grid-item'>
                <Paper className="grid-item-card" sx={{ backgroundColor: "rgb(245, 243, 243)" }} >
                    <div style={{ height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="p" className='typo1' >
                            #{owner.ownerID}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <div style={{ display: 'grid', alignItems: 'center' }}>
                        <Avatar className='avatar' ><img src={old_man}></img></Avatar>
                        <Typography variant="p" className='name'>
                            {owner.name}
                        </Typography>
                        <Typography variant="body2" className='contact'>
                            {owner.contact_number_1}
                        </Typography>
                        <div>
                            <button className="grid-button">
                                {owner.crops.length} crops
                            </button>
                            <button className="grid-button" >32 events</button>
                        </div>
                    </div>
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

    return (
        <>
            <Header />
            <Sidebar />

            <Box sx={{ margin: '100px 20px 50px 300px' }}>
                <Grid container className='right-part-landowner'>
                    <Grid xs={5.4}>
                        <Typography className='title' variant='p'>Land Owners</Typography>
                    </Grid>
                    <Grid xs={3.1}>
                        <SearchIcon className='search-icon' />
                        <input type='text' placeholder='Search..' />
                    </Grid>
                    <Grid xs={0.5}>
                        <Badge color='success' variant='dot' className='filter-icon'><FilterAltIcon /></Badge>
                    </Grid>
                    <Grid xs={0.5}>
                        <WindowIcon className='grid-icon' fontSize='medium' onClick={() => { handleGrid() }}
                            sx={{ color: showTable ? 'black' : 'lightgreen' }}></WindowIcon>
                    </Grid>
                    <Grid xs={0.5}>
                        <ListIcon className='list-icon' fontSize='medium' onClick={() => { handleTable() }}
                            sx={{ color: showTable ? 'lightgreen' : 'black' }}></ListIcon>
                    </Grid>
                    <Grid xs={2}>
                        <Link href='/landowners/add-landowner/0' style={{ textDecoration: "none", color: "black" }}>
                            <Button variant='contained' className='add-landowner-btn'>Add Land Owner</Button>
                        </Link>
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
                            <img src={events}></img>
                            <div className='information'>
                                <Typography className='events-text' variant='p'>Events</Typography><br />
                                <b><Typography variant='p' className='numbers'>86</Typography></b>
                            </div>
                            <img src={vector} className='information'></img>
                        </Item>
                    </Grid>

                </Grid>


                {showTable ? (
                    <>
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

                                    {generateLandOwners()}

                                </Table>
                            </TableContainer>
                        </Grid>
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
                        <br></br>
                        <Grid container>
                            <TableContainer>
                                <Table className='table'>
                                    <TableBody >
                                        <TableRow className='th'>
                                            <TableCell align='center'>Onboarding Land Owners</TableCell>
                                            <TableCell align='center'>ID</TableCell>
                                            <TableCell align='center'>Aadhar Card</TableCell>
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
                    </>)
                    : (<div style={{marginTop:'20px'}}>
                        <Typography variant='body1' fontWeight='bold'>Land Owners</Typography>

                        <Grid container>
                            {generateGridItems()}
                        </Grid>

                        <Typography variant='body1' fontWeight='bold' >Onboarding Land Owners</Typography>

                        <Grid container>
                            {generateGridItemsOnboarding()}
                        </Grid>
                    </div>
                    )
                }
            </Box>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        landOwners: state.landowners.landowners,
    };
};

const mapDispatchToProps = {
    fetchLandOwners: () => action.fetchLandOwners(),
}

export default connect(mapStateToProps, mapDispatchToProps)(LandOwners);