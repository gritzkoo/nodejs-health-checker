import { BaseCheckOptions, Defaults, HealthIntegration, HTTPHeader, Integration, IntegrationConfig } from "../interfaces/types";
import { getDeltaTime } from "../lib";
import { checkWebIntegration } from "../services/web-service";

type WebCheckOptions = BaseCheckOptions & {
  headers?: HTTPHeader[];
  url: string;
};

export function webCheck(options: WebCheckOptions): IntegrationConfig {
  return {
    check: webCheckImpl,
    host: options.url,
    ...options,
  };
}

/**
 * memcacheCheck used to check all Memcached integrations informed
 * @param config IntegrationConfig with memcached parameters
 */
async function webCheckImpl(config: IntegrationConfig): Promise<Integration> {
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
