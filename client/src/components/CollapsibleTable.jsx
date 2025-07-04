import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/CollapsibleTable.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Axios from "../../node_modules/axios/index";

const StyledTableCell = withStyles((theme) => ({
  head: {
    //backgroundColor: theme.palette.common.black,
    backgroundColor: "lightgrey",
    color: theme.palette.common.black,
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CollapsibleTable(props) {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortDir, setSortDir] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { user } = props.auth;

  useEffect(() => {
    Axios.get("/questions", {
      params: { userId: user.id },
    })
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, [user.id]);

  function handleSort(type) {
    setOrderBy(type);
    sortDir === "asc" ? setSortDir("desc") : setSortDir("asc");
    if (type === "number") {
      if (sortDir === "asc") {
        setQuestions(
          questions.sort((a, b) => {
            return a.number - b.number;
          })
        );
      } else {
        setQuestions(
          questions.sort((a, b) => {
            return b.number - a.number;
          })
        );
      }
    } else if (type === "difficulty") {
      if (sortDir === "asc") {
        setQuestions(
          questions.sort((a, b) => {
            a = a.questionInfo[0].difficulty;
            b = b.questionInfo[0].difficulty;
            if (a === b) {
              return 0;
            }
            if (
              (a === "Easy" && (b === "Medium" || b === "Hard")) ||
              (a === "Medium" && b === "Hard")
            ) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } else {
        setQuestions(
          questions.sort((a, b) => {
            a = a.questionInfo[0].difficulty;
            b = b.questionInfo[0].difficulty;
            if (a === b) {
              return 0;
            }
            if (
              (a === "Easy" && (b === "Medium" || b === "Hard")) ||
              (a === "Medium" && b === "Hard")
            ) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      }
    } else {
      if (sortDir === "asc") {
        setQuestions(
          questions.sort((a, b) => {
            return a.passed === b.passed ? 0 : a.passed ? -1 : 1;
          })
        );
      } else {
        setQuestions(
          questions.sort((a, b) => {
            return a.passed === b.passed ? 0 : a.passed ? 1 : -1;
          })
        );
      }
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">
              <TableSortLabel
                direction={sortDir === "asc" ? "desc" : "asc"}
                active={orderBy === "number"}
                onClick={() => {
                  handleSort("number");
                }}
              >
                #
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">
              <TableSortLabel
                direction={sortDir === "asc" ? "desc" : "asc"}
                active={orderBy === "difficulty"}
                onClick={() => {
                  handleSort("difficulty");
                }}
                style={{ marginLeft: 25 }}
              >
                Difficulty
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">
              <TableSortLabel
                direction={sortDir === "asc" ? "desc" : "asc"}
                active={orderBy === "status"}
                onClick={() => {
                  handleSort("status");
                }}
                style={{ marginLeft: 25 }}
              >
                Status
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">Last Attempted</StyledTableCell>
            <StyledTableCell align="center">Solution</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? questions.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : questions
          ).map((question) => (
            <StyledTableRow key={question.number}>
              <TableCell align="right">{question.number}</TableCell>
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
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: questions.length },
              ]}
              count={questions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CollapsibleTable);
