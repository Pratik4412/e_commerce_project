import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerUserController,
  resetPasswordController,
  updateUserDetails,
  uploadAvtar,
  refreshToken,
  verifyEmailController,
  verifyForgotpasswordOtp,
  useDetails,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvtar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotpasswordOtp);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, useDetails);


export default userRouter;
