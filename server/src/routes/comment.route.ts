import express from "express";
import {
  commentOnPost,
  retrieveComments,
  deleteComment
} from "../controller/comment.controller";

const router = express.Router();

router.post("/:id", commentOnPost);

router.get("/:id", retrieveComments);

router.delete('/:id', deleteComment)

export default router;
