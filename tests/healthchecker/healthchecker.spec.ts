import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "../../src/healthchecker/healthchecker";
import { scenarios } from "./healthchecker.mocks";

// all this tests must be exec in docker context
describe("Testing the main funcionalyties", () => {
  it("should test simple return a fully functional", () => {
    const result = HealthcheckerSimpleCheck();
    expect(result).toMatchObject({ status: "fully functional" });
  });

  it.each([
    ["should redis be tested and return: truthy", scenarios.redisTruthy],
    ["should redis be tested and return: falsy", scenarios.redisFalsy],
    ["should Aws DynamoBD be tested and return: truthy", scenarios.dynamoIntegrationTruthy],
    ["should Aws DynamoBD be tested and return: falsy", scenarios.dynamoIntegrationFalsy],
    ["should web be tested and return: truthy", scenarios.webIntegrationTruthy],
    ["should web be tested and return: falsy", scenarios.webIntegrationFalsy],
    ["should web be tested and get a timeout and return: falsy", scenarios.webIntegrationTimeout],
    ["should memcached be tested and return: truthy", scenarios.memcachedTruthy],
    ["should memcached be tested and use default timeout and return: truthy", scenarios.memcachedDefaultTimeout],
    ["should memcached be tested and return: falsy", scenarios.memcachedFalsy], // lib memcache can't handle falsy in test mode,
    ["should database be tested and return: truthy", scenarios.databaseIntegrationTruthy],
    ["should database be tested and return: falsy", scenarios.databaseIntegrationFalsy],
    ["should custom function be tested and return: truthy", scenarios.customIntegrationTruthy],
    ["should custom function be tested and return: falsy", scenarios.customIntegrationFalsy],
    ["should custom function with missing function should return: falsy", scenarios.customIntegrationMissingFunction],
    ["should custom function throws error should return: falsy", scenarios.customIntegrationFunctionThrows],
  ])("Test: %s ", async (_, scenario) => {
    const result = await HealthcheckerDetailedCheck({
      integrations: [scenario.config],
    });
    expect(result.status).toBe(scenario.expected);
  });
});
