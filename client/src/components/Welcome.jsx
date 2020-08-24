import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/Welcome.css";
import Grid from "@material-ui/core/Grid";

class Welcome extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="welcome">
        <Grid container direction="column">
          <Grid item>
            <h1> Welcome to the LC App, {user.name.split(" ")[0]}!</h1>
          </Grid>
          <Grid item>
            <p>
              Here you can store your leetcode progress and you can attempt a
              question that you attempted previously, but didn't pass, so you
              can see if you've progressed in your technical interview grind.
              Let's get started!
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Welcome.prototypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Welcome);
//export default Welcome;
