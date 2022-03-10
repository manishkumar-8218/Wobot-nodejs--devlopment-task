const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter product Name"],
        trim: true
    },
    description:{
       type:String,
       required:[true,"please enter product description"] 
    },
    quantity:{
        type:Number,
        required:[true,"please enter your product quantity"],
        default:1
    },
    price: {
        type:Number,
        required:[true,"Please enter product Price"],
    },
    _createdBy:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true,
    }
})


module.exports=mongoose.model("product",productSchema)