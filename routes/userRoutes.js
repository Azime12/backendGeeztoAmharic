const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const passport = require("passport");
require("../controllers/googleAuth");

const {
  registerUser,
  authUser,
  addUserfavorite,
  Userfavorite,
  deletefavorite,
  changePasswordUser,
  authGoogleUser,
  authUserMobile,
  ocrmodel,
  //   allAdmin,
  deleteUser,
  // updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/favorite").post(protect, addUserfavorite);
router.route("/favorite/:userId").get(protect, Userfavorite);
router.route("/favorite").delete(protect, deletefavorite);
router.route("/passwordchange").patch(protect, changePasswordUser);
router.route("/ocr").post(protect, ocrmodel);
// router.route("/").get(protect, allAdmin);
// router.route("/update").post(protect, updateUser);
router.post("/login", authUser);
router.post("/mobile", authUserMobile);
router.route("/delete/:id").delete(protect, deleteUser);

router.get(
  "/google",
    res.status(500).json({ success: "False", Message: "Failed to Authenticate" });
  // passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/users/google/failure", // Redirect to failure route on authentication failure
    successRedirect: "/api/users/google/success", // Redirect to success route on authentication success
  })
);

// Route for handling authentication failure
router.get("/google/failure", (req, res) => {
  res.status(500).json({ success: "False", Message: "Failed to Authenticate" });
    });

// Route for handling authentication success
// router.get("/google/success", (req, res) => {
//     res.status(200).json({ success: "True", Message: "Password Does Not Match" });
//   // Redirect to another route that handles the POST request
//   // res.redirect("/auth/google-login");
//     // console.log(req.user);
// });
router.route("/google/success").get(authGoogleUser);



module.exports = router;
