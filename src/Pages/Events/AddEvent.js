import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Breadcrumbs } from '@mui/material';
import Header from '../../Components/Header';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import './events.css'
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Button, MenuItem, TextField } from '@mui/material';
import { connect } from 'react-redux';
import Sidebar from '../../Components/Sidebar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { addEvent, fetchAddedEvents, editEvent } from '../../Services/Events/actions';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useAuth } from '../../AuthProvider';
import ErrorPage from '../ErrorPage/ErrorPage';


function AddEvent({ addEvent, fetchAddedEvents, editEvent }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const { cropid } = useParams();
  const { landparcelid } = useParams();
  const { eventid } = useParams();


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDraft, setisDraft] = useState(false);
  const [draftdata, setDraftData] = useState([]);
  const [open, setOpen] = useState(null);
  const { currentUser } = useAuth();


  useEffect(() => {
    fetchAddedEvents()
      .then((data) => {
        const filteredEvent = data.find(p => p.id === parseInt(eventid, 10));
        setDraftData(filteredEvent);
        formik.setValues({
          ...formik.values,
          ...filteredEvent
        });
      })
      .catch(err => console.log(err));
    handleDraftForm();
  }, []);

  const formik = useFormik({
    initialValues: {
      event_group: '',
      event_name: '',
      date: '',
      time: '',
      seedlings: '',
      nursery: '',
      nursery_bed: '',
      house: '',
      soil_treatment: '',
      chemicals: '',
      quantity: '',
      seed_treatment: '',
      variety: '',
      crop_duration: '',
      seed_rate: '',
      sowing_method: '',
      irrigation_method: '',
      intercultural_operations: '',
      recommended_competent: '',
      scarcification: '',
      soaking_hot_water: '',
      soaking_chemicals: '',
      soaking_cool_water: '',
      wetting_drying: '',
      others: '',
      evidence: ""
    },
    onSubmit: (values) => {
      if (eventid != '0') {
        formik.setValues({
          ...formik.values,
          ...values
        });
        editEvent(eventid, values)
        navigate('/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/' + `${cropid}`, { state: { showAlert: true } });
      }
      else {
        formik.values.time = Date();
        addEvent(values, cropid)
        navigate('/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/' + `${cropid}`, { state: { showAlert: true } });
      }
    }
  })

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        fileArray.push(base64data);
        if (fileArray.length === files.length) {
          setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
          formik.setFieldValue('evidence', [...selectedFiles, ...fileArray]);
        }
      };
    });
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleDraftForm = () => {
    if (eventid != 0) {
      formik.values.event_group = draftdata.event_group;
      formik.values.event_name = draftdata.event_name;

      setisDraft(true);

    }
  };

  const handleDiscard = () => {
    formik.resetForm();
  }

  const handleCancel = () => {
    navigate('/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/' + `${cropid}`);

  };

  const handleClickOpen = (index) => {
    console.log("open");
    setOpen(index);
  };

  const handleClose = () => {
    setOpen(null);
  };

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

                <Link underline='hover' color='inherit' href={'/operator/' + `${id}` + '/landparcel/' + `${landparcelid}` + '/crops/' + `${cropid}`}>Crops</Link>

              </Breadcrumbs>
              <div className='create-operator-title'>
                <Typography variant='p' className='title'>{eventid == 0 ? 'Add new Event' : 'Edit Event'}</Typography>
              </div>
            </div>


            <div className='event-form'>
              <div className='formheader' >
                <Grid container>
                  <Grid xs={3.5}>
                    <Typography variant='p' className='event-selection' fontWeight='bold'>Crop Event Selection
                    </Typography>
                  </Grid>
                  <Grid xs={0.5}></Grid>
                  <Grid xs={3.5} >
                    <TextField
                      sx={{ width: '100%' }}
                      type='text'
                      select
                      label='Event Group'
                      name='event_group'
                      onChange={formik.handleChange}
                      disabled={isDraft ? true : false}
                      value={isDraft ? draftdata.event_group : formik.values.event_group}>
                      <MenuItem value='Seed and Seedlings'>Seed and Seedlings</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid xs={0.5}></Grid>
                  <Grid xs={3.5}>
                    <TextField
                      sx={{ width: '100%' }}
                      type='text'
                      select
                      label='Event Name'
                      name='event_name'
                      onChange={formik.handleChange}
                      disabled={isDraft ? true : false}
                      value={isDraft ? draftdata.event_name : formik.values.event_name}>
                      <MenuItem value='Seed'>Seed</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid xs={0.5}></Grid>
                </Grid>
              </div>
              {formik.values.event_group && formik.values.event_name ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box className='textfields'>
                      <TextField
                        name='seedlings'
                        size='small'
                        type='text'
                        select
                        fullWidth
                        value={formik.values.seedlings}
                        onChange={formik.handleChange}
                        label='Source of Seedlings'
                        sx={{ mt: "15px" }}
                        defaultValue={isDraft ? draftdata.seedlings : ""}>
                        <MenuItem value='On Farm Nursery' >On farm nursery</MenuItem>
                      </TextField>

                      <TextField
                        name='nursery'
                        size='small'
                        type='text'
                        select
                        fullWidth
                        label='Type of Nursery'
                        value={formik.values.nursery}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.nursery : ""}>
                        <MenuItem value='Wet nursery'>Wet nursery</MenuItem>
                      </TextField>

                      <TextField
                        name='nursery_bed'
                        size='small'
                        type='text'
                        select
                        fullWidth
                        label='Type of Nursery bed'
                        value={formik.values.nursery_bed}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.nursery_bed : ""} >
                        <MenuItem value='Raised Bed'>Raised bed</MenuItem>
                      </TextField>

                      <TextField
                        name='house'
                        size='small'
                        type='text'
                        select
                        fullWidth
                        label='Type of in house (Framed structures)nursery'
                        value={formik.values.house}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.house : ""}>
                        <MenuItem value='Open nursery'>Open nursery</MenuItem>
                      </TextField>

                      <TextField
                        size='small'
                        name='soil_treatment'
                        type='text'
                        select
                        fullWidth
                        label='Soil Treatment methods'
                        value={formik.values.soil_treatment}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.soil_treatment : ""}>
                        <MenuItem value='Soil treatment by chemicals'>Soil treatment by chemicals</MenuItem>
                      </TextField>

                      <TextField
                        size='small'
                        name='chemicals'
                        type='text'
                        select
                        label='Chemicals applied'
                        value={formik.values.chemicals}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.chemicals : ""}>
                        <MenuItem value='Chlorpyriphos'>Chlorpyriphos</MenuItem>
                      </TextField>

                      <TextField
                        size='small'
                        name='quantity'
                        type='text'
                        select
                        label='Quantity applied (gm or ml)'
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.quantity : ""}>
                        <MenuItem value='200'>200</MenuItem>
                        <MenuItem value='300'>300</MenuItem>
                        <MenuItem value='400'>400</MenuItem>
                        <MenuItem value='500'>500</MenuItem>
                      </TextField>

                      <Typography variant='p' fontWeight='bold'>Pre sowing seed Treatment</Typography>

                      <Grid container>
                        <Grid xs={6}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.scarcification}
                                onChange={(e) => {
                                  formik.setFieldValue('scarcification', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.scarcification : ''}
                              />}
                              label="Scarification"
                            />
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.soaking_hot_water}
                                onChange={(e) => {
                                  formik.setFieldValue('soaking_hot_water', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.soaking_hot_water : ''}
                              />}
                              label="Soaking in hot water"
                            />
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.soaking_chemicals}
                                onChange={(e) => {
                                  formik.setFieldValue('soaking_chemicals', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.soaking_chemicals : ''}
                              />}
                              label="Soaking in chemicals"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid xs={6}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.soaking_cool_water}
                                onChange={(e) => {
                                  formik.setFieldValue('soaking_cool_water', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.soaking_cool_water : ''}
                              />}
                              label="Soaking in cool water"
                            />
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.wetting_drying}
                                onChange={(e) => {
                                  formik.setFieldValue('wetting_drying', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.wetting_drying : ''}
                              />}
                              label="Wetting and drying"
                            />
                            <FormControlLabel
                              control={<Checkbox
                                color='success'
                                checked={formik.values.others}
                                onChange={(e) => {
                                  formik.setFieldValue('others', e.target.checked);
                                }}
                                defaultChecked={isDraft ? draftdata.others : ''}
                              />}
                              label="Others"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>


                      <TextField
                        size='small'
                        name='variety'
                        type='text'
                        label='Variety/Hybrid name'
                        value={formik.values.variety}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.variety : ""} />

                      <TextField
                        size='small'
                        name='crop_duration'
                        type='number'
                        label='Crop Duration (Days)'
                        value={formik.values.crop_duration}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.crop_duration : ""} />

                      <TextField
                        size='small'
                        name='seed_rate'
                        type='number'
                        label='Seed rate (Kg/cent)'
                        value={formik.values.seed_rate}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.seed_rate : ""} />

                      <TextField
                        size='small'
                        name='sowing_method'
                        select
                        type='text'
                        label='Method of sowing'
                        value={formik.values.sowing_method}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.sowing_method : ""} >
                        <MenuItem value='Sowing in pro-trays'>Sowing in pro-trays</MenuItem>
                      </TextField>

                      <TextField
                        size='small'
                        name='irrigation_method'
                        type='text'
                        label='Method of irrigation'
                        value={formik.values.irrigation_method}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.irrigation_method : ""} />

                      <TextField
                        size='small'
                        type='text'
                        name='intercultural_operations'
                        select
                        label='Intercultural operations in nursery'
                        value={formik.values.intercultural_operations}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.intercultural_operations : ""}>
                        <MenuItem value='Gap Filling'>Gap filling</MenuItem>
                      </TextField>

                      <TextField
                        size='small'
                        type='text'
                        name='recommended_competent'
                        label='Recommended compitent authority'
                        value={formik.values.recommended_competent}
                        onChange={formik.handleChange}
                        defaultValue={isDraft ? draftdata.recommended_competent : ""}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6} sx={{ mt: 4 }}>
                    <Typography variant='p' sx={{ marginLeft: "40px", marginTop: "50px" }} fontWeight='bold'>Evidence</Typography>
                    <Grid container>

                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        size="small"
                        sx={{ width: "150px", marginBottom: "10px", backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348", marginLeft: "40px" }}
                      >
                        Upload file
                        <VisuallyHiddenInput
                          type="file"
                          multiple
                          name='evidence'
                          onChange={handleFileChange} />
                      </Button>

                      <Typography sx={{ marginLeft: "20px" }} display={isDraft ? "none" : ""}> {selectedFiles.length} Files selected </Typography>
                      <Grid xs={12} >
                        {selectedFiles.map((base64data, index) => (
                          <>
                            <img
                              key={index}
                              src={base64data}
                              alt={`Preview ${index}`}
                              style={{ width: '100px', height: '100px', marginRight: '40px', marginLeft: "40px" }}
                              onClick={() => handleClickOpen(index)}
                            />
                            <CloseIcon className='ev-close-img' onClick={() => handleDeleteFile(index)} />
                            <Dialog
                              open={open === index}
                              onClose={handleClose}

                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                <Grid container>
                                  <Grid xs={12} sx={{ textAlign: 'right' }}>
                                    <CloseIcon sx={{ marginLeft: "350px" }} onClick={() => handleClose(index)} />
                                  </Grid>
                                  <Grid xs={12} sx={{ width: '100%', heght: '100%', objectFit: 'contain' }}>
                                    <img src={base64data} alt="Large Image" style={{ width: '100%', height: 'auto', maxWidth: '80%', maxHeight: '80%' }} />
                                  </Grid>

                                </Grid>
                              </DialogTitle>

                              <DialogContent >
                                {Date()}
                              </DialogContent>
                            </Dialog>
                          </>
                        ))}

                        {isDraft && draftdata && draftdata.evidence && draftdata.evidence.length > 0 && (
                          <>
                            {(() => {
                              const imageElements = [];
                              for (let index = 0; index < draftdata.evidence.length; index++) {
                                const imagePath = draftdata.evidence[index];
                                const imageElement = (
                                  <>
                                    <img
                                      src={imagePath}
                                      alt='event-images'
                                      style={{ width: '100px', height: '100px', marginLeft: "40px" }}
                                    />
                                    <Dialog
                                      open={open === index}
                                      onClose={handleClose}

                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description">
                                      <DialogTitle id="alert-dialog-title">
                                        <Typography>Image {index}</Typography>
                                        <CloseIcon sx={{ marginLeft: "350px" }} onClick={() => handleClose(index)} />
                                        <br></br>
                                        <br></br>
                                        <img src={imagePath} height="400px" width="400px"></img>

                                      </DialogTitle>

                                      <DialogContent >
                                        {Date()}
                                      </DialogContent>
                                    </Dialog></>
                                );
                                imageElements.push(imageElement);
                              }
                              return imageElements;
                            })()}
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (<></>)}
            </div>

            <div className='myDiv formVisibleTrue'>

              {isDraft ? (<></>) : (<Button variant='outlined' className='three-buttons' sx={{
                mr: 1, color: "#2B9348", border: "2px solid #2B9348",
                "&:hover": { color: '#2B9348', border: "2px solid #2B9348", }
              }} onClick={handleDiscard}><Typography>Discard</Typography></Button>)}

              {isDraft ? (<Button variant='outlined' className='three-buttons' sx={{
                mr: 1, color: "#2B9348", border: "2px solid #2B9348",
                "&:hover": { color: '#2B9348', border: "2px solid #2B9348", }
              }} onClick={handleCancel}><Typography>Cancel</Typography></Button>) : (<></>)}

              <Button variant='contained' className='three-buttons' sx={{ backgroundColor: '#8CD867', color: "black", border: "2px solid #2B9348" }} onClick={formik.handleSubmit}>Submit</Button>
            </div>
          </Box>
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {

    events: state.events.events
  };
};

const mapDispatchToProps = {

  addEvent: (formik, cropid) => addEvent(formik, cropid),
  fetchAddedEvents: () => fetchAddedEvents(),
  editEvent: (id, formik) => editEvent(id, formik),
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
