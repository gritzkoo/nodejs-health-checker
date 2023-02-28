import {
  Checkers,
  kinds,
  Integrations,
  getDeltaTime,
  Defaults,
  HTTPHeader
} from "../interfaces/types"

import fetch from "node-fetch";

export interface HttpConfig {
  name: string
  host: string
  timeout?: number
  headers?: HTTPHeader[]
}
export class HttpTester implements Checkers {
  config: HttpConfig
  constructor(config: HttpConfig) {
    this.config = config
  }
  check(): Promise<Integrations> {
    const config = this.config
    const result: Integrations = {
      name: config.name,
      kind: kinds.WebAPI,
      status: true,
      url: config.host,
      response_time: 0
    }
    return new Promise<Integrations>((resolve, _) => {
      const start = new Date().getTime()
      const headers = config.headers?.map((item) => {
        return [item.key, item.value];
      });
      fetch(result.url, {
        timeout: config.timeout || Defaults.WebTimeout,
        headers
      }).then((response) => {
        result.status = response.status === 200
        result.error = response.status !== 200 ? { http_status: response.status } : undefined
      }).catch((error) => {
        result.status = false
        result.error = error
      }).finally(() => {
        result.response_time = getDeltaTime(start)
        resolve(result)
      })
    })
  }
}
