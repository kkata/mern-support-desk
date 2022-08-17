import axios from "axios";
import { RegisterType } from "../../type";

const API_URL = "/api/users";

const register = async (userData: RegisterType) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const authService = {
  register,
};
