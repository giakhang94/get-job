import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
  return token;
};
//verify token
export const verifyJWT = (token) => {
  const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
  //because we add userId and role in the jwt.sign
  return { userId, role };
};
