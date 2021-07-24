import axios, { AxiosRequestConfig } from "axios";
import { EditPost, NewPost } from "../actions/types";
import { BASE_URL } from "../constants";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req: AxiosRequestConfig) => {
  if (localStorage.getItem("profile") || "{}") {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "{}").tokenId
    }`;
  }

  return req;
});

// Get the posts
export const getPosts = () => API.get("/posts");

// Create a new post
export const createPost = (newPost: NewPost) => API.post("/posts", newPost);

// Delete a post
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

// Edit a post
export const editPost = (id: string, newPost: EditPost) =>
  API.patch(`/posts/${id}`, newPost);

// Like a post
export const likePost = (id: string) => API.patch(`/posts/likePost/${id}`);
