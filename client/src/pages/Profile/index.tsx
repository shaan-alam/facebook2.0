import { useState } from "react";
import PhotosCard from "../../components/PhotosCard";
import IntroCard from "../../components/IntroCard";
import NewPost from "../../components/NewPost";
import Posts from "../../components/Posts";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useProfile, useProfilePost } from "../../hooks/profile";
import { useUser } from "../../hooks/user";
import FollowButton from "../../components/Button/FollowButton";
import { FaPen } from "react-icons/fa";
import "./index.css";
import "../../components/Modal/EditProfilePictureModal";
import EditProfilePictureModal from "../../components/Modal/EditProfilePictureModal";
import EditCoverModal from "../../components/Modal/EditCoverModal";
import { AnimatePresence } from "framer-motion";

const Profile = () => {
  const user = useUser();
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const [coverPictureModal, setCoverPictureModal] = useState(false);
  const { id }: { id: string } = useParams();
  const profile = useProfile(id);
  const { posts, photos } = useProfilePost(id);

  return (
    <>
      <div className="flex flex-col items-center h-1/2 shadow-md">
        <div className="header relative mx-auto w-full lg:w-3/4 h-96 justify-center items-end">
          <div className="cover-pic-container relative h-96">
            <img
              src={profile.data?.cover_picture}
              alt="Cover"
              className="w-full h-96 object-cover rounded-b-md"
            />
            {user._id === id && (
              <span
                className="cover-pic-edit-btn absolute top-4 right-4 p-4 rounded-full bg-white cursor-pointer shadow-lg"
                onClick={() => setCoverPictureModal(true)}
              >
                <FaPen />
              </span>
            )}
          </div>
          {profile.isLoading ? (
            <Skeleton
              circle
              width={200}
              height={200}
              className="absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
            />
          ) : (
            <div className="profile-pic-container w-36 h-36 border-4 border-white rounded-full absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2">
              <img
                src={profile.data?.avatar}
                alt="Profile Picture"
                className="rounded-full"
              />
              <span
                className="profile-pic-edit-btn absolute bottom-4 -right-3 p-4 rounded-full bg-white cursor-pointer shadow-lg"
                onClick={() => setProfilePictureModal(true)}
              >
                <FaPen />
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl mt-4 justify-between">
            {profile.isLoading ? (
              <Skeleton count={1} height={30} width={100} />
            ) : (
              profile.data?.fullName
            )}
          </h1>
          {user._id !== id && <FollowButton userId={id} />}
          {user._id === id && !user.details.bio && (
            <a href="#!" className="text-fb font-bold mt-4 inline-block">
              Add Bio
            </a>
          )}
          {!profile.isLoading && (
            <p className="text-gray-600 mt-6 font-bold">
              {profile?.data?.details.bio}
            </p>
          )}
        </div>
        <div
          className="bg-gray-200 w-full mt-4"
          style={{ height: "2px" }}
        ></div>
        <div className="nav-menu w-full container">
          <ul className="flex">
            <li className="text-fb font-semibold text-lg mr-6 border-b-4 p-4 border-fb">
              Posts
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              About
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Friends
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Photos
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 pt-5">
        <div className="flex justify-around container">
          <div className="sidebar hidden md:flex flex-col w-1/3 mr-4 static top-4">
            <IntroCard
              details={profile.data?.details}
              createdAt={profile.data?.createdAt}
              followers={profile.data?.followers?.length}
              following={profile.data?.following?.length}
            />
            {photos && <PhotosCard photos={photos} />}
          </div>
          <main className="main w-full md:w-3/4 mr-4">
            {user._id === id && <NewPost />}
            {posts?.data?.length === 0 && (
              <div className="w-full text-center bg-white p-6 font-semibold rounded-lg shadow-md">
                <p>You haven't posted anything till now!!</p>
              </div>
            )}
            <Posts posts={posts} />
          </main>
        </div>
      </div>
      <AnimatePresence>
        {profilePictureModal && (
          <EditProfilePictureModal
            isOpen={profilePictureModal}
            setOpen={setProfilePictureModal}
          />
        )}
        {coverPictureModal && (
          <EditCoverModal
            isOpen={coverPictureModal}
            setOpen={setCoverPictureModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
