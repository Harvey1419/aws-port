"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = require("../../Services/users/users.service");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', users_service_1.createUserService)
    .post('/login', users_service_1.loginUserService);
exports.default = userRouter;
