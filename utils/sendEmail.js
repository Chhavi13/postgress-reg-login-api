const nodemailer = require("nodemailer");
 require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 465,
    secure: false,
    auth: {
        user:process.env.AUTH ,
        pass:process.env.PASS
    }
    
})
   

//console.log("transporter",transporter)
module.exports = transporter;