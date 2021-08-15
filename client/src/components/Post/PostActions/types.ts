import { PostType } from "../types";

export interface Counters {
  _id: string;
  emoji: string;
  by: string;
}

export interface Reaction {
  name: string;
  label: string;
  icon: string;
  textColor: string;
}

export interface PostActionsProps {
  commentBox: React.RefObject<HTMLInputElement>;
  post: PostType;
  setCounters: React.Dispatch<React.SetStateAction<Counters[]>>;
}
