import { HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

/**
 * Perform a memcache instance config and call to check
 * if the service is available
 * @param config IntegrationConfig
 * @returns Promise<HTTPChecker>
 */
export async function checkMemcachedClient(config: IntegrationConfig): Promise<HTTPChecker> {
  let client;
  try {
    // lazy loading memcache package to enable peer dependency to be optional
    const { default: Memcache } = await import("memcache");
    client = new Memcache({
      nodes:[config.host],
      timeout: config.timeout,
      keepAlive: false,
    });
    await client.connect();
    const result = await client.stats();
    return {status: !!result};
  } catch (error) {
    return { status: false, error };
  } finally {
    if (client) {
      client.disconnect();
    }
  }
}
