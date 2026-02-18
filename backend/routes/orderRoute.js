import express from 'express'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import { placeOrder, showOrder, showOrderInAdmin, statusChangeOfOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/place" , authMiddleware , placeOrder);
orderRouter.post("/show" , authMiddleware , showOrder);
orderRouter.get("/admin/allOrders" , showOrderInAdmin);
orderRouter.post("/status" , statusChangeOfOrder);

export default orderRouter;