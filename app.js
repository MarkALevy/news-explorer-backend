require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { dataBase } = require("./utils/config");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(dataBase)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(
  cors({
    origin: [
      "https://news-explorer.serverpit.com",
      "https://www.news-explorer.serverpit.com",
      "https://api.news-explorer.serverpit.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
