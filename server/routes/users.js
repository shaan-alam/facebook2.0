const express = require("express");
const {
  signin,
  signup,
  signUpWithGoogle,
  signInWithGoogle,
} = require("../controllers/users");

const router = express.Router();

// Sign up
router.post("/signup", signup);

// Sign in
router.post("/signin", signin);

// Sign up using Google API
router.post("/auth/signup/google", signUpWithGoogle);

// Sign in using Google API
router.post("/auth/signin/google", signInWithGoogle);

module.exports = router;
