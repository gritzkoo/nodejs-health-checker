import { REDIS_HOST, MEMCACHED_HOST, WEB_HOST, DYNAMO_HOST, DATABASE_HOST } from "../../src/envs";
import { DatabaseTester } from "../../src/integrations/database";
import { AwsDynamoDBTester } from "../../src/integrations/dynamodb";
import { HttpTester } from "../../src/integrations/http";
import { MemcacheTester } from "../../src/integrations/memcached";
import { RedisTester } from "../../src/integrations/redis";
import { Checkers } from "../../src/interfaces/types";

export interface TestScenario {
  [key: string]: HealthTestConfig;
}

export interface HealthTestConfig {
  expected: boolean;
  config: Checkers;
}
// all this tests must be exec in docker context
export const scenarios: TestScenario = {
  redisTruthy: {
    expected: true,
    config: new RedisTester({
      name: 'jest-test-redis',
      options: {
        host: REDIS_HOST
      }
    })
  },
  redisFalsy: {
    expected: false,
    config: new RedisTester({
      name: 'jest-test-redis',
      options: {
        host: REDIS_HOST,
        port: 9999
      }
    })
  },
  memcachedTruthy: {
    expected: true,
    config: new MemcacheTester({
      name: "jest-test-memcached",
      server: MEMCACHED_HOST + ':11211'
    })
  },
  memcachedDefaultTimeout: {
    expected: true,
    config: new MemcacheTester({
      name: "jest-test-memcached",
      server: MEMCACHED_HOST + ':11211',
      options: {
        timeout: 1001
      }
    })
  },
  memcachedFalsy: {
    expected: false,
    config: new MemcacheTester({
      name: "jest-test-memcached",
      server: MEMCACHED_HOST + ':11299',
    })
  },
  webIntegrationTruthy: {
    expected: true,
    config: new HttpTester({
      name: "jest-test-web",
      host: WEB_HOST
    })
  },
  webIntegrationFalsy: {
    // status 404
    expected: false,
    config: new HttpTester({
      name: "jest-test-web",
      host: `${WEB_HOST}sssssssss`,
      timeout: 4000,
      headers: [{ key: "Accept", value: "application/json" }],
    })
  },
  webIntegrationTimeout: {
    expected: false,
    config: new HttpTester({
      name: "jest-test-web",
      host: `${WEB_HOST}sssssssss`,
      timeout: 4,
      headers: [{ key: "Accept", value: "application/json" }],
    })
  },
  dynamoIntegrationTruthy: {
    expected: true,
    config: new AwsDynamoDBTester({
      name: "my dynamo",
      options: {
        endpoint: DYNAMO_HOST + ":8000",
        region: 'us-east-1',
        credentials: {
          accessKeyId: '',
          secretAccessKey: ''
        }
      }
    }),
  },
  dynamoIntegrationFalsy: {
    expected: false,
    config: new AwsDynamoDBTester({
      name: "my dynamo",
      options: {
        endpoint: DYNAMO_HOST + ":8001",
        region: 'us-east-1',
        credentials: {
          accessKeyId: '',
          secretAccessKey: ''
        }
      }
    }),
  },
  databaseIntegrationTruthy: {
    expected: true,
    config: new DatabaseTester({
      name: "My sql tester",
      options: {
        host: DATABASE_HOST,
        password: 'root',
        username: 'postgres',
        database: 'postgres',
        dialect: 'postgres'
      }
    }),
  },
  databaseIntegrationFalsy: {
    expected: false,
    config: new DatabaseTester({
      name: "My sql tester",
      options: {
        host: DATABASE_HOST,
        password: 'root',
        username: 'postgres',
        database: 'postgres',
        dialect: 'postgres',
        port: 8000
      }
    }),
  },
};
