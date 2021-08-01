import mongoose from "mongoose";
import logger from "../logger";

const dbConnect = () => {
  mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useFindAndModify", false);

  const db = mongoose.connection;
  db.once("open", () => logger.info("Connected to Mongo DB!!"));
  db.on("error", (error) => logger.error(error));
};

export default dbConnect;
