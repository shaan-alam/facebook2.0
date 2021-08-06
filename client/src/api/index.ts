import axios, { AxiosRequestConfig } from "axios";
import { EditPost, NewPost } from "../actions/types";
import { BASE_URL } from "../constants";
import { GoogleSignUpFormDataInterface } from "../actions/types";
import { SignUpDataType } from "./types";

const API = axios.create({ baseURL: BASE_URL }); // Creating an Axios Instance for API calls.

// Attach the token from the localStorage to req.headers.authorization before any API calls.
API.interceptors.request.use((req: AxiosRequestConfig) => {
  if (localStorage.getItem("profile") || "{}") {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "{}").tokenId
    }`;
  }

  return req;
});

/**
 * @description Get the user from the backend
 * @param {[String]} email Email of the user which we have to search from the backend
 * @returns Promise<AxiosResponse<any>>
 */
export const getUser = (email: string) => API.get(`/users/${email}`);

/**
 * @description Function making an API call to sign in the user
 * @param {[String]} email Stores the email of the user trying to signin
 * @param {[String]} password Stores the password of the user trying to signin
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of the type AxiosResponse<any>
 */
export const signIn = (email: string, password: string) =>
  API.post("/auth/signin", { email, password });

/**
 * @description Function making an API call to sign in the user
 * @param {[SignUpDataType]} signUpData An object containing firstName, lastName, email, password, confimPassword to be sent to the backend.
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of the type AxiosResponse<any>
 */
export const signUp = (signUpData: SignUpDataType) =>
  API.post("/users/signup", { ...signUpData });

/**
 * @description Function making a POST API call to sign up the user using Google OAuth.
 * @param {[GoogleSignUpFormDataInterface]} formData An object containing details to be sent to the backend to save the user
 * @returns {[Promise<AxiosResponse<any>>]}
 */
export const signUpWithGoogle = (formData: GoogleSignUpFormDataInterface) =>
  API.post("/users/auth/signup/google", { ...formData });

/**
 * @description Function making a POST API call to sign in the user using Google OAuth.
 * @param {[string]} email Email of the user which is to be signed in
 * @returns {[Promise<AxiosResponse<any>>]}
 */
export const signInWithGoogle = (email: string) =>
  API.post("/users/auth/signin/google", { email });

/**
 * @description Function making an GET API call to fetch all the posts from the backend
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of the type AxiosResponse<any>
 */
export const getPosts = () => API.get("/posts");

/**
 * @description Function making a POST API call to create a new post
 * @param {[newPost]} newPost An object containing new post details.
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of the type AxiosResponse<any>
 */
export const createPost = (newPost: NewPost) => API.post("/posts", newPost);

/**
 * @description Function making a DELETE API call to delete a post
 * @param {[String]} id ID of the post to be deleted
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of the type AxiosResponse<any>
 */
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

/**
 * @description Function making a PATCH API call to edit a post
 * @param {[string]} id ID of the post
 * @param {[EditPost]} newPost An object containing edited post details
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of AxiosResponse<any>
 */
export const editPost = (id: string, newPost: EditPost) =>
  API.patch(`/posts/${id}`, newPost);

/**
 * @description Function making a PATCH API call to like a post
 * @param {[String]} id ID of the post to be liked
 * @return {[Promise<AxiosResponse<any>>]} Returns a promise of AxiosResponse<any>
 */
export const likePost = (id: string) => API.patch(`/posts/likePost/${id}`);
