import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Posts from "../../components/Posts";

import { clearError } from "../../actions/error";

// Interfaces and Types
import NewPost from "../../components/NewPost";
import ProfileSuggestion from "../../components/ProfileSuggestion";
import usePosts from "../../hooks/usePosts";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const posts = usePosts();

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex">
        <div className="hidden md:block md:w-1/2 mr-2 p-4 my-3 bg-white shadow-sm rounded-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          nam sint necessitatibus magnam! Iure dolore voluptatum ex fugiat fugit
          voluptatem.
        </div>
        <div className="wall lg:mr-2 w-full">
          <NewPost />
          <div className="posts my-4 rounded-lg">
            <Posts posts={posts} />
          </div>
        </div>
        <ProfileSuggestion />
      </div>
    </div>
  );
};

export default Feed;
