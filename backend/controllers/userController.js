const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
// Signup user
exports.signupUser = catchAsyncErrors(async (req, res, next) => {
  const { first_name,last_name,email, password } = req.body;

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("please enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

// fetch users list

exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  });
});

// fetch user Details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  const user =await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  });
});