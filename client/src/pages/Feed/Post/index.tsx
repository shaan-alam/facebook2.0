import { useState } from "react";
import { Card, Button, Placeholder, Image, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

// Interfaces and Types
import { PostProps, PostType } from "./types";
import { likePost } from "../../../actions/posts";

const Post = ({ post, setIsOpen, setCurrentID }: PostProps) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const handleShowModal = () => {
    setIsOpen(true);
    setCurrentID(post._id);
  };

  const LikeComponent = () => {
    let content = "";

    if (post.likes.length === 1) {
      content = "1 Like";
    } else if (
      post.likes.length > 2 &&
      post.likes.includes(profile.profileObj._id)
    ) {
      content = `You and ${post.likes.length - 1} others like this`;
    } else {
      content = `${post.likes.length} likes`;
    }

    return (
      <Button
        color={post.likes.includes(profile.profileObj._id) ? "red" : "grey"}
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: post.likes.includes(profile.profileObj._id) ? "red" : "grey",
          pointing: "left",
          content,
        }}
        onClick={() => dispatch(likePost(post._id))}
      />
    );
  };

  return (
    <>
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
    </>
  );
};

export default Post;
