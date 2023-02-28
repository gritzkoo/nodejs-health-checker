import { Checkers, kinds, Integrations, getDeltaTime, Defaults } from "../interfaces/types"
import Memcached from "memcached";

export interface MemcacheConfig {
  name: string
  server: Memcached.Location
  options?: Memcached.options
}
export class MemcacheTester implements Checkers {
  config: MemcacheConfig
  constructor(config: MemcacheConfig) {
    config.options = config.options || {}
    config.options.timeout = config.options.timeout || Defaults.MemcachedTimeout
    config.options.retry = config.options.retry || 1
    config.options.retries = config.options.retries || 1
    this.config = config
  }
  check(): Promise<Integrations> {
    const config = this.config
    const result: Integrations = {
      name: config.name,
      kind: kinds.Mencached,
      status: true,
      url: JSON.stringify(config.server),
      response_time: 0
    }
    return new Promise<Integrations>((resolve, _) => {
      const start = new Date().getTime();
      const client = new Memcached(config.server, config.options);
      client.on("issue", (error) => {
        client.end();
        result.status = false
        result.response_time = getDeltaTime(start)
        result.error = error
        resolve(result);
      });
      client.stats((error, status) => {
        client.end();
        result.status = !!status.length
        result.response_time = getDeltaTime(start)
        result.error = error
        resolve(result);
      });
    })
  }
}
