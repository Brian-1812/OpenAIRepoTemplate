import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/auth";
import { IRequest } from "../types";
import { ITokenStructured } from "common-types";

// route middleware to verify a token
export const authPolicy = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let tokenToVerify;

  if (req.header("Authorization")) {
    const parts = req.header("Authorization")?.split(" ");

    if (parts?.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "Format for Authorization: Bearer [token]" });
    }
  } else if (req.body.token) {
    console.log(req.body.token);
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: "No Authorization was found" });
  }
  let token: ITokenStructured;
  try {
    token = verifyToken(tokenToVerify);
  } catch (err) {
    console.log("err here");
    return res.status(401).json({ err });
  }
  req.token = token;
  return next();
};
