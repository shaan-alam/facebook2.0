import express from "express";
import {
  commentOnPost,
  retrieveComments,
  deleteComment,
  editComment,
  likeComment,
} from "../controller/comment.controller";

const router = express.Router();

router.post("/:id", commentOnPost);

router.get("/:id", retrieveComments);

router.delete("/:id", deleteComment);

router.patch("/:id", editComment);

router.patch("/:id/like", likeComment);

export default router;
