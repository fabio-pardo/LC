import React, { useState, useEffect } from "react";
import Axios from "../../node_modules/axios/index";
import Card from "../../node_modules/react-bootstrap/esm/Card";
import { Button } from "../../node_modules/react-bootstrap/esm/index";
export default function RandomQuestion() {
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [failedQ, setFailedQ] = useState({
    date: "",
    number: 0,
    passed: false,
    questionInfo: [
      {
        difficulty: "",
        number: 0,
        solution: "",
        titleInfo: ["", ""],
      },
    ],
  });

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
        className="text-center"
        border="danger"
        style={{
          marginTop: "5px",
          padding: "5px",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Card.Header as="h6">Try a failed question</Card.Header>
        <Card.Body>
          <Card.Title>{`${failedQ.number}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {failedQ.questionInfo[0].titleInfo[0]}
          </Card.Subtitle>
          <Card.Text
            style={{ fontSize: "14px" }}
            className="text-muted"
          >{`Last Attempted: ${failedQ.date}`}</Card.Text>
          <Card.Link href={failedQ.questionInfo[0].titleInfo[1]}>
            Leetcode
          </Card.Link>
          <Card.Link href={failedQ.questionInfo[0].titleInfo[1]}>
            Solution
          </Card.Link>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => randomFailed(failedQuestions)}
          >
            Random
          </Button>
          <Button variant="success" onClick={() => {}}>
            Passed
          </Button>
        </Card.Footer>
      </Card>
    );
  }

  return null;
}
