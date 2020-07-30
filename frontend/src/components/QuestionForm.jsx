import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/QuestionForm.css";

export default function QuestionForm() {
  const handleSubmitQuestion = (event) => {
    console.log("Submitted!");
  };
  return (
    <div id="questionForm">
      <p id="submitQuestionP">Submit a question:</p>
      <Form onSubmit={handleSubmitQuestion}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridQuestionNumber">
            <Form.Label>Leetcode #</Form.Label>
            <Form.Control placeholder="#" />
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="formGridQuestionTitle">
            <Form.Label>Question Title</Form.Label>
            <Form.Control placeholder="Two Sum" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control as="select" custom>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" custom>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button variant="outline-primary" onClick={handleSubmitQuestion}>
          Submit Question
        </Button>
      </Form>
    </div>
  );
}
