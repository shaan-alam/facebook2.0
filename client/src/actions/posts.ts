import * as api from "../api";
import { AxiosResponse } from "axios";
import {
  GET_POSTS,
  UPDATE_POST,
  CREATE_POST,
  DELETE_POSTS,
  ERROR,
} from "../constants";
import {
  GetPostType,
  CreatePostType,
  DeletePostType,
  EditPostType,
  LikePostType,
  Post,
} from "./types";
import { POST_CONTAINER } from "../constants";

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
    dispatch({
      type: ERROR,
      payload: { ON: POST_CONTAINER, message: err.response.data.message },
    });
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
    dispatch({
      type: ERROR,
      payload: { ON: POST_CONTAINER, message: err.response.data.message },
    });
  }
};
