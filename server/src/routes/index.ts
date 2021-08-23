import { Application } from "express";
import authRoutes from "./auth.route";
import postRoutes from "./post.route";
import commentRoutes from "./comment.route";
import commentReplyRoutes from './commentReply.route';

const routes = (app: Application) => {
  app.use("/auth/", authRoutes);

  app.use("/posts/", postRoutes);

  app.use("/post/comment", commentRoutes);

  app.use('/post/comment-reply', commentReplyRoutes)
};

export default routes;
