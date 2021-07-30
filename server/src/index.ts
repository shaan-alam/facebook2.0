import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import dbConnect from "./db/connect";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing configuration
routes(app);

app.listen(PORT, () => {
  logger.info(`The server is up and running on PORT ${PORT}`);

  dbConnect();
});
