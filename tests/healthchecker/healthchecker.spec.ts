import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "../../src/healthchecker/healthchecker";
import { cenarios } from "./healthchecker.mocks";

// all this tests must be exec in docker context
describe("Testing the main funcionalyties", () => {
  it("should test simple return a fully functional", () => {
    const result = HealthcheckerSimpleCheck();
    expect(result).toMatchObject({ status: "fully functional" });
  });

  it.each([
    ["should redis be tested and return: truthy", cenarios.redisTruthy],
    ["should redis be tested and return: falsy", cenarios.redisFalsy],
    ["should Aws DynamoBD be tested and return: truthy", cenarios.dynamoIntegrationTruthy],
    ["should Aws DynamoBD be tested and return: falsy", cenarios.dynamoIntegrationFalsy],
    ["should web be tested and return: truthy", cenarios.webIntegrationTruthy],
    ["should web be tested and return: falsy", cenarios.webIntegrationFalsy],
    ["should web be tested and get a timeout and return: falsy", cenarios.webIntegrationTimeout],
    ["should memcached be tested and return: truthy", cenarios.memcachedTruthy],
    ["should memcached be tested and use default timeout and return: truthy", cenarios.memcachedDefaultTimeout],
    ["should memcached be tested and return: falsy", cenarios.memcachedFalsy], // lib memcache can't handle falsy in test mode,
    ["should database be tested and return: truthy", cenarios.databaseIntegrationTruthy],
    ["should database be tested and return: falsy", cenarios.databaseIntegrationFalsy],
  ])("Test: %s ", async (_, cenario) => {
    const result = await HealthcheckerDetailedCheck({
      integrations: [cenario.config],
    });
    expect(result.status).toBe(cenario.expected);
  });
});
