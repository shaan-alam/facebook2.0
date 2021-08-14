import React, { useState, useRef } from "react";
import Modal from "../Modal";
import { PhotographIcon } from "@heroicons/react/solid";
import { filters } from "../../utils/filters";
import FilterCard from "../FilterCard";
import { useFormik } from "formik";
import FormInput from "../FormInput";
import useUser from "../../hooks/useUser";
import * as api from "../../api";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import domToImage from "dom-to-image";
import Button from "../Button";
import Avatar from "../Avatar";

interface Filter {
  name: string;
  filter: string;
}
const UploadPictureModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useUser();

  const filterImageRef = useRef<any>();
  const [image, setImage] = useState<string>();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [formStep, setFormStep] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);

  const [dragOver, setDragOver] = useState<boolean>(false);
  const [fileDropError, setFileDropError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    onSubmit: async (values: any, { setSubmitting }) => {
      console.log(values);
      setSubmitting(true);

      try {
        await api.createPost({
          image: image as string,
          caption: values.caption,
        });

        setSubmitting(false);
        formik.resetForm();
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

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
      setImage(reader.result as any);
    };

    setFormStep((formStep) => formStep + 1);
  };

  const onDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      {/* To Select the image file */}
      <>
        {fileDropError && (
          <span className="text-xs text-red-500 font-semibold text-center">
            {fileDropError}
          </span>
        )}
        {formStep == 0 && (
          <>
            <label
              onDragOver={onDragOver}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                e.isPropagationStopped();

                setDragOver(false);
                fileSelect(e);
              }}
              htmlFor="file"
              className={`h-20 my-7 w-full border-dashed border-4 rounded-md flex justify-center items-center cursor-pointer hover:border-gray-500 text-gray-400 hover:text-gray-500 ${
                dragOver ? "border-gray-500" : "border-gray-300"
              }`}
            >
              {dragOver ? (
                <p className="text-xl font-semibold text-gray-500">
                  Drop here...
                </p>
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

        {/* To crop the image in 1 / 1 aspect ratio */}
        {formStep === 1 && image && (
          <div className="my-4">
            <h2 className="text-center font-semibold text-xl mb-4">
              Crop your Image
            </h2>
            <div className="my-2 w-full text-center text-gray-500 font-medium">
              Use mouse wheel to scroll in/out
            </div>
            <Cropper
              style={{ height: "400px", width: "100%" }}
              zoomTo={1}
              initialAspectRatio={1 / 1}
              preview=""
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
              aspectRatio={1200 / 630}
            />

            <div className="flex mt-4">
              <Button
                text="Back"
                variant="secondary"
                className="p-2 w-full font-semibold"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                variant="primary"
                text="Next"
                className="p-2 ml-2 font-semibold"
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  if (typeof cropper !== "undefined") {
                    setCropData(cropper.getCroppedCanvas().toDataURL());
                  }
                  setFormStep((formStep) => formStep + 1);
                }}
              />
            </div>
          </div>
        )}

        {/* To apply filter to the cropped image */}
        {formStep === 2 && cropData && (
          <div className="mt-4">
            <h4 className="font-semibold mb-4 text-center w-full">Preview: </h4>
            <div
              style={{ height: "auto", margin: "auto" }}
              className="flex justify-center items-center"
            >
              <img
                ref={filterImageRef}
                src={cropData}
                style={{ filter: selectedFilter.filter }}
                className="w-full"
              />
            </div>
            <div className="w-full filters overflow-x-auto mt-2">
              <ul className="flex mt-4 py-4">
                {filters.map((filter: any) => (
                  <FilterCard
                    src={image as string}
                    filter={filter}
                    key={filter.name}
                    setSelectedFilter={setSelectedFilter}
                    selected={selectedFilter.name === filter.name}
                  />
                ))}
              </ul>
            </div>
            <div className="flex mt-4">
              <Button
                text="Back"
                variant="secondary"
                className="p-2 bg-gray-200 rounded-lg w-full focus:ring-4 focus:ring-gray-400 font-semibold"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Next"
                variant="primary"
                className="p-2 ml-2"
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  domToImage
                    .toPng(filterImageRef.current, {
                      quality: 1,
                    })
                    .then((dataUrl: string) => {
                      setImage(dataUrl);
                      setFormStep((formStep) => formStep + 1);
                    });
                }}
              />
            </div>
          </div>
        )}
        {/* To type the caption and submit the form... */}

        {formStep === 3 && image && (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col md:flex-row md:justify-evenly p-4 items-start">
              <img
                src={image as string}
                alt="Preview File"
                className="w-full md:w-72 object-cover self-center"
              />
              <div className="md:ml-4">
                <div className="flex items-center mt-4">
                  <Avatar className="rounded-full h-7 w-7 mb-2 mr-1" />
                  <h1 className="text-fb font-semibold">{user?.fullName}</h1>
                </div>
                <FormInput
                  as="textarea"
                  cols={60}
                  rows={4}
                  name="caption"
                  id="caption"
                  placeholder="Caption.."
                  formik={formik}
                  className="resize-none p-4 border-2 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <Button
                variant="secondary"
                text="Back"
                className="p-2"
                onClick={() => setFormStep((formStep) => formStep - 1)}
              />
              <Button
                text="Post"
                isLoading={formik.isSubmitting}
                variant="primary"
                disabled={formik.isSubmitting}
                className="ml-2"
                type="submit"
              />
            </div>
          </form>
        )}
      </>
      <div className="flex"></div>
    </Modal>
  );
};

export default UploadPictureModal;
