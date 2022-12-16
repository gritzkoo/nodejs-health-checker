import { IntegrationConfig, Integration, Defaults, HealthIntegration, Aws, BaseCheckOptions } from "../interfaces/types";
import { getDeltaTime } from "../lib";
import { checkDynamodbClient } from "../services/dynamodb-service";

type DynamoCheckOptions = BaseCheckOptions & {
  Aws: Aws;
  host: string;
  port: number;
};

export function dynamoCheck(options: DynamoCheckOptions): IntegrationConfig {
  return {
    check: dynamoCheckImpl,
    ...options,
  };
}

async function dynamoCheckImpl(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.WebTimeout;
  const result = await checkDynamodbClient(config);
  return {
    name: config.name,
    kind: HealthIntegration.DynamoDbIntegration,
    status: result.status,
    response_time: getDeltaTime(start),
    url: config.host,
    error: result.error,
  };
}
