import express from "express";
import { signUp } from "../controller/auth.controller";
import { getUser } from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createUserSchema } from "../schema/auth.schema";

const router = express.Router();

// User sign up  route
router.post("/signup/", validateRequest(createUserSchema), getUser, signUp);

export default router;
