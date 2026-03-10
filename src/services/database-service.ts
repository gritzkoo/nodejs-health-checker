import { HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

export async function checkDatabaseClient(config: IntegrationConfig): Promise<HTTPChecker> {
  try {
    // lazy loading sequelize package to enable peer dependency to be optional
    const databaseLib = await import("sequelize");
    const { dbName, dbUser, dbPwd, dbDialect, dbPort, host } = config;
    // init sequelize
    const sequelize = new databaseLib.Sequelize(dbName || "postgres", dbUser || "", dbPwd, {
      dialect: dbDialect || "mysql",
      port: dbPort,
      host,
      logging: false,
    });
    await sequelize.authenticate();
    await sequelize.close();
    return { status: true };
  } catch (error) {
    return { status: false, error };
  }
}
