import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const stage = process.env.STAGE;
const MYSQL_DB =
  stage === "prod" ? process.env.MYSQL_DB_PROD : process.env.MYSQL_DB_DEV;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;

const sequelize = new Sequelize(MYSQL_DB!, MYSQL_USERNAME!, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
