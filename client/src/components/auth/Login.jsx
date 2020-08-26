import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { BiArrowBack } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div
        style={{
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
        className="container"
      >
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <BiArrowBack /> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p style={{ marginLeft: 0 }}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <Form autoComplete="off" noValidate onSubmit={this.onSubmit}>
              <Form.Group classname="input-field col s12">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </Form.Group>
              <Form.Group classname="input-field col s12">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </Form.Group>
              <div
                className="col text-center s12"
                style={{ paddingLeft: "11.250px" }}
              >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-lg btn-outline-secondary  text-black"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
