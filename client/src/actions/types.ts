import { SignInFormDataType } from "../pages/Auth/types";
import { Dispatch } from "redux";

export interface AuthResponse {
  user: {
    email: string;
    password: string;
    name: string;
  };
  token: string;
}

export type SignInType = (
  formData: SignInFormDataType,
  successRedirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;

export type SignUpType = (
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  },

  successRedirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;

export type GoogleAuthenticationType = (
  formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string;
  },
  redirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;
