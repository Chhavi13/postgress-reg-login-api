//const express = require('express')
//import bodyParser from "body-parser";
import express,{Request,Response} from "express";
import { default as router } from "./src/routers/users.routes";
import { User } from './src/models/users.models'
import { sequelize } from  './src/config/db.config';

const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
let server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/", async (req:Request, res:Response) => {
//     res.send(" this is get api>>>!");
// });

app.use('/user',router)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Application listening on PORT - ${process.env.PORT || 4000}`);
})


