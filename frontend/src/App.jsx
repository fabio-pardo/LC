import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
import QuestionForm from "./components/QuestionForm";
class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Welcome />
        <QuestionForm />
        <CollapsibleTable />
      </div>
    );
  }
}

export default App;
