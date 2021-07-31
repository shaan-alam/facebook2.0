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

export const signIn = async (req: Request, res: Response) => {
  if (!res.locals.user) {
    return res.status(404).json({ message: "No user with that email!" });
  }

  const { password } = req.body;
  const user = res.locals.user;

  try {
    // Verify the password
    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(400).json({ err: "Invalid Password " });
    }

    const token = signToken(user._id);

    res.json({ user: omit(user.toJSON(), "password"), token });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err.message });
  }
};
