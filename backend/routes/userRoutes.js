const express = require("express");
const {
  signupUser,
  loginUser,
  getUserDetails,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(signupUser);

router.route("/login").post(loginUser);
// if user login then he/she can get his/her details
router.route("/me").get(isAuthenticatedUser, getUserDetails);
// if user login then he/she can see all user
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)

module.exports = router;
