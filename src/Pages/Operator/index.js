import React, { useState, useEffect } from 'react'
import './operator.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom'
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import App from '../../App'
import operators from '../../assets/images/DashBoard/operators.png'
import noacrs from '../../assets/images/DashBoard/noacrs.png'
import yields from '../../assets/images/DashBoard/yields.png'
import crops from '../../assets/images/DashBoard/crops.png'
import events from '../../assets/images/DashBoard/events.png'
import old_man from '../../assets/images/LandOwners/old_man.png'
import vector from '../../assets/images/LandOwners/vector.png'
import avatar from '../../assets/images/LandOwners/avatar.png'
import chart from '../../assets/images/LandOwners/Chart.png'

import * as action from '../../Services/Operator/actions';
import * as action_onboard from '../../Services/Onboarding/actions';
import axios from 'axios';
import * as urls from '../../Config/urls';

function Operators({ fetchOperator, fetchOnboarding }) {
    const navigate = useNavigate()
    const [operator, setOperator] = useState([]);
    const [onboarding, setonboarding] = useState([]);


    useEffect(() => {
        fetchOperator()
            .then((data) => {
                const approved = data.filter((p) => p.status === "Approved");
                setOperator(approved);
                const pending = data.filter((p) => p.status === "Pending");
                setonboarding(pending);
            })
            .catch(err => console.log(err))

    }, []);

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
        navigate('/operator/'+`${id}`+'/profile')
    }
    const generateLandOwners = () => {
        return operator.map((owners, index) => (
            <TableBody>
                <TableRow className='tr'>

                    <TableCell align='center' sx={{ display: 'flex', borderRight: '1px solid #d7d7d7', cursor: 'pointer' }}  onClick={() => { handleProfile(owners.id) }}>
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
                    <Link href={'/add-operator/' + `${owners.id}`} style={{ textDecoration: "none", color: "black" }}><EditIcon sx={{ "&:hover": { color: 'blue' }, cursor: 'pointer' }} /></Link>
                        <DeleteIcon onClick={() => handleDelete(owners.id)} sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} /></TableCell>

                </TableRow>
            </TableBody>
        ));
    }
    const generateOnBoarding = () => {
        return onboarding.map((owners, index) => (
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
            <Header />
            <Sidebar />

            <Box sx={{ margin: '100px 20px 50px 300px' }}>
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

                        <Link to='/add-operator/0'>
                            <Button variant='contained' className='add-landowner-btn'>Add Operator</Button>
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
                    <Typography sx={{ color: 'gray' }}>{operator.length} {operator.length <= 1 ? 'Operator' : 'Operators'} </Typography>
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
        landOwners: state.landowners.landowners,
        onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    fetchOperator: () => action.fetchOperator(),
    fetchOnboarding: () => action_onboard.fetchOnboarding()
}

export default connect(mapStateToProps, mapDispatchToProps)(Operators);