import Comment from "../models/comment.model";
import CommentReply from "../models/commentReply.model";
import Post from "../models/post.model";
import mongoose from "mongoose";

/**
 * @description A function which will return all the posts of the user's id, else all
 * the posts if no user id is given..
 * @param userId The Id of the user for which post is to be fetched
 * @returns An array of posts
 */
export const fetchPosts = async (userId?: string) => {
  const aggregation: Array<any> = [
    // Sort posts in descending order of their creation time.
    { $sort: { createdAt: -1 } },
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
  ];

  if (userId !== undefined) {
    aggregation.unshift({
      $match: {
        author: mongoose.Types.ObjectId(userId),
      },
    });
  }

  const posts = await Post.aggregate(aggregation);
  return posts;
};

/**
 * @description To return comments for a post. It will return [offset] number of comments each time
 * @param postId Post ID for which comments are to be fetched
 * @param offset A limited number of comments to be returned
 * @returns Array of Comments of a post
 */
export const fetchComments = async (postId: string, offset: string) => {
  try {
    const comments = await Comment.aggregate([
      { $match: { postId: mongoose.Types.ObjectId(postId) } },
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
          as: "commentRepliesCount",
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
          path: "$commentRepliesCount",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          commentRepliesCount: "$commentRepliesCount.count",
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
          commentRepliesCount: 1,
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
      { $match: { commentId: mongoose.Types.ObjectId(commentId) } },
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
