import React, { useState } from "react";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Collapse,
  Popper,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { MapPin, Mail, X, ChevronDown } from "react-feather";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    display: "flex",
    alignItems: "center",
  },
  cardContent: {},
  cardInfo: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  messageContainer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "1.5rem",
  },
  messageToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingLeft: "1rem",
    marginTop: "1rem",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: "red",
    fontSize: "2rem",
    width: "100px",
    height: "1rem",
  },
  messageToggleBtn: {
    padding: ".8rem",
  },

  skeletonAvatar: {
    width: "3rem",
    height: "3rem",
  },
  skeletonTextShort: {
    width: "8rem",
  },
  skeletonTextLong: {
    width: "15rem",
  },
  skeletonMessage: {
    height: "2rem",
    fontWeight: 400,
    width: "100%",
    borderRadius: "1rem",
  },
  skeletonBtn: {
    width: "5rem",
    height: "2.2rem",
    borderRadius: "10px",
    marginLeft: ".5rem",
    display: "inline-block",
  },
}));

const RequestCard = (props) => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const {
    name,
    profileImageUrl,
    msg,
    location,
    _id,
    loading,
    onAcceptClick,
    onRejectClick,
    requestId,
    studentId,
    accType,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };
  if (loading) {
    return (
      <Paper variant="outlined">
        <Box p={2}>
          <Box className={styles.cardHeader} mb={2}>
            <Box>
              <Skeleton
                variant="circle"
                width={40}
                height={40}
                animation="wave"
              />
            </Box>
            <Box ml={1}>
              <Typography color="textPrimary">
                <Skeleton
                  variant="text"
                  className={styles.skeletonTextShort}
                  animation="wave"
                />
              </Typography>
            </Box>
          </Box>
          <Box className={styles.cardContent}>
            <Box>
              <Box className={styles.cardInfo}>
                <Skeleton
                  variant="text"
                  className={styles.skeletonTextLong}
                  animation="wave"
                />
              </Box>

              <Box className={styles.messageContainer} mt={1}>
                <Box onClick={handleExpandClick}>
                  <Skeleton
                    variant="rect"
                    className={styles.skeletonMessage}
                    animation="wave"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.cardActions} mt={2}>
            <Box></Box>
            <Box>
              <Skeleton
                variant="rect"
                className={styles.skeletonBtn}
                animation="wave"
              />
              <Skeleton
                variant="rect"
                className={styles.skeletonBtn}
                animation="wave"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }
  return (
    <Paper variant="outlined">
      <Box p={2}>
        <Box className={styles.cardHeader} mb={2}>
          <Box>
            <Avatar src={profileImageUrl} size={30} />
          </Box>
          <Box ml={1}>
            <Typography color="textPrimary">{name}</Typography>
          </Box>
        </Box>
        <Box className={styles.cardContent}>
          <Box>
            <Box className={styles.cardInfo}>
              <Box>
                <MapPin size={16} />
              </Box>
              <Box ml={1}>
                <Typography variant="caption">{`${location.landmark}, ${
                  location.city
                }, ${
                  location.state
                }, ${location.country.toUpperCase()}`}</Typography>
              </Box>
            </Box>

            <Box className={styles.messageContainer}>
              <Box className={styles.messageToggle} onClick={handleExpandClick}>
                <Box>
                  {/* <Mail /> */}
                  <Typography color="textSecondary" variant="subtitle1">
                    Message
                  </Typography>
                </Box>
                <IconButton className={styles.messageToggleBtn}>
                  <ChevronDown size={15} />
                </IconButton>
              </Box>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box pb={1} px={2}>
                  <Typography color="textSecondary">{msg || "N/A"}</Typography>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>
        <Box className={styles.cardActions} mt={2}>
          <Box>hello world</Box>
          <Box>
            <Button
              color="primary"
              variant="text"
              disableElevation
              onClick={() => onRejectClick(name, requestId, accType)}
            >
              Reject
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => onAcceptClick(name, requestId, studentId)}
              type="button"
              aria-describedby={id}
              style={{ marginLeft: ".5rem" }}
            >
              Accept
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
              <Box className={styles.paper}>The content of the Popper.</Box>
            </Popper>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default RequestCard;
