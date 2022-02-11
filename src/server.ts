import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "./healthchecker/healthchecker";
import { Dialects, HealthTypes, HTTPChecker } from "./interfaces/types";
import { REDIS_HOST, MEMCACHED_HOST, WEB_HOST, DYNAMO_HOST, DATABASE_HOST } from "./envs";

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
        {
          type: HealthTypes.Redis,
          name: "redis integration",
          host: REDIS_HOST,
        },
        {
          type: HealthTypes.Memcached,
          name: "My memcache integration",
          host: `${MEMCACHED_HOST}:11211`,
        },
        {
          type: HealthTypes.Memcached,
          name: "My memcache integration false",
          host: `${MEMCACHED_HOST}:11299`,
        },
        {
          type: HealthTypes.Web,
          name: "my web api integration",
          host: WEB_HOST,
          headers: [{ key: "Accept", value: "application/json" }],
        },
        {
          type: HealthTypes.Dynamo,
          name: "my dynamo",
          host: DYNAMO_HOST,
          port: 8000,
          Aws: {
            region: "us-east-1",
            access_key_id: "",
            secret_access_key: "",
          },
        },
        {
          type: HealthTypes.Database,
          name: "my database",
          host: DATABASE_HOST,
          dbPort: 5432,
          dbName: "postgres",
          dbUser: "postgres",
          dbPwd: "root",
          dbDialect: Dialects.postgres,
        },
        {
          type: HealthTypes.Custom,
          name: "my custom integration",
          host: "localhost",
          customCheckerFunction: async (): Promise<HTTPChecker> => {
            return new Promise((resolve, _) => {
              resolve({
                status: true,
                error: null,
              });
            });
          },
        },
      ],
    })
  );
});

export default server;
