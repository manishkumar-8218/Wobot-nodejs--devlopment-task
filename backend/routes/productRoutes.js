const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
// upload Products if you are admin of the website 
router
.route("/admin/product/new")
.post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// fetch Product list
router.route("/products").get(isAuthenticatedUser, getAllProducts);
module.exports = router;
