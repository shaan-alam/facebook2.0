import express from "express";
import {
  commentOnPost,
  retrieveComments,
} from "../controller/comment.controller";

const router = express.Router();

router.post("/:id", commentOnPost);

router.get("/:id", retrieveComments);

export default router;
