import React, { useEffect, useState } from "react";
import "../styles/CollapsibleTable.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    //backgroundColor: theme.palette.common.black,
    backgroundColor: "#616161",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Difficulty</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Last Attempted</StyledTableCell>
            <StyledTableCell align="center">Solution</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <StyledTableRow key={question.number}>
                <TableCell align="center">{question.number}</TableCell>
                <TableCell align="center">
                  <a href={question.questionInfo[0].titleInfo[1]}>
                    {question.questionInfo[0].titleInfo[0]}
                  </a>
                </TableCell>
                <TableCell align="center">
                  {question.questionInfo[0].difficulty}
                </TableCell>
                {question.passed ? (
                  <TableCell
                    style={{ backgroundColor: "#4caf50", color: "white" }}
                    align="center"
                  >
                    Passed
                  </TableCell>
                ) : (
                  <TableCell
                    style={{ backgroundColor: "#f44336", color: "white" }}
                    align="center"
                  >
                    Failed
                  </TableCell>
                )}
                <TableCell align="center">{question.date}</TableCell>
                <TableCell align="center">
                  <a href={question.questionInfo[0].solution}>Java</a>
                </TableCell>
              </StyledTableRow>
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
