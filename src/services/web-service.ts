import { HTTPChecker, IntegrationConfig } from "../interfaces/types.js";

export async function checkWebIntegration(config: IntegrationConfig): Promise<HTTPChecker> {
  const controller = new AbortController();
  let timeoutId;
  try {
    const headers = config.headers?.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
    timeoutId = setTimeout(() => {
      controller.abort();
    }, config.timeout);
    const response = await fetch(config.host, {
      headers,
      signal: controller.signal,
      // Force connection close
      keepalive: false,
    });
    // Force close the response body
    if (response.body) {
      response.body.cancel();
    }
    return {
      status: response.status === 200,
      error: response.status !== 200 ? { http_status: response.status } : undefined,
    };
  } catch (error) {
    return {
      status: false,
      error,
    };
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
