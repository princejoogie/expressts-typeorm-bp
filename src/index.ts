/* eslint-disable no-console */
import "dotenv/config";
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";

import routes from "./routes";
import { dbCreateConnection } from "./orm/dbCreateConnection";

const PORT = process.env.PORT || 4000;

const main = async () => {
  // initialize database connection
  await dbCreateConnection();

  const app = express();
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../log/access.log"),
    { flags: "a" }
  );

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );
  app.use(morgan("combined"));
  app.use("/", routes);

  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
  });
};

console.clear();
main().catch(console.error);
