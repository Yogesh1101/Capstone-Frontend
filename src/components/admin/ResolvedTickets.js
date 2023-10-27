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
} from "@mui/material";
import { API } from "../../API_LINK";
import React, { useEffect, useState } from "react";

function ResolvedTickets() {
  const [tickets, setTickets] = useState([]);
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

  const getTickets = async () => {
    const res = await fetch(`${API}/admin/all-resolved-tickets`, {
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
    getTickets();
  }, []);
  return (
    <div className="container mt-5 flex flex-column align-items-center">
      <h1 className="mb-5 mt-5">Resolved Tickets</h1>
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
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResolvedTickets;
