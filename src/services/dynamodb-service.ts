import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkDynamodbClient(config: IntegrationConfig): Promise<HTTPChecker> {
  const client = new DynamoDBClient({
    endpoint: config.host,
    region: config.Aws?.region || "us-east-1",
    credentials: {
      accessKeyId: config.Aws?.access_key_id || "",
      secretAccessKey: config.Aws?.secret_access_key || "",
    },
    maxAttempts: 1,
  });

  try {
    const result = await client.send(new ListTablesCommand({}));
    return {
      status: !!result,
    };
  } catch (error) {
    return {
      status: false,
      error,
    };
  } finally {
    client.destroy();
  }
}
