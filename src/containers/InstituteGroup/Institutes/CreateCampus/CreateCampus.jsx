import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  TextField,
  Grid,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Slider,
} from "@material-ui/core";
import { ArrowLeft, MapPin, Upload, AlignLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import _ from "lodash";
import { useSnackbar } from "notistack";

import campusTypes from "../../../../constants/campusTypes.json";
import countries from "../../../../constants/countries.json";
import collegeCategories from "../../../../constants/collegeCategories.json";
import image from "../../../../assets/images/undraw/coming_home.svg";
import {
  createCampus,
  uploadCampusProfileImage,
} from "../../../../store/actions/instituteGroup";
import { setPageTitle } from "../../../../store/actions/global";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  subHeading: {
    display: "flex",
    alignItems: "center",
  },
  uploadControls: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 600px)": {
    drag: {
      height: "100px",
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    width: "1.2rem",
    marginRight: "10px",
  },
  drag: {
    // width: "90%",
    height: "200px",
    borderRadius: "20px",
    backgroundImage: ` url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23CACACAFF' stroke-width='2' stroke-dasharray='12' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`,
    padding: "1rem",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.1)",
    },
    cursor: "pointer",
  },
}));

const CreateCampus = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let reactAvatarRef;
  const setEditorRef = (editor) => {
    reactAvatarRef = editor;
  };
  dispatch(setPageTitle("Create Campus"));
  const [scale, setScale] = useState(1.4);
  const [upload, setUpload] = useState(null);
  const [rotate, setRotate] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    name: { value: "", error: null },
    type: { value: "", error: null },
    email: { value: "", error: null },
    phone: { value: "", error: null },
    description: { value: "", error: null },
    country: { value: "", error: null },
    state: { value: "", error: null },
    city: { value: "", error: null },
    zipCode: { value: "", error: null },
    category: { value: "", error: null },
    landmark: { value: "", error: null },
  });
  // document.title = "Create Campus";
  const inputLabel = React.useRef(null);
  const handleDrop = (acceptedFiles) => {
    setUpload(acceptedFiles[0]);
    console.log(acceptedFiles);
  };
  const handleScaleChange = (event, newValue) => {
    setScale(newValue);
  };
  const handleRotateChange = (event, newValue) => {
    setRotate(newValue);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: {
        value,
        error: null,
      },
    }));
  };

  const handleBack = (e) => {
    history.goBack();
  };
  const {
    name,
    email,
    phone,
    description,
    type,
    city,
    state,
    zipCode,
    country,
    category,
    landmark,
  } = form;

  const resetData = () => {
    setForm({
      name: { value: "", error: null },
      type: { value: "", error: null },
      email: { value: "", error: null },
      phone: { value: "", error: null },
      description: { value: "", error: null },
      country: { value: "", error: null },
      state: { value: "", error: null },
      city: { value: "", error: null },
      zipCode: { value: "", error: null },
      category: { value: "", error: null },
      landmark: { value: "", error: null },
    });
    setScale(1.4);
    setRotate(0);
    setUpload(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      description: description.value,
      type: type.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value,
      country: country.value,
      category: category.value,
      landmark: landmark.value,
    };
    if (validate()) {
      dispatch(
        createCampus({
          body,
        })
      )
        .then((res) => {
          const { account, error } = res || {};
          console.log(account, error, reactAvatarRef, form, upload);
          if (account) {
            if (reactAvatarRef) {
              const canvas = reactAvatarRef
                .getImageScaledToCanvas()
                .toDataURL();
              fetch(canvas)
                .then((res) => res.blob())
                .then((blob) => {
                  const formdata = new FormData();
                  formdata.append("image", blob);
                  dispatch(
                    uploadCampusProfileImage({
                      body: formdata,
                      campusId: account._id,
                    })
                  )
                    .then((res) => {
                      enqueueSnackbar("Campus created successfully!", {
                        variant: "success",
                      });
                      resetData();
                    })
                    .catch((err) => {
                      //change the below path to upload a logo
                      enqueueSnackbar(
                        "We could'nt upload logo, please upload it campus > edit > upload logo",
                        { variant: "success" }
                      );
                      resetData();
                    });
                });
            } else {
              enqueueSnackbar("Campus created successfully!", {
                variant: "success",
              });
              resetData();
            }
          } else if (error && error.type === "validationError") {
            enqueueSnackbar("There are some errors, please recheck", {
              variant: "error",
              color: '#fff'
            });
            error.data &&
              Array.isArray(error.data) &&
              error.data.forEach((e) => {
                setForm((prev) => ({
                  ...prev,
                  [e.param]: {
                    ...prev[e.param],
                    error: e.msg,
                  },
                }));
              });
          } else {
            resetData();
          }
        })
        .catch((err) => {
          enqueueSnackbar(
            "Opps something went wrong. Please wait for some time and try again",
            { variant: "error" }
          );
        });
    }
  };
  const validate = () => {
    let valid = true;
    const keys = Object.keys(form);
    console.log(form, keys);
    const invalidForm = { ...form };
    keys.forEach((i) => {
      if (
        invalidForm[i] &&
        (!invalidForm[i].value || invalidForm[i].value === "")
      ) {
        setForm((prevForm) => {
          if (i.toString() === "category" && prevForm.type !== "college") {
            return {
              ...prevForm,
              [i]: {
                value: "",
                error: null,
              },
            };
          } else {
            valid = false;
            return {
              ...prevForm,
              [i]: {
                ...prevForm[i],
                error: "Please enter a valid " + i,
              },
            };
          }
        });
      }
    });
    console.log(valid);
    return valid;
  };
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item container sm={12} md={4} xs={12} direction="column">
            <Grid item>
              <IconButton color="inherit" onClick={handleBack}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="h5" style={{ display: "inline-block" }}>
                Create Campus
              </Typography>
            </Grid>
            <Grid item>
              <Box style={{ width: "100%" }} mt={4}>
                <Box mb={2}>
                  <Box className={styles.subHeading}>
                    <Upload className={styles.icon} />
                    <div>
                      <Typography variant="subtitle1">Upload Logo</Typography>
                      <Typography color="textSecondary" variant="caption">
                        Please upload a .jpeg or .png file
                      </Typography>
                    </div>
                  </Box>
                </Box>
                <Dropzone
                  onDrop={handleDrop}
                  disableClick
                  accept={["image/png", "image/jpeg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography
                          color="textSecondary"
                          className={styles.drag}
                        >
                          Drag 'n' drop the logo here, or click to select
                        </Typography>
                      </div>
                      {upload && (
                        <Box mt={2} className={styles.uploadControls}>
                          <Box>
                            <ReactAvatarEditor
                              width={200}
                              height={200}
                              ref={setEditorRef}
                              borderRadius={100}
                              style={{ borderRadius: "10px" }}
                              scale={scale}
                              image={upload}
                              rotate={rotate}
                            />
                          </Box>
                          <Box ml={2} width={150}>
                            <Typography>Zoom</Typography>
                            <Slider
                              value={scale}
                              min={1}
                              step={0.1}
                              max={10}
                              onChange={handleScaleChange}
                              aria-labelledby="continuous-slider"
                            />
                            <Typography>Rotate</Typography>
                            <Slider
                              value={rotate}
                              min={0}
                              step={1}
                              max={360}
                              onChange={handleRotateChange}
                              aria-labelledby="continuous-slider"
                            />
                          </Box>
                        </Box>
                      )}
                    </section>
                  )}
                </Dropzone>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            sm={12}
            md={8}
            xs={12}
            direction="column"
            spacing={3}
          >
            <Grid item container direction="column" spacing={2}>
              <Grid item container>
                <Typography variant="subtitle1" className={styles.subHeading}>
                  <AlignLeft className={styles.icon} /> General
                </Typography>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="Name"
                    error={!!name.error}
                    helperText={name.error && name.error}
                    name="name"
                    value={name.value}
                    onChange={handleChange}
                    placeholder="Campus Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item className={styles.gridItem}>
                  <FormControl
                    variant="outlined"
                    className={styles.formControl}
                    error={!!type.error}
                  >
                    <InputLabel id="type" ref={inputLabel} error={!!type.error}>
                      Campus Type
                    </InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      error={!!type.error}
                      value={type.value}
                      onChange={handleChange}
                      name="type"
                      labelWidth={100}
                    >
                      {campusTypes.map((c) => (
                        <MenuItem value={c.value.toLowerCase()} key={c.value}>
                          {c.name.replace(/\w+/g, _.capitalize)}
                        </MenuItem>
                      ))}
                    </Select>
                    {type.error && (
                      <FormHelperText error>{type.error}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              {type.value && type.value.toLowerCase() === "college" && (
                <Grid item container direction="row" spacing={1}>
                  <Grid item className={styles.gridItem} md={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      // className={styles.formControl}
                      fullWidth
                      error={!!category.error}
                      // style={{ width: "50%" }}
                    >
                      <InputLabel id="category">College category</InputLabel>
                      <Select
                        labelId="category"
                        id="category"
                        value={category.value}
                        error={!!category.error}
                        // error={!!type.value === 'college' && category.error}
                        onChange={handleChange}
                        name="category"
                        labelWidth={120}
                      >
                        {collegeCategories.map((c) => (
                          <MenuItem value={c.toLowerCase()} key={c}>
                            {c.toLowerCase().replace(/\w+/g, _.capitalize)}
                          </MenuItem>
                        ))}
                      </Select>
                      {category.error && (
                        <FormHelperText error>{category.error}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              <Grid item container direction="row" spacing={1}>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="Email"
                    name="email"
                    value={email.value}
                    error={!!email.error}
                    helperText={email.error}
                    onChange={handleChange}
                    placeholder="Campus Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={phone.value}
                    error={!!phone.error}
                    helperText={phone.error}
                    type="number"
                    onChange={handleChange}
                    placeholder="Campus Phone"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  label="Description"
                  name="description"
                  value={description.value}
                  error={!!description.error}
                  helperText={description.error}
                  onChange={handleChange}
                  placeholder="Some description about the campus"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows="4"
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1" className={styles.subHeading}>
                  <MapPin className={styles.icon} /> Location
                </Typography>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item className={styles.gridItem}>
                  <FormControl
                    variant="outlined"
                    className={styles.formControl}
                    error={!!country.error}
                  >
                    <InputLabel
                      id="country"
                      ref={inputLabel}
                      error={!!country.error}
                    >
                      Country
                    </InputLabel>
                    <Select
                      labelId="country"
                      id="country"
                      value={country.value}
                      error={!!country.error}
                      onChange={handleChange}
                      name="country"
                      labelWidth={60}
                    >
                      {countries.map((c) => (
                        <MenuItem
                          value={c.abbreviation.toLowerCase()}
                          key={c.country}
                        >
                          {c.country
                            .toLowerCase()
                            .replace(/\w+/g, _.capitalize)}
                        </MenuItem>
                      ))}
                    </Select>
                    {country.error && (
                      <FormHelperText error>{country.error}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="State"
                    name="state"
                    value={state.value}
                    error={!!state.error}
                    helperText={state.error}
                    onChange={handleChange}
                    placeholder="eg: Telangana"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="City"
                    name="city"
                    value={city.value}
                    error={!!city.error}
                    helperText={city.error}
                    onChange={handleChange}
                    placeholder="eg: Hyderabad"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={zipCode.value}
                    error={!!zipCode.error}
                    helperText={zipCode.error}
                    onChange={handleChange}
                    placeholder="eg: 12345"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item className={styles.gridItem}>
                  <TextField
                    label="Landmark"
                    name="landmark"
                    value={landmark.value}
                    error={!!landmark.error}
                    helperText={landmark.error}
                    onChange={handleChange}
                    placeholder="eg: Street number 1, opposite xyz"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
            {/* <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                type="submit"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress
                      color="primary"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <Lock size={15} />
                  )
                }
              >
                Proceed Securely
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
              >
                Create Campus
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateCampus;
