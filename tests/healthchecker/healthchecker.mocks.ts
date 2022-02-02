import { Dialects, HealthTypes, IntegrationConfig } from "../../src/interfaces/types";
import { REDIS_HOST, MEMCACHED_HOST, WEB_HOST, DYNAMO_HOST, DATABASE_HOST } from "../../src/envs";

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
      host: REDIS_HOST,
    },
  },
  redisFalsy: {
    expected: false,
    config: {
      name: "jest-test-redis",
      type: HealthTypes.Redis,
      host: REDIS_HOST,
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
      host: MEMCACHED_HOST,
      port: 11211,
    },
  },
  memcachedDefaultTimeout: {
    expected: true,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: MEMCACHED_HOST,
      port: 11211,
      timeout: 1001,
    },
  },
  memcachedFalsy: {
    expected: false,
    config: {
      name: "jest-test-memcached",
      type: HealthTypes.Memcached,
      host: MEMCACHED_HOST,
      port: 11299,
    },
  },
  webIntegrationTruthy: {
    expected: true,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: WEB_HOST,
    },
  },
  webIntegrationFalsy: {
    // status 404
    expected: false,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: `${WEB_HOST}sssssssss`,
      timeout: 4000,
      headers: [{ key: "Accept", value: "application/json" }],
    },
  },
  webIntegrationTimeout: {
    expected: false,
    config: {
      name: "jest-test-web",
      type: HealthTypes.Web,
      host: `${WEB_HOST}sssssssss`,
      timeout: 4,
      headers: [{ key: "Accept", value: "application/json" }],
    },
  },
  dynamoIntegrationTruthy: {
    expected: true,
    config: {
      type: HealthTypes.Dynamo,
      name: "jest-test-dynamodb",
      host: DYNAMO_HOST,
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
      host: DYNAMO_HOST,
      port: 8001,
    },
  },
  databaseIntegrationTruthy: {
    expected: true,
    config: {
      type: HealthTypes.Database,
      name: "jest-test-postgres",
      host: DATABASE_HOST,
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
      host: DATABASE_HOST,
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
