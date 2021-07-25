import {
  SignInFormDataType,
  SignUpFormDataType,
} from "../components/Auth/types";
import { Dispatch } from "redux";

// Authentication related types and interfaces
export interface FormDataInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
  formData: SignUpFormDataType,
  successRedirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;

export type Post = {
  title: string;
  description: string;
  imgURL: string;
  tags: string[];
};

export type SignUpWithGoogleType = (
  formData: FormDataInterface,
  successRedirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;

export type SignInWithGoogleType = (
  email: string,
  successRedirect: () => void
) => (dispatch: Dispatch<any>) => Promise<void>;

// Post related types and interfaces
export type GetPostType = () => (dispatch: Dispatch<any>) => Promise<void>;

export type CreatePostType = (
  post: Post,
  currentUserId: string
) => (dispatch: Dispatch<any>) => Promise<void>;

export type DeletePostType = (
  id: string
) => (dispatch: Dispatch<any>) => Promise<void>;

export interface NewPost {
  title: string;
  description: string;
  tags: string[];
  creator: string;
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


