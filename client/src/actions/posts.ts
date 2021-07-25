import * as api from "../api";
import { AxiosResponse } from "axios";
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

/**
 * @description Action creator to fetch posts and dispatch a GET_POSTS action
 * @returns {[Promise<void>]} Promise<void>
 */
export const getPosts: GetPostType = () => async (dispatch) => {
  try {
    const result: AxiosResponse<Post[]> = await api.getPosts();

    dispatch({ type: GET_POSTS, payload: result.data });
  } catch (err: any) {
    console.log(err);
  }
};

/**
 * @description Action creator to send a new post to create to backend and dispatch a CREATE_POST action
 * @param {[Post]} post An object containing post details
 * @param {[String]} currentUserId The ID of the user who created the post.
 * @returns {[Prmoise<void>]} Promise<void>
 */
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

/**
 * @description Action creator to make a DELETE request along with the ID and dispatch a DELETE_POSTS action
 * @param {[String]} id The ID of the post which is to be deleted.
 * @returns {[Promise<void>]} Promise<void>
 */
export const deletePost: DeletePostType = (id) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.deletePost(id);

    dispatch({ type: DELETE_POSTS, payload: id });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description Action creator to make a PATCH request to backend to edit a post.
 * @param {[String]} id The ID of the post which is to be edited.
 * @param {[EditPost]} newPost An object containing new values for the original post
 * @returns {[Promise<void>]} Promise<void>
 */
export const editPost: EditPostType = (id, newPost) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.editPost(id, newPost);
    dispatch({ type: UPDATE_POST, payload: result.data });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description An action creator to make a PATCH request to like a post
 * @param {[String]} id The ID of the post which is to be liked
 * @returns {[Promise<void>]} Promise<void>
 */
export const likePost: LikePostType = (id) => async (dispatch) => {
  try {
    const result: AxiosResponse<Post> = await api.likePost(id);
    dispatch({ type: UPDATE_POST, payload: result.data });
  } catch (err) {
    console.log(err);
  }
};
