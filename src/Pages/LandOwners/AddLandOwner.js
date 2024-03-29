import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Box from '@mui/material/Box'
import '../Operator/addoperator.css'
import Link from '@mui/material/Link';
import { Button, MenuItem, TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import aadhar_img from '../../assets/images/Operators/aadhar_img.png'
import { addLandOwner, fetchLandOwners, editOwner } from '../../Services/LandOwners/actions'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';


function AddLandOwner({ addLandOwner, fetchLandOwners, editOwner }) {
  const { addLandownerId } = useParams();
  const [isDraft, setisDraft] = useState(false);
  const [draftdata, setDraftData] = useState([]);
  const [selectedFileaadhar, setSelectedFileaadhar] = useState([]);
  const [selectedFilePanCard, setSelectedFilePanCard] = useState([]);
  const [selectedFileLeasedDoc, setSelectedFileLeasedDoc] = useState([]);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      uniqueID: null,
      uniqueIDFileName: '',

      name: '',
      father_name: '',
      ownerID: 'KFP/MT/03',
      contact_number_1: '',
      house_no: '',
      village: '',
      district: '',
      state: '',
      country: '',
      postal_code: '',
      email_id: '',
      aadhar_no: '',
      unique_id: '',
      passbook_refno: '',
      total_farming_exp_year: '',
      organic_farming_exp_year: '',
      landparcels: '',
      area: '',
      acres: '',
      crops: '',
      status: 'Pending'
    },
    onSubmit: (values) => {
      if (addLandownerId != '0') {
        formik.setValues({
          ...formik.values,
          ...values
        });
        editOwner(addLandownerId, values)
        navigate('/landowners', { state: { showAlert: true } });
      }
      else {
        const uniqueIDBase64 = formik.values.uniqueID ? btoa(formik.values.uniqueID) : null;
        const pancardFileIDBase64 = formik.values.pancardFile ? btoa(formik.values.pancardFile) : null;
        const leasedFileIDBase64 = formik.values.leasedFile ? btoa(formik.values.leasedFile) : null;

        formik.values.unique_id = uniqueIDBase64;
        formik.values.panCard_id = pancardFileIDBase64;
        formik.values.leased_doc_id = leasedFileIDBase64;
        addLandOwner(values);
        navigate('/landowners')
      }
    },
  });

  useEffect(() => {
    fetchLandOwners()
      .then((data) => {
        const filteredEvent = data.find(p => p.id === parseInt(addLandownerId, 10))
        setDraftData(filteredEvent);
        formik.setValues({
          ...formik.values,
          ...filteredEvent
        });
      })
      .catch(err => console.log(err));
    handleDraftForm();

  }, [addLandownerId]);

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

  const handleDraftForm = () => {
    if (addLandownerId != 0) {
      setisDraft(true);
    }

  };

  const handleFileChangeAadhar = (event, key) => {
    const file = event.target.files[0];
    setSelectedFileaadhar([file]);
    formik.values.uniqueID = file;
    formik.values.uniqueIDFileName = file.name

  };

  return (
    <>
      <Header />
      <Sidebar />
      <Box sx={{ margin: '100px 20px 50px 300px' }}>
        <div className='path'>
          <Breadcrumbs sx={{
            textDecoration: 'none'
          }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb">

            <Link href="/landowners" color='inherit' underline='hover'>
              Land Owners
            </Link>

          </Breadcrumbs>
          <div className='create-operator-title'>
            <Typography variant='p' className='title'>Add Land Owner</Typography>
          </div>
        </div>

        <Grid container spacing={2} sx={{ mt: 3, ml: 0 }}>
          <Grid xs={6}>
            <div className='first-part'>
              <div className='operator-name'>
                <Typography variant='p' fontWeight='bold'>Land Owner Details</Typography>
                <TextField
                  type="text"
                  label=" Owner Name"
                  name="name"
                  value={formik.values.name}
                  defaultValue={isDraft ? draftdata.name : ""}
                  onChange={formik.handleChange}
                  helperText='First name + Last name'
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
                  label='Contact number'
                  name='contact_number_1'
                  value={formik.values.contact_number_1}
                  onChange={formik.handleChange}
                />

                <TextField
                  type='text'
                  required
                  label='Address'
                  name='house_no'
                  value={formik.values.house_no}
                  onChange={formik.handleChange}
                >
                </TextField>
                <div style={{ gap: '10px', display: 'flex' }}>
                  <TextField
                    type='text'
                    fullWidth
                    label='Village'
                    name='village'
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    required
                    error={formik.errors.village ? true : false}
                  />
                  <TextField
                    fullWidth
                    required
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
                </div>
                <div style={{ gap: '10px', display: 'flex' }}>

                  <TextField
                    fullWidth
                    required
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
                  <TextField
                    fullWidth
                    required
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
                </div>
                <div style={{ gap: '10px', display: 'flex' }}>
                  <TextField
                    type='text'
                    label='Postal Code'
                    name='postal_code'
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    type='text'
                    label='Email ID'
                    required
                    fullWidth
                    name='email_id'
                    value={formik.values.email_id}
                    onChange={formik.handleChange}
                  />
                </div>


              </div>

            </div>
          </Grid>
          <Grid xs={6}>
            <div className='second-part'>
              <div className='pancard'>
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
                <Grid container sx={{ gap: '20px' }}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    size="small"
                    // className='three-buttons'
                    sx={{ mr: 1, mb: 4, height: "40px", backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348" }}
                  // sx={{
                  //     width: "200px",
                  //     height: '40px',
                  //     marginBottom: "10px",
                  //     backgroundColor: 'rgba(140, 216, 103, 1)',
                  //     color: 'black',
                  //     '&:hover': {
                  //         backgroundColor: 'rgba(140, 216, 103, 1)',
                  //     },
                  // }}
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
                            alt={'Preview' + `${1}`}
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                          />
                          <CloseIcon className='close-img' onClick={() => handleDeleteFile(1, 'aadhar')} />
                        </>
                      ))}
                    </>
                  )}
                </Grid>
              </div>
              <div className='pancard'>
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
                  label='Landparcels'
                  name='landparcels'
                  required
                  value={formik.values.landparcels}
                  onChange={formik.handleChange}
                  error={formik.errors.landparcels ? true : false} />
                <TextField
                  type='text'
                  label='Crops'
                  name='crops'
                  required
                  value={formik.values.crops}
                  onChange={formik.handleChange}
                  error={formik.errors.crops ? true : false} />
                <TextField
                  type='text'
                  required
                  label='Acres(in acres)'
                  name='acres'
                  value={formik.values.acres}
                  onChange={formik.handleChange} />
              </div>

              <div className='submit-cancel-btn'>
                <Button variant='outlined' className='cancel-btn'>Cancel</Button>
                <Link href='/landowner' sx={{ textDecoration: 'none' }}>
                  <Button variant='contained' className='submit-btn' onClick={formik.handleSubmit}>Submit</Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    // onboarding: state.onboarding.onboarding,
  };
};

const mapDispatchToProps = {
  fetchLandOwners: () => fetchLandOwners(),
  editOwner: (id, formik) => editOwner(id, formik),
  addLandOwner: (formik) => addLandOwner(formik)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLandOwner)