import morgan from "morgan";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

export const useMiddlewares = async (app: Express) => {
  app.use(morgan("dev"));
  app.use(cors({ origin: "*" }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
