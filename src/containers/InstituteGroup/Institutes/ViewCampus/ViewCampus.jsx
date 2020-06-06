import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Paper,
  IconButton,
  Divider,
  Chip,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Trash2, Edit2, ArrowLeft, Mail, Phone } from "react-feather";
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Illustration from "../../../../components/Illustration/Illustration";
import { getCampus } from "../../../../store/actions/user";
import { setBackBtnEnabled } from "../../../../store/actions/global";

const useStyles = makeStyles((theme) => ({
  topContainer: {
    display: "flex",
    padding: "1rem",
  },
  postsContainer: {
    minHeight: "5rem",
  },
  stuCount: {
    textAlign: "center",
    height: "5rem",
    backgroundColor: "#2ecc71",
    color: "#fff",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  teacherCount: {
    color: "#fff",
    textAlign: "center",
    height: "5rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  countContainer: {
    display: "flex",
    flexDirection: "row",
  },
  headContainer: {
    display: "flex",
  },
  backBtnContainer: {
    flexShrink: 1,
  },
  avatarContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  avatar: {
    padding: "4px",
    borderRadius: "50%",
    border: "1px solid",
    borderColor: theme.palette.text.secondary,
    display: "inline-block",
  },
  peopleCount: {
    display: "flex",
  },
  info1Container: {
    display: "flex",
    alignItems: "center",
  },
  info2Container: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  width100: {
    width: "100%",
  },
  "@media only screen and (max-width: 1000px)": {
    postsContainer: {
      display: "none",
    },
  },
}));

const ViewCampus = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { campusId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(setBackBtnEnabled());
    dispatch(getCampus(campusId))
      .then((res) => {
        setLoading(false);
        const { data, error } = res || {};
        if (data) {
          setData(res.data);
        } else {
          history.goBack();
        }
      })
      .catch((err) => {
        setLoading(false);
        history.goBack();
      });
  }, [dispatch]);
  return (
    <Box className={styles.width100}>
      {data && (
        <Paper className={styles.topContainer}>
          <Box p={0} className={styles.width100}>
            <Grid container>
              <Grid item md={3} sm={4} xs={12} align="center">
                <Box className={styles.headContainer}>
                  <Box className={styles.avatarContainer}>
                    <Box className={styles.avatar}>
                      {data.profileImageUrl ? (
                        <Avatar
                          src={data.profileImageUrl}
                          style={{ width: "150px", height: "150px" }}
                        />
                      ) : (
                        <Box style={{ width: "150px", height: "150px" }}>
                          <Illustration type="campus" withBg />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sm={8} xs={12}>
                <Typography variant="h5" color="textPrimary">
                  {data.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <pre style={{ padding: 0, margin: 0 }}>
                    {data.description}
                  </pre>
                </Typography>
                <Box mt={1}>
                  <Box className={styles.info2Container}>
                    <Box mr={1}>
                      <Mail size={15} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {data.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.info2Container} mt={1}>
                    <Box mr={1}>
                      <Phone size={15} />
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {data.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box className={styles.info1Container} mt={2}>
                  <Box mr={2}>
                    <Chip
                      color="secondary"
                      title="campus type"
                      label={data.campusType}
                    />
                  </Box>
                  <Box className={styles.peopleCount} mr={2}>
                    <Box mr={1}>
                      <Typography color="textPrimary" variant="body1">
                        {data.totalStudents}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      Students
                    </Typography>
                  </Box>
                  <Box className={styles.peopleCount} mr={2}>
                    <Box mr={1}>
                      <Typography color="textPrimary" variant="body1">
                        {data.totalTeachers}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      Teachers
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Link
                    to={{
                      pathname: "/i/campuses/campus",
                      state: { editData: data },
                    }}
                  >
                    <IconButton>
                      <Edit2 />
                    </IconButton>
                  </Link>
                  {/* <IconButton>
                <Trash2 />
              </IconButton> */}
                </Box>
              </Grid>
              {/* <Grid
                item
                md={3}
                sm={12}
                xs={12}
                className={styles.postsContainer}
              >
                <Box mx={1}>
                  <Paper variant="outlined">hello</Paper>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Paper>
      )}
      {loading && !data && (
        <Paper className={styles.topContainer}>
          <Box p={0} className={styles.width100}>
            <Grid container>
              <Grid item md={3} sm={4} xs={12} align="center">
                <Box className={styles.headContainer}>
                  <Box className={styles.avatarContainer}>
                    <Box className={styles.avatar}>
                      <Skeleton
                        variant="circle"
                        style={{ width: "150px", height: "150px" }}
                        animation="wave"
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sm={8} xs={12}>
                <Box mb={2}>
                  <Skeleton
                    variant="square"
                    style={{
                      width: "330px",
                      height: "20px",
                      borderRadius: "15px",
                    }}
                    animation="wave"
                  />
                </Box>
                <Box mb={1}>
                  <Skeleton
                    variant="square"
                    style={{ width: "300px", height: "10px" }}
                    animation="wave"
                  />
                </Box>
                <Box mb={1}>
                  <Skeleton
                    variant="square"
                    style={{ width: "150px", height: "10px" }}
                    animation="wave"
                  />
                </Box>
                {/* <Box mt={1}>
                  <Box className={styles.info2Container}>
                    <Box mr={1}>
                      <Mail size={15} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {data.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.info2Container} mt={1}>
                    <Box mr={1}>
                      <Phone size={15} />
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {data.phone}
                    </Typography>
                  </Box>
                </Box> */}
                {/* <Box className={styles.info1Container} mt={2}>
                  <Box mr={2}>
                    <Chip
                      color="secondary"
                      title="campus type"
                      label={data.campusType}
                    />
                  </Box>
                  <Box className={styles.peopleCount} mr={2}>
                    <Box mr={1}>
                      <Typography color="textPrimary" variant="body1">
                        {data.totalStudents}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      Students
                    </Typography>
                  </Box>
                  <Box className={styles.peopleCount} mr={2}>
                    <Box mr={1}>
                      <Typography color="textPrimary" variant="body1">
                        {data.totalTeachers}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      Teachers
                    </Typography>
                  </Box>
                </Box> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ViewCampus;
