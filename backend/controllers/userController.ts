import { RequestHandler } from "express";

export const registerUser: RequestHandler = (_req, res, _next) => {
  res.send("Register Route");
};
export const loginUser: RequestHandler = (_req, res, _next) => {
  res.send("Login Route");
};
