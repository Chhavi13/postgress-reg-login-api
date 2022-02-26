"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_models_1 = require("../models/users.models");
const bcrypt = require('bcryptjs');
class UserController {
    constructor() {
        // private responseData: any
        // this.setResponseData();
        this.userRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req", req.body);
                const { username, email, password } = req.body;
                console.log("userEmail============", email);
                const person = yield users_models_1.User.findOne();
                console.log("preson found++++++++++++++++++++++", person);
                if (person) {
                    return res.status(400).json({
                        error: "Email already there, No need to register again.",
                    });
                }
                const userData = {
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 8),
                };
                const result = yield users_models_1.User.create(userData);
                console.log(".............................", result);
                res.status(201).json({ user: result });
            }
            catch (error) {
                console.log(error);
            }
            // res.json(this.responseData)
        });
    }
}
exports.UserController = UserController;
