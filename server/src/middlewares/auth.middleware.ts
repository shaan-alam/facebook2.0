import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import User, { UserDocument } from "../models/user.model";

export interface MiddlewareRequest extends Request {
  user: UserDocument | null;
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    res.locals.user = user;
    return next();
  } catch (err) {
    logger.error("No user with that email");
    return res.status(404).json({ message: "No user with that email!" });
  }
};
