export type PostType = {
  _id: string;
  caption: string;
  imageURL: string;
  thumbnailURL: string;
  author: {
    fullName: string;
    avatar: string;
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
