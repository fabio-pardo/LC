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
    return (
      <div
        style={{
          paddingTop: "10px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <nav className="navbar-light">
          <div className="row ">
            <div className="col-auto mr-auto">
              <Link
                style={{ fontFamily: "monospace", fontSize: "2.1rem" }}
                className="navbar-brand black-text"
                to="/"
              >
                <SiLeetcode
                  style={{ fontSize: "20px" }}
                  className="align-baseline"
                />{" "}
                LC
              </Link>
            </div>
            <div className="col-auto">
              {isAuthenticated && (
                <Button onClick={this.onLogoutClick} variant="danger">
                  Logout
                </Button>
              )}
            </div>
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
