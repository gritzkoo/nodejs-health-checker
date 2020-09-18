import { createClient } from "redis";
import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkRedisClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve, _) => {
    const client = createClient({
      host: config.host,
      db: config.db || 0,
      password: config.auth?.password,
      connect_timeout: config.timeout || Defaults.RedisTimeout,
      port: config.port || 6379,
    });
    client.on("error", (error: any) => {
      client.end(true);
      resolve({
        status: false,
        error,
      });
    });
    client.ping((status) => {
      client.end(true);
      resolve({
        status: status === null,
        error: status !== null ? status : undefined,
      });
    });
  });
}
