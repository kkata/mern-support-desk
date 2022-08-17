import { RootState } from "./app/store";

export type AuthType = RootState["auth"];

export type UserType = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export type RegisterType = Pick<UserType, "name" | "email" | "password">;
export type LoginType = Pick<UserType, "email" | "password">;
