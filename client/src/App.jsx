import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
import QuestionForm from "./components/QuestionForm";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import RandomQuestion from "./components/RandomQuestion";
import Footer from "./components/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container style={{ paddingBottom: "2.5rem" }} fluid>
          <Navbar />
          <Landing />
          <Footer />
          {/*<Welcome />
          <CardDeck>
            <QuestionForm />
            <RandomQuestion />
          </CardDeck>
          <CollapsibleTable />
          <Footer />*/}
        </Container>
      </Router>
    );
  }
}

export default App;
