import { useMutation, useQueryClient } from "react-query";
import { unfollowUser } from "../api";
import useUser from "./useUser";

const useUnfollowUser = (userId: string) => {
  const user = useUser();
  const queryClient = useQueryClient();

  return useMutation(() => unfollowUser(userId), {
    onSuccess: () => {
      queryClient.refetchQueries(["profile", userId]);
      queryClient.refetchQueries(["profile", user._id]);
    },
  });
};

export default useUnfollowUser;
