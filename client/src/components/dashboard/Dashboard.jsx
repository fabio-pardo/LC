import React from "react";
import Welcome from "../Welcome";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import QuestionForm from "../QuestionForm";
import RandomQuestion from "../RandomQuestion";
import CollapsibleTable from "../CollapsibleTable";

export default function DashBoard() {
  return (
    <Container
      style={{
        paddingBottom: ".5rem",
      }}
    >
      <Welcome />
      <CardDeck>
        <QuestionForm />
        <RandomQuestion />
      </CardDeck>
      <CollapsibleTable />
    </Container>
  );
}
