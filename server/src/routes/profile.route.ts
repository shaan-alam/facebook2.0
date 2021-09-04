import express from "express";
import validateToken from "../middlewares/validateToken.middleware";
import {
  getProfile,
  getUserPosts,
  followProfile,
  unfollowProfile,
} from "../controller/profile.controller";

const router = express.Router();

router.get("/:id", validateToken, getProfile);

router.patch("/follow/:id", validateToken, followProfile);

router.patch("/unfollow/:id", validateToken, unfollowProfile);

router.get("/posts/:id", validateToken, getUserPosts);

export default router;
