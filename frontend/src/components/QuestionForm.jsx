import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function QuestionForm() {
  return (
    <div id="questionForm">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridQuestionNumber">
            <Form.Label>Leetcode #</Form.Label>
            <Form.Control placeholder="#" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionName">
            <Form.Label>LC Question Name</Form.Label>
            <Form.Control placeholder="Two Sum" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control as="select" custom>
              <option value="0">Choose...</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuestionStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" custom>
              <option value="0">Choose...</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}
