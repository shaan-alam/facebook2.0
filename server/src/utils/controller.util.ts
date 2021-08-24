import Comment from "../models/comment.model";
import CommentReply from "../models/commentReply.model";

const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @description To return comments for a post. It will return [offset] number of comments each time
 * @param postId Post ID for which comments are to be fetched
 * @param offset A limited number of comments to be returned
 * @returns Array of Comments of a post
 */
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
        $lookup: {
          from: "commentreplies",
          let: { commentId: "$_id" },
          as: "commentReplies",
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$commentId", "$$commentId"],
                },
              },
            },
            {
              $group: { _id: null, count: { $sum: 1 } },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$commentReplies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          commentReplies: "$commentReplies.count",
        },
      },
      {
        $project: {
          _id: 1,
          message: 1,
          "author._id": 1,
          "author.avatar": 1,
          "author.fullName": 1,
          date: 1,
          commentReplies: 1,
        },
      },
    ]);

    return comments;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @description To return comment replies for a comment. 
    It will return [offset] number of comment replies each time
 * @param commentId Comment ID for which replies are to be fetched
 * @param offset A limited number of replies to be returned
 * @returns Array of Comment replies of a comment
 */
export const fetchCommentReplies = async (
  commentId: string,
  offset: string
) => {
  try {
    const commentReplies = await CommentReply.aggregate([
      { $match: { commentId: ObjectId(commentId) } },
      { $sort: { date: 1 } },
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

    return commentReplies;
  } catch (err) {
    throw new Error(err);
  }
};
