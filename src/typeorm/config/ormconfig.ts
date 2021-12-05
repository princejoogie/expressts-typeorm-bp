import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/typeorm/entities/**/*.ts"],
  migrations: ["src/typeorm/migration/**/*.ts"],
  subscribers: ["src/typeorm/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/typeorm/entities",
    migrationsDir: "src/typeorm/migration",
    subscribersDir: "src/typeorm/subscriber",
  },
};

export default config;
