import express from "express";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createPostSchema } from "../schema/post.schema";
import {
  createPost,
  getPosts,
  editPost,
  deletePost,
} from "../controller/post.controller";
import validateToken from "../middlewares/validateToken.middleware";
import { getPost } from "../middlewares/post.middleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *      in: header
 */

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
 *    security:
 *    - bearerAuth: []
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

/**
 * @swagger
 * /posts/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all the posts along with their author and likes.
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorised
 *
 *
 */
router.get("/", validateToken, getPosts);

/**
 * @swagger
 * /posts/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the post's caption.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The mongoose ID of the post to be edited.
 *    tags: [Posts]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              caption:
 *                type: string
 *                description: Caption of the post.
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorised
 *
 *
 */
router.patch("/:id", validateToken, getPost, editPost);

/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The mongoose ID of the post to be deleted.
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorised
 *
 *
 */
router.delete("/:id", validateToken, getPost, deletePost);

export default router;
