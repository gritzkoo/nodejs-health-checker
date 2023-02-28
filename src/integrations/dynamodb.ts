import {
  Checkers,
  kinds,
  Integrations,
  getDeltaTime,
} from "../interfaces/types"

import { DynamoDBClient, ListTablesCommand, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export interface AwsDynamoDBConfig {
  name: string
  options: DynamoDBClientConfig

}
export class AwsDynamoDBTester implements Checkers {
  config: AwsDynamoDBConfig
  constructor(config: AwsDynamoDBConfig) {
    this.config = config
  }
  check(): Promise<Integrations> {
    const config = this.config
    // const endpointType = typeof config.options.endpoint
    const result: Integrations = {
      name: config.name,
      kind: kinds.AwsDynamoDB,
      status: true,
      url: "qualquerocisa",
      response_time: 0
    }
    return new Promise<Integrations>((resolve, _) => {
      const start = new Date().getTime()
      const client = new DynamoDBClient(config.options)
      client.send(new ListTablesCommand({})).then(query => {
        result.status = !!query
      }).catch(error => {
        result.status = false
        result.error = error
      }).finally(() => {
        result.response_time = getDeltaTime(start)
        resolve(result)
      })
    })
  }
}
