import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import dbConnect from "./db/connect";
import routes from "./routes";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use("/static", express.static(path.join(__dirname, "assets")));

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

app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, {
    customSiteTitle: "Facebook 2.0 Documentation",
    customCssUrl: "http://localhost:5000/static/css/custom.css",
  })
);

// Routing configuration
routes(app);

app.listen(PORT, () => {
  logger.info(`The server is up and running on PORT ${PORT}`);

  dbConnect();
});
