import { useState } from "react";
import Button from "../index";
import { useProfile } from "../../../hooks/profile";
import { useUser, useFollowUser, useUnfollowUser } from "../../../hooks/user";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { UseQueryResult } from "react-query";

type Profile = UseQueryResult<
  | {
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
      followers: Array<{
        _id: string;
        fullName: string;
        avatar: string;
      }>;
      following: Array<{
        _id: string;
        fullName: string;
        avatar: string;
      }>;
    }
  | undefined,
  unknown
>;

const FollowButtonComponent = ({
  currentUser,
  profileUser,
}: {
  currentUser: Profile;
  profileUser: Profile;
}) => {
  const user = useUser();

  const [isFollowingUser, setFollowingUser] = useState(
    currentUser?.data?.following?.find(
      (user) => user._id === profileUser?.data?._id
    )
      ? true
      : false
  );

  useEffect(() => {
    setFollowingUser(
      currentUser?.data?.following?.find(
        (user) => user._id === profileUser?.data?._id
      )
        ? true
        : false
    );
  }, [profileUser]);
  const followMutation = useFollowUser(profileUser?.data?._id as string, () =>
    setFollowingUser(true)
  );

  const unfollowMutation = useUnfollowUser(
    profileUser?.data?._id as string,
    () => setFollowingUser(false)
  );

  const generateFollowButtonText = () => {
    if (
      !isFollowingUser &&
      profileUser?.data?.following?.find(
        (usr) => usr._id === currentUser?.data?._id
      )
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
      unfollowMutation.mutate();
      setFollowingUser(false);
    } else {
      followMutation.mutate();
      setFollowingUser(true);
    }
  };

  return !profileUser.isLoading ? (
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
