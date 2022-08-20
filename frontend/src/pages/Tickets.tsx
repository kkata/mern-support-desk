import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getTickets } from "../features/tickets/ticketSlice";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import { AppDispatch, RootState } from "../app/store";

export const Tickets = () => {
  const { tickets, isLoading, isError, isSuccess, message } = useSelector<
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

  return <div>Tickets</div>;
};
