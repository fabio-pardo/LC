import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";
import { logoutUser } from "../../actions/authActions";
import Button from "react-bootstrap/Button";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const textAlign = !isAuthenticated ? "center" : "";
    return (
      <div
        style={{
          top: 0,
          left: 0,
          height: "50px",
          position: "absolute",
          maxWidth: "960px",
          width: "100%",
          textAlign: textAlign,
        }}
      >
        <nav className="navbar-light">
          <div className="row">
            <div className="col">
              <Link
                style={{
                  fontFamily: "monospace",
                  fontSize: "2.1rem",
                }}
                className="navbar-brand"
                to="/"
              >
                <SiLeetcode
                  style={{ fontSize: "20px" }}
                  className="align-baseline"
                />{" "}
                LC
              </Link>
            </div>
            {isAuthenticated && (
              <div className="col-auto navbar-brand">
                <Button onClick={this.onLogoutClick} variant="danger">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.prototypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
