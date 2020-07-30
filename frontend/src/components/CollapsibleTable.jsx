import React, { useEffect, useState } from "react";
import "../styles/CollapsibleTable.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

function CollapsibleTable() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/questions", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div id="table">
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Difficulty</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Last Attempted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.length > 0 ? (
              questions.map((question) => (
                <TableRow key={question._id}>
                  <TableCell align="right">{question._id}</TableCell>
                  <TableCell align="right">{question.name}</TableCell>
                  <TableCell align="right">{question.difficulty}</TableCell>
                  <TableCell align="right">
                    {question.passed ? "Passed" : "Failed"}
                  </TableCell>
                  <TableCell align="right">{question.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CollapsibleTable;
