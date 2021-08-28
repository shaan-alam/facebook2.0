import { Request, Response } from "express";
import User from "../models/user.model";
import { signToken } from "../service/jwt.service";
import { omit } from "lodash";
import logger from "../logger";

/**
 * @description Sign Up controller to create a new user and save it in the database
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const signUp = async (req: Request, res: Response) => {
  if (res.locals.user) {
    return res
      .status(400)
      .json({ message: "A user already exists with that email!" });
  }

  const { fullName, email, password } = req.body;

  try {
    const avatar = `https://avatars.dicebear.com/api/initials/${fullName}.svg`;
    const newUser = await new User({ fullName, email, password, avatar });
    await newUser.save();

    const token = await signToken(newUser._id);

    res.json({ user: omit(newUser.toJSON(), "password"), token });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description Sign In controller to login the user
 * @param req Express Request Object
 * @param res Express Response Object
 */
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

    const token = await signToken(user._id);

    res.json({ user: omit(user.toJSON(), "password"), token });
  } catch (err) {
    logger.error(err);
    res.json({ message: err.message });
  }
};

/**
 * @description To get the user from the database along with token.
 * @param req Express Request Object.
 * @param res Express Response Object
 */
export const getUserFromDB = async (req: Request, res: Response) => {
  if (res.locals.user) {
    const token = await signToken(res.locals.user._id);
    return res.json({ user: res.locals.user, token });
  } else {
    return res.json({ message: "No user found with that email" });
  }
};

/**
 * @description Google Authentication controller to signin/signup.
 * @param req Express Request Object
 * @param res Express Response Object
 */
export const googleAuthentication = async (req: Request, res: Response) => {
  const { avatar, fullName, email, password, confirmPassword } = req.body;

  if (res.locals.user) {
    return res
      .status(400)
      .json({ message: "A user already exists with that email!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "The two password do not match! " });
  }

  try {
    const newUser = await new User({ avatar, fullName, email, password });
    await newUser.save();

    const token = await signToken(newUser._id); // Sign a new JWT Token
    res.json({ user: omit(newUser.toJSON(), "password"), token });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ message: "Something went wrong!" });
  }
};
