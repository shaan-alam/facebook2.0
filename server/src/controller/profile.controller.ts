import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import Followers from "../models/followers.model";
import Following from "../models/following.model";
import logger from "../logger";
import Post from "../models/post.model";

/**
 * @description To get the User's profile
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      // Join the user's followers from the followers collection
      {
        $lookup: {
          from: "followers",
          as: "followers",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$userId", "$$userId"],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "followers",
                foreignField: "_id",
                as: "followers",
              },
            },
          ],
        },
      },
      // Join the user's followings from the followings collection
      {
        $lookup: {
          from: "followings",
          as: "following",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$userId", "$$userId"],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "following",
              },
            },
          ],
        },
      },
      {
        $addFields: {
          followers: "$followers.followers",
          following: "$following.following",
        },
      },
      { $unwind: "$followers" },
      { $unwind: "$following" },
      {
        $project: {
          _id: 1,
          details: 1,
          avatar: 1,
          cover_picture: 1,
          fullName: 1,
          email: 1,
          createdAt: 1,
          "followers._id": 1,
          "followers.fullName": 1,
          "followers.avatar": 1,
          "following._id": 1,
          "following.fullName": 1,
          "following.avatar": 1,
        },
      },
    ]);

    res.json(user[0]);
  } catch (err) {
    logger.error("Something went wrong!");
    res.status(404).json({ message: err });
  }
};

/**
 * @description To get a specific user's post
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const getUserPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const posts = await Post.aggregate([
      { $match: { author: mongoose.Types.ObjectId(id) } },
      // Join user (*author of the post) from the users collection
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      // Join the reactions of the post from the reactions collection
      {
        $lookup: {
          from: "reactions",
          as: "reactions",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$postId", "$$postId"],
                },
              },
            },
          ],
        },
      },
      { $unwind: "$reactions" },
      // Join the latest comment for this post from the comments collection
      // This is just to show a comment in the UI
      // Later we will fetch the comments (10 each time) in the comment.controller.ts
      {
        $lookup: {
          from: "comments",
          as: "comments",
          let: { post_id: "$_id" },
          pipeline: [
            // Get the latest comment
            { $sort: { date: -1 } },
            {
              $match: {
                $expr: { $eq: ["$postId", "$$post_id"] },
              },
            },
            {
              $limit: 3,
            },
            // Join the author of the comment from the users model
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
              },
            },
            {
              $unwind: "$author",
            },
            {
              $project: {
                _id: 1,
                message: 1,
                date: 1,
                "author.avatar": 1,
                "author.fullName": 1,
                "author._id": 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { post_id: "$_id" },
          as: "commentCount",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$post_id"] },
              },
            },
            {
              $sort: { date: -1 },
            },
            {
              $group: { _id: null, count: { $sum: 1 } },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$commentCount",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          commentCount: "$commentCount.count",
        },
      },
      {
        $project: {
          _id: 1,
          imageURL: 1,
          thumbnailURL: 1,
          caption: 1,
          createdAt: 1,
          comments: 1,
          filter: 1,
          "author._id": 1,
          "author.fullName": 1,
          "author.avatar": 1,
          "reactions.reactions": 1,
          commentCount: 1,
        },
      },
    ]);

    res.json(posts);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description To follow a user
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const followProfile = async (req: Request, res: Response) => {
  const { id } = req.params; // Id of the user to be followed
  const currentUser = res.locals.userId;

  const currentUserFollowings = await Following.findOne({
    userId: currentUser._id,
  });

  try {
    if (currentUserFollowings?.following.includes(id as any)) {
      throw new Error("Already following this user!");
    }

    if (currentUser._id === id) {
      throw new Error("A user cannot follow himself!");
    }

    // Retrieve current user's followings
    await Following.findOneAndUpdate(
      { userId: currentUser._id },
      {
        $push: {
          following: id,
        },
      },
      { new: true }
    );

    // Retrieve the followers list of the user who is being followed here
    await Followers.findOneAndUpdate(
      {
        userId: id as any,
      },
      {
        $push: {
          followers: currentUser._id,
        },
      },
      { new: true }
    );

    res.json({ message: "Followed!" });
  } catch (err) {
    logger.error("Something went wrong!");
    res.status(400).json({ message: err.message });
  }
};

/**
 * @description To unfollow a user
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const unfollowProfile = async (req: Request, res: Response) => {
  const { id } = req.params; // Id of the user to be followed
  const currentUser = res.locals.userId;

  const userFollowers = await Followers.findOne({
    userId: currentUser._id,
  });

  try {
    if (!userFollowers?.followers.includes(id as any)) {
      throw new Error("Cannot unfollow the user as it is already unfollowed!");
    }

    if (currentUser._id === id) {
      throw new Error("A user cannot unfollow himself!");
    }

    // Retrieve current user's followings
    await Following.findOneAndUpdate(
      { userId: currentUser._id },
      {
        $pull: {
          following: id,
        },
      },
      { new: true }
    );

    // Retrieve the followers list of the user who is being followed here
    await Followers.findOneAndUpdate(
      {
        userId: id as any,
      },
      {
        $pull: {
          followers: currentUser._id,
        },
      },
      { new: true }
    );

    res.json({ message: "Unfollowed!" });
  } catch (err) {
    logger.error("Something went wrong!");
    res.status(400).json({ message: err.message });
  }
};
