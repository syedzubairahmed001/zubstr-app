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
  const [acceptReqOpen, setAcceptReqOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [reqData, setReqData] = useState({
    name: "",
    requestId: "",
    classId: "",
  });
  const handleAcceptClick = (name, requestId, studentId) => {
    console.log(name, requestId, studentId);
    setReqData({ name, requestId });
    setAcceptReqOpen(true);
  };
  const handleClassSelect = (event, newVal) => {
    setReqData((prev) => ({
      ...prev,
      classId: newVal.value,
    }));
  };
  const handleAddClick = () => {
    const { requestId, classId } = reqData || {};
    if (requestId && classId) {
      setAddLoading(true);
      const data = { requestId, classId };
      dispatch(acceptStudentRequest(data))
        .then(() => {
          setAddLoading(false);
          setAcceptReqOpen(false);
          enqueueSnackbar("Student added", { variant: "success" });
        })
        .catch(() => setAddLoading(false));
    }
  };
  const handleAcceptClose = () => {
    setReqData({ name: "", requestId: "", studentId: "" });
    setAcceptReqOpen(false);
  };
  const studentRequests = useSelector(
    (state) => state.campus.requests.student.data
  );
  const isStudentLoadedOnce = useSelector(
    (state) => state.campus.requests.student.isLoadedOnce
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
            <DisplayRequests type="student" onAcceptClick={handleAcceptClick} />
          )}
          {studentRequests &&
            studentRequests.length === 0 &&
            isStudentLoadedOnce && <EmptyRequest type="student" />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EmptyRequest type="teacher" />
        </TabPanel>
      </Box>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={Boolean(acceptReqOpen)}
        onClose={handleAcceptClose}
        className={styles.container}
      >
        <Box p={2} className={styles.acceptModal}>
          <Box mb={1}>
            <Typography variant="h5" align="center">
              Add {reqData.name} to class
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="caption" align="center">
              Student will be notified and can use Zubstr features after you
              accept request
            </Typography>
          </Box>
          <Box className={styles.inputContainer}>
            <SearchInput onChange={handleClassSelect} />
          </Box>
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={handleAddClick}
              startIcon={
                addLoading ? (
                  <CircularProgress color="primary" size="small" />
                ) : null
              }
            >
              Add
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default Requests;
