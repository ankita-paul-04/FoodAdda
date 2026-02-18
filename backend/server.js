import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//database connection
connectToDatabase();


//api end points
app.use("/api/foods" , foodRouter);
app.use("/api/user" , userRouter);
app.use("/api/cart" , cartRouter);
app.use("/api/order" , orderRouter);
app.use("/images" , express.static("uploads"));

app.get("/" , (req,res)=>{
    res.send("server is on")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})