import { IntegrationConfig, Integration, Defaults, HealthIntegration, BaseCheckOptions, Auth } from "../interfaces/types";
import { getDeltaTime, resolveHost } from "../lib";
import { checkRedisClient } from "../services/redis-service";

type RedisCheckOptions = BaseCheckOptions & {
  host: string;
  db?: number | undefined;
  auth?: Auth;
  port?: number;
};

export function redisCheck(options: RedisCheckOptions): IntegrationConfig {
  return {
    check: redisCheckImpl,
    ...options,
  };
}

/**
 * redisCheck used to check all redis integrations informed
 * @param config IntegrationConfig with redis parameters
 */
async function redisCheckImpl(config: IntegrationConfig): Promise<Integration> {
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
