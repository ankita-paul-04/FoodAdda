import { addToCart, getFromCart, removeFromCart } from "../controllers/cartController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import express from 'express';


const cartRouter = express.Router();


cartRouter.post("/add" , authMiddleware , addToCart);
cartRouter.post("/remove" , authMiddleware , removeFromCart);
cartRouter.post("/get" , authMiddleware , getFromCart);

export default cartRouter;