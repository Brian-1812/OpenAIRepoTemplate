import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ITokenStructured } from "common-types";

const secret = process.env.JWT_SECRET ?? "aksjf1390dv";

export const issueToken = (payload: ITokenStructured) =>
  jwt.sign(payload, secret);
export const verifyToken = (token: string): ITokenStructured =>
  jwt.verify(token, secret) as ITokenStructured;

export const decryptPassword = (pw: string) => {
  return bcrypt.hashSync(pw, 8);
};

export const comparePassword = (pw: string, hash: string) =>
  bcrypt.compareSync(pw, hash);
