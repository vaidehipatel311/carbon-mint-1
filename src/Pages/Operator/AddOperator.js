import React, { useState } from 'react';
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import './addoperator.css'
import Link from '@mui/material/Link';
import { Button, MenuItem, TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import aadhar_img from '../../assets/images/Operators/aadhar_img.png'
import { addOperator } from '../../Services/Operator/actions'
import { connect } from 'react-redux'

const validate = (values) => {
    const errors = {};

    if (!values.name || !values.contact_number_1 || !values.village || !values.aadhar_no || !values.passbook_refno
        || !values.crops) {
        errors.name = 'Required';
        errors.contact_number_1 = 'Required';
        errors.village = 'Required';
        errors.aadhar_no = 'Required';
        errors.passbook_refno = 'Required';
        errors.crops = 'Required';
    }
    else if(values.contact_number_1.length !== 10){
        errors.contact_number_1 = 'Must be 10 digits'
    }
    return errors;
};


function AddOperator({ addOperator }) {
    const navigate = useNavigate();
    const [selectedFileaadhar, setSelectedFileaadhar] = useState([]);
    const [selectedFilePanCard, setSelectedFilePanCard] = useState([]);
    const [selectedFileLeasedDoc, setSelectedFileLeasedDoc] = useState([]);

    const formik = useFormik({
        initialValues: {
            uniqueID: null,
            uniqueIDFileName: '',
            pancardFile: null,
            pancardFileName: '',
            leasedFile: null,
            leasedFileName: '',

            name: '',
            family_size: '',
            father_name: '',
            ownerID: 'KFP/MT/03',
            contact_number_2: '',
            contact_number_1: '',
            house_no: '',
            street_name: '',
            village: '',
            block: '',
            district: '',
            state: '',
            country: '',
            postal_code: '',
            website_addr: '',
            email_id: '',
            aadhar_no: '',
            unique_id: '',
            panCard_id: '',
            edu_qualification: '',
            passbook_refno: '',
            total_farming_exp_year: '',
            organic_farming_exp_year: '',
            landparcel_name: '',
            total_landparcels: '',
            owner_name: '',
            leased_doc_id: '',
            total_crops: '',
            area: '',
            crops: ''
        },
        validate,
        onSubmit: (values) => {
            const uniqueIDBase64 = formik.values.uniqueID ? btoa(formik.values.uniqueID) : null;
            const pancardFileIDBase64 = formik.values.pancardFile ? btoa(formik.values.pancardFile) : null;
            const leasedFileIDBase64 = formik.values.leasedFile ? btoa(formik.values.leasedFile) : null;

            formik.values.unique_id = uniqueIDBase64;
            formik.values.panCard_id = pancardFileIDBase64;
            formik.values.leased_doc_id = leasedFileIDBase64;
            addOperator(values);
            navigate('/operator')
        },
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: "20px",
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
    });

    const handleDeleteFile = (index, fileType) => {
        const updatedFilesaadhar = selectedFileaadhar.filter((_, i) => i !== index);
        setSelectedFileaadhar(updatedFilesaadhar);

        const updatedFilesPanCard = selectedFilePanCard.filter((_, i) => i !== index);
        setSelectedFilePanCard(updatedFilesPanCard);

        const updatedFilesLeasedDoc = selectedFileLeasedDoc.filter((_, i) => i !== index);
        setSelectedFileLeasedDoc(updatedFilesLeasedDoc);

        if (fileType === 'aadhar') {
            setSelectedFileaadhar([]);
            formik.values.uniqueID = null;
            formik.values.uniqueIDFileName = 'No File Chosen'
            
        } else if (fileType === 'pancard') {
            setSelectedFilePanCard([]);
            formik.values.pancardFile = null;
            formik.values.pancardFileName = 'No File Chosen'
            
        } else if (fileType === 'leased') {
            setSelectedFileLeasedDoc([]);
            formik.values.leasedFile = null;
            formik.values.leasedFileName = 'No File Chosen';
            
        }
    };

    const handleFileChangeAadhar = (event, key) => {
        const file = event.target.files[0];
        setSelectedFileaadhar([file]);
        formik.values.uniqueID = file;
        formik.values.uniqueIDFileName = file.name
        
    };

    const handleFileChangePanCard = (event, key) => {
        const file = event.target.files[0];
        setSelectedFilePanCard([file]);
        formik.values.pancardFile = file;
        formik.values.pancardFileName = file.name
        
    };

    const handleFileChangeLeasedDoc = (event, key) => {
        const file = event.target.files[0];
        setSelectedFileLeasedDoc([file]);
        formik.values.leasedFile = file;
        formik.values.leasedFileName = file.name;
        
    };

    



    return (
        <>
            <Header />
            <Sidebar />

            <Box sx={{ margin: '100px 30px 50px 300px' }}>
                <Grid container>
                    <Grid xs={12}>
                        <Breadcrumbs sx={{
                            textDecoration: 'none'
                        }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb">

                            <Link underline='hover' color='inherit' href="/operator">Operators</Link>

                        </Breadcrumbs>
                        <div className='title'>
                            <Typography variant='p'>Create Operator</Typography>
                        </div>
                    </Grid>

                </Grid>

                <Grid container spacing={2} sx={{ mt: 3, ml: 1 }}>
                    <Grid xs={6}>
                        <div className='first-part'>
                            <div className='operator-name'>
                                <Typography variant='p' fontWeight='bold'>Operator name</Typography>
                                <TextField
                                    type="text"
                                    label="Name"
                                    name="name"
                                    required
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    helperText='First name + Last name'
                                    error={formik.errors.name ? true : false}
                                />
                                

                                <TextField
                                    type='text'
                                    name='family_size'
                                    label='Family size'
                                    value={formik.values.family_size}
                                    onChange={formik.handleChange}
                                />
                                    

                                <TextField
                                    type='text'
                                    label='Father name'
                                    name='father_name'
                                    value={formik.values.father_name}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    type='text'
                                    label='ID'
                                    name='ownerID'
                                    value={formik.values.ownerID}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className='address-contact-details'>
                                <Typography variant='p' fontWeight='bold'>Address & Contact Details</Typography>
                                <TextField
                                    type='text'
                                    label='Contact number 1'
                                    name='contact_number_1'
                                    value={formik.values.contact_number_1}
                                    onChange={formik.handleChange}
                                    required
                                    error={formik.errors.contact_number_1 ? true : false}
                                    helperText={formik.errors.contact_number_1}
                                />

                                <TextField
                                    type='text'
                                    label='Contact number 2'
                                    name='contact_number_2'
                                    value={formik.values.contact_number_2}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    type='text'
                                    label='House no / Door no'
                                    name='house_no'
                                    value={formik.values.house_no}
                                    onChange={formik.handleChange}
                                >
                                </TextField>
                                <TextField
                                    type='text'
                                    label='Street name'
                                    name='street_name'
                                    value={formik.values.street_name}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    type='text'
                                    label='Village'
                                    name='village'
                                    value={formik.values.village}
                                    onChange={formik.handleChange}
                                    required
                                    error={formik.errors.village ? true : false}
                                />
                                
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='District'
                                        name='district'
                                        value={formik.values.district}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='Hyderabad'>Hyderabad</MenuItem>
                                        <MenuItem value='Ahmedabad'>Ahmedabad</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='State'
                                        name='state'
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='Telangana'>Telangana</MenuItem>
                                        <MenuItem value='Gujarat'>Gujarat</MenuItem>
                                    </TextField>
                                </div>
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='Country'
                                        name='country'
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value='India'>India</MenuItem>
                                        <MenuItem value='U.S.A'>U.S.A</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        label='Postal Code'
                                        name='postal_code'
                                        value={formik.values.postal_code}
                                        onChange={formik.handleChange}
                                    >
                                    </TextField>

                                </div>
                                
                                <TextField
                                    type='text'
                                    label='Email ID'
                                    name='email_id'
                                    value={formik.values.email_id}
                                    onChange={formik.handleChange}
                                />
                                <Typography variant='p'>Unique ID (Aadhar card) *</Typography>


                                <TextField
                                    type='text'
                                    label='Aadhar number'
                                    name='aadhar_no'
                                    required
                                    value={formik.values.aadhar_no}
                                    onChange={formik.handleChange}
                                    error={formik.errors.aadhar_no ? true : false}
                                />
                                <Grid container sx={{ display: 'flex', gap: '20px' }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        size="small"
                                        sx={{
                                            width: "200px",
                                            height: '40px',
                                            marginBottom: "10px",
                                            backgroundColor: 'rgba(140, 216, 103, 1)',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: 'rgba(140, 216, 103, 1)',
                                            },
                                        }}
                                    >
                                        Choose file
                                        <VisuallyHiddenInput type="file" multiple onChange={(event) => handleFileChangeAadhar(event, 'uniqueID')} />
                                    </Button>
                                    <Typography sx={{ mt: 1 }}>{formik.values.uniqueID ? (formik.values.uniqueID.name) : "No file chosen"}</Typography>
                                    {(
                                        <>
                                            {selectedFileaadhar.map((file, index) => (
                                                <>
                                                    <img
                                                        key={1}
                                                        src={aadhar_img}
                                                        alt={`Preview ${1}`}
                                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                    />
                                                    <CloseIcon className='close-img' onClick={() => handleDeleteFile(1, 'aadhar')} />
                                                </>
                                            ))}
                                        </>
                                    )}
                                </Grid>
                            </div>

                        </div>
                    </Grid>
                    <Grid xs={6}>
                        <div className='second-part'>
                            <div className='pancard'>
                                <Typography variant='p'>PAN Card</Typography>
                                <Grid container sx={{ display: 'flex', gap: '20px' }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        size="small"
                                        sx={{
                                            width: "200px",
                                            height: '40px',
                                            backgroundColor: 'rgba(140, 216, 103, 1)',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: 'rgba(140, 216, 103, 1)',
                                            },
                                        }}
                                    >
                                        Choose file
                                        <VisuallyHiddenInput type="file" multiple onChange={(event) => handleFileChangePanCard(event, 'pancardFile')} />
                                    </Button>
                                    <Typography sx={{ mt: 1 }}>{formik.values.pancardFile ? formik.values.pancardFile.name : "No file chosen"}</Typography>
                                    {(
                                        <>
                                            {selectedFilePanCard.map((file, index) => (
                                                <>
                                                    <img
                                                        key={2}
                                                        src={aadhar_img}
                                                        alt={`Preview ${2}`}
                                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                    />
                                                    <CloseIcon className='close-img' onClick={() => handleDeleteFile(2, 'pancard')} />
                                                </>
                                            ))}
                                        </>
                                    )}
                                </Grid>

                                <TextField
                                    fullWidth
                                    type='text'
                                    label='Educational qualification'
                                    name='edu_qualification'
                                    value={formik.values.edu_qualification}
                                    onChange={formik.handleChange} />
                                <TextField
                                    fullWidth
                                    type='text'
                                    label='Pass Book ref. no'
                                    name='passbook_refno'
                                    required
                                    value={formik.values.passbook_refno}
                                    onChange={formik.handleChange}
                                    error={formik.errors.passbook_refno ? true : false} />

                            </div>
                            <div className='farming-experience'>
                                <Typography variant='p' fontWeight='bold'>Farming Experience</Typography>
                                <TextField
                                    type='text'
                                    label='Total farming experience in year'
                                    name='total_farming_exp_year'
                                    value={formik.values.total_farming_exp_year}
                                    onChange={formik.handleChange} />
                                <TextField
                                    type='text'
                                    label='Organic farming experience in year'
                                    name='organic_farming_exp_year'
                                    value={formik.values.organic_farming_exp_year}
                                    onChange={formik.handleChange} />
                                
                                

                            </div>
                            <div className='land-information'>
                                <Typography variant='p' fontWeight='bold'>Land Information</Typography>
                                <TextField
                                    type='text'
                                    label='Land Parcel name'
                                    name='landparcel_name'
                                    value={formik.values.landparcel_name}
                                    onChange={formik.handleChange} />
                                <TextField
                                    type='text'
                                    label='Total Landparcels'
                                    name='total_landparcels'
                                    value={formik.values.total_landparcels}
                                    onChange={formik.handleChange}
                                />

                                    
                                <TextField
                                    type='text'
                                    label='Name of the owner'
                                    name='owner_name'
                                    value={formik.values.owner_name}
                                    onChange={formik.handleChange} />
                                <TextField
                                    type='text'
                                    label='Crop name'
                                    name='crops'
                                    required
                                    value={formik.values.crops}
                                    onChange={formik.handleChange}
                                    error={formik.errors.crops ? true : false} />
                            </div>

                            <div className='leased-document'>
                                <Typography variant='p' fontWeight='bold'>Leased Document</Typography>
                                <Grid container sx={{ display: 'flex', gap: '20px' }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        size="small"
                                        sx={{
                                            width: "200px",
                                            height: '40px',
                                            marginBottom: "10px",
                                            backgroundColor: 'rgba(140, 216, 103, 1)',
                                            color: 'black',
                                            '&:hover': {
                                                backgroundColor: 'rgba(140, 216, 103, 1)',
                                            },
                                        }}
                                    >
                                        Choose file
                                        <VisuallyHiddenInput type="file" multiple onChange={(event) => handleFileChangeLeasedDoc(event, 'leasedFile')} />
                                    </Button>
                                    <Typography sx={{ mt: 1 }}>{formik.values.leasedFile ? (formik.values.leasedFile.name) : "No file chosen"}</Typography>
                                    {(
                                        <>
                                            {selectedFileLeasedDoc.map((file, index) => (
                                                <>
                                                    <img
                                                        key={3}
                                                        src={aadhar_img}
                                                        alt={`Preview ${3}`}
                                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                                    />
                                                    <CloseIcon className='close-img' onClick={() => handleDeleteFile(3, 'leased')} />
                                                </>
                                            ))}
                                        </>
                                    )}
                                </Grid>


                                <TextField
                                    type='text'
                                    label='Total Crops'
                                    name='total_crops'
                                    value={formik.values.total_crops}
                                    onChange={formik.handleChange} />
                                <TextField
                                    type='text'
                                    label='Acres(in acres)'
                                    name='acres'
                                    value={formik.values.acres}
                                    onChange={formik.handleChange} />
                            </div>

                            <div className='submit-cancel-btn'>
                                <Button variant='outlined' className='cancel-btn'>Cancel</Button>
                                <Link to='/operator' style={{ textDecoration: 'none' }}>
                                    <Button variant='contained' className='submit-btn' onClick={formik.handleSubmit}>Submit</Button>

                                </Link>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        onboarding: state.onboarding.onboarding,
    };
};

const mapDispatchToProps = {
    addOperator: (formik) => addOperator(formik)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOperator)
