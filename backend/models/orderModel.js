import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userID : {
        type : String,
        required : true,
    },
    items  : {
        type : Array,
        required : true,
    },
    address : {
        type : Object,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        default : "Food Processing"
    },
    date : {
        type : Date,
        default : new Date(),
    },
    payment : {
        type : Boolean,
        default : false,
    },
});

const Order = mongoose.models.order || mongoose.model("Order" , orderSchema);

export default Order;