import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import Subscribe from "./Subscribe/Subscribe";
const useStyles = makeStyles(theme => ({
  subHeading: {}
}));

const NewCustomer = props => {
  const [expanded, setExpanded] = useState("panel1");
  const [isSubscribe, setSubscribe] = useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      {!isSubscribe && (
        <Box p={3}>
          <Box>
            <Grid
              container
              justify="center"
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  Start your journey at Zubstr!
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" color="textSecondary" align="center">
                  By subscribing you will get access to all the Zubstr features.
                  <br />
                  Zubstr lets you stay connected with your students and staff
                  members, <br /> say no to maintaining huge records.
                </Typography>
              </Grid>
              <Grid item>
                {/* <Box mx={1}> */}
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => setSubscribe(true)}
                  // style={{ marginRight: "1rem" }}
                >
                  Subscribe Now!
                </Button>
                {/* </Box>
          <Box mx={1}> */}
                {/* <Button variant="text" color="primary">
              Learn More
            </Button> */}
                {/* </Box> */}
              </Grid>
            </Grid>
          </Box>

          <Box mt={3}>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>How we charge you?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  We charge you based on the total number of students in all
                  your campuses, we don't charge for alumnis
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography>What's the charge of one student?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  $1.5 per student is the current charge
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography>How should you pay?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  You can subscribe <b>here</b>. Once you enter card details you
                  will be charged every month based on the number of students.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>Your security</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  Zubstr uses Stripe for payments. Stripe is secure payment
                  service which is used by almost every website now a days. So
                  the payment is totally trusted and secured.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography>Need more info?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  We are happy to help you
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography>
                  What if you want to cancel your subscription?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  You can cancel subscription anytime you want. You won't be
                  billed from next month after cancelling subscription.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Box>
      )}
      {isSubscribe && <Subscribe />}
    </>
  );
};

export default NewCustomer;
