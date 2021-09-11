import { Request, Response } from "express";
import Followers from "../models/followers.model";
import logger from "../logger";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const retrieveFollowers = async (req: Request, res: Response) => {
  const userId = ObjectId(req.params.id);

  try {
    const followers = await Followers.aggregate([
      {
        $match: {
          userId,
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
      {
        $project: {
          "followers._id": 1,
          "followers.fullName": 1,
          "followers.avatar": 1,
          "followers.details.bio": 1,
        },
      },
    ]);

    res.json({ followers: followers[0].followers });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err.message });
  }
};
