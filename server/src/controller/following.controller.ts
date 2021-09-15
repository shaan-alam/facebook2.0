import { Request, Response } from "express";
import Following from "../models/following.model";
import logger from "../logger";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const retrieveFollowing = async (req: Request, res: Response) => {
  const userId = ObjectId(req.params.id);
  let { offset } = req.query;

  try {
    const following = await Following.aggregate([
      { $match: { userId: userId } },
      // Join the user's followers from the followers collection
      {
        $lookup: {
          from: "users",
          as: "following",
          let: { userId: "$following.user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$userId"],
                },
              },
            },
            { $limit: +(offset as string) },
          ],
        },
      },
      {
        $project: {
          "following._id": 1,
          "following.fullName": 1,
          "following.avatar": 1,
          "following.details.bio": 1,
        },
      },
    ]);

    // Retrive total number of followings from the database;
    const followingCount = await Following.aggregate([
      { $match: { userId: userId } },
      // Join the user's followers from the followers collection
      {
        $lookup: {
          from: "users",
          as: "following",
          let: { userId: "$following.user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$userId"],
                },
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$following",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          following: "$following.count",
        },
      },
      {
        $project: {
          following: 1,
        },
      },
    ]);

    res.json({
      following: following[0].following,
      followingCount: followingCount[0].following,
    });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err.message });
  }
};
