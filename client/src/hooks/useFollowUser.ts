import { useMutation, useQueryClient } from "react-query";
import { followUser } from "../api";
import useUser from "./useUser";

const useFollowUser = (userId: string) => {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation(() => followUser(userId), {
    onSuccess: () => {
      queryClient.refetchQueries(["profile", userId]);
      queryClient.refetchQueries(["profile", user._id]);
    },
  });
};

export default useFollowUser;
