import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { getProfilePost } from "../api";
import { PostType } from "../components/Post/types";

const useProfilePost = (userId: string) => {
  const [photos, setPhotos] = useState<PostType[]>();

  const fetchProfilePosts = async (userId: string) => {
    try {
      const result: AxiosResponse<PostType[]> = await getProfilePost(userId);

      setPhotos(result.data.filter((post) => post.imageURL !== ""));

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    posts: useQuery(["profile-post", userId], () => fetchProfilePosts(userId)),
    photos,
  };  
};

export default useProfilePost;
