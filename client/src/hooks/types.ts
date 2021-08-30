import React from "react";
import { QueryObserverResult, RefetchOptions } from "react-query";
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