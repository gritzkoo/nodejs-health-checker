import { HealthTypes, IntegrationConfig } from "../../src/interfaces/types";

export interface HealthCheckDetailedTestCenario {
  [key: string]: HealthCheckDetailedTestconfig;
}

export interface HealthCheckDetailedTestconfig {
  expected: boolean;
  config: IntegrationConfig;
}
// all this tests must be exec in docker context
export const cenarios: HealthCheckDetailedTestCenario = {
  redisTruthy: {
    expected: true,
    config: {
      name: "jest-test-redis",
      type: HealthTypes.Redis,
      host: "localhost",
    },
  },
  redisFalsy: {
    expected: false,
    config: {
      name: "jest-test-redis",
      type: HealthTypes.Redis,
      host: "localhost",
      port: 100,
    },
  },
  memcachedTruthy: {
    expected: true,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: "localhost",
      port: 11211,
      timeout: 100,
    },
  },
  memcachedFalsy: {
    expected: false,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: "localhost",
      port: 100,
      timeout: 1,
    },
  },
  webIntegrationTruthy: {
    expected: true,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Web,
      host: "https://github.com/status",
    },
  },
  webIntegrationFalsy: {
    expected: false,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Web,
      host: "https://idonotexist(@#*$()).com/status",
      timeout: 1,
      headers: [{ key: "Accept", value: "application/json" }],
    },
  },
  dynamoIntegrationTruthy: {
    expected: true,
    config: {
      type: HealthTypes.Dynamo,
      name: "jest-test-dynamodb",
      host: "http://localhost",
      port: 8000,
      Aws: {
        region: "us-east-1",
        access_key_id: "",
        secret_access_key: "",
      },
    },
  },
  dynamoIntegrationFalsy: {
    expected: false,
    config: {
      type: HealthTypes.Dynamo,
      name: "jest-test-dynamodb",
      host: "http://localhost",
      port: 8001,
      Aws: {
        region: "us-east-1",
        access_key_id: "",
        secret_access_key: "",
      },
    },
  },
};
