import React, { useState, useRef } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import Modal from "../index";
import Button from "../../Button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useMutation, useQueryClient } from "react-query";
import { changeUserProfilePicture } from "../../../api";
import useUser from "../../../hooks/useUser";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../../constants";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfilePictureModal = ({ isOpen, setOpen }: Props) => {
  const user = useUser();
  const queryClient = useQueryClient();
  const [formStep, setFormStep] = useState(0);
  const dispatch = useDispatch();
  const mutation = useMutation(
    (image: string) => changeUserProfilePicture(image),
    {
      onSuccess: (result) => {
        queryClient.refetchQueries(["profile", user?._id]);
        queryClient.refetchQueries(["posts"]);
        queryClient.refetchQueries(["profile-posts", user._id]);
        queryClient.invalidateQueries(["profile", user?._id]);

        const profile = JSON.parse(localStorage.getItem("profile") || "{}");
        profile.user = result.data.updatedUser;

        localStorage.setItem("profile", JSON.stringify(profile));

        dispatch({
          type: SET_USER,
          payload: { user: result.data.updatedUser },
        });
        setOpen(false);
      },
    }
  );

  const cropperRef = useRef<HTMLImageElement>(null);

  const {
    dragOver,
    setDragOver,
    fileDropError,
    setFileDropError,
    onDragOver,
    onDragLeave,
  } = useDragAndDrop();
  const [image, setImage] = useState<string>();

  const fileSelect = (e: any) => {
    e.preventDefault();

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (files[0].type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setFileDropError("");

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImage(reader.result as string);
    };

    setFormStep((formStep) => formStep + 1);
  };

  const uploadProfilePicture = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    mutation.mutate(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen} modalTitle="Edit Profile picture">
      <div className="p-12">
        {fileDropError && (
          <span className="text-xs text-red-500 font-semibold text-center">
            {fileDropError}
          </span>
        )}
        {formStep == 0 && (
          <>
            <label
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={(e) => {
                e.preventDefault();
                e.isPropagationStopped();

                setDragOver(false);
                fileSelect(e);
              }}
              htmlFor="file"
              className={`h-48 my-7 w-full border-dashed border-4 rounded-md flex justify-center items-center cursor-pointer hover:border-gray-500 text-gray-400 hover:text-gray-500 ${
                dragOver ? "border-fb" : "border-gray-300"
              }`}
            >
              {dragOver ? (
                <p className="text-xl font-semibold text-fb">Drop here...</p>
              ) : (
                <>
                  <PhotographIcon className="h-10 w-10" />
                  &nbsp;
                  <p className="font-semibold">Drag & Drop or select a file.</p>
                </>
              )}
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              name="file"
              accept="image/*"
              onChange={fileSelect}
            />
          </>
        )}
        {formStep == 1 && image && (
          <div>
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1 / 1}
              guides={false}
              viewMode={2}
              ref={cropperRef}
              aspectRatio={1 / 1}
            />
            <div className="flex mt-4">
              <Button
                text="Back"
                variant="secondary"
                className="p-2 w-full"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Next"
                variant="primary"
                className="p-2 ml-2 "
                disabled={mutation.isLoading}
                isLoading={mutation.isLoading}
                onClick={uploadProfilePicture}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditProfilePictureModal;
