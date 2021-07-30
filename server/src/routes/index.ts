import { Application } from "express";
import authRoutes from "./auth.route";

const routes = (app: Application) => {
  app.use("/auth/", authRoutes);
};

export default routes;
