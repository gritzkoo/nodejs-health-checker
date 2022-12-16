import express from "express";
import { HealthcheckerDetailedCheck } from "./detailedCheck";
import { Dialects, HTTPChecker } from "./interfaces/types";
import { REDIS_HOST, MEMCACHED_HOST, WEB_HOST, DYNAMO_HOST, DATABASE_HOST } from "./envs";
import { HealthcheckerSimpleCheck } from "./simpleCheck";
import { redisCheck } from "./integrations/redis";
import { memcacheCheck } from "./integrations/memcache";
import { webCheck } from "./integrations/web";
import { dynamoCheck } from "./integrations/dynamo";
import { databaseCheck } from "./integrations/database";
import { customCheck } from "./integrations/custom";
const server = express();

server.get("/", (_, res) => {
  res.send("Hello ts-node!");
});

server.get("/health-check/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(
    await HealthcheckerDetailedCheck({
      name: "My node application",
      version: "my version",
      integrations: [
        redisCheck({
          name: "redis integration",
          host: REDIS_HOST,
        }),
        memcacheCheck({
          name: "my memcache integration false",
          host: `${MEMCACHED_HOST}:11211`,
        }),
        memcacheCheck({
          name: "my memcache integration false",
          host: `${MEMCACHED_HOST}:11299`,
        }),
        webCheck({
          name: "my web api integration",
          url: WEB_HOST,
          headers: [{ key: "Accept", value: "application/json" }],
        }),
        dynamoCheck({
          name: "my dynamo",
          host: DYNAMO_HOST,
          port: 8000,
          Aws: {
            region: "us-east-1",
            access_key_id: "",
            secret_access_key: "",
          },
        }),
        databaseCheck({
          name: "my database",
          host: DATABASE_HOST,
          port: 5432,
          dbName: "postgres",
          dbUser: "postgres",
          dbPwd: "root",
          dbDialect: Dialects.postgres,
        }),
        customCheck({
          name: "my custom check",
          customCheckerFunction: async (): Promise<HTTPChecker> => {
            return new Promise((resolve, _) => {
              resolve({
                status: true,
                error: null,
              });
            });
          },
        }),
      ],
    })
  );
});

export default server;
