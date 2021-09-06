import { useQuery } from "react-query";
import { getProfile } from "../api";
import { AxiosResponse } from "axios";

type Response = AxiosResponse<{
  _id: string;
  fullName: string;
  avatar: string;
  cover_picture: string;
  createdAt: string;
  details: {
    lives_in_city: string;
    from_city: string;
    bio: string;
    works: string[];
    education: string[];
  };
  followers: Array<{ _id: string; fullName: string; avatar: string }>;
  following: Array<{ _id: string; fullName: string; avatar: string }>;
}>;

const useProfile = (userId: string) => {
  const fetchProfile = async ({ queryKey }: any) => {
    const [_key, userId] = queryKey;

    try {
      if (userId) {
        const result: Response = await getProfile(userId);

        return result.data;
      }

      return null;
    } catch (err) {
      console.error("Error", err);
      console.log("here is the error");
    }
  };

  return useQuery(["profile", userId], fetchProfile);
};

export default useProfile;
