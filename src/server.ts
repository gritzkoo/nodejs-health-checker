import express from "express";
import { checker } from './oi'
const server = express();

server.get("/", (_, res) => {
  res.send("Hello ts-node!");
});

server.get("/health-check/liveness", (_, res) => {
  res.send(checker.liveness)
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(await checker.readiness())
});

server.listen(8888, () => {
  console.log(`[SERVER] Running at http://localhost:8888`);
});

export default server;
