import express from 'express'
import { login , signUp } from '../controllers/userController.js';


const userRouter = express.Router();


userRouter.post("/login" , login);
userRouter.post("/signup" , signUp);


export default userRouter;