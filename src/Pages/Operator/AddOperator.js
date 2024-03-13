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

import aadhar_img from '../../assets/images/Operators/aadhar_img.png'
import { addOperator } from '../../Services/Operator/actions'
import { connect } from 'react-redux'

function AddOperator({ addOperator }) {
    const [selectedFileaadhar, setSelectedFileaadhar] = useState([]);
    const [selectedFilePanCard, setSelectedFilePanCard] = useState([]);
    const [selectedFileLeasedDoc, setSelectedFileLeasedDoc] = useState([]);

    const [formData, setFormData] = useState({
        uniqueID: null,
        uniqueIDFileName: '',
        pancardFile: null,
        pancardFileName: '',
        leasedFile: null,
        leasedFileName: '',

        name: '',
        co: '',
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
        exp_in_crops: '',
        exp_in_livestock: '',
        exp_in_other: '',
        landparcel_name: '',
        ownership: '',
        owner_name: '',
        leased_doc_id: '',
        survey_no: '',
        area: '',
        crops: ''



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
            setFormData({
                ...formData,
                uniqueID: null,
                uniqueIDFileName: 'No file chosen'
            });
        } else if (fileType === 'pancard') {
            setSelectedFilePanCard([]);
            setFormData({
                ...formData,
                pancardFile: null,
                pancardFileName: 'No file chosen'
            });
        } else if (fileType === 'leased') {
            setSelectedFileLeasedDoc([]);
            setFormData({
                ...formData,
                leasedFile: null,
                leasedFileName: 'No file chosen'
            });
        }
    };

    const handleFileChangeAadhar = (event, key) => {
        const file = event.target.files[0];
        setSelectedFileaadhar([file]);
        setFormData({
            ...formData,
            [key]: file,
            [`${key}FileName`]: file.name
        });
    };

    const handleFileChangePanCard = (event, key) => {
        const file = event.target.files[0];
        setSelectedFilePanCard([file]);
        setFormData({
            ...formData,
            [key]: file,
            [`${key}FileName`]: file.name
        });
    };

    const handleFileChangeLeasedDoc = (event, key) => {
        const file = event.target.files[0];
        setSelectedFileLeasedDoc([file]);
        setFormData({
            ...formData,
            [key]: file,
            [`${key}FileName`]: file.name
        });
    };

    const handleChange = (event, key) => {

        setFormData({
            ...formData,
            [key]: event.target.value
        });
    };

    const handleAdd = () => {
        const uniqueIDBase64 = formData.uniqueID ? btoa(formData.uniqueID) : null;
        const pancardFileIDBase64 = formData.pancardFile ? btoa(formData.pancardFile) : null;
        const leasedFileIDBase64 = formData.leasedFile ? btoa(formData.leasedFile) : null;

        formData.unique_id = uniqueIDBase64;
        formData.panCard_id = pancardFileIDBase64;
        formData.leased_doc_id = leasedFileIDBase64;

        addOperator(formData)
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

                <Grid container spacing={2} sx={{ mt: 3,ml:1}}>
                    <Grid xs={6}>
                        <div className='first-part'>
                            <div className='operator-name'>
                                <Typography variant='p' fontWeight='bold'>Operator name</Typography>
                                <TextField
                                    type='text'
                                    label='Name'
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                    helperText='First name + Last name'
                                />

                                <TextField
                                    type='text'
                                    select
                                    label='C/O'
                                    value={formData.co}
                                    onChange={(e) => handleChange(e, 'co')}
                                >
                                    <MenuItem value='Father name'>
                                        Father name
                                    </MenuItem>

                                </TextField>
                                <TextField
                                    type='text'
                                    label='Father name'
                                    value={formData.father_name}
                                    onChange={(e) => handleChange(e, 'father_name')}
                                />
                                <TextField
                                    type='text'
                                    label='ID'
                                    value={formData.ownerID}
                                    onChange={(e) => handleChange(e, 'ownerID')}
                                    required
                                />
                            </div>

                            <div className='address-contact-details'>
                                <Typography variant='p' fontWeight='bold'>Address & Contact Details</Typography>
                                <TextField
                                    type='text'
                                    label='Contact number 1'
                                    required
                                    value={formData.contact_number_1}
                                    onChange={(e) => handleChange(e, 'contact_number_1')}

                                />

                                <TextField
                                    type='text'
                                    label='Contact number 2'
                                    value={formData.contact_number_2}
                                    onChange={(e) => handleChange(e, 'contact_number_2')}
                                />
                                <TextField
                                    type='text'
                                    label='House no / Door no'
                                    value={formData.house_no}
                                    onChange={(e) => handleChange(e, 'house_no')}
                                >
                                </TextField>
                                <TextField
                                    type='text'
                                    label='Street name'
                                    value={formData.street_name}
                                    onChange={(e) => handleChange(e, 'street_name')}
                                />
                                <TextField
                                    type='text'
                                    label='Village'
                                    value={formData.village}
                                    onChange={(e) => handleChange(e, 'village')}
                                    required
                                />
                                <TextField
                                    type='text'
                                    label='Block/Mandal'
                                    value={formData.block}
                                    onChange={(e) => handleChange(e, 'block')}
                                />
                                <div style={{ gap: '10px', display: 'flex' }}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='District'
                                        value={formData.district}
                                        onChange={(e) => handleChange(e, 'district')}
                                    >
                                        <MenuItem value='Hyderabad'>Hyderabad</MenuItem>
                                        <MenuItem value='Ahmedabad'>Ahmedabad</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        select
                                        label='State'
                                        value={formData.state}
                                        onChange={(e) => handleChange(e, 'state')}
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
                                        value={formData.country}
                                        onChange={(e) => handleChange(e, 'country')}
                                    >
                                        <MenuItem value='India'>India</MenuItem>
                                        <MenuItem value='U.S.A'>U.S.A</MenuItem>
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        label='Postal Code'
                                        value={formData.postal_code}
                                        onChange={(e) => handleChange(e, 'postal_code')}
                                    >
                                    </TextField>

                                </div>
                                <TextField
                                    type='text'
                                    label='Website address of the operations'
                                    value={formData.website_addr}
                                    onChange={(e) => handleChange(e, 'website_addr')}
                                />
                                <TextField
                                    type='text'
                                    label='Email ID'
                                    value={formData.email_id}
                                    onChange={(e) => handleChange(e, 'email_id')}
                                />
                                <Typography variant='p'>Unique ID (Aadhar card) *</Typography>


                                <TextField
                                    type='text'
                                    label='Aadhar number'
                                    required
                                    value={formData.aadhar}
                                    onChange={(e) => handleChange(e, 'aadhar')}
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
                                    <Typography sx={{ mt: 1 }}>{formData.uniqueID ? (formData.uniqueID.name) : "No file chosen"}</Typography>
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
                                    <Typography sx={{ mt: 1 }}>{formData.pancardFile ? formData.pancardFile.name : "No file chosen"}</Typography>
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
                                    value={formData.edu_qualification}
                                    onChange={(e) => handleChange(e, 'edu_qualification')} />
                                <TextField
                                    fullWidth
                                    type='text'
                                    required
                                    label='Pass Book ref. no'
                                    value={formData.passbook_refno}
                                    onChange={(e) => handleChange(e, 'passbook_refno')} />

                            </div>
                            <div className='farming-experience'>
                                <Typography variant='p' fontWeight='bold'>Farming Experience</Typography>
                                <TextField
                                    type='text'
                                    label='Total farming experience in year'
                                    value={formData.total_farming_exp_year}
                                    onChange={(e) => handleChange(e, 'total_farming_exp_year')} />
                                <TextField
                                    type='text'
                                    label='Organic farming experience in year'
                                    value={formData.organic_farming_exp_year}
                                    onChange={(e) => handleChange(e, 'organic_farming_exp_year')} />
                                <TextField
                                    type='text'
                                    label='Experience in crops(Names of the crops)'
                                    value={formData.exp_in_crops}
                                    onChange={(e) => handleChange(e, 'exp_in_crops')} />
                                <TextField
                                    type='text'
                                    label='Experience in livestock(Name of the livestock)'
                                    value={formData.exp_in_livestock}
                                    onChange={(e) => handleChange(e, 'exp_in_livestock')} />
                                <TextField
                                    type='text'
                                    label='Experience in any other allied agricultural activities'
                                    value={formData.exp_in_other}
                                    onChange={(e) => handleChange(e, 'exp_in_other')} />

                            </div>
                            <div className='land-information'>
                                <Typography variant='p' fontWeight='bold'>Land Information</Typography>
                                <TextField
                                    type='text'
                                    label='Land Parcel name'
                                    value={formData.landparcel_name}
                                    onChange={(e) => handleChange(e, 'landparcel_name')} />
                                <TextField
                                    type='text'
                                    select
                                    label='Ownership status of the land'
                                    value={formData.ownership}
                                    onChange={(e) => handleChange(e, 'ownership')}
                                >

                                    <MenuItem value='Own'>Own</MenuItem>
                                    <MenuItem value='Other'>Other</MenuItem>
                                </TextField>
                                <TextField
                                    type='text'
                                    label='Name of the owner'
                                    value={formData.owner_name}
                                    onChange={(e) => handleChange(e, 'owner_name')} />
                                <TextField
                                    type='text'
                                    label='Crop name'
                                    value={formData.crops}
                                    onChange={(e) => handleChange(e, 'crops')} />
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
                                    <Typography sx={{ mt: 1 }}>{formData.leasedFile ? (formData.leasedFile.name) : "No file chosen"}</Typography>
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
                                    label='Survey number'
                                    value={formData.survey_no}
                                    onChange={(e) => handleChange(e, 'survey_no')} />
                                <TextField
                                    type='text'
                                    label='Acres(in acres)'
                                    value={formData.area}
                                    onChange={(e) => handleChange(e, 'area')} />
                            </div>

                            <div className='submit-cancel-btn'>
                                <Button variant='outlined' className='cancel-btn'>Cancel</Button>
                                <Link to='/operator' style={{ textDecoration: 'none' }}>
                                    <Button variant='contained' className='submit-btn' onClick={handleAdd}>Submit</Button>

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
    addOperator: (formData) => addOperator(formData)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOperator)
