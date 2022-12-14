import axios from "axios";
import { CreateTicketType } from "./ticketSlice";

const API_URL = "/api/tickets/";

const createTicket = async (ticketData: CreateTicketType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);

  return response.data;
};

const closeTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + ticketId,
    { status: "closed" },
    config
  );

  return response.data;
};

export const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};
