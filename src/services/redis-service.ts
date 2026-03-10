import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

export async function checkRedisClient(config: IntegrationConfig): Promise<HTTPChecker> {
  let client;
  try {
    // lazy loading redis package to enable peer dependency to be opbtional
    const { createClient } = await import("redis");
    client = createClient({
      socket: {
        host: config.host,
        port: config.port || Defaults.RedisPort,
        timeout: config.timeout || Defaults.RedisTimeout,
      },
      database: config.db || Defaults.RedisDB,
      password: config.auth?.password,
      username: config.auth?.user,
    });
    await client.connect();
    const result = await client.ping();
    return { status: result === "PONG" };
  } catch (error) {
    return { status: false, error };
  } finally {
    if (client) {
      client.destroy();
    }
  }
}
