import { useState } from "react";
import { Card, Button, Placeholder, Image, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/posts";

// Interfaces and Types
import { PostProps, PostType } from "./types";
import { likePost } from "../../actions/posts";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/solid";

// { post, setIsOpen, setCurrentID }: PostProps

const Post = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  // const handleShowModal = () => {
  //   setIsOpen(true);
  //   setCurrentID(post._id);
  // };

  // const LikeComponent = () => {
  //   let content = "";

  //   if (post.likes.length === 1) {
  //     content = "1 Like";
  //   } else if (
  //     post.likes.length > 2 &&
  //     post.likes.includes(profile.profileObj._id)
  //   ) {
  //     content = `You and ${post.likes.length - 1} others like this`;
  //   } else {
  //     content = `${post.likes.length} likes`;
  //   }

  //   return (
  //     <Button
  //       color={post.likes.includes(profile.profileObj._id) ? "red" : "grey"}
  //       content="Like"
  //       icon="heart"
  //       label={{
  //         basic: true,
  //         color: post.likes.includes(profile.profileObj._id) ? "red" : "grey",
  //         pointing: "left",
  //         content,
  //       }}
  //       onClick={() => dispatch(likePost(post._id))}
  //     />
  //   );
  // };

  return (
    <div className="post my-8">
      <div className="flex items-center bg-white">
        <img
          src="https://avatars.githubusercontent.com/u/48273777?v=4"
          alt="Shaan Alam"
          className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
        />
        <p className="text-fb font-semibold">Shaan Alam</p>
      </div>
      <div className="post">
        <img
          src="https://avatars.githubusercontent.com/u/48273777?v=4"
          className="my-3 w-full rounded-lg"
        />
        <div className="post-actions flex ">
          <ThumbUpIcon className="w-14 text-gray-400 cursor-pointer px-4 py-2 hover:bg-blue-100 rounded-lg" />
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
