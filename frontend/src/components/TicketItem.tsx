import { Link } from "react-router-dom";
import { TicketType } from "../features/tickets/ticketSlice";

type PropsType = {
  ticket: TicketType;
};

export const TicketItem = ({ ticket }: PropsType) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString()}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};
