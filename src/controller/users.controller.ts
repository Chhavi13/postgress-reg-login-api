import { Request, Response } from "express";
import { User } from '../models/users.models';
import {sequelize} from '../config/db.config';
const bcrypt = require('bcryptjs');

export class UserController {
    // private responseData: any
    // this.setResponseData();

    userRegister = async (req: Request, res: Response) => {


        try {

             console.log("req", req.body)
            const { username, email, password } = req.body;
            console.log("userEmail============", email)
              
            const person :any = await User.findOne()

             console.log("preson found++++++++++++++++++++++", person)


            if (person) {
                return res.status(400).json({
                    error: "Email already there, No need to register again.",
                });
            }

            const userData: any = {
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 8),
            }


            const result = await User.create(userData);
            console.log(".............................", result)
            res.status(201).json({ user: result });
        } catch (error) {
            console.log(error)


        }
        // res.json(this.responseData)

    }




}
