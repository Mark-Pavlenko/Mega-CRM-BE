import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import httpError from "http-errors";
import routes from "./routes";
import errorHandler from "./middleware/ErrorHandler";
import config from "./config/app";

const app = express();

const morganFormat = config.isDev ? "dev" : "combined";
app.use(morgan(morganFormat));

mongoose.connect(config.mongoUri, { useNewUrlParser: true }).catch((err) => console.log(err));

// set json size in requests
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", ...routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("../client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

app.use((req, res, next) => {
  next(httpError(404));
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started ${config.host}:${config.port}`);
});
