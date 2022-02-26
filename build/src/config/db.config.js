"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize({
    host: "localhost",
    username: "postgres",
    password: "root",
    database: "type_db",
    dialect: "postgres"
});
