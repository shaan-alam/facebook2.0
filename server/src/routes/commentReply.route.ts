import express from "express";
import {
  createCommentReply,
  retrieveCommentReplies,
  editCommentReply,
  deleteCommentReply,
} from "../controller/commentReply.controller";
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

router.get("/replies/:commentId", validateToken, retrieveCommentReplies);

router.patch("/edit-reply/:commentReplyId", validateToken, editCommentReply);

router.delete(
  "/delete-reply/:commentReplyId",
  validateToken,
  deleteCommentReply
);

export default router;
