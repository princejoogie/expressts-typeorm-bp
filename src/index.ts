/* eslint-disable no-console */
import "dotenv/config";
import "reflect-metadata";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { dbCreateConnection } from "./orm/dbCreateConnection";

const PORT = process.env.PORT || 4000;

const main = async () => {
  // initialize database connection
  await dbCreateConnection();

  // variables
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // routes
  app.use("/", routes);

  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
  });
};

console.clear();
main().catch(console.error);
