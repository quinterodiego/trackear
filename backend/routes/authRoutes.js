import express from "express";
import { register, login, googleCallback } from "../controllers/authController.js";
import { getGoogleAuthURL } from "../services/googleAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", (req, res) => {
  const url = getGoogleAuthURL();
  res.redirect(url);
});

router.get("/google/callback", googleCallback);

export default router;
