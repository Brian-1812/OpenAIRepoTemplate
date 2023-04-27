// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const stage = process.env.STAGE;
const MYSQL_DB =
  stage === "prod" ? process.env.MYSQL_DB_PROD : process.env.MYSQL_DB_DEV;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;

// const sequelize = new Sequelize(MYSQL_DB!, MYSQL_USERNAME!, MYSQL_PASSWORD, {
//   host: MYSQL_HOST,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
// });

// export default sequelize;

export const sequelize = new Sequelize({
  dialect: "mysql",
  database: MYSQL_DB,
  password: MYSQL_PASSWORD,
  username: MYSQL_USERNAME,
  host: MYSQL_HOST,
  models: [path.resolve(__dirname, "..", "models")],
});
