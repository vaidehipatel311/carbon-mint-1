import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Link from '@mui/material/Link';
import { Box, Grid, Typography, Breadcrumbs } from '@mui/material'
import React, { useState, useEffect } from 'react';
import './addoperator.css'
import { Button, MenuItem, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { connect } from 'react-redux'
import { addLandparcel, editLandparcel, fetchLandparcels } from '../../Services/Operator/actions'

function AddLandparcel({ addLandparcel, editLandparcel, fetchLandparcels }) {
    const { landparcelid } = useParams();
    const { id } = useParams();

    const [isDraft, setisDraft] = useState(false);
    const [draftdata, setDraftData] = useState([]);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            landparcel_name: '',
            house_no:'',
            village: '',
            district: '',
            state: '',
            country: '',
            postal_code: '',
            acres: '',
            area_owned: '',
            area_leased: '',
            SyNo: '',
            neighbouring_farm: '',
            distance: '',
            land_under_cultivation: '',
            cropping_systems: '',
            farming_system: '',
            infrastructure: '',
            water_resources: ''
        },
        onSubmit: (values) => {
            if (landparcelid != '0') {
                formik.setValues({
                    ...formik.values,
                    ...values
                });
                editLandparcel(id, values)
                navigate('/operator/' + `${id}` + '/profile/landparcel/' + `${landparcelid}`, { state: { showAlert: true } })
            }
            else {
                addLandparcel(values,id);
                navigate('/operator/' + `${id}` + '/profile', { state: { showAlert: true } })

            }
        },
    });

    useEffect(() => {
        fetchLandparcels()
            .then((data) => {
                const filteredEvent = data.find(p => p.id === parseInt(landparcelid, 10))
                setDraftData(filteredEvent);
                formik.setValues({
                    ...formik.values,
                    ...filteredEvent
                });
            })
            .catch(err => console.log(err));
        handleDraftForm();

    }, [id]);
    const handleDraftForm = () => {
        if (landparcelid != 0) {
            setisDraft(true);
        }

    };
    return (
        <>
            <Header />
            <Sidebar />
            <Box sx={{ margin: '100px 30px 50px 300px' }}>
                <div className='path'>
                    <Breadcrumbs sx={{
                        textDecoration: 'none'
                    }}
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb">

                        <Link href={'/operator/' + `${id}` + '/profile'} color='inherit' underline='hover'>
                            Profile
                        </Link>

                    </Breadcrumbs>
                    <div className='create-operator-title'>
                        <Typography variant='p' className='title'>Add Land Parcel</Typography>
                    </div>
                </div>


                <Grid container spacing={2} sx={{ mt: 3, ml: 1 }}>
                    <Grid xs={6}>
                        <div className='first-part'>
                            <div className='operator-name'>
                                <Typography variant='p' fontWeight='bold'>Crop name</Typography>

                                <TextField
                                    label='Landparcel name'
                                    type='text'
                                    select
                                    name='landparcel_name'
                                    onChange={formik.handleChange}
                                value={formik.values.landparcel_name}
                                defaultValue={isDraft ? draftdata.landparcel_name : ""}
                                >
                                    <MenuItem value='Chennaiah Polam Corner Field'>Chennaiah Polam Corner Field</MenuItem>
                                    <MenuItem value='Chennaiah Polam Lake Edge Field'>Chennaiah Polam Lake Edge Field</MenuItem></TextField>
                                <TextField
                                    label='Acres'
                                    type='number'
                                    name='acres'
                                    onChange={formik.handleChange}
                                value={formik.values.acres}
                                defaultValue={isDraft ? draftdata.acres : ""}
                                />
                                <TextField
                                    label='Area Owned'
                                    type='number'
                                    name='area_owned'
                                    onChange={formik.handleChange}
                                value={formik.values.area_owned}
                                defaultValue={isDraft ? draftdata.area_owned : ""}
                                />
                                <TextField
                                    label='Area Leased'
                                    type='text'
                                    name='area_leased'
                                    onChange={formik.handleChange}
                                value={formik.values.area_leased}
                                defaultValue={isDraft ? draftdata.area_leased : ""}
                                />

                                <Typography variant='p' fontWeight='bold'>Address Details</Typography>
                                <TextField
                                    label='Address'
                                    type='text'
                                    name='house_no'
                                    onChange={formik.handleChange}
                                value={formik.values.house_no}
                                defaultValue={isDraft ? draftdata.house_no : ""}
                                />
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <TextField
                                        type='text'
                                        fullWidth
                                        label='Village'
                                        name='village'
                                        value={formik.values.village}
                                        defaultValue={isDraft ? draftdata.village : ""}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='District'
                                        name='district'
                                        value={formik.values.district}
                                        defaultValue={isDraft ? draftdata.district : ""}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='Hyderabad'>Hyderabad</MenuItem>
                                        <MenuItem value='Ahmedabad'>Ahmedabad</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='State'
                                        name='state'
                                        value={formik.values.state}
                                        defaultValue={isDraft ? draftdata.state : ""}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='Telangana'>Telangana</MenuItem>
                                        <MenuItem value='Gujarat'>Gujarat</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='Country'
                                        name='country'
                                        value={formik.values.country}
                                        defaultValue={isDraft ? draftdata.country : ""}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='India'>India</MenuItem>
                                        <MenuItem value='U.S.A'>U.S.A</MenuItem>
                                    </TextField>
                                </div>

                            </div>

                        </div>
                    </Grid>
                    <Grid xs={6}>
                        <div className='first-part'>
                            <div className='operator-name'>
                                <Typography variant='p' fontWeight='bold'>Details</Typography>
                                <TextField
                                    label='Syno.'
                                    type='text'
                                    name='SyNo'
                                    onChange={formik.handleChange}
                                value={formik.values.SyNo}
                                defaultValue={isDraft ? draftdata.SyNo : ""}
                                />
                                    
                                <TextField
                                    label='Neighbouring Farm'
                                    type='text'
                                    name='neighbouring_farm'
                                    onChange={formik.handleChange}
                                    helperText='Enter Directions'
                                value={formik.values.neighbouring_farm}
                                defaultValue={isDraft ? draftdata.neighbouring_farm : ""}
                                />
                                <TextField
                                    label='Distance'
                                    type='text'
                                    name='distance'
                                    onChange={formik.handleChange}
                                value={formik.values.distance}
                                defaultValue={isDraft ? draftdata.distance : ""}
                                />
                                <TextField
                                    label='Land Under Cultivation'
                                    type='text'
                                    name='land_under_cultivation'
                                    onChange={formik.handleChange}
                                value={formik.values.land_under_cultivation}
                                defaultValue={isDraft ? draftdata.land_under_cultivation : ""}
                                />
                                <TextField
                                    label='Cropping Systems'
                                    type='text'
                                    name='cropping_systems'
                                    onChange={formik.handleChange}
                                value={formik.values.cropping_systems}
                                defaultValue={isDraft ? draftdata.cropping_systems : ""}
                                >
                                    <MenuItem value='Monocropping'>Monocropping</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>
                                <TextField
                                    label='Farming Systems'
                                    type='text'
                                    name='farming_system'
                                    onChange={formik.handleChange}
                                value={formik.values.farming_system}
                                defaultValue={isDraft ? draftdata.farming_system : ""}
                                >
                                    <MenuItem value='Cropping'>Cropping</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>
                                <TextField
                                    label='Infrastructure'
                                    type='text'
                                    name='infrastructure'
                                    onChange={formik.handleChange}
                                value={formik.values.infrastructure}
                                defaultValue={isDraft ? draftdata.infrastructure : ""}
                                >
                                    <MenuItem value='Buildings'>Buildings</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>
                                <TextField
                                    label='Water Resources'
                                    type='text'
                                    name='water_resources'
                                    onChange={formik.handleChange}
                                value={formik.values.water_resources}
                                defaultValue={isDraft ? draftdata.water_resources : ""}
                                >
                                    <MenuItem value='Buildings'>Buildings</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>

                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className='myDiv formVisibleTrue'>

                    <Button variant='outlined' className='three-buttons' sx={{
                        mr: 1, color: "#2B9348", border: "2px solid #2B9348",
                        "&:hover": { color: '#2B9348', border: "2px solid #2B9348", }
                    }} onClick={formik.handleReset}><Typography>Discard</Typography></Button>

                    <Button variant='contained' className='three-buttons' sx={{ backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348" }} onClick={formik.handleSubmit}>Submit</Button>
                </div>

            </Box>
        </>
    )
}
const mapStateToProps = (state) => {
    return {

        // onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    addLandparcel: (formik,id) => addLandparcel(formik,id),
    editLandparcel: (id, formik) => editLandparcel(id, formik),
    fetchLandparcels: () => fetchLandparcels()

}

export default connect(mapStateToProps, mapDispatchToProps)(AddLandparcel);