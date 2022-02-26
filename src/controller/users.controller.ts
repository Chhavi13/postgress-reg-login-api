import { Request, Response } from "express";
import User, { UserMap } from '../models/users.models';
import config from '../config/db.config';


export class UserController {
    // private responseData: any
    // this.setResponseData();
    userRegister = async (req: Request, res: Response) => {


        try {
            console.log("req", req.body)
            const { fullname, email, country } = req.body;

            const userData: any = {
                fullname: fullname,
                email: email,
                country: country
            }
            UserMap(config)

            const result = await User.create(userData);
            console.log(".............................", result)
            res.status(201).json({ user: result });



        } catch (error) {
            console.log(error)


        }
        // res.json(this.responseData)

    }




}
