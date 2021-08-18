import { Request, Response } from "express";
import Comment from "../models/comment.model";
import logger from "../logger";
import { fetchComments } from "../utils/controller.util";

/**
 * For Commenting on a post.
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const commentOnPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const newComment = await new Comment({
      message: comment.message,
      postId: id,
      author: comment.author,
    });
    await newComment.save();

    res.json({ comment: newComment });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err });
  }
};

/**
 * For retrieving comments of a post by offset
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const retrieveComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { offset } = req.query;

  try {
    const comments = await fetchComments(id, offset as string);

    res.json(comments);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ err });
  }
};
