# nodejs-health-checker

<div align="center">

![npm](https://img.shields.io/npm/dt/nodejs-health-checker?style=for-the-badge)<br>
[![npm version](https://badge.fury.io/js/nodejs-health-checker.svg)](https://badge.fury.io/js/nodejs-health-checker)
[![test](https://github.com/gritzkoo/nodejs-health-checker/actions/workflows/main.yml/badge.svg)](https://github.com/gritzkoo/nodejs-health-checker/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/gritzkoo/nodejs-health-checker/badge.svg?branch=master)](https://coveralls.io/github/gritzkoo/nodejs-health-checker?branch=master)
[![License Status](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)
[![Issues Status](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)
[![Tag Status](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)
[![Languages Status](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)
[![Repo Size Status](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)
</div>

---

## Contributors

![contributors](https://contrib.rocks/image?repo=gritzkoo/nodejs-health-checker)

> Made with [contributors-img](https://contrib.rocks).

---

### Table of Contents

- [nodejs-health-checker](#nodejs-health-checker)
  - [Contributors](#contributors)
    - [Table of Contents](#table-of-contents)
  - [How to install](#how-to-install)
  - [Available integrations](#available-integrations)
    - [Redis](#redis)
    - [Web integration (HTTPS)](#web-integration-https)
    - [AWS DynamoDB](#aws-dynamodb)
    - [Databases](#databases)
    - [Custom Integration Support](#custom-integration-support)
  - [How to use (Express Example)](#how-to-use-express-example)
    - [Kubernetes Integration](#kubernetes-integration)

[CHANGELOG](./CHANGELOG.md)

---

This Node.js package allows you to monitor the health of your application. It provides two levels of health checking:

**1. Simple Check (Liveness):**
Confirms the application is online and responding. It does not check external integrations.
**Response Example:**

```json
{
  "status": "fully functional"
}
```

**2. Detailed Check (Readiness):**
Verifies if the application and all configured integrations (databases, caches, APIs) are operational.
**Response Example:**

```json
{
    "name": "My node application",
    "version": "1.0.0",
    "status": true,
    "date": "2026-03-10T15:29:41.616Z",
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
            "name": "my web api integration",
            "kind": "Web integrated API",
            "status": true,
            "response_time": 0.511,
            "url": "[https://github.com/status](https://github.com/status)"
        }
    ]
}

```

## How to install

```sh
npm i nodejs-health-checker

```

## Available integrations

- [x] Redis `(optional)`
- [x] Memcached `(optional)`
- [x] Web integration (HTTPS)
- [x] AWS DynamoDB `(optional)`
- [x] Databases (via Sequelize) `(optional)` - *Authored by @MikeG96*
- [x] Custom integration support - *Authored by @youngpayters*

The `optional` integrations require additional peer dependencies. If an integration is configured but its package is missing, the check will return `ERR_MODULE_NOT_FOUND`:

```json
{
  "name": "example-missing-packages",
  "status": false,
  "integrations": [
    {
      "name": "test redis",
      "kind": "Redis DB integration",
      "status": false,
      "error": { "code": "ERR_MODULE_NOT_FOUND" }
    }
  ]
}

```

---

### Redis

Requires the `redis` package:

```sh
npm i nodejs-health-checker redis

```

```javascript
import { HealthcheckerDetailedCheck, HealthTypes } from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My application",
  version: "1.0.0",
  integrations: [
     {
       type: HealthTypes.Redis,
       name: "redis integration",
       host: "redis",
       port: 6379
     }
  ],
}).then(console.log).catch(console.error);

```

> See more options in the [IntegrationConfig interface](https://www.google.com/search?q=./src/interfaces/types.ts%23L40).

### Web integration (HTTPS)

Uses the native `fetch` API. No extra dependencies required.

```javascript
{
  type: HealthTypes.Web,
  name: "external api",
  host: "[https://api.example.com/status](https://api.example.com/status)"
}

```

### AWS DynamoDB

Requires `@aws-sdk/client-dynamodb`:

```sh
npm i nodejs-health-checker @aws-sdk/client-dynamodb

```

### Databases

Uses [Sequelize v6](https://sequelize.org/docs/v6/getting-started/) as a peer dependency. You must install the driver for your specific database (Postgres, MySQL, or MariaDB).

**Postgres Example:**

```sh
npm i nodejs-health-checker sequelize pg pg-hstore

```

```javascript
{
  type: HealthTypes.Database,
  name: "postgres db",
  host: "localhost",
  dbPort: 5432,
  dbName: "my_db",
  dbUser: "admin",
  dbPwd: "password",
  dbDialect: Dialects.postgres,
}

```

### Custom Integration Support

You can provide a custom validation function for any dependency not supported out of the box:

```javascript
import { HealthcheckerDetailedCheck, HealthTypes, HTTPChecker } from "nodejs-health-checker";

async function myValidation(): Promise<HTTPChecker> {
  // Your custom logic here
  return { status: true };
}

HealthcheckerDetailedCheck({
  integrations: [
    {
      type: HealthTypes.Custom,
      name: "my custom check",
      customCheckerFunction: myValidation,
    }
  ]
});

```

---

## How to use (Express Example)

```javascript
import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck, HealthTypes } from "nodejs-health-checker";

const server = express();

// Liveness probe
server.get("/health/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

// Readiness probe
server.get("/health/readiness", async (_, res) => {
  const health = await HealthcheckerDetailedCheck({
    name: "My App",
    version: "1.0.0",
    integrations: [
      {
        type: HealthTypes.Redis,
        name: "main-cache",
        host: "localhost",
      }
    ],
  });
  res.status(health.status ? 200 : 503).send(health);
});

server.listen(3000);

```

### Kubernetes Integration

To use this with Kubernetes, configure your `Deployment` probes as follows:

```yaml
livenessProbe:
  httpGet:
    path: /health/liveness
    port: 3000
readinessProbe:
  httpGet:
    path: /health/readiness
    port: 3000

```
