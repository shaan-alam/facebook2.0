import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { retrieveFollowers } from "../api/followers";

type Response = AxiosResponse<{
  followers: {
    _id: string;
    fullName: string;
    avatar: string;
    details: {
      bio: string;
    };
  }[];
}>;

export const useRetrieveFollowers = (userId: string) => {
  const [offset, setOffset] = useState(20);

  const fetchFollowers = async () => {
    try {
      const result: Response = await retrieveFollowers(userId, offset);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery("retrieveFollowers", fetchFollowers, {
    onSuccess: () => {
      setOffset((offset) => offset + 20);
    },
  });
};
