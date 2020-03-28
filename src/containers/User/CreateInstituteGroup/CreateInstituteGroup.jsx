import React, { useState } from "react";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Slider,
  CircularProgress
} from "@material-ui/core";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import { createInstituteGroup } from "../../../store/actions/user";
import Logo from "../../../components/Logo/Logo";
import CharCounter from "../../../components/CharCounter/CharCounter";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  uploadControls: {
    display: "flex",
    "@media (max-width: 600px)": {
      flexDirection: "column"
    }
  },
  grid: {
    width: "100%"
  },
  box: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  drag: {
    // width: "90%",
    height: "100px",
    borderRadius: "20px",
    backgroundImage: ` url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23CACACAFF' stroke-width='2' stroke-dasharray='12' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`,
    padding: "1rem",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.1)"
    },
    cursor: "pointer"
  }
}));

function getSteps() {
  return ["Enter Name", "Enter Description", "Upload Logo"];
}

const CreateAdminAccount = props => {
  const dispatch = useDispatch();
  const [upload, setUpload] = useState(null);
  let reactAvatarRef;
  const setEditorRef = editor => (reactAvatarRef = editor);
  const [uploadError, setUploadError] = useState(null);
  const [scale, setScale] = useState(1.4);
  const [image, setImage] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [form, setForm] = useState({
    name: {
      value: "",
      error: null
    },
    description: {
      value: "",
      error: null,
      count: 0,
      max: 200
    }
  });
  const classes = useStyles();
  const handleDrop = acceptedFiles => {
    setUpload(acceptedFiles[0]);
    console.log(acceptedFiles);
  };
  const handleScaleChange = (event, newValue) => {
    setScale(newValue);
  };
  const handleRotateChange = (event, newValue) => {
    setRotate(newValue);
  };
  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "description") {
      setForm(prev => ({
        ...prev,
        [name]: {
          value,
          error: null,
          count: value.length,
          max: 200
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: {
          value,
          error: null
        }
      }));
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const getStepContent = step => {
    const { name, description } = form;
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              variant="outlined"
              color="primary"
              value={name.value}
              error={!!name.error}
              name="name"
              onChange={handleInputChange}
              label="Name"
              helperText={
                !!name.error ? name.error : "You can edit this anytime you want"
              }
              fullWidth
              placeholder="eg: XYZ Group Of Institutions"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              multiline
              rows="4"
              variant="outlined"
              value={description.value}
              error={!!description.error}
              name="description"
              onChange={handleInputChange}
              color="primary"
              label="Description"
              helperText={!!description.error ? description.error : null}
              fullWidth
              placeholder="Some description you want outsiders to know (max: 200 characters)"
            />
            <Box mt={1}>
              <CharCounter
                count={description.count}
                maxCount={description.max}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box style={{ width: "100%" }}>
            <Dropzone
              onDrop={handleDrop}
              disableClick
              accept={["image/png", "image/jpeg"]}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography color="textSecondary" className={classes.drag}>
                      Drag 'n' drop the logo here, or click to select
                    </Typography>
                  </div>
                  {upload && (
                    <Box mt={2} className={classes.uploadControls}>
                      <Box>
                        <ReactAvatarEditor
                          width={200}
                          height={200}
                          ref={setEditorRef}
                          border={100}
                          borderRadius={100}
                          // borderRadius={10}
                          // onPositionChange
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
                        {image && <img src={image} alt="hello" />}
                      </Box>
                    </Box>
                  )}
                </section>
              )}
            </Dropzone>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };
  const validate = name => {
    let isValid = true;
    if (
      !form[name].value ||
      form[name].value === "" ||
      form[name].value === " "
    ) {
      isValid = false;
      setForm(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: "Please enter Something"
        }
      }));
    }
    if (
      form[name].max &&
      form[name].count &&
      form[name].count > form[name].max
    ) {
      isValid = false;
      setForm(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: "Only 200 characters are allowed"
        }
      }));
    }
    return isValid;
  };
  const handleNext = () => {
    if (activeStep === 0) {
      if (validate("name")) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
    if (activeStep === 1) {
      if (validate("description")) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
    if (activeStep === 2) {
      const { name, description } = form;
      const canvas = reactAvatarRef.getImageScaledToCanvas().toDataURL();
      let imageURL;
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          console.log(blob);
          imageURL = window.URL.createObjectURL(blob);
          setImage(imageURL);

          const formdata = new FormData();

          formdata.append("logo", blob);
          formdata.append("name", name.value);
          formdata.append("description", description.value);

          dispatch(
            createInstituteGroup({
              body: formdata
            })
          )
            .then(res => console.log(res))
            .catch(err => console.log(err));
        });

      // if (!upload === "") {
      //   setUploadError("Please upload a logo");
      // }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item md={12} xs={12}>
          <Box className="text-align--center" my={2}>
            <Logo width="4rem" />
          </Box>
          <Box>
            <Typography variant="h5" align="center" color="textPrimary">
              Create Institution Group
            </Typography>
          </Box>
          <Box mb={3} align="center">
            <Typography variant="subtitle1" color="textSecondary">
              This will be the main account through which you can create and
              manage campuses
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8} xs={11} className={classes.grid}>
          <Box className={classes.box}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              style={{ borderRadius: "10px" }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Box>{getStepContent(index)}</Box>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          size="medium"
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          disableElevation
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateAdminAccount;
