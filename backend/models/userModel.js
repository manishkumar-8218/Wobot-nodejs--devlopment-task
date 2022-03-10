const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true,"please enter your first name"],
        maxlength:[30,"name cannot exced 30 charecter"],
        minlength:[3,"name should have more than 3 charecter"]
    },
    last_name: {
        type: String,
        required: [true,"please enter your last name"],
        maxlength:[30,"name cannot exced 30 charecter"],
        minlength:[3,"name should have more than 3 charecter"]
    },
    email: {
        type: String,
        required: [true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true,"please enter your password"],
        minlength:[8,"password should greater than 8 charecter"],
        select:false,
    },
    role: {
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

// bcrypt password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
// JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


// COMPARE PASSWORD
userSchema.methods.comparePassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
}


module.exports=mongoose.model("user",userSchema)