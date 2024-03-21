import React, { useState, useEffect } from 'react'
import './style.css'
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
import * as action_onboarding from '../../Services/Onboarding/actions';

function LandOwners({ fetchLandOwners, fetchOnboarding }) {
    const [landOwners, setlandOwners] = useState([]);
    const [onboarding, setonboarding] = useState([]);
    const [showTable, setshowtable] = useState(true);


    useEffect(() => {
        fetchLandOwners()
            .then((data) => {
                setlandOwners(data);
                console.log(landOwners);
            })
            .catch(err => console.log(err))

        fetchOnboarding()
            .then((data) => {
                setonboarding(data);
                console.log(landOwners);
            })
            .catch(err => console.log(err))

    }, []);

    const handleGrid = () => { setshowtable(false); console.log("handle") }

    const handleTable = () => { setshowtable(true); console.log("handle") }


    const generateLandOwners = () => {
        return landOwners.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
                        <Typography variant='p'>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerId}</TableCell>
                    <TableCell align='center'>{owners.passbookrefno}</TableCell>
                    <TableCell align='center'>{owners.contactno}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><button className="grid-button" >{owners.crops[0]}</button><button className="grid-button" >{owners.crops[1]}</button></TableCell>
                    <TableCell align='center'><EditIcon /><DeleteIcon /></TableCell>

                </TableRow>
            </TableBody>
        ));
    }
    const generateOnBoarding = () => {
        return onboarding.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>
                    <TableCell align='center' sx={{ display: 'flex' }}>
                        <Avatar sx={{ background: 'none' }}><img src={avatar} className='landowner-avatar'></img></Avatar>
                        <Typography variant='p' sx={{ mt: 1, ml: 1 }}>{owners.name}</Typography>
                    </TableCell>
                    <TableCell align='center' sx={{ color: "rgb(62, 205, 62)" }}>{owners.ownerId}</TableCell>
                    <TableCell align='center'>{owners.aadhar}</TableCell>
                    <TableCell align='center'>{owners.contactno}</TableCell>
                    <TableCell align='center'>{owners.village}</TableCell>
                    <TableCell align='center'><Button variant='contained' className="status-button" >{owners.status}</Button></TableCell>
                    <TableCell align='center'><RemoveRedEyeIcon /></TableCell>


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
                            #{owner.ownerId}
                        </Typography>
                        <MoreVertIcon />
                    </div>
                    <Avatar className='avatar'><img src={old_man}></img></Avatar>
                    <Typography variant="p" className='name'>
                        {owner.name}
                    </Typography>
                    <Typography variant="body2" className='contact'>
                        {owner.contactno}
                    </Typography>
                    <div style={{ marginLeft: '20px' }}>
                        <button className="grid-button">
                            2 crops
                        </button>
                        <button className="grid-button" >32 events</button>
                        <button className="grid-button" >...</button>
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
                        <Button variant='contained' className='add-landowner-btn'>Add Land Owner</Button>
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
                                <Typography sx={{ color: 'gray' }}>259 Operators</Typography>
                            </Grid>
                            <Grid xs={3} className='pagination'>
                                <Stack spacing={2}>
                                    <Pagination count={3} variant="outlined" />

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
                            </Grid>
                            <Grid xs={3} className='pagination'>
                                <Stack spacing={2}>
                                    <Pagination count={3} variant="outlined" />

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
    };
};

const mapDispatchToProps = {
    fetchLandOwners: () => action.fetchLandOwners(),
    fetchOnboarding: () => action_onboarding.fetchOnboarding()
}

export default connect(mapStateToProps, mapDispatchToProps)(LandOwners);