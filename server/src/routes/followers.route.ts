import express from "express";
import validateToken from "../middlewares/validateToken.middleware";
import { retrieveFollowers } from "../controller/followers.controller";

const router = express.Router();

router.get("/:id", validateToken, retrieveFollowers);

export default router;
