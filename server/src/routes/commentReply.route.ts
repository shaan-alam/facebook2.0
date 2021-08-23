import express from "express";
import { createCommentReply, retrieveCommentReplies } from "../controller/commentReply.controller";
import validateToken from "../middlewares/validateToken.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createCommentReplySchema } from "../schema/commentReply.schema";

const router = express.Router();

router.post(
  "/reply",
  validateToken,
  validateRequest(createCommentReplySchema),
  createCommentReply
);

router.get('/replies/:commentId', validateToken, retrieveCommentReplies)

export default router;
