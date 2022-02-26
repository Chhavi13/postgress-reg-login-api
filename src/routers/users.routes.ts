
import { Router } from "express";
//import User,{UserMap} from '../models/users.models';
import config from  '../config/db.config';
import { UserController } from '../controller/users.controller'
const router = Router();


const UserInstance = new UserController();



router.post("/postuser",UserInstance.userRegister);








export default router;