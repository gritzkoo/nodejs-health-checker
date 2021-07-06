import { Sequelize } from "sequelize";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkDatabaseClient(config: IntegrationConfig): Promise<HTTPChecker> {
  const { dbName, dbUser, dbPwd, dbDialect, dbPort, host } = config;

  return new Promise(async (resolve, _) => {
    // init sequelize
    const sequelize = new Sequelize(dbName || "postgres", dbUser || "", dbPwd, {
      dialect: dbDialect || "mysql",
      port: dbPort,
      host,
    });
    // check authenticate to database
    try {
      await sequelize.authenticate();
      await sequelize.close();
      resolve({
        status: true,
      });
    } catch (error) {
      resolve({
        status: false,
        error,
      });
    }
  });
}
