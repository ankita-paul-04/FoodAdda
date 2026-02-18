import Order from "../models/orderModel.js";
import User from "../models/userModel.js";



//place user order
const placeOrder = async (req, res) => {
    try {
        const orderDetails = new Order({
            userID: req.body.userID,
            items: req.body.items,
            address: req.body.address,
            amount: req.body.amount,
            payment: true,
        })
        const savedOrder = await orderDetails.save();
        console.log(savedOrder);

        await User.findByIdAndUpdate(req.body.userID, { cartData: {} });

        res.json({ success: true, orderDetails, message: "payment successfull" })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Order failed"
        });
    }

}

//show user all order
const showOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.body.userID });
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong while fetching orders from database" });
    }

}

//display all orders in admin panel
const showOrderInAdmin = async (req, res) => {
    try {
        const allUserOrders = await Order.find({});
        res.json({ success: true, allUserOrders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//change order status  in database
const statusChangeOfOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderID , {status : req.body.status});
        res.json({ success: true, message: "Status updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Can't change oder status" })
    }
}

export { placeOrder, showOrder, showOrderInAdmin, statusChangeOfOrder }