import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import dbConnect from "./db/connect";
import Routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Routing configuration
Routes(app);

app.listen(PORT, () => {
  logger.info(`The server is up and running on PORT ${PORT}`);

  dbConnect();
});
