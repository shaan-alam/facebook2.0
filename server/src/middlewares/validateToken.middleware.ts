import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { verifyToken } from "../service/jwt.service";

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload;

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      payload = await verifyToken(token);
      res.locals.userId = payload;
      return next();
    }

    throw new Error("Unauthorised!");
  } catch (err) {
    logger.error(err.message);
    return res.status(400).json({ message: err.message });
  }
};

export default validateRequest;
