import { Request, Response } from "express";
import logger from "../logger";
import Post from "../models/post.model";
import cloudinary from "../utils/cloudinary.util";

export const createPost = async (req: Request, res: Response) => {
  const { imageURL, caption } = req.body;

  try {
    const image = await cloudinary.v2.uploader.upload(imageURL, {
      upload_preset: "facebook2.0/posts",
    });
    console.log(image);

    const newPost = await new Post({
      imageURL,
      caption,
      author: res.locals.userId,
    });
    await newPost.save();

    res.json({ post: newPost });
  } catch (err) {
    logger.error(err.message);
    res.json({ err: err.message });
  }
};
