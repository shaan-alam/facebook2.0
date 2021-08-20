import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";
import {
  SignUpDataType,
  Reaction,
  NewPost,
  EditPost,
  GoogleAuthentication,
} from "./types";

const API = axios.create({ baseURL: BASE_URL }); // Creating an Axios Instance for API calls.

// Attach the token from the localStorage to req.headers.authorization before any API calls.
API.interceptors.request.use((req: AxiosRequestConfig) => {
  if (localStorage.getItem("profile") || "{}") {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "{}").token
    }`;
  }

  return req;
});

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

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
 */
export const signIn = (email: string, password: string) =>
  API.post("/auth/signin", { email, password });

/**
 * @description Function making an API call to sign in the user
 * @param {[SignUpDataType]} signUpData An object containing firstName, lastName, email, password, confimPassword to be sent to the backend.
 */
export const signUp = (signUpData: SignUpDataType) =>
  API.post("/auth/signup", { ...signUpData });

/**
 * @description Function to check if the email (returned from Google API) is in the Database or not?
 * @param {[String]} email Email of the user returned from Google API
 */
export const getUserFromDB = (email: string) =>
  API.post("/auth/getUser", { email });

/**
 * @description Function to make a backend request for Google Authentication
 * @param formData An object containing details required for Google Authentication
 */
export const googleAuthentication = (formData: GoogleAuthentication) =>
  API.post("/auth/googleAuth", {
    ...formData,
  });

/**
 * @description Function making an GET API call to fetch all the posts from the backend
 */
export const getPosts = () => API.get("/posts");

/**
 * @description Function making a POST API call to create a new post
 * @param {[newPost]} newPost An object containing new post details.
 */
export const createPost = (newPost: NewPost) => API.post("/posts", newPost);

/**
 * @description Function making a DELETE API call to delete a post
 * @param {[String]} id ID of the post to be deleted
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
 * @description Function making a PATCH API call to react to a post
 * @param {[String]} id ID of the post to be liked
 * @param {[Reaction]} reaction An object containing user's reaction details for example { emoji: 'haha', by: 'some user ID'}
 */
export const reactPost = (id: string, reaction: Reaction) =>
  API.patch(`/posts/${id}/reactPost`, { reaction, cancelToken: source.token });

export const fetchComments = (postId: string, offset: number) =>
  API.get(`/post/comment/${postId}?offset=${offset}`);

export const createComment = (
  postId: string,
  comment: { message: string; author: string }
) => API.post(`/post/comment/${postId}`, { comment });
