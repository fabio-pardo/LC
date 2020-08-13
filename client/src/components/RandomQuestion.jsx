import React, { useState, useEffect } from "react";
import Axios from "../../node_modules/axios/index";
import Card from "../../node_modules/react-bootstrap/esm/Card";
import { Button } from "../../node_modules/react-bootstrap/esm/index";
export default function RandomQuestion() {
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [failedQ, setFailedQ] = useState({});

  useEffect(() => {
    Axios.get("/questions/failed")
      .then(function (response) {
        setFailedQuestions(response.data);
        randomFailed(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  function randomFailed(failedQuestions) {
    var failed =
      failedQuestions[Math.floor(Math.random() * failedQuestions.length)];
    setFailedQ(failed);
    return failed;
  }

  if (failedQuestions.length > 0) {
    return (
      <Card
        border="danger"
        style={{
          marginTop: "5px",
          padding: "5px",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Card.Header as="h6">Try a failed question:</Card.Header>
        <Button onClick={() => randomFailed(failedQuestions)}>
          {failedQ.number}
        </Button>
      </Card>
    );
  }

  return null;
}
