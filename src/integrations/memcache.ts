import { IntegrationConfig, Integration, Defaults, HealthIntegration, BaseCheckOptions } from "../interfaces/types";
import { getDeltaTime } from "../lib";
import { checkMemcachedClient } from "../services/memcache-service";

type MemcacheCheckOptions = BaseCheckOptions & {
  host: string;
};

export function memcacheCheck(options: MemcacheCheckOptions): IntegrationConfig {
  return {
    check: memcacheCheckImpl,
    ...options,
  };
}

/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
async function memcacheCheckImpl(config: IntegrationConfig): Promise<Integration> {
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
