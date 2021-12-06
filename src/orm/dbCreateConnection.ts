/* eslint-disable no-console */
import { Connection, createConnection } from "typeorm";
import config from "./config/ormconfig";

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    const details = {
      connectionEstablished: conn.isConnected,
      connectionName: conn.name,
      databaseType: conn.options.type,
      databaseName: conn.options.database,
    };
    console.table(details);
    console.log();

    return conn;
  } catch (err) {
    console.error(err);
  }

  return null;
};
