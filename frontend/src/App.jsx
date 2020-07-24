import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import CollapsibleTable from "./components/CollapsibleTable";
class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Welcome />
        <CollapsibleTable />
      </div>
    );
  }
}

export default App;
