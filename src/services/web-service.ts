import fetch from "node-fetch";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkWebIntegration(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve, _) => {
    const headers = config.headers?.map((item) => {
      return [item.key, item.value];
    });
    fetch(config.host, {
      timeout: config.timeout,
      headers,
    })
      .then((response) => {
        resolve({
          status: response.status === 200,
          error: response.status !== 200 ? { http_status: response.status } : undefined,
        });
      })
      .catch((error) => {
        resolve({
          status: false,
          error,
        });
      });
  });
}
