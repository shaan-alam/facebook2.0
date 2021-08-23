import { Request, Response } from "express";
import CommentReply from "../models/commentReply.model";
import logger from "../logger";
import Comment from "../models/comment.model";
import { fetchCommentReplies } from "../utils/controller.util";

/**
 * @function createCommentReply
 * @description Used for creating comment replies
 * @param req Express Request object
 * @param res Express Response object
 */
export const createCommentReply = async (req: Request, res: Response) => {
  const {
    commentReply: { message, commentId, author },
  } = req.body;

  try {
    const newCommentReply = await new CommentReply({
      message,
      commentId,
      author,
    });

    await newCommentReply.save();

    res.json(newCommentReply);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Something went wrong on our side!" });
  }
};

export const retrieveCommentReplies = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { offset } = req.query;

  try {
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ message: "No comment found with that ID" });
    }

    const result = await fetchCommentReplies(commentId, offset as string)

    res.json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err });
  }
};
