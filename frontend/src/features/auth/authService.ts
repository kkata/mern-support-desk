import axios from "axios";
import { RegisterType, LoginType } from "../../type";

const API_URL = "/api/users/";

const register = async (userData: RegisterType) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: LoginType) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  register,
  logout,
  login,
};
