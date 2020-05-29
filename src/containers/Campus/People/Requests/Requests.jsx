import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Tabs,
  Tab,
  IconButton,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { X } from "react-feather";
import { useSnackbar } from "notistack";

import SearchInput from "../../../../components/SearchInput/SearchInput";
import {
  getStudentRequests,
  acceptStudentRequest,
  acceptTeacherRequest,
  rejectStudentRequest,
  rejectTeacherRequest,
} from "../../../../store/actions/campus";

import EmptyRequest from "./EmptyRequest/EmptyRequest";
import DisplayRequests from "./DisplayRequests/DisplayRequests";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100%",
  },
  requestModalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: " .5rem 1rem",
  },
  dialogContainer: {
    height: "90vh",
  },

  acceptModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  inputContainer: {
    width: "100%",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const Requests = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { open, onClose, onCloseBtnClick } = props;
  const [value, setValue] = useState(0);
  const [studentAcceptOpen, setStudentAcceptReqOpen] = useState(false);
  const [teachertAcceptOpen, setTeacherAcceptReqOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [studentReqData, setStudentReqData] = useState({
    name: "",
    requestId: "",
    classId: {
      value: "",
      error: null,
    },
  });
  const [teacherReqData, setTeacherReqData] = useState({
    name: "",
    requestId: "",
    classId: "",
  });
  const [rejectReqData, setRejectReqData] = useState({
    requestId: { value: "" },
    personType: { value: "" },
    name: { value: "" },
  });
  const handleStudentAcceptOpen = (name, requestId) => {
    setStudentReqData((prev) => ({ ...prev, name, requestId }));
    setStudentAcceptReqOpen(true);
  };
  const handleTeacherAcceptOpen = (name, requestId) => {
    setTeacherReqData({ name, requestId });
    setTeacherAcceptReqOpen(true);
  };
  const handleRejectClick = (name, requestId, personType) => {
    setRejectReqData((prev) => ({
      name: { value: name },
      personType: { value: personType },
      requestId: { value: requestId },
    }));
    setRejectOpen(true);
  };
  const handleClassSelect = (event, newVal) => {
    if (newVal.value) {
      setStudentReqData((prev) => ({
        ...prev,
        classId: { value: newVal.value, error: null },
      }));
    }
  };
  const handleClassesSelect = (event, newVal) => {
    const newArr = newVal.map((e) => e.value);
    setTeacherReqData((prev) => ({
      ...prev,
      classId: newArr,
    }));
  };
  const handleStudentAddClick = () => {
    const { requestId, classId } = studentReqData || {};
    if (requestId && classId && classId.value) {
      setAddLoading(true);
      const data = { requestId, classId: classId.value };
      dispatch(acceptStudentRequest(data))
        .then(() => {
          setAddLoading(false);
          setStudentAcceptReqOpen(false);
          enqueueSnackbar("Student added", { variant: "success" });
        })
        .catch(() => setAddLoading(false));
    } else if (!classId || !classId.value) {
      setStudentReqData((prev) => ({
        ...prev,
        classId: { ...prev.classId, error: "Please select a class" },
      }));
    }
  };
  const handleRejectConfirm = () => {
    const { requestId, name, personType } = rejectReqData || {};
    if (requestId.value && personType.value) {
      const data = { requestId: requestId.value };
      if (personType.value === "student") {
        setAddLoading(true);
        dispatch(rejectStudentRequest(data))
        .then(() => {
          setAddLoading(false);
          setRejectOpen(false);
        })
          .catch(() => setAddLoading(false));
      } else if (personType.value === "teacher") {
        setAddLoading(true);
        dispatch(rejectTeacherRequest(data))
          .then(() => {
            setAddLoading(false);
            setRejectOpen(false);
          })
          .catch(() => setAddLoading(false));
      }
    }
  };
  const handleTeacherAddClick = () => {
    const { requestId, classId } = teacherReqData || {};
    if (requestId && classId) {
      setAddLoading(true);
      const data = { requestId, classId };
      dispatch(acceptTeacherRequest(data))
        .then((res) => {
          setAddLoading(false);
          if (res.data && res.data.requestId) {
            setTeacherAcceptReqOpen(false);
            enqueueSnackbar("Teacher added", { variant: "success" });
          } else {
            enqueueSnackbar("Something went wrong, please try again", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          setAddLoading(false);
          enqueueSnackbar("Something went wrong, please try again", {
            variant: "error",
          });
        });
    }
  };
  const handleStudentAcceptClose = () => {
    setStudentReqData({
      name: "",
      requestId: "",
      classId: {
        value: "",
        error: null,
      },
    });
    setStudentAcceptReqOpen(false);
  };
  const handleRejectClose = () => {
    setRejectReqData({
      name: { value: "" },
      requestId: { value: "" },
      personType: { value: "" },
    });
    setRejectOpen(false);
  };
  const handleTeacherAcceptClose = () => {
    setTeacherReqData({ name: "", requestId: "", studentId: "" });
    setTeacherAcceptReqOpen(false);
  };
  const studentRequests = useSelector(
    (state) => state.campus.requests.student.data
  );
  const isStudentLoadedOnce = useSelector(
    (state) => state.campus.requests.student.isLoadedOnce
  );
  const teacherRequests = useSelector(
    (state) => state.campus.requests.teacher.data
  );
  const isTeacherLoadedOnce = useSelector(
    (state) => state.campus.requests.teacher.isLoadedOnce
  );

  const styles = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={Boolean(open)}
      onClose={onClose}
      className={styles.container}
    >
      <Box className={styles.dialogContainer}>
        <Box className={styles.requestModalHeader}>
          <Typography variant="h6">Requests</Typography>
          <IconButton onClick={() => onCloseBtnClick()}>
            <X />
          </IconButton>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // centered
        >
          <Tab label="Students" />
          <Tab label="Teachers" />
        </Tabs>
        <TabPanel value={value} index={0}>
          {(!isStudentLoadedOnce || studentRequests.length > 0) && (
            <DisplayRequests
              type="student"
              onAcceptClick={handleStudentAcceptOpen}
              onRejectClick={handleRejectClick}
            />
          )}
          {studentRequests &&
            studentRequests.length === 0 &&
            isStudentLoadedOnce && <EmptyRequest type="student" />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {(!isTeacherLoadedOnce || teacherRequests.length > 0) && (
            <DisplayRequests
              type="teacher"
              onAcceptClick={handleTeacherAcceptOpen}
              onRejectClick={handleRejectClick}
            />
          )}
          {teacherRequests &&
            teacherRequests.length === 0 &&
            isTeacherLoadedOnce && <EmptyRequest type="teacher" />}
        </TabPanel>
      </Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={Boolean(studentAcceptOpen)}
        onClose={handleStudentAcceptClose}
        className={styles.container}
      >
        <Box p={2} className={styles.acceptModal}>
          <Box mb={1}>
            <Typography variant="h5" align="center">
              Add {studentReqData.name} to class
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="caption" align="center" color="textSecondary">
              Student will be notified and can use Zubstr features after you
              accept request
            </Typography>
          </Box>
          <Box className={styles.inputContainer}>
            <SearchInput
              searchType="class"
              onChange={handleClassSelect}
              label="Class"
              error={!!studentReqData.classId.error}
              helperText={studentReqData.classId.error}
              placeholder="Type and press search..."
              noOptionsText="No class found"
            />
          </Box>
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              disabled={addLoading}
              onClick={handleStudentAddClick}
              startIcon={
                addLoading ? (
                  <CircularProgress
                    color="primary"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : null
              }
            >
              Add
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={Boolean(teachertAcceptOpen)}
        onClose={handleTeacherAcceptClose}
        className={styles.container}
      >
        <Box p={2} className={styles.acceptModal}>
          <Box mb={1}>
            <Typography variant="h5" align="center">
              Assign classes to {teacherReqData.name}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="caption" align="center">
              Teacher will be notified and can use Zubstr features after you
              accept request
            </Typography>
          </Box>
          <Box className={styles.inputContainer}>
            <SearchInput
              searchType="class"
              onChange={handleClassesSelect}
              multiple
            />
          </Box>
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              disabled={addLoading}
              onClick={handleTeacherAddClick}
              startIcon={
                addLoading ? (
                  <CircularProgress
                    color="primary"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : null
              }
            >
              Add
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={Boolean(rejectOpen)}
        onClose={handleRejectClose}
        className={styles.container}
      >
        <Box p={2} className={styles.acceptModal}>
          <Box mb={1}>
            <Typography variant="h5" align="center">
              Confirm
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="caption" align="center" color="textSecondary">
              Are you sure, you want to reject this request? this action is
              irreversible.
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              disabled={addLoading}
              onClick={handleRejectConfirm}
              startIcon={
                addLoading ? (
                  <CircularProgress
                    color="primary"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : null
              }
            >
              Reject
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default Requests;
