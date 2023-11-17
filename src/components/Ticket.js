import React from "react";

const Ticket = ({ ticket }) => {

  let color;
  switch (ticket.priority) {
    case 4:
      color = "red";
      break;
    case 3:
      color = "orange";
      break;
    case 2:
      color = "yellow";
      break;
    case 1:
      color = "green";
      break;
    default:
      color = "gray";
      break;
  }

  return (
    <div className="ticket" style={{ backgroundColor: color }}>
      <h4 className="ticket-title">{ticket.title}</h4>
      <p className="ticket-status">Status: {ticket.status}</p>
      <p className="ticket-user">User: {ticket.user}</p>
      <p className="ticket-priority">Priority: {ticket.priority}</p>
    </div>
  );
};

export default Ticket;