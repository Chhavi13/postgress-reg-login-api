const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 465,
    secure: false,
    auth: {
        user: "chhavi.thoughtwin@gmail.com",
        pass: "chhavi12345",
    },
})


// console.log("transporter",transporter)
module.exports = transporter;