import { Defaults, HealthIntegration, HTTPChecker, Integration, IntegrationConfig } from "../interfaces/types";
import { getDeltaTime } from "../lib";

type CustomCheckOptions = {
  timeout?: number;
  customCheckerFunction: () => Promise<HTTPChecker>;
  name: string;
  host?: string;
};

export function customCheck(options: CustomCheckOptions): IntegrationConfig {
  return {
    check: customCheckImpl,
    name: options.name,
    host: options.host || "localhost",
  };
}

/**
 * Runs the custom checker function.
 * Any exceptions are caught and error is sent as part of
 * @param config IntegrationConfig for the custom function check
 * @returns Integration result
 */
async function customCheckImpl(config: IntegrationConfig): Promise<Integration> {
  const start = new Date().getTime();
  config.timeout = config.timeout || Defaults.WebTimeout;
  try {
    const result = config.customCheckerFunction ? await config.customCheckerFunction() : { status: false, error: "No custom function present" };
    return {
      name: config.name,
      kind: HealthIntegration.CustomIntegration,
      status: result.status,
      response_time: getDeltaTime(start),
      url: config.host,
      error: result.error,
    };
  } catch (error) {
    return {
      name: config.name,
      kind: HealthIntegration.CustomIntegration,
      status: false,
      response_time: getDeltaTime(start),
      url: config.host,
      error,
    };
  }
}
