[![Build Status](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)
[![Build Status](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)
[![Build Status](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)
[![Build Status](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)
[![Build Status](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)
[![Build Status](https://img.shields.io/github/downloads/gritzkoo/nodejs-health-checker/total)](https://img.shields.io/github/downloads/gritzkoo/nodejs-health-checker/total)
[![Build Status](https://img.shields.io/npm/dy/nodejs-health-checker)](https://img.shields.io/npm/dy/nodejs-health-checker)

# nodejs-health-checker

Simple Node package to simplify applications based in Nodejs, to trace the healthy of the pods

## How to install

```sh
npm i nodejs-health-checker
```

## How to use

There are 2 ways of call this package, __*simple*__ and __*detailed*__ as the example below

```javascript
import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "./healthchecker/healthchecker";
import { HealthTypes } from "./interfaces/types";

const server = express();

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
      ],
    })
  );
});

export default server;
```

This simple call will return a JSON as below

```json
{
  "status": "fully functional"
}
```

And detailed call will return a JSON as below

```json
{
    "name": "My node application",
    "version": "my version",
    "status": true,
    "date": "2020-09-18T15:29:41.616Z",
    "duration": 0.523,
    "integrations": [
        {
            "name": "redis integration",
            "kind": "Redis DB integration",
            "status": true,
            "response_time": 0.044,
            "url": "redis:6379"
        },
        {
            "name": "My memcache integration",
            "kind": "Memcached integraton",
            "status": true,
            "response_time": 0.038,
            "url": "memcache:11211"
        },
        {
            "name": "my web api integration",
            "kind": "Web integrated API",
            "status": true,
            "response_time": 0.511,
            "url": "https://github.com/status"
        }
    ]
}
```

## How it works

You can *__git clone__* this repo and try

```sh
docker-compose build
docker-compose up app
```

And using you browser you can call:
* [Simple Call](http://localhost:8888/health-check/simple)
* [Detailed Call](http://localhost:8888/health-check/detailed)

And to run tests

```sh
docker-compose run test
```
