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
      retry: 1,
      retries: 1,
    });
    client.on("issue", (error) => {
      client.end();
      resolve({
        status: false,
        error,
      });
    });
    client.stats((error, status) => {
      client.end();
      resolve({
        status: !!status.length,
        error,
      });
    });
  });
}
