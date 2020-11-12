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
    ["should memcached be tested and return: truthy", cenarios.memcachedTruthy],
    // ["should memcached be tested and return: falsy", cenarios.memcachedFalsy], // lib memcache can't handle falsy in test mode
    ["should web be tested and return: truthy", cenarios.webIntegrationTruthy],
    ["should web be tested and return: falsy", cenarios.webIntegrationFalsy],
    ["should Aws DynamoBD be tested and return: truthy", cenarios.dynamoIntegrationTruthy],
    ["should Aws DynamoBD be tested and return: falsy", cenarios.dynamoIntegrationFalsy],
  ])("Test: %s ", async (_, cenario) => {
    const result = await HealthcheckerDetailedCheck({
      integrations: [cenario.config],
    });
    expect(result.status).toBe(cenario.expected);
  });
});
