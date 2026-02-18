import FoodItems from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
    // console.log(req.body);
    let image_filename = `${req.file.filename}`;

    const foodInfo = new FoodItems({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })

    try {
        await foodInfo.save();
        res.json({ success: true, message: "Food item is added successfully" })
    } catch (error) {
        console.log(err)
        res.json({ success: false, message: "Food item is not added due some error" })
    }

}

//show all food items
const showFood = async (req, res) => {

    try {
        const foods = await FoodItems.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error occured while displaying food list" })
    }

}

//remove food
const removeFood = async (req, res) => {
    try {
        const food = await FoodItems.findById(req.body._id);
        fs.unlink(`uploads/${food.image}` , ()=>{})
        
        const deletedFood = await FoodItems.findByIdAndDelete(req.body._id);
        res.json({success : true , message : "successfully deleted"});
        console.log(deletedFood);

    } catch (error) {
        console.log(error);
        res.json({success : false , message : "some error occur while deleting the food"})
    }
}

export { addFood, showFood, removeFood };