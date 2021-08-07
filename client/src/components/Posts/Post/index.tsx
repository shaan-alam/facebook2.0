import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

// Interfaces and Types
import { PostType } from "./types";
import { likePost } from "../../../actions/posts";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  ChatAltIcon as ChatAltIconSolid,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";

const Post = ({ post }: { post: PostType }) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const commentBox = useRef<HTMLInputElement>(null);

  const LikeComponent = () => {
    let content = "";
    const didCurrentUserLike = post.likes.likes.filter(
      ({ fullName }: { fullName: string }) => fullName === profile.user.fullName
    );

    console.log(didCurrentUserLike !== null);
    if (post.likes.likes.length === 1) {
      console.log(1);
      return (
        <span className="flex flex-col items-center text-red-600 font-semibold mr-6">
          <ThumbUpIconSolid className="w-14 text-red-300 cursor-pointer px-4 py-2 hover:bg-red-300 rounded-lg" />
          1 Like
        </span>
      );
    } else if (didCurrentUserLike !== null && post.likes.likes.length > 2) {
      console.log(2);
      return (
        <span className="flex flex-col  text-red-600 font-semibold mr-6">
          <ThumbUpIconSolid className="w-14 mb-2 text-white cursor-pointer px-4 py-2 bg-red-600 rounded-lg" />
          You and {post.likes.likes.length - 1} others like this
        </span>
      );
    } else if (didCurrentUserLike !== null && post.likes.likes.length > 2) {
      console.log(3);
      return (
        <span className="flex flex-col items-center text-red-600 font-semibold mr-6">
          <ThumbUpIconSolid className="w-14 mb-2 text-white cursor-pointer px-4 py-2 bg-red-600 rounded-lg" />
          {post.likes.likes.length} like this
        </span>
      );
    } else {
      return (
        <span className="flex flex-col text-gray-600 font-semibold mr-6">
          <ThumbUpIcon className="w-14 mb-2 text-gray-600  cursor-pointer px-4 py-2 hover:bg-red-100 rounded-lg" />
          &nbsp; {post.likes.likes.length} Likes
        </span>
      );
    }
  };

  const CommentComponent = () => {
    return (
      <>
        <span className="flex items-start font-semibold mr-6">
          <ChatAltIcon
            className="w-14 mb-2 text-gray-600  cursor-pointer px-4 py-2 hover:bg-red-100 rounded-lg"
            onClick={() => commentBox?.current?.focus()}
          />
        </span>
      </>
    );
  };

  return (
    <div className="post my-8">
      <div className="flex items-center bg-white">
        <img
          src="https://avatars.githubusercontent.com/u/48273777?v=4"
          alt={post?.author?.fullName}
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">{post?.author?.fullName}</p>
      </div>
      <div className="post">
        <img
          src={post?.imageURL}
          alt={post?.caption}
          className="my-3 w-full rounded-lg"
        />
        <div className="post-actions flex">
          <LikeComponent />
          <CommentComponent />
        </div>
        <div className="add-comment ">
          <input
            ref={commentBox}
            type="text"
            className="w-full p-2 outline-none mt-6 border-b-2 focus:bg-gray-100 rounded-lg"
            placeholder="Comment..."
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

{
  /* 
<Card>
        {!isLoaded && (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        )}
        <Image
          style={isLoaded ? {} : { display: "none" }}
          src={post?.imgURL}
          wrapped
          ui={false}
          onLoad={() => setLoaded(true)}
        />
        <Card.Content>
          <Card.Header>
            {isLoaded ? post?.title : <Placeholder.Line />}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              {isLoaded ? post.tags?.join(", ") : <Placeholder.Line />}
            </span>
          </Card.Meta>
          <Card.Description>
            {isLoaded ? (
              post?.description
            ) : (
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            )}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {isLoaded ? (
            <>
              <LikeComponent />
              <Button
                icon="edit"
                style={{ marginLeft: "20px" }}
                primary
                onClick={handleShowModal}
              />
              <Button
                icon="trash"
                style={{ marginLeft: "20px" }}
                secondary
                onClick={() => dispatch(deletePost(post._id))}
              />
            </>
          ) : (
            <Placeholder.Image />
          )}
        </Card.Content>
      </Card>
    </> */
}
