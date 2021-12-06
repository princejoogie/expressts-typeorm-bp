import { ConnectionOptions } from "typeorm";
import path from "path";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "../entities/**/*{.ts,.js}")],
  migrations: [path.join(__dirname, "../migration/**/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "../subscriber/**/*{.ts,.js}")],
  cli: {
    entitiesDir: "src/typeorm/entities",
    migrationsDir: "src/typeorm/migration",
    subscribersDir: "src/typeorm/subscriber",
  },
};

export default config;
