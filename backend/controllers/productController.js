const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");


//if user is admin then create Product  -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  req.body.user=req.user.id

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async (req, res) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});



