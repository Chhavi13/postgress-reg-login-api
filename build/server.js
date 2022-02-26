"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express')
//import bodyParser from "body-parser";
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./src/routers/users.routes"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
require("dotenv").config();
let server = require("http").createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.get("/", async (req:Request, res:Response) => {
//     res.send(" this is get api>>>!");
// });
app.use('/user', users_routes_1.default);
app.listen(process.env.PORT || 4000, () => {
    console.log(`Application listening on PORT - ${process.env.PORT || 4000}`);
});
