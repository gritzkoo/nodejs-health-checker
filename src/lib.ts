import { IntegrationConfig } from "./interfaces/types";

/**
 * used to concat host:port
 * @param config IntegrationConfig
 */
export function resolveHost(config: IntegrationConfig): IntegrationConfig {
  if (config.port) {
    config.host += ":" + config.port;
  }
  return config;
}
/**
 * Used to calculate all time deltas
 * @param time is a Date().getTime()
 */
export function getDeltaTime(time: number): number {
  return (new Date().getTime() - time) / 1000;
}
