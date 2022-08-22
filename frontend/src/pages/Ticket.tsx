import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import { BackButton } from "../components/BackButton";
import { Spinner } from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";
import { NoteItem } from "../components/NoteItem";
import { FaPlus } from "react-icons/fa";

const customStyles = {
  content: {
    width: "90%",
    maxWidth: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isError, message } = useSelector<
    RootState,
    RootState["tickets"]
  >((state) => state.tickets);

  const { notes, isLoading: notesIsLoading } = useSelector<
    RootState,
    RootState["notes"]
  >((state) => state.notes);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (ticketId) {
      dispatch(getTicket(ticketId));
      dispatch(getNotes(ticketId));
    }
  }, [ticketId, isError, message, dispatch]);

  const onTicketClose = () => {
    if (ticketId) dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ticketId) {
      const noteData = { text: noteText, ticket: ticketId };
      dispatch(createNote(noteData));
    }
    closeModal();
  };

  if (isLoading || notesIsLoading) {
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
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};
