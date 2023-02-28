import { HealthChecker } from './index'
import { AwsDynamoDBTester } from './integrations/dynamodb'
import { MemcacheTester } from './integrations/memcached'
import { HttpTester } from './integrations/http'
import { RedisTester } from './integrations/redis'
import { DATABASE_HOST, DYNAMO_HOST, MEMCACHED_HOST, REDIS_HOST } from './envs'
import { DatabaseTester } from './integrations/database'

export const checker = new HealthChecker({
  name: "My app",
  version: "V1.0.0",
  integrations: [
    new RedisTester({
      name: "Redis session integration",
      options: {
        host: REDIS_HOST
      }
    }),
    new MemcacheTester({
      name: "Memcached for configurations",
      server: MEMCACHED_HOST + ":11211",
    }),
    new AwsDynamoDBTester({
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
    new HttpTester({
      name: "github integration",
      host: "https://github.com/status"
    }),
    new DatabaseTester({
      name: "My sql tester",
      options: {
        host: DATABASE_HOST,
        password: 'root',
        username: 'postgres',
        database: 'postgres',
        dialect: 'postgres'
      }
    })
  ]
})
