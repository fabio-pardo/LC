import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div
        className="container-fluid landing"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "20px",
        }}
      >
        <div className="row text-center vertical-align">
          <div className="col text-center">
            <h4 style={{ fontSize: "2.28rem", lineHeight: "110%" }}>
              Use this app to <b>track</b> your leetcode progress!
            </h4>
            <p style={{ color: "#757575", fontSize: "1.68rem" }}>
              This app was created using the MERN stack by Fabio Pardo
            </p>
            <br />
          </div>
        </div>
        <div>
          {!isAuthenticated ? (
            <div className="row">
              <div className="col text-center">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="bg-primary text-white btn btn-lg blue"
                >
                  Register
                </Link>
              </div>
              <div className="col text-center">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-lg btn-outline-secondary  text-black"
                >
                  Log In
                </Link>
              </div>
            </div>
          ) : (
            <div className="row text-center justify-content-md-center">
              <div className="col">
                <Link
                  to="/dashboard"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-lg btn-outline-secondary  text-black"
                >
                  Go Back
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
