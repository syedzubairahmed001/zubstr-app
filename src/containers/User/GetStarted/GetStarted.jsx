import React, { useState } from "react";
import {
  Grid,
  Box,
  Paper,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import Lottie from "react-lottie";
import { useSpring, animated, useTransition } from "react-spring";

import styles from "./GetStarted.module.scss";
import Logo from "../../../components/Logo/Logo";
import smileyAnimation from "../../../assets/lottiefiles/smiley-emoji.json";
import balloonsImage from "../../../assets/images/undraw/balloons.svg";
import { useSelector } from "react-redux";
import bgImage1 from "../../../assets/images/bg-image-1.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    textTransform: "capitalize",
    color: theme.palette.text.primary
  },
  "@media (max-width: 600px)": {
    heading: {
      fontSize: "3rem"
    }
  }
}));

const GetStarted = props => {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  let { name } = user;
  name = name.split(" ")[0];
  const transitions = useTransition(false, null, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" }
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: smileyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const containerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(100px) scale(0.8)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1)" },
    config: { delay: 600, mass: 2, tension: 200, velocity: 1 }
  });
  const logoAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-100px) scale(1.4)" },
    to: { opacity: 1, transform: "translateY(0px) scale(1)" },
    config: { friction: 15 }
  });

  const [isSelection, setSelection] = useState(false);

  const Landing = () => (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item md={5} xs={12}>
        <animated.div style={logoAnimation}>
          <Logo width="100px" />
        </animated.div>
      </Grid>

      <animated.div style={containerAnimation}>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justify="center"
          xs={12}
        >
          <Grid item>
            <Lottie options={defaultOptions} height={100} width={100} />
          </Grid>
          <Grid item>
            <Typography variant="h2" className={classes.heading} align="center">
              Welcome {name}!
            </Typography>
          </Grid>
        </Grid>
      </animated.div>
      <Grid item md={5} xs={11}>
        <animated.div style={containerAnimation}>
          <Typography align="center" variant="subtitle1" color="textSecondary">
            Glad to see you here at Zubstr, We are working hard to connect
            students, teachers and institutes. Get started and have an amazing
            journey!
          </Typography>
        </animated.div>
      </Grid>
      <Grid item md={5} xs={12}>
        <animated.div style={containerAnimation}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            onClick={() => setSelection(true)}
          >
            Get Started!
          </Button>
        </animated.div>
      </Grid>
    </Grid>
  );
  const Selection = () => (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item md={5} xs={12}>
        <animated.div style={logoAnimation}>
          <Logo width="100px" />
        </animated.div>
      </Grid>

      <Grid item>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Typography align="center" color="textSecondary">
              Select one from the below options
            </Typography>
            <Box p={1} style={{ textAlign: "center" }}>
              <Link
                to="/u/create-institute-group"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary" disableElevation>
                  I own an educational institute
                </Button>
              </Link>
            </Box>
            <Box p={1} style={{ textAlign: "center" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary" disableElevation>
                  I am an employer at an institute
                </Button>
              </Link>
            </Box>
          </animated.div>
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Box className={classes.container + " " + styles.ContainerBg}>
      {isSelection ? <Selection /> : <Landing />}
    </Box>
  );
};

export default GetStarted;
