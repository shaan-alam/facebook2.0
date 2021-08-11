import { useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import UploadStatusModal from "../UploadStatusModal";
import User from "../../assets/svg/user.svg";
import useUser from "../../hooks/useUser";
import UploadPictureModal from "../UploadPictureModal";

const NewPost = () => {
  const [isStatusModalOpen, setStatusModal] = useState<boolean>(false);
  const [isPictureModalOpen, setPictureModal] = useState<boolean>(false);

  const user = useUser();

  return (
    <>
      <div className="bg-white shadow-sm p-4 my-3 rounded-lg w-full mx-auto">
        <div className="flex bg-white items-center">
          <img
            src={user?.avatar ? user?.avatar : User}
            alt={user?.fullName}
            className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
          />
          <p className="text-fb font-semibold">{user.fullName}</p>
        </div>
        <div className="flex items-center">
          <div
            className="mr-4 w-full h-10 bg-gray-200 my-4 rounded-full py-2 px-4 cursor-pointer hover:shadow-md transition"
            onClick={() => setStatusModal(true)}
          >
            <h1 className="font-semibold text-gray-400">
              What's on your mind, {user?.fullName}
            </h1>
          </div>
          <div className="add-photo" onClick={() => setPictureModal(true)}>
            <PhotographIcon className="p-3 h-14 w-14 text-fb rounded-full hover:bg-blue-100 cursor-pointer" />
          </div>
        </div>
      </div>
      {isStatusModalOpen && (
        <UploadStatusModal
          isOpen={isStatusModalOpen}
          setOpen={setStatusModal}
        />
      )}
      {isPictureModalOpen && (
        <UploadPictureModal
          isOpen={isPictureModalOpen}
          setOpen={setPictureModal}
        />
      )}
    </>
  );
};

export default NewPost;
