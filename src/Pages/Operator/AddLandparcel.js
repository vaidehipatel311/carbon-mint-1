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
import { useFormik } from 'formik';
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import * as action from '../../Services/LandParcels/actions';
import { fetchOperator } from '../../Services/Operator/actions';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';

function AddLandParcel({ addLandParcel, fetchLandParcel, editParcel, fetchOperator }) {
  const { id } = useParams();
  const {landparcelid} = useParams();
  const [isDraft, setisDraft] = useState(false);
  const [draftdata, setDraftData] = useState([]);
  const [operator, setOperator] = useState([]);
  const { currentUser } = useAuth();


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      operator_id:'',
      operator_name:'',
      SyNo: '',
      name: '',
      acres: '',
      house_no: '',
      street_name: '',
      village: '',
      district: '',
      state: '',
      country: '',
      postal_code: '',
      contact_number_1: '',
      area_owned: '',
      area_leased: '',
      neighbouring_farm: '',
      farming_system: '',
      infrastructure: '',
      water_resources: '',
      crops: '',
      status: 'Pending'
    },
    onSubmit: (values) => {
      if (landparcelid != '0') {
        formik.setValues({
          ...formik.values,
          ...values
        });
        editParcel(landparcelid, values)
        navigate('/operator/'+`${id}`, { state: { showAlert: true } });
      }
      else {
        addLandParcel(values);
        navigate('/operator/'+`${id}`, { state: { showAlert: true } })
      }
    },
  });
  useEffect(() => {
    fetchLandParcel()
      .then((data) => {
        const filteredEvent = data.find(p => p.id === parseInt(landparcelid, 10))
        setDraftData(filteredEvent);
        formik.setValues({
          ...formik.values,
          ...filteredEvent
        });
      })
      .catch(err => console.log(err));
    fetchOperator()
      .then((data) => {
        setOperator(data);
      })
      .catch(err => console.log(err));

    handleDraftForm();

  }, [landparcelid]);

  const handleName = (name) => {
    const selectedOperator = operator.find(op => op.name === name);
    if (selectedOperator) {
      formik.setValues({
        ...formik.values,
        operator_id: String(selectedOperator.id),
        operator_name: name
      });
    }
  };

  const handleDraftForm = () => {
    if (landparcelid != 0) {
      setisDraft(true);
    }

  };
  return (
    <>
    {currentUser ? (
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

            <Link href={"/operator/"+`${id}`} color='inherit' underline='hover'>
              Land Parcels
            </Link>

          </Breadcrumbs>
          <div className='create-operator-title'>
            <Typography variant='p' className='title'>Add Land Parcel</Typography>
          </div>
        </div>

        <Grid container sx={{ mt: 2 }}>
          <Grid xs={6}>
            <div className='first-part'>
              <div className='operator-name'>
                <Typography variant='p' fontWeight='bold'>Select Operator</Typography>
                <TextField
                  type='text'
                  label='Operators List'
                  name='operator_name'
                  select
                  fullWidth
                  onChange={(e) => { handleName(e.target.value) }}
                  value={formik.values.operator_name}
                  defaultValue={isDraft ? draftdata.operator_name : formik.values.operator}>
                  {operator.map((op, index) => (
                    <MenuItem key={index} value={op.name}>{op.name}</MenuItem>

                  ))}
                </TextField>
              </div>
            </div>
          </Grid>

        </Grid>
        {/* {formik.values.operator_name ? ( */}
        <Grid container spacing={2} sx={{ ml: 0, mt: 3 }}>

          <Grid xs={6}>

            <div className='first-part'>
              <div className='operator-name'>

                <Typography variant='p' fontWeight='bold'>Land Parcel Details</Typography>
                <TextField
                  type="text"
                  label=" Land Parcel Name"
                  name="name"
                  required
                  value={formik.values.name}
                  defaultValue={isDraft ? draftdata.name : ""}
                  onChange={formik.handleChange}
                />

                <div style={{ gap: '10px', display: 'flex' }}>
                  <TextField
                    type='text'
                    required
                    fullWidth
                    label='Survey Number'
                    name='SyNo'
                    value={formik.values.SyNo}
                    defaultValue={isDraft ? draftdata.SyNo : ""}
                    onChange={formik.handleChange}
                  />

                  <TextField
                    type='text'
                    required
                    fullWidth
                    label='Acres(in acres)'
                    name='acres'
                    value={formik.values.acres}
                    defaultValue={isDraft ? draftdata.acres : ""}
                    onChange={formik.handleChange} />


                </div>
                <div style={{ gap: '10px', display: 'flex' }}>


                  <TextField
                    type='text'
                    label='Area Owned'
                    required
                    fullWidth
                    name='area_owned'
                    value={formik.values.area_owned}
                    defaultValue={isDraft ? draftdata.area_owned : ""}
                    onChange={formik.handleChange}
                  />

                  <TextField
                    type='text'
                    fullWidth
                    label='Area Leased'
                    required
                    name='area_leased'
                    value={formik.values.area_leased}
                    defaultValue={isDraft ? draftdata.area_leased : ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <TextField
                  type='text'
                  label='Crops'
                  name='crops'
                  required
                  value={formik.values.crops}
                  defaultValue={isDraft ? draftdata.crops : ""}
                  onChange={formik.handleChange}
                  error={formik.errors.crops ? true : false} />
              </div>

              <div className='address-contact-details'>
                <Typography variant='p' fontWeight='bold'>Address & Contact Details of Owner</Typography>
                <TextField
                  type='text'
                  label='Contact number'
                  name='contact_number_1'
                  value={formik.values.contact_number_1}
                  defaultValue={isDraft ? draftdata.contact_number_1 : ""}
                  onChange={formik.handleChange}
                  required
                  error={formik.errors.contact_number_1 ? true : false}
                  helperText={formik.errors.contact_number_1}
                />

                <TextField
                  type='text'
                  required
                  label='Address'
                  name='house_no'
                  value={formik.values.house_no}
                  defaultValue={isDraft ? draftdata.house_no : ""}
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
                    defaultValue={isDraft ? draftdata.village : ""}
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
                    required
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
                    required
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
            <div className='second-part'>
              <div className='farming-experience' style={{ marginTop: "0px" }}>
                <Typography variant='p' fontWeight='bold'>Additional Details</Typography>
                <TextField
                  type='text'
                  label='Neighbouring Farm'
                  name='neighbouring_farm'
                  select
                  value={formik.values.neighbouring_farm}
                  defaultValue={isDraft ? draftdata.neighbouring_farm : ""}
                  onChange={formik.handleChange} >
                  <MenuItem value='North'>North</MenuItem>
                  <MenuItem value='South'>South</MenuItem>
                  <MenuItem value='East'>East</MenuItem>
                  <MenuItem value='West'>West</MenuItem>
                </TextField>
                <TextField
                  type='text'
                  label='Farming System'
                  name='farming_system'
                  value={formik.values.farming_system}
                  defaultValue={isDraft ? draftdata.farming_system : ""}
                  onChange={formik.handleChange} >
                  <MenuItem value='Cropping'>Cropping</MenuItem>
                  <MenuItem value='Organic'>Organic</MenuItem>
                </TextField>
                <TextField
                  type='text'
                  label='Infrastructure'
                  name='infrastructure'
                  required
                  value={formik.values.infrastructure}
                  defaultValue={isDraft ? draftdata.infrastructure : ""}
                  onChange={formik.handleChange}
                />

                <TextField
                  type='text'
                  required
                  select
                  label='Water Resources'
                  name='water_resources'
                  value={formik.values.water_resources}
                  defaultValue={isDraft ? draftdata.water_resources : ""}
                  onChange={formik.handleChange} >
                  <MenuItem value='BoreWell'>BoreWell</MenuItem>
                  <MenuItem value='River'>River</MenuItem>
                </TextField>

              </div>


              <div className='submit-cancel-btn' style={{ marginTop: '320px' }}>
                <Button variant='outlined' className='cancel-btn'>Cancel</Button>
                <Link href='/landowner' sx={{ textDecoration: 'none' }}>
                  <Button variant='contained' className='submit-btn' onClick={formik.handleSubmit}>Submit</Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
        {/* ):(<></>)} */}
      </Box >
      </>
            ) : (
                <ErrorPage />
            )}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  addLandParcel: (formik) => action.addLandParcel(formik),
  fetchLandParcel: () => action.fetchLandParcel(),
  editParcel: (id, formik) => action.editParcel(id, formik),
  fetchOperator: () => fetchOperator()

}

export default connect(mapStateToProps, mapDispatchToProps)(AddLandParcel)