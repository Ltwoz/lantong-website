const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    getUserDetails,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
    updatePassword,
} = require("./user.handlers");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router.route("/auth/register").post(registerUser);

router.route("/auth/login").post(loginUser);

router.route("/auth/logout").get(logout);

// Forgot Password
// Reset Password

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("password/update").put(isAuthenticatedUser, updatePassword)

router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
