import * as api from "../api";
import axios, { AxiosResponse } from "axios";
import {
  GET_POSTS,
  UPDATE_POST,
  CREATE_POST,
  DELETE_POSTS,
} from "../constants";
import {
  GetPostType,
  CreatePostType,
  DeletePostType,
  EditPostType,
  LikePostType,
  Post,
} from "./types";

// Get all the posts action
export const getPosts: GetPostType = () => async (dispatch) => {
  try {
    const result: AxiosResponse<Post[]> = await api.getPosts();

    dispatch({ type: GET_POSTS, payload: result.data });
  } catch (err: any) {
    console.log(err);
  }
};

// Create a new post
export const createPost: CreatePostType =
  (post, currentUserId) => async (dispatch) => {
    try {
      const result: AxiosResponse<Post> = await api.createPost({
        ...post,
        creator: currentUserId,
      });

      dispatch({ type: CREATE_POST, payload: result.data });
    } catch (err) {
      console.log(err);
    }
  };

// Delete a post
export const deletePost: DeletePostType = (id) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.deletePost(id);

    console.log(result);

    dispatch({ type: DELETE_POSTS, payload: id });
  } catch (err) {
    console.log(err);
  }
};

// Edit a post
export const editPost: EditPostType = (id, newPost) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.editPost(id, newPost);
    dispatch({ type: UPDATE_POST, payload: result.data });
  } catch (err) {
    console.log(err);
  }
};

// Like a post
export const likePost: LikePostType = (id) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.likePost(id);
    dispatch({ type: UPDATE_POST, payload: result.data });
  } catch (err) {
    console.log(err);
  }
};
