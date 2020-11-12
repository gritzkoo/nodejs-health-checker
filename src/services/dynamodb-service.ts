import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkDynamodbClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise(async (resolve, _) => {
    // init dynamo client
    const client = new DynamoDBClient({
      endpoint: config.host,
      region: config.Aws?.region || "us-east-1",
      credentials: {
        accessKeyId: config.Aws?.access_key_id || "",
        secretAccessKey: config.Aws?.secret_access_key || "",
      },
      maxAttempts: 1,
    });
    // check if package table exists
    try {
      const result = await client.send(new ListTablesCommand({}));
      resolve({
        status: !!result,
      });
    } catch (error) {
      resolve({
        status: false,
        error,
      });
    }
  });
}
