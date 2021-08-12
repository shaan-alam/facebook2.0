import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.v2.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

export const formatCloudinaryUrl = (
  url: string,
  size: { width: number; height: number },
  thumb: boolean
) => {
  if (!url) return "";

  const splitUrl = url.split("upload/");
  splitUrl[0] += `upload/w_${size.width},h_${size.height}${
    thumb && ",c_thumb"
  }/`;
  const formattedUrl = splitUrl[0] + splitUrl[1];

  return formattedUrl;
};

export default cloudinary;
