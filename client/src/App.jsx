import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
import QuestionForm from "./components/QuestionForm";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import RandomQuestion from "./components/RandomQuestion";

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Welcome />
        <CardDeck>
          <QuestionForm />
          <RandomQuestion />
        </CardDeck>
        <CollapsibleTable />
      </Container>
    );
  }
}

export default App;
