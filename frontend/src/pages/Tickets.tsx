import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getTickets } from "../features/tickets/ticketSlice";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import { AppDispatch, RootState } from "../app/store";
import { TicketItem } from "../components/TicketItem";

export const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector<
    RootState,
    RootState["tickets"]
  >((state) => state.tickets);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets &&
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
      </div>
    </>
  );
};
