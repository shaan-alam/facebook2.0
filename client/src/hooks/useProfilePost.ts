import { useQuery } from "react-query";
import { getProfilePost } from "../api";

const useProfilePost = (userId: string) => {
  const fetchProfilePosts = async (userId: string) => {
    try {
      const { data } = await getProfilePost(userId);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery(["profile-post", userId], () => fetchProfilePosts(userId));
};

export default useProfilePost;
