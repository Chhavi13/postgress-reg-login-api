"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controller/users.controller");
const router = (0, express_1.Router)();
const UserInstance = new users_controller_1.UserController();
router.post("/postuser", UserInstance.userRegister);
exports.default = router;
