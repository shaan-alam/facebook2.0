export type Post = {
  _id: string;
  title: string;
  likes: string[];
  description: string;
  imgURL: string;
  creator: string;
  createdAt: Date;
  tags: string[];
};

export type PostReducer = Post[];

export interface Action {
  type: string;
  payload: any;
}

const posts = (state: PostReducer = [], action: Action): Post[] => {
  switch (action.type) {
    case "GET_POSTS":
      return action.payload;

    case "CREATE_POST":
      return [...state, action.payload];

    case "DELETE_POSTS":
      console.log("payload", action.payload);
      return state.filter((post: Post) => post._id !== action.payload);

    case "UPDATE_POST":
      return state.map((post: Post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return state;
  }
};

export default posts;
