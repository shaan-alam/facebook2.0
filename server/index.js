const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

// Mongoose connection
mongoose
  .connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`))
  );

mongoose.set("useFindAndModify", false);
