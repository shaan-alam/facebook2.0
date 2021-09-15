import { Request, Response } from "express";
import Followers from "../models/followers.model";
import logger from "../logger";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const retrieveFollowers = async (req: Request, res: Response) => {
  const userId = ObjectId(req.params.id);
  let { offset } = req.query;

  try {
    // Retrieve the followers of the user from the database
    const followers = await Followers.aggregate([
      { $match: { userId: userId } },
      // Join the user's followers from the followers collection
      {
        $lookup: {
          from: "users",
          as: "followers",
          let: { userId: "$followers.user" },
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
          "followers._id": 1,
          "followers.fullName": 1,
          "followers.avatar": 1,
          "followers.details.bio": 1,
        },
      },
    ]);

    // Retrive total number of followers from the database;
    const followerCount = await Followers.aggregate([
      { $match: { userId: userId } },
      // Join the user's followers from the followers collection
      {
        $lookup: {
          from: "users",
          as: "followers",
          let: { userId: "$followers.user" },
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
          path: "$followers",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          followers: "$followers.count",
        },
      },
      {
        $project: {
          followers: 1,
        },
      },
    ]);

    res.json({
      followers: followers[0].followers,
      followerCount: followerCount[0].followers,
    });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err.message });
  }
};
