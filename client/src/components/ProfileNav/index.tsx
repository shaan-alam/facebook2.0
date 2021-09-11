import { UseQueryResult } from "react-query";
import { NavLink } from "react-router-dom";

interface Props {
  profile: UseQueryResult<
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
}

const ProfileNav = ({ profile }: Props) => {
  return (
    <div className="nav-menu w-full container">
      <ul className="flex">
        <NavLink
          to={`/profile/${profile?.data?._id}/posts`}
          activeClassName="text-fb border-b-4 border-fb"
          className="font-semibold text-gray-600 text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Posts
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/about`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          About
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/followers`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Followers&nbsp;
          <span className="font-normal text-sm">
            {profile?.data?.followers?.length}
          </span>
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/followings`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Followings&nbsp;
          <span className="font-normal text-sm">
            {profile?.data?.following?.length}
          </span>
        </NavLink>
        <NavLink
          to={`/profile/${profile?.data?._id}/Photos`}
          activeClassName="text-fb border-b-4 border-fb"
          className="text-gray-600 font-semibold text-lg mr-6 p-4 cursor-pointer hover:bg-gray-200"
        >
          Photos
        </NavLink>
      </ul>
    </div>
  );
};

export default ProfileNav;
