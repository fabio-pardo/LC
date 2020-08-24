import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }}>
        <div className="row h-50 align-items-end">
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
          <div className="row text-center justify-content-md-center">
            <div className="col ">
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
            <div className="col">
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
        </div>
      </div>
    );
  }
}
export default Landing;
