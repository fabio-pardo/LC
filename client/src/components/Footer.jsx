import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div id="footer">
      <a
        style={{ margin: "5px" /*color: "black" */ }}
        href="https://github.com/FPardo1023"
      >
        <FaGithub />
      </a>
      <a
        style={{ margin: "5px" /*color: "black" */ }}
        href="https://www.linkedin.com/in/fabio-pardo/"
      >
        <FaLinkedin />
      </a>
    </div>
  );
}
