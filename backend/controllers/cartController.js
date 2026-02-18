import User from "../models/userModel.js";


//add items to cart
const addToCart = async (req, res) => {
    try {
        const userData = await User.findById(req.body.userID );
        const cartData = await userData.cartData;

        if (!cartData[req.body.itemID]) {
            cartData[req.body.itemID] = 1;
        }
        else {
            cartData[req.body.itemID] += 1;
        }

        const response = await User.findByIdAndUpdate(req.body.userID, { cartData });
        console.log(response);

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" })
    }
}

//remove items from cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await User.findById(req.body.userID );
        const cartData = await userData.cartData;

        if(cartData[req.body.itemID] > 0) {
          cartData[req.body.itemID] -= 1;
        }
        
        const response = await User.findByIdAndUpdate(req.body.userID , {cartData});
        console.log(response);
        res.json({success : true , message : "Removed from cart"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" })
    }
}

//get cart items
const getFromCart = async (req, res) => {
    try {
        const userData = await User.findById(req.body.userID );
        const cartData = await userData.cartData;
        
        console.log(cartData);
        res.json({success : true , cartData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" })
    }
}

export { addToCart, removeFromCart, getFromCart };