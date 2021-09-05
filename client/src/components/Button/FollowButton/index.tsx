import { useEffect } from "react";
import Button from "../index";
import useProfile from "../../../hooks/useProfile";
import useUser from "../../../hooks/useUser";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import useFollowUser from "../../../hooks/useFollowUser";
import useUnfollowUser from "../../../hooks/useUnfollowUser";

const FollowButtonComponent = ({ userId }: { userId: string }) => {
  const user = useUser();
  const { data: currentUser } = useProfile(user._id);

  const followMutation = useFollowUser(userId);
  const unfollowMutation = useUnfollowUser(userId);

  console.log(currentUser);
  useEffect(() => {}, []);

  const FollowButton = () => (
    <Button
      variant="primary"
      className="p-2 mt-3"
      isLoading={followMutation.isLoading}
      onClick={() => {
        followMutation.mutate();
      }}
    >
      <HiUserAdd className="h-5 w-5" />
      &nbsp; Follow
    </Button>
  );

  const UnfollowButton = () => (
    <Button
      variant="secondary"
      className="p-2 mt-3"
      isLoading={unfollowMutation.isLoading}
      onClick={() => {
        unfollowMutation.mutate();
      }}
    >
      <HiUserRemove className="h-5 w-5" />
      &nbsp; Unfollow
    </Button>
  );

  console.log(currentUser?.following.filter((usr) => usr._id === userId));
  return currentUser?.following.filter((usr) => usr._id === userId)[0] !==
    undefined ? (
    <UnfollowButton />
  ) : (
    <FollowButton />
  );
};

export default FollowButtonComponent;
