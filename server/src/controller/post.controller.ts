import { Request, Response } from "express";
import logger from "../logger";
import Post from "../models/post.model";
import PostLikes from "../models/PostLikes.model";
import cloudinary, { formatCloudinaryUrl } from "../utils/cloudinary.util";

/**
 * @description Creates a new Post
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const createPost = async (req: Request, res: Response) => {
  const { image, caption } = req.body;
  let uploadedImage;

  try {
    if (image) {
      uploadedImage = await cloudinary.v2.uploader.upload(image, {
        folder: `${process.env.CLOUDINARY_POST_UPLOAD_FOLDER}`,
      });
    }

    const thumbnail_url = formatCloudinaryUrl(
      uploadedImage?.secure_url as string,
      { width: 400, height: 400 },
      true
    );

    // Create a new Post document
    const newPost = await new Post({
      imageURL: uploadedImage?.secure_url ? uploadedImage?.secure_url : "",
      caption,
      author: res.locals.userId,
      thumbnailURL: thumbnail_url,
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
    logger.error(err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * @description Get all the posts
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    // Fetch all the posts along with their author and likes
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
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
      { $unwind: "$likes" },
      {
        $project: {
          _id: 1,
          imageURL: 1,
          caption: 1,
          createAt: 1,
          "author.fullName": 1,
          "author.avatar": 1,
          "likes.likes": 1,
        },
      },
    ]);

    const result = await PostLikes.populate(posts, {
      path: "likes.likes",
      select: "fullName _id",
    });

    res.json(result);
    // const postsWithLikes = await PostLikes.findOne({ post})
  } catch (err) {
    logger.error(err);
    res.status(404).json({ message: err.message });
  }
};

/**
 * @description Edits a Post
 * @param req Express Request Object
 * @param res Express Response Object
 */
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

/**
 * @description Deletes a Post
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const deletePost = async (req: Request, res: Response) => {
  const { _id } = res.locals.post;

  try {
    await Post.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully!!" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description Likes a post
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const likePost = async (req: Request, res: Response) => {
  const { userID } = req.body;

  const { _id: postId } = res.locals.post;

  try {
    const postLikes = await PostLikes.findOne({ postId });
    let updatedPostLikes: any = {};

    if ((postLikes as any).likes.indexOf(userID) >= 0) {
      updatedPostLikes = await PostLikes.findOneAndUpdate(
        { postId },
        {
          $pull: { likes: userID },
        },
        { new: true }
      );
    } else {
      updatedPostLikes = await PostLikes.findOneAndUpdate(
        { postId },
        {
          $push: { likes: userID },
        },
        { new: true }
      );
    }

    res.json({ updatedPostLikes });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ message: err.message });
  }
};
