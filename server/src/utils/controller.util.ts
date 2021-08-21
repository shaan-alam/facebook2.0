import Comment from "../models/comment.model";

const ObjectId = require("mongoose").Types.ObjectId;

export const fetchComments = async (postId: string, offset: string) => {
  try {
    const comments = await Comment.aggregate([
      { $match: { postId: ObjectId(postId) } },
      { $sort: { date: -1 } },
      { $limit: +offset },
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
        $project: {
          _id: 1,
          message: 1,
          "author._id": 1,
          "author.avatar": 1,
          "author.fullName": 1,
          date: 1,
        },
      },
    ]);

    return comments;
  } catch (err) {
    throw new Error(err);
  }
};
