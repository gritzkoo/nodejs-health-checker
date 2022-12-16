import { Dialect } from "sequelize";
import { IntegrationConfig, Integration, Defaults, HealthIntegration, BaseCheckOptions } from "../interfaces/types";
import { getDeltaTime } from "../lib";
import { checkDatabaseClient } from "../services/database-service";

type DatabaseCheckOptions = BaseCheckOptions & {
  port?: number;
  dbName: string;
  dbUser: string;
  dbPwd: string;
  dbDialect: Dialect;
  host: string;
};

export function databaseCheck(options: DatabaseCheckOptions): IntegrationConfig {
  return {
    check: databaseCheckImpl,
    name: options.name,
    host: options.host,
    dbPort: options.port,
    dbName: options.dbName,
    dbUser: options.dbUser,
    dbPwd: options.dbPwd,
    dbDialect: options.dbDialect,
  };
}

async function databaseCheckImpl(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.WebTimeout;
  const result = await checkDatabaseClient(config);
  return {
    name: config.name,
    kind: HealthIntegration.DatabaseIntegration,
    status: result.status,
    response_time: getDeltaTime(start),
    url: config.host,
    error: result.error,
  };
}
