import { Sequelize } from "sequelize";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkDatabaseClient(config: IntegrationConfig): Promise<HTTPChecker> {
  const { dbName, dbUser, dbPwd, dbDialect, dbPort, host } = config;
  // init sequelize
  const sequelize = new Sequelize(dbName || "postgres", dbUser || "", dbPwd, {
    dialect: dbDialect || "mysql",
    port: dbPort,
    host,
    logging: false,
  });
  // check authenticate to database
  try {
    await sequelize.authenticate();
    await sequelize.close();
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error,
    };
  }
}
