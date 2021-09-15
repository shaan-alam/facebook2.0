import express from "express";
import validateToken from "../middlewares/validateToken.middleware";
import { retrieveFollowing } from "../controller/following.controller";

const router = express.Router();

router.get("/:id", validateToken, retrieveFollowing);

export default router;
