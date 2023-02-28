import { Checkers, kinds, Integrations, getDeltaTime, Defaults } from "../interfaces/types"
import { createClient, ClientOpts } from "redis";

export interface RedisConfig {
  name: string
  options: ClientOpts
}
export class RedisTester implements Checkers {
  config: RedisConfig
  constructor(config: RedisConfig) {
    config.options.connect_timeout ?? Defaults.RedisTimeout
    this.config = config

  }
  check(): Promise<Integrations> {
    const config = this.config
    const result: Integrations = {
      name: config.name,
      kind: kinds.Redis,
      status: true,
      url: config.options.host || '' + config.options.port || '',
      response_time: 0
    }
    return new Promise<Integrations>((resolve, _) => {
      const start = new Date().getTime()
      const client = createClient(config.options)
      client.on("error", (error: any) => {
        client.end(true)
        result.status = false
        result.response_time = getDeltaTime(start)
        result.error = error
        resolve(result)
      })
      client.ping((status) => {
        client.end(true)
        result.status = status === null
        result.response_time = getDeltaTime(start)
        result.error = status !== null ? status : undefined
        resolve(result)
      })
    })
  }
}
