import { AxiosResponse } from "axios";
import React from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutationResult,
} from "react-query";
import { Comment } from "../components/Post/types";

export interface ReturnType {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<void, unknown>>;
  isLoading: boolean;
  isFetching: boolean;
  error: string;
}

export type UseFetchComments = (
  postId: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
) => ReturnType;

export type CommentCreationSuccess = (
  data: AxiosResponse<any>,
  variables: any,
  context: unknown
) => void | Promise<unknown>;

export type UseCreateComment = (
  postId: string,
  onSuccess: CommentCreationSuccess
) => UseMutationResult<AxiosResponse<any>, unknown, any, unknown>;
