import React, { useState, useCallback, useRef } from "react";
import Modal from "../Modal";
import { PhotographIcon } from "@heroicons/react/solid";
import { filters } from "../../utils/filters";
import FilterCard from "../FilterCard";
import ReactCrop from "react-image-crop";

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
  const imgRef = useRef<any>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState();
  const [crop, setCrop] = useState<ReactCrop.Crop | undefined>({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
  });
  const [formStep, setFormStep] = useState<number>(0);
  const [previewFile, setPreviewFile] = useState<string | ArrayBuffer | null>();
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const onFileSelect = (e: any) => {
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewFile(reader.result);
      setFormStep((formStep) => formStep + 1);
    };
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx !== null) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
  }, [completedCrop]);
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <form>
        {!file && (
          <>
            <label
              htmlFor="file"
              className="h-20 my-7  w-full border-dashed border-4 border-gray-300 rounded-md flex justify-center items-center cursor-pointer hover:border-gray-500 text-gray-400 hover:text-gray-500"
            >
              <PhotographIcon className="h-10 w-10" />
              &nbsp;
              <p className="font-semibold">Drag & Drop or select a file.</p>
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              name="file"
              onChange={onFileSelect}
              accept="image/*"
            />
          </>
        )}
        {formStep === 1 && previewFile && (
          <div className="my-4">
            <ReactCrop
              src={previewFile as string}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c: ReactCrop.Crop) => setCrop(c)}
              onComplete={(c: ReactCrop.Crop) => setCompletedCrop(c)}
            />
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        )}

        {formStep === 2 && previewFile && (
          <div className="mt-4">
            <h4 className="font-semibold mb-4">Preview: </h4>
            <div
              style={{ height: "399px", margin: "auto" }}
              className="flex justify-center items-center"
            >
              <img
                src={previewFile as string}
                style={{ filter: selectedFilter.filter }}
              />
            </div>
            <div className="w-full filters overflow-x-auto mt-2">
              <ul className="flex w-full h-full">
                {filters.map((filter: any) => (
                  <FilterCard
                    src={previewFile}
                    filter={filter}
                    key={filter.name}
                    setSelectedFilter={setSelectedFilter}
                    selected={selectedFilter.name === filter.name}
                  />
                ))}
              </ul>
            </div>
            <div className="flex mt-4">
              <button className="p-2 bg-gray-200 rounded-lg w-full focus:ring-4 focus:ring-gray-400 font-semibold">
                Cancel
              </button>
              <button className="p-2 bg-fb rounded-lg w-full text-white ml-2 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-semibold">
                Next
              </button>
            </div>
          </div>
        )}
      </form>
      <div className="flex"></div>
    </Modal>
  );
};

export default UploadPictureModal;
