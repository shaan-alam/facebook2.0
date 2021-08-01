import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import Post from "../models/post.model";

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.locals.post = post;
      return next();
    }

    throw new Error();
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({ message: "No post found!" });
  }
};
