import Memcached from "memcached";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

/**
 * Perform a memcache instance config and call to check
 * if the service is available
 * @param config IntegrationConfig
 * @returns Promise<HTTPChecker>
 */
export function checkMemcachedClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve, _) => {
    const client = new Memcached(config.host, {
      timeout: config.timeout,
    });
    client.stats((error, status) => {
      client.end();
      resolve({
        status: !!status[0],
        error,
      });
    });
  });
}
