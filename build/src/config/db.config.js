"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// export default new Sequelize({
//     host: "localhost",
//     username: "postgres",
//     password: "root",
//     database: "type_db",
//     dialect: "postgres"
//   });
exports.sequelize = new sequelize_1.Sequelize({
    host: "localhost",
    username: "postgres",
    password: "root",
    database: "type_db",
    dialect: "postgres"
});
exports.sequelize.authenticate();
