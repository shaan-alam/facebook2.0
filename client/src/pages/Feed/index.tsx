import { useEffect } from "react";
import { Grid, Container, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducers/index";
import Posts from "../../components/Posts";
import { getPosts } from "../../actions/posts";

import { clearError } from "../../actions/error";

// Interfaces and Types
import { PostContainerProps } from "./types";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/solid";
import NewPost from "../../components/NewPost";
import ProfileSuggestion from "../../components/ProfileSuggestion";

const Feed = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(clearError());
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex">
        <div className="hidden md:block md:w-1/4 mr-4 p-4 my-3 bg-white shadow-sm rounded-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          nam sint necessitatibus magnam! Iure dolore voluptatum ex fugiat fugit
          voluptatem.
        </div>
        <div className="wall lg:mr-4 w-full md:w-full">
          <NewPost />
          <div className="posts my-4 bg-white rounded-lg p-4">
            <Posts posts={posts} />
          </div>
        </div>
        <ProfileSuggestion />
      </div>
    </div>
  );
};

export default Feed;
