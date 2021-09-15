import { Application } from "express";
import authRoutes from "./auth.route";
import postRoutes from "./post.route";
import commentRoutes from "./comment.route";
import commentReplyRoutes from "./commentReply.route";
import profileRoutes from "./profile.route";
import followersRoutes from "./followers.route";
import followingRoutes from "./following.route";

const routes = (app: Application) => {
  app.use("/auth/", authRoutes);

  app.use("/posts/", postRoutes);

  app.use("/post/comment", commentRoutes);

  app.use("/post/comment-reply", commentReplyRoutes);

  app.use("/profile", profileRoutes);

  app.use("/followers", followersRoutes);

  app.use("/following", followingRoutes);
};

export default routes;
