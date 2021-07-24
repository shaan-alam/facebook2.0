import axios, { AxiosResponse } from "axios";
import {
  AuthResponse,
  SignInType,
  SignUpType,
  SignUpWithGoogleType,
  SignInWithGoogleType,
} from "./types";
import {
  AUTH,
  ERROR,
  GOOGLE_SIGNIN,
  GOOGLE_SIGNUP,
  LOGOUT,
  SETUP_PROFILE,
  SIGN_IN,
  SIGN_UP,
} from "../constants";

// Sign in action creator
export const signIn: SignInType =
  (formData, successRedirect) => async (dispatch: Function) => {
    try {
      const { email, password } = formData;
      const result: AxiosResponse<AuthResponse> = await axios.post(
        "http://localhost:5000/users/signin",
        {
          email,
          password,
        }
      );

      dispatch({ type: AUTH, payload: result.data });
      successRedirect();
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { ON: SIGN_IN, message: err.response.data.message },
      });
    }
  };

// Sign up action creator
export const signUp: SignUpType =
  (formData, successRedirect) => async (dispatch: Function) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
      const result = await axios.post("http://localhost:5000/users/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      dispatch({ type: AUTH, payload: result.data });
      successRedirect();
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { ON: SIGN_UP, message: err.response.data.message },
      });
    }
  };

// Sign up with google
export const signUpWithGoogle: SignUpWithGoogleType =
  (formData, successRedirect) => async (dispatch) => {
    const { name, email, password, confirmPassword } = formData;

    try {
      const result = await axios.post(
        "http://localhost:5000/users/auth/signup/google",
        { name, email, password, confirmPassword }
      );

      dispatch({
        type: GOOGLE_SIGNUP,
        payload: { profileObj: result.data.user, token: result.data.token },
      });

      successRedirect();
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { ON: SETUP_PROFILE, message: err.response.data.message },
      });
    }
  };

// Sign in using google
export const signInWithGoogle: SignInWithGoogleType =
  (email, successRedirect) => async (dispatch: Function) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/users/auth/signin/google",
        { email }
      );

      dispatch({
        type: GOOGLE_SIGNIN,
        payload: { profileObj: result.data.user, tokenId: result.data.token },
      });

      successRedirect();
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: { ON: SIGN_IN, message: err.response.data.message },
      });
    }
  };

// Logout action creator
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
