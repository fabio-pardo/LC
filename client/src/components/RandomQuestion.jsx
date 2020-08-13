import React, { useState, useEffect } from "react";
import Axios from "../../node_modules/axios/index";
export default function RandomQuestion() {
  const [failedQuestions, setFailedQuestions] = useState([]);
  useEffect(() => {
    Axios.get("/questions/failed")
      .then(function (response) {
        console.log(response.data);
        setFailedQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  if (failedQuestions.length > 0) {
    return (
      <div
        style={{
          borderTop: "1px",
          borderTopColor: "lightblue",
          borderTopStyle: "solid",
        }}
      >
        <p style={{ marginTop: "10px", marginLeft: 0, fontWeight: "bold" }}>
          Random failed question:
        </p>
      </div>
    );
  }

  return null;
}
