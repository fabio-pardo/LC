import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
import QuestionForm from "./components/QuestionForm";
import Container from "react-bootstrap/Container";

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Welcome />
        <QuestionForm />
        <CollapsibleTable />
      </Container>
    );
  }
}

export default App;
