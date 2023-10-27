import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  TableContainer,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import { API } from "../../API_LINK";
import React, { useEffect, useState } from "react";

function OpenTickets() {
  const [tickets, setTickets] = useState([]);
  const [chatId, setChatId] = useState([]);
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

  const getOpenTickets = async () => {
    const res = await fetch(`${API}/admin/all-open-tickets`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (!data.data) {
      console.log(data.error);
    } else {
      setTickets(data.data.reverse());
    }
  };

  useEffect(() => {
    getOpenTickets();
  }, []);
  return (
    <div className="container mt-5 flex flex-column align-items-center">
      <h1 className="mb-5 mt-5">Open Tickets</h1>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">S.NO</StyledTableCell>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">STUDENT</StyledTableCell>
              <StyledTableCell align="left">TITLE</StyledTableCell>
              <StyledTableCell align="left">DESCRIPTION</StyledTableCell>
              <StyledTableCell align="left">STATUS</StyledTableCell>
              <StyledTableCell align="left">DATE</StyledTableCell>
              <StyledTableCell align="left">ISSUE</StyledTableCell>
              <StyledTableCell align="left">RESOLVE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket, index) => (
              <StyledTableRow key={ticket._id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell align="left">{ticket._id}</StyledTableCell>
                <StyledTableCell align="left">
                  {ticket.student.name}
                </StyledTableCell>
                <StyledTableCell align="left">{ticket.title}</StyledTableCell>
                <StyledTableCell align="left">
                  {ticket.description}
                </StyledTableCell>
                <StyledTableCell align="left">{ticket.status}</StyledTableCell>
                <StyledTableCell align="left">{ticket.date}</StyledTableCell>
                <StyledTableCell align="left">
                  {ticket.studentMsg}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={() => setChatId(ticket)}>Resolve</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {chatId.length !== 0 ? <ChatBox chatId={chatId} /> : ""}
    </div>
  );
}

function ChatBox({ chatId }) {
  const [message, setMsg] = useState("");
  const handleSubmit = async () => {
    const res = await fetch(`${API}/admin/solution/${chatId._id}`, {
      method: "PUT",
      body: JSON.stringify({ message, status: "Resolved" }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50">
      <TextField
        id="outlined-multiline-static"
        label="Enter Solution"
        multiline
        value={message}
        onChange={(e) => setMsg(e.target.value)}
        rows={4}
        fullWidth
      />
      <Button type="submit" className="mt-4" variant="contained">
        SEND
      </Button>
    </form>
  );
}

export default OpenTickets;
