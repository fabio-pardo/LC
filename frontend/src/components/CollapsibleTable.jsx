import React, { useEffect, useState } from "react";
import "../styles/CollapsibleTable.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

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
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Difficulty</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Last Attempted</TableCell>
            <TableCell align="center">Solution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <TableRow key={question._id}>
                <TableCell align="center">{question._id}</TableCell>
                <TableCell align="center">
                  <a href={question.questionInfo[0].titleInfo[1]}>
                    {question.questionInfo[0].titleInfo[0]}
                  </a>
                </TableCell>
                <TableCell align="center">
                  {question.questionInfo[0].difficulty}
                </TableCell>
                <TableCell align="center">
                  {question.passed ? "Passed" : "Failed"}
                </TableCell>
                <TableCell align="center">{question.date}</TableCell>
                <TableCell align="center">
                  <a href={question.questionInfo[0].solution}>Java</a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow></TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
