import express from "express";
import sequelize from "./db";
import { useMiddlewares } from "./middlewares/index";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const stage = process.env.STAGE;
const MYSQL_DB =
  stage === "prod" ? process.env.MYSQL_DB_PROD : process.env.MYSQL_DB_DEV;
const DOMAIN = stage === "prod" ? process.env.DOMAIN : process.env.DOMAIN_TEST;

const app = express();
const httpServer = http.createServer(app);
const port = stage === "prod" ? 3080 : 3081;

useMiddlewares(app);

const start = async () => {
  try {
    // Default Index Page
    // app.use(express.static(__dirname + "/build"));

    // Send all other items to index file
    // app.get("*", (req, res) => res.sendFile(__dirname + "/build/index.html"));

    await sequelize.authenticate();
    await sequelize.sync();

    // const ws = setupWebSocket(httpServer);
    // app.locals.ws = ws;
    console.log(`Connection to ${MYSQL_DB} has been established successfully.`);

    httpServer.listen(port, () => {
      console.log(`Example app listening at ${DOMAIN}:${port}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

start();
