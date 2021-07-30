import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import dbConnect from "./db/connect";
import routes from "./routes";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Facebook 2.0 API",
      version: "1.0.0",
      description: "API Docs for Facebook 2.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.route.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// Routing configuration
routes(app);

app.listen(PORT, () => {
  logger.info(`The server is up and running on PORT ${PORT}`);

  dbConnect();
});
