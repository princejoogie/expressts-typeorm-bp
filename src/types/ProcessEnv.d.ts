export declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    PG_HOST: string;
    PG_PORT: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DATABASE: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    REFRESH_SECRET: string;
  }
}
