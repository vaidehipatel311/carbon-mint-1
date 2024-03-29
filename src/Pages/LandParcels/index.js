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
import avatar from '../../assets/images/LandParcels/avatar.png'
import Banner from '../../assets/images/LandParcels/Banner.png'
import axios from 'axios';
import * as urls from '../../Config/urls';

import * as action from '../../Services/LandParcels/actions';
import * as action_onboard from '../../Services/Onboarding/actions';
import landparcel from '../Operator/landparcel';

function LandParcels({ fetchLandParcel }) {
    const navigate = useNavigate()

    const [landParcels, setLandParcels] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [showTable, setshowtable] = useState(true);
    const [pageLandparcel, setPageLandparcel] = useState(1);
    const [pageOnboarding, setPageOnboarding] = useState(1);



    useEffect(() => {
        fetchLandParcel()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setLandParcels(approved);
                const pending = data.filter((p) => p.status === "Pending");
                setonboarding(pending);
            })
            .catch(err => console.log(err))

    }, []);

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

                    <TableCell align='center' sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => { handleProfile(owners.id) }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>


                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.SyNo}</TableCell>
                    <TableCell align='center'>{owners.acres}</TableCell>
                    <TableCell align='center'>{owners.contact_number_1}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><button className="grid-button" >{owners.crops[0]}</button><button className="grid-button" >{owners.crops[1]}</button></TableCell>
                    <TableCell align='center'>
                        <Link href={'/landparcels/add-landparcel/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
                        <DeleteIcon onClick={() => handleDelete(owners.id)} sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} /></TableCell>

                </TableRow>
            </TableBody>
        ));
    }
    const generateOnBoarding = () => {
        return paginatedProductOnboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
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
                    {/* <Paper> */}
                    <img className="grid-upper" src={Banner}></img>

                    {/* </Paper > */}
                </Grid>
                <Grid item xs={12}>
                    <Paper className="grid-lower">
                        <Grid container spacing={2} sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">14</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">8</Typography></Grid>
                            <Grid item xs={4} className='num'><Typography variant='p' fontWeight="bold">8</Typography></Grid>
                        </Grid>
                        <Grid container sx={{ textAlign: 'center', justifyContent: 'space-between', display: 'flex' }}>
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
                        <Typography className='title' variant='p'>Land Parcels</Typography>
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
                            sx={{ color: showTable ? 'black' : 'lightgreen', cursor: 'pointer' }}></WindowIcon>
                    </Grid>
                    <Grid xs={0.5}>
                        <ListIcon className='list-icon' fontSize='medium' onClick={() => { handleTable() }}
                            sx={{ color: showTable ? 'lightgreen' : 'black', cursor: 'pointer' }}></ListIcon>
                    </Grid>
                    <Grid xs={2}>
                        <Link href='/landparcels/add-landparcel/0' style={{ textDecoration: "none", color: "black" }}>
                            <Button variant='contained' className='add-landowner-btn'>Add Land Parcel</Button>
                        </Link>
                    </Grid>

                </Grid>

                <Grid container className='cards'>
                    <Grid item xs={2.3}>
                        <Item className='operators'>
                            <img src={operators}></img>
                            <div className='information'>
                                <Typography className='operators-text' variant='p'>Land Parcels</Typography><br />
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
                        </Item>
                    </Grid>
                    <Grid item xs={2.3}>
                        <Item className='events'>
                            <img src={events}></img>
                            <div className='information'>
                                <Typography className='events-text' variant='p'>Events</Typography><br />
                                <b><Typography variant='p' className='numbers'>86</Typography></b>
                            </div>
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
                        <Grid container>
                            {generateGridItems()}
                        </Grid>
                    )
                }
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        landOwners: state.landowners.landowners,
        onboarding: state.onboarding.onboarding,
        landParcels: state.landparcels.landparcels,

    };
};

const mapDispatchToProps = {
    fetchLandParcel: () => action.fetchLandParcel(),
}

export default connect(mapStateToProps, mapDispatchToProps)(LandParcels);