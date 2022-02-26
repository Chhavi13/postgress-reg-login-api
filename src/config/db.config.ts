import { Sequelize } from "sequelize";

// export default new Sequelize({
//     host: "localhost",
//     username: "postgres",
//     password: "root",
//     database: "type_db",
//     dialect: "postgres"
//   });

  export const sequelize = new Sequelize({
    host: "localhost",
    username: "postgres",
    password: "root",
    database: "type_db",
    dialect: "postgres"
  });
sequelize.authenticate();