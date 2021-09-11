import { useParams } from "react-router";
import Button from "../../../components/Button";
import FollowButton from "../../../components/Button/FollowButton";
import { useRetrieveFollowers } from "../../../hooks/followers";

const Follower = ({
  follower,
}: {
  follower: {
    _id: string;
    fullName: string;
    avatar: string;
    details: { bio: string };
  };
}) => {
  return (
    <div className="follower-container sm:flex items-center my-10">
      <div className="follower flex w-full sm:items-center sm:w-3/4">
        <div className="avatar h-16 w-16 sm:h-24 sm:w-24 mr-4">
          <img src={follower.avatar} alt="Avatar" className="rounded-full" />
        </div>
        <div className="follower-details w-full">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {follower.fullName}
          </h2>
          <p className="text-gray-600">{follower.details.bio}</p>
        </div>
      </div>
      <div className="follow-btn">
        <FollowButton userId={follower._id} />
      </div>
    </div>
  );
};

const FollowersPage = () => {
  const { id }: { id: string } = useParams();

  const followers = useRetrieveFollowers(id);

  return (
    <div className="bg-gray-100 p-4">
      <div className="container bg-white rounded-md shadow-md p-10">
        <h1 className="text-3xl font-bold">Your Followers</h1>
        <div className="sm:grid grid-cols-2">
          {followers.data?.followers.map((follower) => (
            <Follower follower={follower} />
          ))}
        </div>
        <div className="more-btn">
          <Button text="Load More" variant="default" className="p-2" />
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;
