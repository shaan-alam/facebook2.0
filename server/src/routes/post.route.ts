import express from "express";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createPostSchema } from "../schema/post.schema";
import { createPost } from "../controller/post.controller";
import validateToken from "../middlewares/validateToken.middleware";

const router = express.Router();

router.post("/", validateToken, validateRequest(createPostSchema), createPost);

export default router;
