import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "./healthchecker/healthchecker";
import { HealthTypes } from "./interfaces/types";

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
          host: "redis",
        },
        {
          type: HealthTypes.Memcached,
          name: "My memcache integration",
          host: "memcache:11211",
        },
        {
          type: HealthTypes.Web,
          name: "my web api integration",
          host: "https://github.com/status",
          headers: [{ key: "Accept", value: "application/json" }],
        },
        {
          type: HealthTypes.Dynamo,
          name: "my dynamo",
          host: "http://localhost",
          port: 8000,
          Aws: {
            region: "us-east-1",
            access_key_id: "",
            secret_access_key: "",
          },
        },
      ],
    })
  );
});

export default server;
