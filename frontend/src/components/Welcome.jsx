import React from "react";
import "../styles/Welcome.css";
import div from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <Grid
          spacing={0}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <h1>Hello! Welcome to the LC App!</h1>
          </Grid>
          <Grid item>
            <p>
              Here you can store your leetcode progress and each day we'll
              randomly select a question that you attempted previously, but
              didn't pass, so you can see if you've progressed in your technical
              interview grind. Let's get started!
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
