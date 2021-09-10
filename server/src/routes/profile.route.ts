import express from "express";
import validateToken from "../middlewares/validateToken.middleware";
import {
  getProfile,
  getUserPosts,
  followProfile,
  unfollowProfile,
  updateProfileDetails,
  updateProfilePicture,
} from "../controller/profile.controller";

const router = express.Router();

router.get("/:id", validateToken, getProfile);

router.patch("/follow/:id", validateToken, followProfile);

router.patch("/unfollow/:id", validateToken, unfollowProfile);

router.get("/posts/:id", validateToken, getUserPosts);

router.patch("/edit/", validateToken, updateProfileDetails);

router.patch("/edit/profile-picture", validateToken, updateProfilePicture);

export default router;
