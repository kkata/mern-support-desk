import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { BackButton } from "../components/BackButton";
import { Spinner } from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";

export const Ticket = () => {
  const { ticket, isLoading, isError, message } = useSelector<
    RootState,
    RootState["tickets"]
  >((state) => state.tickets);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (ticketId) dispatch(getTicket(ticketId));
  }, [ticketId, isError, message, dispatch]);

  const onTicketClose = () => {
    if (ticketId) dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};
