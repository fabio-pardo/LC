import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { BiArrowBack } from "react-icons/bi";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
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
              <BiArrowBack />
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p style={{ marginLeft: 0 }}>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <Form autoComplete="off" noValidate onSubmit={this.onSubmit}>
              <Form.Group className="input-field col s12">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", { invalid: errors.name })}
                />
                <span className="red-text">{errors.name}</span>
              </Form.Group>
              <Form.Group className="input-field col s12">
                <label htmlFor="email">Email</label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", { invalid: errors.email })}
                />
                <span className="red-text">{errors.email}</span>
              </Form.Group>
              <Form.Group className="input-field col s12">
                <label htmlFor="password">Password</label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", { invalid: errors.password })}
                />
                <span className="red-text">{errors.password}</span>
              </Form.Group>
              <Form.Group className="input-field col s12">
                <Form.Label htmlFor="password2">Confirm Password</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", { invalid: errors.password2 })}
                />
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
