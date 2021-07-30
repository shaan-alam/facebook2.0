import express from "express";
import { signUp } from "../controller/auth.controller";
import { getUser } from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createUserSchema } from "../schema/auth.schema";

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
 *                fullName: Shaan Alam
 *                email: shaanalam@test.com
 *                password: ShaanIsCool_3000
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *
 *
 */
router.post("/signup/", validateRequest(createUserSchema), getUser, signUp);

export default router;
