import React from "react";
import "../styles/CollapsibleTable.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { styled, makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    color: "black",
    fontWeight: "bold",
  },
});

const LabelCell = styled(TableCell)({
  fontWeight: "bold",
});

function CollapsibleTable() {
  const classes = useRowStyles();
  return (
    <div id="table">
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow hover className={classes.root}>
              <TableCell
                onClick={() => {
                  console.log("sup");
                }}
                align="right"
              >
                #
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell className={classes.cell} align="right">
                Difficulty
              </TableCell>
              <TableCell align="right">Passed</TableCell>
              <TableCell align="right">Last Attempted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CollapsibleTable;
