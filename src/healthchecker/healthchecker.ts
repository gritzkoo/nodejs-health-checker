import {
  ApplicationConfig,
  ApplicationHealthDetailed,
  ApplicationHealthSimple,
  Defaults,
  HealthIntegration,
  HealthTypes,
  Integration,
  IntegrationConfig,
} from "../interfaces/types";
import { checkDatabaseClient } from "../services/database-service";
import { checkDynamodbClient } from "../services/dynamodb-service";
import { checkMemcachedClient } from "../services/memcache-service";
import { checkRedisClient } from "../services/redis-service";
import { checkWebIntegration } from "../services/web-service";

/**
 * HealthcheckerSimpleCheck perform a simple application check
 * @returns ApplicationHealthSimple
 */
export function HealthcheckerSimpleCheck(): ApplicationHealthSimple {
  return {
    status: "fully functional",
  };
}
/**
 * HealthcheckerDetailedCheck perform a check for each integration informed
 *
 * @param config ApplicationConfig
 * @return ApplicationHealthDetailed
 */
export async function HealthcheckerDetailedCheck(config: ApplicationConfig): Promise<ApplicationHealthDetailed> {
  const promisesList: Promise<Integration>[] = [];
  const start = new Date().getTime();
  config.integrations.forEach((item) => {
    switch (item.type) {
      case HealthTypes.Redis:
        promisesList.push(redisCheck(item));
        break;
      case HealthTypes.Memcached.toString():
        promisesList.push(memcacheCheck(resolveHost(item)));
        break;
      case HealthTypes.Web:
        promisesList.push(webCheck(resolveHost(item)));
        break;
      case HealthTypes.Dynamo:
        promisesList.push(dynamoCheck(resolveHost(item)));
        break;
      case HealthTypes.Database:
        promisesList.push(databaseCheck(resolveHost(item)));
        break;
    }
  });
  const results = await Promise.all(promisesList);
  const integrations = results.map((item) => item);
  return {
    name: config.name || "",
    version: config.version || "",
    status: !integrations.some(({ status: Status }) => Status === false),
    date: new Date(),
    duration: getDeltaTime(start),
    integrations,
  };
}
/**
 * redisCheck used to check all redis integrations informed
 * @param config IntegrationConfig with redis parameters
 */
async function redisCheck(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  const result = await checkRedisClient(config);
  config.port = config.port || Defaults.RedisPort;
  config.db = config.db || Defaults.RedisDB;
  return {
    name: config.name,
    kind: HealthIntegration.RedisIntegration,
    status: result.status,
    response_time: getDeltaTime(start),
    url: resolveHost(config).host,
    error: result.error,
  };
}
/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
async function memcacheCheck(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.MemcachedTimeout;
  const check = await checkMemcachedClient(config);
  return {
    name: config.name,
    kind: HealthIntegration.MemcachedIntegration,
    status: check.status,
    response_time: getDeltaTime(start),
    url: config.host,
    error: check.error,
  };
}
/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
async function webCheck(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.WebTimeout;
  const result = await checkWebIntegration(config);
  return {
    name: config.name,
    kind: HealthIntegration.WebServiceIntegration,
    status: result.status,
    response_time: getDeltaTime(start),
    url: config.host,
    error: result.error,
  };
}

async function dynamoCheck(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.WebTimeout;
  const result = await checkDynamodbClient(config);
  return {
    name: config.name,
    kind: HealthIntegration.DynamoDbIntegration,
    status: result.status,
    response_time: getDeltaTime(start),
    url: config.host,
    error: result.error,
  };
}

async function databaseCheck(config: IntegrationConfig): Promise<Integration> {
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

/**
 * used to concat host:port
 * @param config IntegrationConfig
 */
function resolveHost(config: IntegrationConfig): IntegrationConfig {
  if (config.port) {
    config.host += ":" + config.port;
  }
  return config;
}
/**
 * Used to calculate all time deltas
 * @param time is a Date().getTime()
 */
function getDeltaTime(time: number): number {
  return (new Date().getTime() - time) / 1000;
}
