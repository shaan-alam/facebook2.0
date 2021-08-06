import jwt from "jsonwebtoken";

export const signToken = async (_id: string) => {
  const token = await jwt.sign({ _id }, `${process.env.JWT_SECRET}`);
  return await token;
};

export const verifyToken = async (token: string) => {
  const isTokenValid = await jwt.verify(token, `${process.env.JWT_SECRET}`);
  return await isTokenValid;
};
