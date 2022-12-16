import { ApplicationHealthSimple } from "./interfaces/types";

/**
 * HealthcheckerSimpleCheck perform a simple application check
 * @returns ApplicationHealthSimple
 */
export function HealthcheckerSimpleCheck(): ApplicationHealthSimple {
  return {
    status: "fully functional",
  };
}
