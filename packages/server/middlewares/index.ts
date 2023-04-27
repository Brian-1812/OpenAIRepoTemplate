import morgan from "morgan";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { uploadFile } from "../services/uploadFile";
import { indexFiles, sendQuestions, uploadFiles } from "../controllers/main";
import { authPolicy } from "./auth";
import { loginFake, loginGoogle } from "../controllers/auth";
dotenv.config();

export const useMiddlewares = async (app: Express) => {
  app.use(morgan("dev"));
  app.use(cors({ origin: "*" }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/api/loginFake", loginFake);
  app.post("/api/login", loginGoogle);

  // Everything after this requires user authentication
  app.all("/api/*", authPolicy);

  app.post("/api/upload", uploadFile.array("files"), uploadFiles);
  app.get("/api/files/index", indexFiles);
  app.post("/api/files/query", sendQuestions);
};
