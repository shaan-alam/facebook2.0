import express from "express";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createPostSchema } from "../schema/post.schema";
import { createPost, getPosts } from "../controller/post.controller";
import validateToken from "../middlewares/validateToken.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The Posts managing API
 */

/**
 * @swagger
 * /posts/:
 *  post:
 *    summary: Create a new Post
 *    tags: [Posts]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              imageURL:
 *                type: string
 *                description: base64 Encoded image
 *              caption:
 *                type: string
 *                description: Caption for the Post
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *
 *
 */
router.post("/", validateToken, validateRequest(createPostSchema), createPost);

router.get("/", getPosts);
export default router;
