import { Express } from "express";
import postRoutes from "./post.route";

const Routes = (app: Express) => {
  app.use("/posts", postRoutes);
};

export default Routes;
