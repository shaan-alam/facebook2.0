import { Request, Response } from "express";

export const getPosts = (req: Request, res: Response) => {
  try {
    res.json([]);
  } catch (err) {
    res.json(err);
  }
};
