import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import * as api from "../api";

type Response = AxiosResponse<{
  followers: {
    _id: string;
    fullName: string;
    avatar: string;
    details: {
      bio: string
    }
  }[];
}>;

export const useRetrieveFollowers = (userId: string) => {
  const retrieveFollowers = async () => {
    try {
      const result: Response = await api.retrieveFollowers(userId);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery("retrieveFollowers", retrieveFollowers);
};
