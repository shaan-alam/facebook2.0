import { useState } from "react";
import Button from "../index";
import { useProfile } from "../../../hooks/profile";
import { useUser, useFollowUser, useUnfollowUser } from "../../../hooks/user";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const FollowButtonComponent = ({ userId }: { userId: string }) => {
  const user = useUser();

  const [isFollowingUser, setFollowingUser] = useState(false);
  const { data: currentUser } = useProfile(user._id);
  const { data: profileUser, isLoading } = useProfile(userId);

  const followMutation = useFollowUser(userId, () => setFollowingUser(true));

  const unfollowMutation = useUnfollowUser(userId, () =>
    setFollowingUser(false)
  );

  useEffect(() => {
    if (currentUser?.following?.find((user) => user._id === userId)) {
      setFollowingUser(true);
    }
  }, []);

  const generateFollowButtonText = () => {
    if (
      !isFollowingUser &&
      profileUser?.following?.find((usr) => usr._id === currentUser?._id)
    ) {
      return "Follow Back";
    } else if (isFollowingUser) {
      return "Unfollow";
    } else if (!isFollowingUser) {
      return "Follow";
    }
  };

  const onClick = () => {
    if (isFollowingUser) {
      unfollowMutation.mutateAsync();
    } else {
      followMutation.mutateAsync();
    }
  };

  return !isLoading ? (
    <Button
      variant={isFollowingUser ? "secondary" : "primary"}
      className="p-2 my-3"
      isLoading={followMutation.isLoading || unfollowMutation.isLoading}
      onClick={onClick}
    >
      {generateFollowButtonText()}
    </Button>
  ) : (
    <Skeleton count={1} height={40} width={200} className="mt-4" />
  );
};

export default FollowButtonComponent;
