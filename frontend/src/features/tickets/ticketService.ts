import axios from "axios";
import { TicketType } from "./ticketSlice";

const API_URL = "/api/tickets/";

const createTicket = async (ticketData: TicketType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

export const ticketService = {
  createTicket,
};
