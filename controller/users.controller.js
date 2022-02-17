const db = require('../models/index.model')
const User = db.users;
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const { Validator } = require('node-input-validator')
const transporter = require('../utils/sendEmail')
require('dotenv').config();


//console.log('HOST ------', process.env.AUTH)


exports.register = async (req, res) => {
    try {

        const { email, password, username, phone } = req.body;
        //  console.log("req body", req.body)
        const person = await User.findOne({
            where: {
                email: email
            }

        })


        if (person) {
            return res.status(400).json({
                error: "Email already there, No need to register again.",
            });
        } else {

            const user = {
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 8),
                phone: phone

                //  isActive: true


            };

            //   console.log("user*****", user.username)
            User.create(user)
                .then(data => {
                    res.status(200).send({
                        message: "success",
                        data: data,


                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while registation."
                    });
                });


            const { subject, text } = req.body;
            // console.log("to",to)
            // console.log("email",process.env.USER)
            console.log("password", process.env.PASS)
            const mailData = {
                from: process.env.AUTH,
                to: email,
                subject: subject,
                text: text,
                html: `<h1>your username is ${email} and password is ${password}</h1>`
            };
            // console.log(mailData)
            await transporter.sendMail(mailData, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).send({
                        message: 'send mail successfully',
                        info: info
                    })
                }
            })





        }

    }
    catch (error) {
        console.log(error)
    }
}



exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const data = await User.findOne({
            where: {
                email: email
            }
        }) //Verifying if the user exists in the database
        const user = data
        if (!user) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });

        } else {
            if (bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken(email);
                const refreshToken = auth.generateAccessRefreshToken(email)    
                return res.status(200).send(
                    {
                        message: " login success ",
                        data: data,
                        token: token,
                        refreshToken: refreshToken

                    });



            } else {
                return res.status(400).json({
                    error: "invalid credintial."
                });

            }


        }



    } catch (error) {
        console.log(error)

    }

}


exports.getalluser = async (req, res) => {
    try {
        const data = await User.findAll()

        let response = {
            data: data
        }
        res.status(200).json(response)



    } catch (error) {
        console.log(error);

    }

}
exports.getSpecificUser = async (req, res) => {
    try {

        const id = req.params.id;
        const data = await User.findByPk(id);
        if (!data) {
            return res.status(404).send("user not found")
        }
        else {
            let response = {
                data: data
            }
            res.status(200).json({
                message: "user found",
                response: response
            })
        }


    } catch (err) {

        console.log(err);
    }

}




exports.userProfile = async (req, res) => {
    try {
        const id = req.params.id;
        // if(req.body) {
        //      res.status(400).send({
        //         message: "all field must be filled"
        //     });
        //     return;
        // }
        const userData = await User.update(req.body, {
            where: {
                id: id
            }

        })

            .then(data => {
                if (data == 1) {
                    res.status(200).send({
                        message: "user profile updated successfully"
                    })
                } else {
                    res.status(404).send({
                        message: "cant update the user profile ,may be user not found"
                    })
                }
            }).catch(err => {
                res.status(500).send({
                    message: `server error + ${err}`
                })
            })
    }
    catch (error) {
        res.json(error)
    }

}




exports.changepwd = async (req, res, next) => {
    try {

        const id = req.params.id
        //  console.log(id)

        const v = new Validator(req.body, {

            old_password: 'required',
            new_password: 'required',
            confirm_password: 'required|same:new_password'
        });
        const matched = await v.check();
        if (!matched) {
            return res.status(422).send(v.errors);
        }
        const current_user = await User.findByPk(id);
        // console.log(current_user)
        //  const current_user =req.user;
        //console.log(current_user.password)
        //  console.log("oldpwd",req.body.old_password)
        if (bcrypt.compareSync(req.body.old_password, current_user.password)) {
            const salt = bcrypt.genSaltSync(10);
            const hashpwd = bcrypt.hashSync(req.body.new_password, salt);
            // console.log("hash",hashpwd)
            console.log("id))))))))))))", current_user.id)
            // await User.update({
            //     where: {
            //         id: current_user.id
            //     }
            // }, {
            //     password: hashpwd
            // });
            await User.update({ password: hashpwd }, {
                where: {
                    id: current_user.id
                }
            });

            console.log("id", current_user.id)
            const data = await User.findOne({
                where: {

                    id: current_user.id
                }
            });



            const token = auth.generateAccessToken(data);
            return res.status(200).send({
                message: "password successfully change",
                data: data,
                token: token
            })


        }
        else {
            return res.status(400).send({
                message: "old password does not matched",
                data: {}
            })
        }

    } catch (err) {
        return res.status(400).send({
            message: err.message,
            data: err
        });

    }

}


exports.sendMailDemo = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        // console.log("to",to)
        console.log("User email", process.env.AUTH)
        console.log("password", process.env.PASS)
        const mailData = {
            from: process.env.AUTH,
            to: to,
            subject: subject,
            text: text
        };
        // console.log(mailData)
        await transporter.sendMail(mailData, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(200).send({
                    message: 'send mail successfully',
                    info: info
                })
            }
        })

    } catch (err) {

        console.log(err);
    }

}



exports.refreshAccessToken = async (req, res) => {
    try {
        const email = req.user.data
        console.log("requser",email)
        const token = auth.generateAccessToken(email);
        const refreshToken = auth.generateAccessRefreshToken(email)    
        return res.status(200).send(
            {
                message: " success ",
                data: email,
                token: token,
                refreshToken: refreshToken

            });

        
    } catch (error) {
        console.log(error)

    }
}

