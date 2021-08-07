export type PostType = {
  _id: string;
  caption: string;
  imageURL: string;
  author: {
    _id: string;
    fullName: string;
  };
  likes: {
    likes: Array<{
      _id: string;
      fullName: string;
    }>;
  };
};

export type PostProps = {
  post: PostType;
};
