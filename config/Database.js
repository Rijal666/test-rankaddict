import { Sequelize } from "sequelize";

const db = new Sequelize("auth_db", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
