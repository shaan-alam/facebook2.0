import jwt from 'jsonwebtoken'

export const signToken = (_id: string): string => {
  const token = jwt.sign({ _id }, `${process.env.JWT_SECRET}`)

  return token;
}

export const verifyToken = (token: string) => {
  const isValid = jwt.verify(token, `${process.env.JWT_SECRET}`);

  return isValid;
}
