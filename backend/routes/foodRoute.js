import express from 'express';
import multer from 'multer';
import { addFood, removeFood, showFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req , file , cb) =>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage : storage});


foodRouter.post("/add" , upload.single("image") , addFood);
foodRouter.get("/show" , showFood);
foodRouter.post("/remove" , removeFood);

export default foodRouter;