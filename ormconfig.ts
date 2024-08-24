import { DataSource } from "typeorm";
import { User } from "./src/entities/User";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "test.sqlite",
  synchronize: true,
  logging: !isProduction,
  entities: [User],
});
