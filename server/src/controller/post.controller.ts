import { Request, Response } from "express";
import logger from "../logger";
import Post from "../models/post.model";
import PostLikes from "../models/PostLikes.model";
import cloudinary from "../utils/cloudinary.util";

export const createPost = async (req: Request, res: Response) => {
  const { imageURL, caption } = req.body;
  let image;

  try {
    if (imageURL) {
      image = await cloudinary.v2.uploader.upload(imageURL, {
        folder: `${process.env.CLOUDINARY_POST_UPLOAD_FOLDER}`,
      });
    }

    // Create a new Post document
    const newPost = await new Post({
      imageURL: image?.secure_url ? image?.secure_url : "",
      caption,
      author: res.locals.userId,
    });
    await newPost.save();

    // Create a newPostLikes Document
    const newPostLikes = await new PostLikes({
      postId: newPost._id,
      likes: [],
    });

    await newPostLikes.save();

    res.json({ post: newPost, newPostLikes });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    // Fetch all the posts along with their author and likes
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "postlikes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $project: {
          _id: 1,
          imageURL: 1,
          caption: 1,
          "author._id": 1,
          "author.name": 1,
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (err) {
    logger.rror(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req: Request, res: Response) => {
  const { _id } = res.locals.post;
  const { caption } = req.body;

  try {
    // If the post has empty image URL, that means it is of status type
    // Do not update a existing status's caption into an empty caption
    if (res.locals.post.imageURL === "" && (caption === "" || !caption)) {
      throw new Error("Cannot update to empty status!");
      return;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { _id, caption },
      {
        new: true,
      }
    );

    res.json({ post: updatedPost });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
