import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  tableCellClasses,
  TableHead,
  TableRow,
  styled,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../API_LINK";

function Home() {
  const [openTickets, setOpenTickets] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [close, setClose] = useState([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const getTicket = async () => {
    const res = await fetch(`${API}/user/all`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (!data.data) {
      console.log(data.error);
    } else {
      setOpenTickets(data.data.reverse());
    }
  };

  useEffect(() => {
    getTicket();
  }, []);
  return (
    <div className="container mt-5 flex flex-column align-items-center">
      <h1>Welcome</h1>
      <h4>Your Tickets</h4>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">TITLE</StyledTableCell>
              <StyledTableCell align="left">DESCRIPTION</StyledTableCell>
              <StyledTableCell align="left">STATUS</StyledTableCell>
              <StyledTableCell align="center">VIEW</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
              <StyledTableCell align="center">CLOSE QUERY</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openTickets.map((ticket, index) => (
              <StyledTableRow key={ticket._id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">{ticket.title}</StyledTableCell>
                <StyledTableCell align="left">
                  {ticket.description}
                </StyledTableCell>
                <StyledTableCell align="left">{ticket.status}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* It will navigate to book edit page when the edit icon is clicked to={`book-edit/${data.id}`}*/}
                  <Link>
                    <Button onClick={() => setTicket(ticket)}>
                      Detail View
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* Here the book data is deleted when the delete is clicked */}
                  <DeleteRoundedIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      fetch(`${API}/user/delete/${ticket._id}`, {
                        method: "DELETE",
                        headers: {
                          "x-auth-token": localStorage.getItem("token"),
                        },
                      }).then(() => getTicket());
                    }}
                  ></DeleteRoundedIcon>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* Here the book data is deleted when the delete is clicked */}
                  <Button
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      // const res = await fetch(
                      //   `${API}/user/edit/${ticket._id}`,
                      //   {
                      //     method: "PUT",
                      //     body: JSON.stringify({ status: "Closed" }),
                      //     headers: {
                      //       "Content-Type": "application/json",
                      //       "x-auth-token": localStorage.getItem("token"),
                      //     },
                      //   }
                      // );
                      // const data = await res.json();
                      // if (!data.error) {
                      //   getTicket();

                      // }
                      setClose(ticket);
                    }}
                  >
                    Close
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {ticket.length !== 0 ? (
        <Solution
          ticket={ticket}
          setClose={setClose}
          setTicket={setTicket}
          getTicket={getTicket}
        />
      ) : (
        ""
      )}
      {close.status === "Open" ? (
        <Feedback close={close} setClose={setClose} getTicket={getTicket} />
      ) : (
        ""
      )}
    </div>
  );
}

function Feedback({ close, setClose, getTicket }) {
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async () => {
    const res = await fetch(`${API}/user/edit/${close._id}`, {
      method: "PUT",
      body: JSON.stringify({ feedback, status: "Closed" }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (!data.error) {
      setClose([]);
      getTicket();
    } else {
      console.log(data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50">
      <TextField
        id="outlined-multiline-static"
        label="Enter Feedback"
        multiline
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        fullWidth
      />
      <Button type="submit" className="mt-4" variant="contained">
        SUBMIT
      </Button>
    </form>
  );
}

function Solution({ ticket, setTicket, setClose, getTicket }) {
  const style = {
    fontSize: "25px",
  };
  const [studentMsg, setStudentMsg] = useState("");
  return (
    <div className="w-50">
      {ticket ? (
        <div className="solution-div mt-5 w-100 flex flex-column align-items-center">
          <h1>Ticket Detail</h1>
          <div className="w-100 mt-3 flex flex-row justify-content-start align-items-center gap-3">
            <h1 style={style}>Title</h1>
            <p>{ticket.title}</p>
          </div>
          <div className="w-100 mt-3 flex flex-row justify-content-start align-items-center gap-3">
            <h1 style={style}>Description</h1>
            <p>{ticket.description}</p>
          </div>
          <div className="w-100 mt-3 flex flex-row justify-content-start align-items-center gap-3">
            <h1 style={style}>Status</h1>
            <p>{ticket.status}</p>
          </div>
          <div className="w-100 mt-3 flex flex-row justify-content-start align-items-center gap-3">
            <h1 style={style}>Solution</h1>
            <p>{ticket.message}</p>
          </div>
          <div className="w-100 mt-3 flex flex-row justify-content-start">
            <TextField
              id="outlined-multiline-static"
              label="Enter your Question Solution"
              multiline
              value={studentMsg}
              onChange={(e) => setStudentMsg(e.target.value)}
              rows={4}
              fullWidth
            />
          </div>
          <div className="mt-3 w-100 flex gap-5">
            <Button
              variant="contained"
              onClick={async () => {
                const res = await fetch(`${API}/user/edit/${ticket._id}`, {
                  method: "PUT",
                  body: JSON.stringify({ studentMsg, status: "Open" }),
                  headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                  },
                });
                const data = await res.json();
                if (!data.error) {
                  setTicket("");
                  getTicket();
                }
              }}
            >
              Unsolved
            </Button>
            <Button
              variant="contained"
              onClick={async () => {
                const res = await fetch(`${API}/user/edit/${ticket._id}`, {
                  method: "PUT",
                  body: JSON.stringify({ status: "Closed" }),
                  headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                  },
                });
                const data = await res.json();
                if (!data.error) {
                  setTicket("");
                  getTicket();
                }
                setClose(ticket);
              }}
            >
              CLOSE
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
