import { Router } from "express";
import { createUserService, loginUserService } from "../../Services/users/users.service";

const userRouter = Router()

userRouter.post('/register', createUserService )
          .post('/login', loginUserService)

export default userRouter