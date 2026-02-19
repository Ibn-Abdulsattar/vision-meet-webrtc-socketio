import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  forgot,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/user.controller.js";
const router = Router();

router.route("/login").post(wrapAsync(login));
router.route("/register").post(wrapAsync(register));
router.route("/logout").post(wrapAsync(logout));
router.route("/forgot").post(wrapAsync(forgot));
router.route("/reset-password").post(wrapAsync(resetPassword));
router.post("/verify-otp", wrapAsync(verifyOtp));
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;
