import {
  Checkers,
  kinds,
  Integrations,
  getDeltaTime,
} from "../interfaces/types"

import { Sequelize, Options } from "sequelize";

export interface DatabaseConfig {
  name: string
  options: Options

}
export class DatabaseTester implements Checkers {
  config: DatabaseConfig
  constructor(config: DatabaseConfig) {
    this.config = config
  }
  check(): Promise<Integrations> {
    const config = this.config
    const result: Integrations = {
      name: config.name,
      kind: kinds.Database,
      status: true,
      url: config.options.host || '',
      response_time: 0
    }
    return new Promise<Integrations>((resolve, _) => {
      const start = new Date().getTime()
      const sequelize = new Sequelize(config.options);
      // check authenticate to database
      sequelize.authenticate().catch(error => {
        result.status = false
        result.error = error
      }).finally(() => {
        sequelize.close()
        result.response_time = getDeltaTime(start)
        resolve(result)
      })
    })
  }
}
