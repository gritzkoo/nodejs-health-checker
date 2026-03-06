import Memcached from "memcached";
import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types";

/**
 * Perform a memcache instance config and call to check
 * if the service is available
 * @param config IntegrationConfig
 * @returns Promise<HTTPChecker>
 */
export function checkMemcachedClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve) => {
    const client = new Memcached(config.host, {
      timeout: config.timeout,
      retry: 1,
      retries: 1,
    });

    let resolved = false;

    const cleanup = () => {
      if (!resolved) {
        resolved = true;
        client.end();
      }
    };

    const timeout = setTimeout(() => {
      cleanup();
      resolve({
        status: false,
        error: "Timeout",
      });
    }, config.timeout || Defaults.MemcachedTimeout);

    client.on("issue", (error) => {
      clearTimeout(timeout);
      cleanup();
      resolve({
        status: false,
        error,
      });
    });

    client.stats((error, status) => {
      clearTimeout(timeout);
      cleanup();
      resolve({
        status: !!status?.length,
        error,
      });
    });
  });
}
