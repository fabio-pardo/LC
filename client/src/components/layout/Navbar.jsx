import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar-light">
          <div className="text-center">
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
        </nav>
      </div>
    );
  }
}
export default Navbar;
