// Main entry point for nodejs-health-checker
export {
  HealthcheckerSimpleCheck,
  HealthcheckerDetailedCheck,
} from "./healthchecker/healthchecker.js";

export type {
  ApplicationConfig,
  ApplicationHealthDetailed,
  ApplicationHealthSimple,
  Auth,
  Aws,
  HTTPChecker,
  HTTPHeader,
  Integration,
  IntegrationConfig,
} from "./interfaces/types.js";

export {
  HealthTypes,
  HealthIntegration,
  Dialects,
  Defaults,
} from "./interfaces/types.js";
