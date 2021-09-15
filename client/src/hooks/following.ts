import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { retrieveFollowing } from "../api/following";

type Response = AxiosResponse<{
  following: {
    _id: string;
    fullName: string;
    avatar: string;
    details: {
      bio: string;
    };
  }[];
}>;

export const useRetrieveFollowing = (userId: string) => {
  const [offset, setOffset] = useState(20);

  const fetchFollowing = async () => {
    try {
      const result: Response = await retrieveFollowing(userId, offset);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery(["retrieveFollowing", userId], fetchFollowing, {
    onSuccess: () => {
      setOffset((offset) => offset + 20);
    },
  });
};
