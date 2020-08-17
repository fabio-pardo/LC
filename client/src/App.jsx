import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
import QuestionForm from "./components/QuestionForm";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import RandomQuestion from "./components/RandomQuestion";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <Container style={{ paddingBottom: "2.5rem" }} fluid>
        <Welcome />
        <CardDeck>
          <QuestionForm />
          <RandomQuestion />
        </CardDeck>
        <CollapsibleTable />
        <Footer />
      </Container>
    );
  }
}

export default App;
