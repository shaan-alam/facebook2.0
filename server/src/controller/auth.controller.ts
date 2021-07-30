import { Request, Response } from "express";
import User from "../models/user.model";
import { signToken } from "../service/jwt.service";
import { omit } from "lodash";
import logger from "../logger";

export const signUp = async (req: Request, res: Response) => {
  if (res.locals.user) {
    return res
      .status(400)
      .json({ message: "A user already exists with that email!" });
  }

  const { fullName, email, password } = req.body;

  try {
    const newUser = await new User({ fullName, email, password });
    await newUser.save();

    const token = await signToken(newUser._id);

    res.json({ user: omit(newUser.toJSON(), "password"), token });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
