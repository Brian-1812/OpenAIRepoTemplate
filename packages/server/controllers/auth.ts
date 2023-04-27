import { Request, Response } from "express";
import User from "../models/user";
import { issueToken } from "../services/auth";
import { verifyGoogleUser } from "../middlewares/google";
import { ITokenStructured } from "common-types";

export const loginFake = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email === "brianmaverick090@gmail.com" && password === "123") {
      let user = await User.findOne({ where: { email } });
      if (user) {
        const userToken: ITokenStructured = {
          id: user.id,
          email: user.email,
        };
        console.log("user", user);
        var jwtToken = issueToken(userToken);
        console.log("jwtToken", jwtToken);
        return res.status(200).json({ token: jwtToken });
      }
      const newUser = await User.create({
        email,
        name: "Shokh",
      });

      console.log("newUser", newUser);
      const userToken: ITokenStructured = {
        id: newUser.id,
        email: newUser.email,
      };

      var jwtToken = issueToken(userToken);
      console.log("jwtToken", jwtToken);
      return res.status(200).json({
        token: jwtToken,
        // profile: newUser.toJSON(),
      });
    }
    return res.status(401).json({ message: "Cannot authenticate an account" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal error occured" });
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  try {
    const token = req.body?.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "Cannot authenticate google account" });
    const { userId, email, name } = await verifyGoogleUser(token);
    if (!userId || !email)
      return res.status(401).json({ message: "Unsuccessful Google Sign In" });
    let user = await User.findOne({ where: { email } });

    if (user) {
      const userToken: ITokenStructured = {
        id: user.id,
        email: user.email,
      };

      var jwtToken = issueToken(userToken);
      console.log("jwtToken", jwtToken);
      return res.status(200).json({ profile: user.toJSON(), token: jwtToken });
    }

    const newUser = await User.create({
      email,
      name,
    });

    const userToken: ITokenStructured = {
      id: newUser.id,
      email: newUser.email,
    };

    var jwtToken = issueToken(userToken);
    console.log("jwtToken", jwtToken);
    return res.status(200).json({
      token: jwtToken,
      profile: newUser.toJSON(),
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal error occured" });
  }
};
