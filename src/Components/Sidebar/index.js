import React from 'react'
import './style.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Drawer, Grid, Paper, Typography } from "@mui/material";
import finalLogo from "../../assets/images/SideBar/FinalLogo.png";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar() {
    const location = useLocation();

    const isActive1 = location.pathname === '/dashboard';
    const isActive2 = location.pathname === '/landowners';
    const isActive3 = location.pathname === '/landparcels';
    const isActive4 = location.pathname.includes('/operator') || location.pathname.includes('/add-operator') ||
                    location.pathname.includes('/operator/profile') || location.pathname.includes('/operator/profile/landparcel') || location.pathname.includes('/operator/profile/landparcel/crops');
    const isActive5 = location.pathname.includes('/events/1') || location.pathname.includes('/events/2');
    
    const dashboardStyles = {
        color: isActive1 ? 'white' : 'black',
        backgroundColor: isActive1 ? '#ED7D3A' : 'none'
    };

    const landOwnersStyles = {
        color: isActive2 ? 'white' : 'black',
        backgroundColor: isActive2 ? '#ED7D3A' : 'none'
    };

    const landParcelsStyles = {
        color: isActive3 ? 'white' : 'black',
        backgroundColor: isActive3 ? '#ED7D3A' : 'none'
    };

    const operatorStyles = {
        color: isActive4 ? 'white' : 'black',
        backgroundColor: isActive4 ? '#ED7D3A' : 'none'
    };

    const eventsStyles = {
        color: isActive5 ? 'white' : 'black',
        backgroundColor: isActive5 ? '#ED7D3A' : 'none'
    };

    return (
        <div >

            <Box sx={{ marginTop: "20px", backgroundColor: "#EFEFF0" }}>
                <Drawer className='drawer'
                    sx={{
                        width: 275,
                        flexShrink: 0,
                        backgroundColor: "#EFEFF0",

                    }}
                    variant="permanent"
                    anchor="left">

                    <div style={{ display: "flex", backgroundColor: "#EFEFF0" }}>
                        <img className="sidebar-finalLogo" src={finalLogo} alt="logo"></img>
                    </div>
                    <Divider />

                    <div className='main-div'>
                        <List>
                            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                                <div className='div' style={dashboardStyles}>
                                    <DashboardIcon className='icon' > </DashboardIcon>
                                    <Typography variant="p" sx={{ mt: 1.3 }}>Dashboard</Typography>
                                </div>
                            </Link>

                            <Link to='/landowners' style={{ textDecoration: 'none' }}>
                                <div className='div' style={landOwnersStyles}>
                                    <GroupIcon className='icon' ></GroupIcon>
                                    <Typography variant='p' sx={{ mt: 1.3 }}>Land Owners</Typography>
                                </div>
                            </Link>

                            <Link to='/landparcels' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='div' style={landParcelsStyles}>
                                    <LandscapeIcon className='icon'></LandscapeIcon>
                                    <Typography variant='p' sx={{ mt: 1.3 }}>Land Parcels</Typography>
                                </div>
                            </Link>

                            <Link to='/operator' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='div' style={operatorStyles}>
                                    <PersonIcon className='icon' ></PersonIcon>
                                    <Typography variant='p' sx={{ mt: 1.3 }}>Operator</Typography>
                                </div>
                            </Link>

                            <Link to='/events/1' style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='div' style={eventsStyles}>
                                    <CalendarMonthIcon className='icon' ></CalendarMonthIcon>
                                    <Typography variant='p' sx={{ mt: 1.3 }}>Events</Typography>
                                </div>
                            </Link>
                        </List>
                    </div>
                </Drawer>

            </Box>
        </div >
    )
}


