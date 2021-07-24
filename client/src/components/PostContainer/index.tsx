import { useEffect } from "react";
import { Grid, Container, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducers/index";
import Post from "./Post";
import { getPosts } from "../../actions/posts";

import { clearError } from "../../actions/error";

// Interfaces and Types
import { PostContainerProps } from "./types";

const PostContainer = ({ setIsOpen, setCurrentID }: PostContainerProps) => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(clearError());
  }, []);

  return (
    <Container>
      <Grid columns={3} stackable>
        <Grid.Row>
          {posts.length > 0 ? (
            posts?.map((post) => (
              <Grid.Column key={post._id}>
                <Post
                  post={post}
                  setIsOpen={setIsOpen}
                  setCurrentID={setCurrentID}
                />
              </Grid.Column>
            ))
          ) : (
            <Message warning>
              <Message.Header>No posts to show!!</Message.Header>
            </Message>
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default PostContainer;
