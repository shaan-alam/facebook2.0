import express from "express";
import {
  signUp,
  signIn,
  getUserFromDB,
  googleAuthentication,
} from "../controller/auth.controller";
import { getUser } from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import {
  createUserSchema,
  loginSchema,
  googleAuthSchema,
} from "../schema/auth.schema";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: The Authentication managing API
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: Creates a new User
 *    tags: [Authentication]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *                description: Full name of the user
 *              email:
 *                type: string
 *                description: Email of the user
 *              password:
 *                type: string
 *                description: Password of the user
 *            example:
 *                fullName: Your Name
 *                email: yourname@test.com
 *                password: YourPassword_4000
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *
 *
 */
router.post("/signup/", validateRequest(createUserSchema), getUser, signUp);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: Login User
 *    tags: [Authentication]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: Email of the user
 *              password:
 *                type: string
 *                description: Password of the user
 *            example:
 *                email: yourname@test.com
 *                password: YourPassword_4000
 *    responses:
 *      200:
 *        description: OK
 *      404:
 *        description: User not found
 *
 *
 */
router.post("/signin/", validateRequest(loginSchema), getUser, signIn);

router.post("/getuser", getUser, getUserFromDB);

router.post(
  "/googleAuth",
  validateRequest(googleAuthSchema),
  getUser,
  googleAuthentication
);

export default router;
