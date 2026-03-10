import { HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

export async function checkDynamodbClient(config: IntegrationConfig): Promise<HTTPChecker> {
  let client;
  try {
    // lazy loading aws-sdk/client-dynamodb package to enable peer dependency to be optional
    const aws = await import("@aws-sdk/client-dynamodb");
    client = new aws.DynamoDBClient({
      endpoint: config.host,
      region: config.Aws?.region || "us-east-1",
      credentials: {
        accessKeyId: config.Aws?.access_key_id || "",
        secretAccessKey: config.Aws?.secret_access_key || "",
      },
      maxAttempts: 1,
    });
    const result = await client.send(new aws.ListTablesCommand({}));
    return { status: !!result };
  } catch (error) {
    return { status: false, error };
  } finally {
    if (client) {
      client.destroy();
    }
  }
}
