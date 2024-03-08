import * as dotenv from "dotenv";

export const getEnv = () => {
    dotenv.config({
      override: true,
      path: `./env/.env`,
    });
  dotenv.config({
    override: true,
    path: `./env/.env.${process.env.STAGE || "dev"}`,
  });

};
