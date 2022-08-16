import { RootState } from "./app/store";

export type AuthType = RootState["auth"];

export type UserType = {
  name: string;
  email: string;
  password: string;
  password2: string;
};
