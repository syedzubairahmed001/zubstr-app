import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

import { logout, getAllAccounts, getAccount } from "../../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  currentAccountConatiner: {
    display: "flex",
    width: "15rem",
    maxWidth: "15rem",
    flexDirection: "column",
    alignItems: "center",

    "&:focus": {
      outline: "none",
    },
  },
  largeAvatar: {
    width: "5rem",
    height: "5rem",
  },
  AccountsLoadingContainer: {
    display: "flex",
    padding: ".5rem 1rem",
    alignItems: "center",
    justifyContent: "center",
  },
  AccountsAvatar: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "2rem",
    marginRight: "1rem",
  },
  AccountsText: {
    width: "100%",
    maxWidth: "15rem",
    height: ".8rem",
    borderRadius: "1rem",
    marginBottom: "5px",
  },
  AccountsTextShort: {
    width: "50%",
    height: ".8rem",
    borderRadius: "1rem",
  },
}));

const AccountsLoading = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.AccountsLoadingContainer}>
      <Box style={{ flexShrink: 1 }}>
        <Skeleton
          className={classes.AccountsAvatar}
          variant="rect"
          animation="wave"
        />
      </Box>
      <Box style={{ flex: 2 }}>
        <Skeleton
          className={classes.AccountsText}
          variant="rect"
          animation="wave"
        />
        <Skeleton
          className={classes.AccountsTextShort}
          variant="rect"
          animation="wave"
        />
      </Box>
    </Box>
  );
};

const AccountsDisplay = (props) => {
  const classes = useStyles();
  const { accounts, onClick, currentAcc } = props;

  let accElems = [];
  Object.keys(accounts).forEach((e) => {
    Array.isArray(accounts[e]) &&
      accounts[e].forEach((i) => {
        if (currentAcc._id.toString() !== i._id.toString()) {
          accElems.push(
            <MenuItem
              onClick={() => onClick(e.toLowerCase(), i._id)}
              key={i._id}
              title={"login as " + i.name}
            >
              {/* <span>{i.id}</span> */}
              <Box
                className={classes.AccountsLoadingContainer}
                style={{ padding: "unset" }}
              >
                <Box style={{ flexShrink: 1 }}>
                  <Avatar
                    alt={i.name}
                    src={i.profileImageUrl}
                    className={classes.AccountsAvatar}
                  />
                </Box>
                <Box style={{ flex: 2 }}>
                  <Typography
                    className={classes.AccountsText}
                    style={{
                      borderRadius: "unset",
                      height: "unset",
                      marginBottom: "unset",
                    }}
                    variant="body2"
                    noWrap
                  >
                    {i.name}
                  </Typography>
                  <Typography
                    className={classes.AccountsTextShort}
                    variant="caption"
                  >
                    {e}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          );
        }
      });
  });

  return accElems;
};

const Accounts = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const account = useSelector((state) => state.auth.account);
  const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.auth.accounts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [accountsLoading, setAccountsLoading] = useState(false);
  useEffect(() => {
    if (!accounts) {
      setAccountsLoading(true);
      dispatch(getAllAccounts())
        .then((res) => setAccountsLoading(false))
        .catch((err) => setAccountsLoading(false));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const handleAccSwitch = (accType, id) => {
    dispatch(getAccount({ account: { accType, id } }));
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
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              noWrap
              style={{
                maxWidth: "14rem",
                wordWrap: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {account.name}
            </Typography>
          </Box>
          {user.email && (
            <Box>
              <Typography noWrap variant="caption" color="textSecondary">
                {user.email}
              </Typography>
            </Box>
          )}
        </Box>
        {accountsLoading && (
          <Box>
            <AccountsLoading />
            <AccountsLoading />
          </Box>
        )}
        {accounts && account && (
          <AccountsDisplay
            accounts={accounts}
            onClick={handleAccSwitch}
            currentAcc={account}
          />
        )}
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Accounts;
