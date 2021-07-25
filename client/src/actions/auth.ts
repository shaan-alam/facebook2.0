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

import * as api from "../api";

/**
 * @description Action creator for signing in.
 * @param formData is an object containing email & password of the user trying to sign in.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign in is sucessful!
 * @return {[Promise<void>]} Returns a promise of Promise<void>
 */
export const signIn: SignInType =
  (formData, successRedirect) => async (dispatch: Function) => {
    try {
      const { email, password } = formData;
      const result: AxiosResponse<AuthResponse> = await api.signIn(
        email,
        password
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

/**
 * @description Action creator for signing up.
 * @param formData is an object containing firstName, lastName, email, password, confirmPassword of the user trying to sign up.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign up is sucessful!
 * @return {[Promise<void>]} Returns a promise of Promise<void>
 */
export const signUp: SignUpType =
  (formData, successRedirect) => async (dispatch: Function) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
      const result = await api.signUp({
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

/**
 * @description Action creator for signing up with Google Login.
 * @param formData is an object containing name, email, password, confirmPassword of the user trying to sign in.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign up is sucessful!
 * @return {[Promise<void>]}
 */
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

/**
 * @description Action creator for signing in with Google Login.
 * @param email is the email of the user returned from Google API.
 * @param successRedirect is a function to to redirect the user to the PostContainer component if the sign up is sucessful!
 * @return {[Promise<void>]}
 */
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

/**
 * @description Action creator returning a LOGOUT action to logout the user
 * @return An object retutning the type LOGOUT
 */
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
