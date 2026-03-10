# nodejs-health-checker

<div align="center">

![npm](https://img.shields.io/npm/dt/nodejs-health-checker?style=for-the-badge)<br>
[![npm version](https://badge.fury.io/js/nodejs-health-checker.svg)](https://badge.fury.io/js/nodejs-health-checker)
![test](https://github.com/gritzkoo/nodejs-health-checker/workflows/test/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/gritzkoo/nodejs-health-checker/badge.svg?branch=master)](https://coveralls.io/github/gritzkoo/nodejs-health-checker?branch=master)
[![License Status](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/license/gritzkoo/nodejs-health-checker)
[![Issues Status](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/issues/gritzkoo/nodejs-health-checker)
[![Tag Status](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/v/tag/gritzkoo/nodejs-health-checker)
[![Languages Status](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/languages/count/gritzkoo/nodejs-health-checker)
[![Repo Size Status](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)](https://img.shields.io/github/repo-size/gritzkoo/nodejs-health-checker)
</div>

___

## Contributors

![contributors](https://contrib.rocks/image?repo=gritzkoo/nodejs-health-checker)

>Made with [contributors-img](https://contrib.rocks).
___

[CHANGELOG](./CHANGELOG.md)

- [nodejs-health-checker](#nodejs-health-checker)
  - [Contributors](#contributors)
  - [How to install](#how-to-install)
  - [Available integrations](#available-integrations)
    - [Redis](#redis)
    - [Memcached](#memcached)
    - [Web integration (https)](#web-integration-https)
    - [AWS DynamoDB](#aws-dynamodb)
    - [Databases](#databases)
      - [Postgres example](#postgres-example)
      - [Mysql example](#mysql-example)
      - [MariaDB example](#mariadb-example)
    - [Custom integration Support](#custom-integration-support)
  - [How to use](#how-to-use)


___

This is a Node package that allows you to track the health of your application, providing two ways of checking:

*__Simple__*: will respond to a JSON as below and that allows you to check if your application is online and responding without checking any kind of integration.

```json
{
  "status": "fully functional"
}
```

*__Detailed__*: will respond a JSON as below and that allows you to check if your application is up and running and check if all of your integrations informed in the configuration list is up and running.

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
        },
        {
            "name": "my dynamo",
            "kind": "AWS Dynamo DB",
            "status": true,
            "response_time": 0.004,
            "url": "http://localhost:8000",
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
- [x] Web integration (https)
- [x] AWS DynamoDB `(optional)`
- [x] Databases `Uses Sequelize package` (authored by @MikeG96) `(optional)`
- [x] Custom integration support (authored by @youngpayters)

All `optional` packages needs extra packages install, and if you try to use without install these packages, your validation will return `ERR_MODULE_NOT_FOUND` as the example:

```json
{
  "name": "example-missing-packages",
  "version": "v1.0.0",
  "status": false,
  "date": "2026-03-10T10:07:03.930Z",
  "duration": 1.054,
  "integrations": [
    {
      "name": "test redis",
      "kind": "Redis DB integration",
      "status": false,
      "response_time": 0.004,
      "url": "redis:6379",
      "error": {
        "code": "ERR_MODULE_NOT_FOUND"
      }
    },
    {
      "name": "memcache",
      "kind": "Memcached integraton",
      "status": false,
      "response_time": 0.002,
      "url": "memcache",
      "error": {
        "code": "ERR_MODULE_NOT_FOUND"
      }
    },
    {
      "name": "dynamo",
      "kind": "AWS Dynamo DB",
      "status": false,
      "response_time": 0.001,
      "url": "http://localhost:8000",
      "error": {
        "code": "ERR_MODULE_NOT_FOUND"
      }
    }
    {
      "name": "postgres",
      "kind": "Database integration",
      "status": false,
      "response_time": 0.001,
      "url": "postgresql",
      "error": {
        "code": "ERR_MODULE_NOT_FOUND"
      }
    }
  ]
}
```

Below a list of `how to` install and validate each `optional` integration:

### Redis

Redis is a `peer dependency` and requires

```sh
npm i nodejs-health-checker redis
```

It allows you to use:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes} from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version",
  integrations: [
     {
       type: HealthTypes.Redis,
       name: "redis integration",
       host: "redis",
       port: 6379
     }
  ],
}).then(result => console.debug(result)).catch(e => console.error(e));
```

>More options in  [interface IntegrationConfig](./src/interfaces/types.ts#L40)

### Memcached

Memcached is a `peer dependency` and requires

```sh
npm i nodejs-health-checker memcache
```

It allows you to use:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes} from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Memcached,
      name: "My memcache integration",
      host: "memcache",
      port: 11211
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

### Web integration (https)

Uses native `fetch` library no extra installs needed

```javascript
import {HealthcheckerDetailedCheck, HealthTypes} from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Web,
      name: "my web api integration",
      host: "https://my-api-example.com/my-status-endpoint"
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

### AWS DynamoDB

AWS DynamoDB is a `peer dependency` and requires

```sh
npm i nodejs-health-checker @aws-sdk/client-dynamodb
```

It allows you to use:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes} from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
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
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

### Databases

Uses [Sequelize v6](https://sequelize.org/docs/v6/getting-started/) as a `peer dependency` and requires separated install depending on target database your project uses.

Sequelize is compatible with `Mariadb, Mysql, Postgres` Dialects wich you needs to install

#### Postgres example

```sh
npm i nodejs-health-checker sequelize pg pg-hstore
```

Then:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes, Dialects} from "nodejs-health-checker";

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Database,
      name: "my database",
      host: "localhost",
      dbPort: 5432,
      dbName: "postgres",
      dbUser: "postgres",
      dbPwd: "root",
      dbDialect: Dialects.postgres,
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

#### Mysql example

```sh
npm i nodejs-health-checker sequelize mysql2
```

Then:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes, Dialects} from "nodejs-health-checker"

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Database,
      name: "my database",
      host: "localhost",
      dbPort: 3306,
      dbName: "mysql",
      dbUser: "root",
      dbPwd: "root",
      dbDialect: Dialects.mysql,
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

#### MariaDB example

```sh
npm i nodejs-health-checker sequelize mariadb
```

Then:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes, Dialects} from "nodejs-health-checker"

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Database,
      name: "my database",
      host: "localhost",
      dbPort: 3306,
      dbName: "mariadb",
      dbUser: "root",
      dbPwd: "root",
      dbDialect: Dialects.mariadb,
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

### Custom integration Support

If you have any kind of external dependency that you want to check in your health check but that is not supported yet, you can use the custom integration support to create your own checker function and inform it in the configuration as below:

```javascript
import {HealthcheckerDetailedCheck, HealthTypes, HTTPChecker} from "nodejs-health-checker"

// create your own validation
async function myValidation(): Promise<HTTPChecker> {
  return new Promise((resolve, reject) => {
    try {
      // do fancy validations
      setTimeout(() => {
        resolve({ status: true})
      })
    } catch (e) {
      reject({status: false, error: e})
    }
  })
}

HealthcheckerDetailedCheck({
  name: "My node application",
  version: "my version"
  integrations: [
    {
      type: HealthTypes.Custom,
      name: "my custom integration",
      customCheckerFunction: myValidation,
    }
  ]
}).then(result => console.debug(result)).catch(e => console.error(e));
```

## How to use

Example using Nodejs + Express

```javascript
import express from "express";
import {
  HealthcheckerDetailedCheck,
  HealthcheckerSimpleCheck,
  Dialects,
  HealthTypes
} from "nodejs-health-checker";

const server = express();

server.get("/health-check/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(
    await HealthcheckerDetailedCheck({
      name: "My node application",
      version: "my version",
      // here you will list all your external dependencies
      // that your application needs to checke to keep healthy
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
        {
          type: HealthTypes.Database,
          name: "my database",
          host: "localhost",
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
          customCheckerFunction: () => { return { status: true, error: {} }},
        },
      ],
    })
  );
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`[SERVER] Running at http://localhost:${port}`);
});

```

And then, you could call these endpoints manually to see your application health, but, if you are using modern Kubernetes deployment, you can config your chart to check your application with the setup below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app-name
  namespace: your-app-namespace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: your-app-name
  template:
    metadata:
      labels:
        app: your-app-name
    spec:
      containers:
      - name: your-app
        image: your-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: 3000
        livenessProbe:
          httpGet:
            path: /health-check/liveness
            port: 3000
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health-check/readiness
            port: 3000
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```
