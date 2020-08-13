import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/QuestionForm.css";
import Axios from "../../node_modules/axios/index";

export default function QuestionForm(props) {
  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    Axios.get(`/questions/questionBank/${questionInfo.number}`)
      .then((response) => {
        if (response.data !== "") {
          window.location.reload(false);
          Axios.post("/questions", {
            number: questionInfo.number,
            date: questionInfo.date,
            passed: questionInfo.passed,
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

  const foundQuestion = (questionNumber) => {
    Axios.get(`/questions/questionBank/${questionNumber}`).then((response) => {
      if (response.data === "") {
        setFoundQ(false);
      } else {
        setFoundQ(true);
      }
    });
  };

  var nowDate = new Date();
  var date =
    nowDate.getMonth() +
    1 +
    "/" +
    nowDate.getDate() +
    "/" +
    nowDate.getFullYear();

  const [questionInfo, setQuestionInfo] = useState({
    number: 0,
    passed: true,
    date: date,
  });

  const [foundQ, setFoundQ] = useState(false);
  const [feedbackHidden, setFeedbackHidden] = useState(true);

  return (
    <div id="questionForm">
      <p id="submitQuestionP">Submit a question:</p>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={(e) => handleSubmitQuestion(e)}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridQuestionNumber">
            <Form.Label>Leetcode #</Form.Label>
            <Form.Control
              onChange={(e) => {
                setQuestionInfo({
                  number: Number(e.target.value),
                  passed: questionInfo.passed,
                  date: questionInfo.date,
                });

                if (e.target.value === "") {
                  setFeedbackHidden(true);
                } else {
                  setFeedbackHidden(false);
                  foundQuestion(e.target.value);
                }
              }}
              required
              placeholder="#"
            />
            {foundQ && !feedbackHidden && (
              <div className="correctFeedback">
                Question found. Ready to submit!
              </div>
            )}
            {!foundQ && !feedbackHidden && (
              <div className="incorrectFeedback">
                Question does not exist in our DB :(
              </div>
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              required
              as="select"
              onChange={(e) => {
                if (e.target.value === "true") {
                  setQuestionInfo({
                    number: questionInfo.number,
                    passed: true,
                    date: questionInfo.date,
                  });
                } else {
                  setQuestionInfo({
                    number: questionInfo.number,
                    passed: false,
                    date: questionInfo.date,
                  });
                }
              }}
            >
              <option value={true}>Passed</option>
              <option value={false}>Failed</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button type="submit" variant="outline-primary">
          Submit Question
        </Button>
      </Form>
    </div>
  );
}
