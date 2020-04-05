import React from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Avatar,
  Typography,
  makeStyles,
  Divider
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  currentAccountConatiner: {
    display: "flex",
    width: "15rem",
    flexDirection: "column",
    alignItems: "center",

    "&:focus": {
      outline: "none"
    }
  },
  largeAvatar: {
    width: "5rem",
    height: "5rem"
  }
}));

const Accounts = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const account = useSelector(state => state.auth.account);
  const classes = useStyles();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="switch-account"
        onClick={handleClick}
      >
        <Avatar alt={account.name} src={account.profileImageUrl} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        elevation={1}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box m={1} className={classes.currentAccountConatiner}>
          <Avatar
            alt={account.name}
            src={account.profileImageUrl}
            className={classes.largeAvatar}
          />
          <Box my={1}>
            <Typography
              variant="subtitle1"
              noWrap
              style={{
                maxWidth: "14rem",
                wordWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {account.name}
            </Typography>
          </Box>
          {account.email && (
            <Box my={1}>
              <Typography noWrap variant="caption" color="textSecondary">
                {account.email}
              </Typography>
            </Box>
          )}
        </Box>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Accounts;
