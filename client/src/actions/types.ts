import { SignInFormDataType, SignUpFormDataType } from "../pages/Auth/types";
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

export type Post = {
  image: string;
  caption: string;
};

// Post related types and interfaces
export type GetPostType = () => (dispatch: Dispatch<any>) => Promise<void>;

export type CreatePostType = (
  post: Post
) => (dispatch: Dispatch<any>) => Promise<void>;

export type DeletePostType = (
  id: string
) => (dispatch: Dispatch<any>) => Promise<void>;

export interface NewPost {
  image: string;
  caption: string;
}

export interface EditPost {
  title: string;
  description: string;
  tags: string[];
}

export type EditPostType = (
  id: string,
  newPost: EditPost
) => (dispatch: Dispatch<any>) => Promise<void>;

export type LikePostType = (
  id: string
) => (dispatch: Dispatch<any>) => Promise<void>;
