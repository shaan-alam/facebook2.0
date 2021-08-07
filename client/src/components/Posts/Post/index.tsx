import { useState } from "react";
import { Card, Button, Placeholder, Image, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

// Interfaces and Types
import { PostType } from "./types";
import { likePost } from "../../../actions/posts";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/solid";

// { post, setIsOpen, setCurrentID }: PostProps

const Post = ({ post }: { post: PostType }) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const LikeComponent = () => {
    let content = "";
    const didCurrentUserLike = post.likes.likes.filter(
      ({ fullName }: { fullName: string }) => fullName === profile.user.fullName
    );

    console.log(didCurrentUserLike !== null);
    if (post.likes.likes.length === 1) {
      console.log(1)
      return (
        <span className="flex items-center text-gray-400 font-semibold mr-6">
          <ThumbUpIcon className="w-14 text-red-300 cursor-pointer px-4 py-2 hover:bg-red-300 rounded-lg" />
          &nbsp; 1 Like
        </span>
      );
    } else if (didCurrentUserLike !== null && post.likes.likes.length > 2) {
      console.log(2)
      return (
        <span className="flex items-center text-red-600 font-semibold mr-6">
          <ThumbUpIcon className="w-14 text-white cursor-pointer px-4 py-2 bg-red-600 rounded-lg" />
          &nbsp; You and {post.likes.likes.length - 1} others like this
        </span>
      );
    } else if (didCurrentUserLike !== null && post.likes.likes.length > 2) {
      console.log(3)
      return (
        <span className="flex items-center text-red-600 font-semibold mr-6">
          <ThumbUpIcon className="w-14 text-white cursor-pointer px-4 py-2 bg-red-600 rounded-lg" />
          &nbsp; {post.likes.likes.length} like this
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-gray-400 font-semibold mr-6">
          <ThumbUpIcon className="w-14 text-red-300 hover:text-white cursor-pointer px-4 py-2 hover:bg-red-300 rounded-lg" />
          &nbsp; {post.likes.likes.length} Likes
        </span>
      );
    }

    return <div></div>;
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
        <div className="post-actions flex ">
          <LikeComponent />
          <ChatAltIcon className="w-14 text-gray-400 cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-lg" />
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
