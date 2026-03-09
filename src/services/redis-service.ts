import { createClient, RedisClientOptions } from "redis";
import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

export async function checkRedisClient(config: IntegrationConfig): Promise<HTTPChecker> {
  let client;
  try {
    const opt: RedisClientOptions = {
      socket: {
        host: config.host,
        port: config.port || Defaults.RedisPort,
        timeout: config.timeout || Defaults.RedisTimeout,
      },
      database: config.db || Defaults.RedisDB,
      password: config.auth?.password,
      username: config.auth?.user,
    };
    client = createClient(opt);
    await client.connect();
    const result = await client.ping();
    return { status: result === "PONG" };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  } finally {
    if (client) {
      client.destroy();
    }
  }
}
