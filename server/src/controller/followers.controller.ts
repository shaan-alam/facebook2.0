import { Request, Response } from "express";
import User from "../models/user.model";
import Followers from "../models/followers.model";
import logger from "../logger";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const retrieveFollowers = async (req: Request, res: Response) => {
  const userId = ObjectId(req.params.id);
  let { offset } = req.query;

  try {
    const followers = await Followers.aggregate([
      { $match: { userId: userId } },
      // Join the user's followers from the followers collection
      // {
      //   $lookup: {
      //     from: "users",
      //     let: { userId: "$followers.user" },
      //     as: "followers",
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $eq: ["$_id", "$$userId"],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
    ]);

    res.json({ followers: followers[0].followers });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err.message });
  }
};
