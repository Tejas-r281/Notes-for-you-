const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
    confirmUser,
    sendUserEmail,
    recommendation,
    deleteUsers,
    comment,

    // homepage
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/test").get(homepage)

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/user/sendmail").post(sendUserEmail);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

// router.route("/user/recommendation").get(isAuthenticatedUser, recommendation);
router.route("/user/comment").post(isAuthenticatedUser,comment);

router.route("/user/confirm/:token").get(confirmUser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/users").get(getAllUser);


router.route("/me/delete").delete(isAuthenticatedUser, deleteUser);
// router.route("/admin/user/:id").get(isAuthenticatedUser, deleteUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUsers);

module.exports = router;
