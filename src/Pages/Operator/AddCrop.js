import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Link from '@mui/material/Link';
import { Box, Grid, Typography,Breadcrumbs } from '@mui/material'
import React, { useState, useEffect } from 'react';
import './addoperator.css'
import { Button, MenuItem, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { connect } from 'react-redux'
import { addCrops, editCrop, fetchCrops } from '../../Services/Operator/actions'

function AddCrop({ addCrops, editCrop, fetchCrops }) {
    const { cropid } = useParams();
    const { id } = useParams();
    const { landparcelid } = useParams();


    const [isDraft, setisDraft] = useState(false);
    const [draftdata, setDraftData] = useState([]);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            crop_name: '',
            landparcel_name: '',
            acres: '',
            area_owned: '',
            crop_age: '',
            cropping_systems: '',
            water_resources: '',
            water_sample_test: '',
            irrigation_status: ''
        },
        onSubmit: (values) => {
            if (cropid != '0') {
                formik.setValues({
                    ...formik.values,
                    ...values
                });
                editCrop(id, values)
                navigate('/operator/' + `${id}` + '/profile/landparcel/'+`${cropid}`+'/crops/' + `${cropid}`, { state: { showAlert: true } })
            }
            else {
                addCrops(values,landparcelid);
                navigate('/operator/'+`${id}`+'/profile/landparcel/'+`${landparcelid}`, { state: { showAlert: true } })

            }
        },
    });

    useEffect(() => {
        fetchCrops()
            .then((data) => {
                const filteredEvent = data.find(p => p.id === parseInt(cropid, 10))
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
        if (cropid != 0) {
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

                        <Link href={'/operator/'+`${id}`+'/profile/landparcel'+`${landparcelid}`} color='inherit' underline='hover'>
                            Land Parcels
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
                                    label='Crop name'
                                    type='text'
                                    select
                                    name='crop_name'
                                    onChange={formik.handleChange}
                                    value={formik.values.crop_name}
                                    defaultValue={isDraft ? draftdata.crop_name : ""}
                                >
                                    <MenuItem value='Sorghum'>Sorghum</MenuItem>
                                    <MenuItem value='Finger Millet'>Finger Millet</MenuItem></TextField>
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
                                    label='Crop age'
                                    type='text'
                                    name='crop_age'
                                    onChange={formik.handleChange}
                                    value={formik.values.crop_age}
                                    defaultValue={isDraft ? draftdata.crop_age : ""}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={6}>
                        <div className='first-part'>
                            <div className='operator-name'>
                                <Typography variant='p' fontWeight='bold'>Details</Typography>
                                <TextField
                                    label='Cropping Systems'
                                    type='text'
                                    select
                                    name='cropping_systems'
                                    onChange={formik.handleChange}
                                    value={formik.values.cropping_systems}
                                    defaultValue={isDraft ? draftdata.cropping_systems : ""}
                                >
                                    <MenuItem value='Monocropping'>Monocropping</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>
                                <TextField
                                    label='Water Resources'
                                    type='text'
                                    select
                                    name='water_resources'
                                    onChange={formik.handleChange}
                                    value={formik.values.water_resources}
                                    defaultValue={isDraft ? draftdata.water_resources : ""}
                                >
                                    <MenuItem value='Borewell'>Borewell</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem></TextField>
                                <TextField
                                    label='Water Sample Test'
                                    type='text'
                                    name='water_sample_test'
                                    helperText='Enter Contact no. Ex ( +91 1234567890 )'
                                    onChange={formik.handleChange}
                                    value={formik.values.water_sample_test}
                                    defaultValue={isDraft ? draftdata.water_sample_test : ""}
                                />
                                <TextField
                                    label='Irrigation Status'
                                    type='text'
                                    name='irrigation_status'
                                    onChange={formik.handleChange}
                                    value={formik.values.irrigation_status}
                                    defaultValue={isDraft ? draftdata.irrigation_status : ""}
                                />

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
    addCrops: (formik,landparcelid) => addCrops(formik,landparcelid),
    editCrop: (id, formik) => editCrop(id, formik),
    fetchCrops: () => fetchCrops()

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCrop);