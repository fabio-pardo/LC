import React, { useState, useEffect } from "react";
import Axios from "../../node_modules/axios/index";
import Card from "../../node_modules/react-bootstrap/esm/Card";
import { Button } from "../../node_modules/react-bootstrap/esm/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";
function RandomQuestion(props) {
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
  const [inPassed, setInPassed] = useState(false);

  var nowDate = new Date();
  var date =
    nowDate.getMonth() +
    1 +
    "/" +
    nowDate.getDate() +
    "/" +
    nowDate.getFullYear();

  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    Axios.get(`/questions/questionBank/${failedQ.number}`)
      .then((response) => {
        if (response.data !== "") {
          window.location.reload(false);
          Axios.post("/questions", {
            userId: user.id,
            number: failedQ.number,
            date: date,
            passed: true,
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user } = props.auth;

  useEffect(() => {
    Axios.get("/questions/failed", { params: { userId: user.id } })
      .then(function (response) {
        setFailedQuestions(response.data);
        randomFailed(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, [user.id]);

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
          <Card.Link href={failedQ.questionInfo[0].solution}>
            Solution
          </Card.Link>
        </Card.Body>
        {!inPassed && (
          <Card.Footer className="text-muted">
            {failedQuestions.length > 1 && (
              <Button
                variant="outline-danger"
                style={{ margin: "10px" }}
                onClick={() => randomFailed(failedQuestions)}
              >
                Random
              </Button>
            )}
            <Button
              variant="success"
              onClick={() => {
                setInPassed(true);
              }}
              style={{ margin: "10px" }}
            >
              Passed
            </Button>
          </Card.Footer>
        )}

        {inPassed && (
          <Card.Footer className="text-muted">
            <Button
              variant="success"
              style={{ margin: "10px" }}
              type="submit"
              onClick={(e) => handleSubmitQuestion(e)}
            >
              I passed!
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setInPassed(false);
              }}
              style={{ margin: "10px" }}
            >
              Failed it :(
            </Button>
          </Card.Footer>
        )}
      </Card>
    );
  }

  return null;
}

RandomQuestion.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RandomQuestion);
