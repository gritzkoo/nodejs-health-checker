import { Dialects, HealthTypes, IntegrationConfig } from "../../src/interfaces/types";

export interface HealthCheckDetailedTestScenario {
  [key: string]: HealthCheckDetailedTestConfig;
}

export interface HealthCheckDetailedTestConfig {
  expected: boolean;
  config: IntegrationConfig;
}
// all this tests must be exec in docker context
export const scenarios: HealthCheckDetailedTestScenario = {
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
      auth: {
        password: "sdf",
      },
    },
  },
  memcachedTruthy: {
    expected: true,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: "localhost",
      port: 11211,
    },
  },
  memcachedDefaultTimeout: {
    expected: true,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: "localhost",
      port: 11211,
      timeout: 1001,
    },
  },
  memcachedFalsy: {
    expected: false,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: "localhost",
      port: 11299,
    },
  },
  webIntegrationTruthy: {
    expected: true,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: "https://github.com/status",
    },
  },
  webIntegrationFalsy: {
    // status 404
    expected: false,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: "https://github.com/statussssss",
      timeout: 4000,
      headers: [{ key: "Accept", value: "application/json" }],
    },
  },
  webIntegrationTimeout: {
    expected: false,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: "https://github.com/statussssss",
      timeout: 4,
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
    },
  },
  databaseIntegrationTruthy: {
    expected: true,
    config: {
      type: HealthTypes.Database,
      name: "jest-test-postgres",
      host: "localhost",
      dbPort: 5432,
      dbName: "postgres",
      dbUser: "postgres",
      dbPwd: "root",
      dbDialect: Dialects.postgres,
    },
  },
  databaseIntegrationFalsy: {
    expected: false,
    config: {
      type: HealthTypes.Database,
      name: "jest-test-postgres",
      host: "http://localhost",
      dbPort: 8001,
    },
  },
  customIntegrationTruthy: {
    expected: true,
    config: {
      type: HealthTypes.Custom,
      name: "custom-integration",
      host: "not-needed",
      customCheckerFunction: async () => {
        return {
          status: true,
        };
      },
    },
  },
  customIntegrationFalsy: {
    expected: false,
    config: {
      type: HealthTypes.Custom,
      name: "custom-integration",
      host: "not-needed",
      customCheckerFunction: async () => {
        return {
          status: false,
          error: { message: "Something has failed" },
        };
      },
    },
  },
  customIntegrationMissingFunction: {
    expected: false,
    config: {
      type: HealthTypes.Custom,
      name: "custom-integration-missing-function",
      host: "my-custom-integration-host",
      customCheckerFunction: undefined,
    },
  },
  customIntegrationFunctionThrows: {
    expected: false,
    config: {
      type: HealthTypes.Custom,
      name: "custom-integration-missing-function",
      host: "my-custom-integration-host",
      customCheckerFunction: () => {
        throw new Error("Help!");
      },
    },
  },
};
