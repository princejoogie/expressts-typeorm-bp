/* eslint-disable no-console */
import { Connection, createConnection } from "typeorm";

import config from "./config/ormconfig";

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(`Database connection established: ${conn.isConnected}`);
    console.log(`Connection name: ${conn.name}`);
    console.log(`Database: ${conn.options.database}`);
  } catch (err) {
    console.error(err);
  }

  return null;
};
