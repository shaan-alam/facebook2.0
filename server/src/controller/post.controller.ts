import { Request, Response } from "express";
import logger from "../logger";
import Post from "../models/post.model";
import Reactions, { Reaction } from "../models/reactions.model";
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
    const newPostLikes = await new Reactions({
      postId: newPost._id,
      reactions: [],
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
          thumbnail: 1,
          caption: 1,
          createAt: 1,
          "author.fullName": 1,
          "author.avatar": 1,
          "likes.likes": 1,
        },
      },
    ]);

    const result = await Reactions.populate(posts, {
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
export const reactPost = async (req: Request, res: Response) => {
  const { reaction: userReaction } = req.body;

  const { _id: postId } = res.locals.post;

  try {
    let updatedReactions: any = {};

    const reactions = await Reactions.findOne({ postId });
    const existingReactions = reactions?.reactions?.filter(
      (result) => result.by == userReaction.by
    )[0];

    if (existingReactions) {
      // If a reaction already exists for the user,
      // Then check if the reaction emoji is same
      if (existingReactions.emoji === userReaction.emoji) {
        // If the previous reaction emoji is same as new one,
        // then remove the reaction
        updatedReactions = await Reactions.findOneAndUpdate(
          { postId },
          { $pull: { reactions: { _id: existingReactions?._id } } },
          { new: true }
        );
      } else {
        // If the previous reaction emoji and new reaction emoji are different
        // then update the reaction emoji to the new one
        existingReactions.emoji = userReaction.emoji;

        updatedReactions = await Reactions.findOneAndUpdate(
          { postId },
          {
            reactions: (reactions?.reactions as Array<Reaction>).map((reaction) =>
              reaction._id === existingReactions._id
                ? existingReactions
                : reaction
            ),
          },
          { new: true }
        );
      }
    } else {
      // If there are no reaction for the user, then push one to the reactions array
      updatedReactions = await Reactions.findOneAndUpdate(
        { postId },
        { $push: { reactions: userReaction } },
        { new: true }
      );
    }

    return res.json(updatedReactions);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ message: err.message });
  }
};
