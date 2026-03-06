# nodejs-health-checker Change log

## [`2.0.0 2025-01-05`]

**Thanks to [@rmartins0](https://github.com/rmartins0) for opening [issue #86](https://github.com/gritzkoo/nodejs-health-checker/issues/86) to address dependency updates!**

>**BREAKING CHANGES**

Notes:

- 🚨 **DROP SUPPORT FOR REQUIRE** 🚨 This package `package.json` now uses `"type": "module"` and now supports only `import` statements
- 🚨 **MINIMUM NODE VERSION >=18** 🚨 Only newer Node.js versions supported
- 🚨 **MAJOR DEPENDENCY UPGRADES** 🚨
  - `"@aws-sdk/client-dynamodb": "^3.276.0"` -> `"^3.716.0"`
  - `"mariadb": "^2.5.6"` -> `"^3.5.1"`
  - `"mysql2": "^3.9.4"` -> `"^3.11.5"`
  - `"node-fetch": "^2.6.9"` -> `"^3.3.2"` (ESM only)
  - `"pg": "^8.9.0"` -> `"^8.13.1"`
  - `"redis": "^3.1.2"` -> `"^5.11.0"` (Major API changes)
  - `"sequelize": "^6.28.1"` -> `"^6.37.7"`
  - `"sqlite3": "^5.0.2"` -> `"^5.1.7"`

### Migration Guide

**Before (v1.x)**:

```javascript
const { HealthcheckerSimpleCheck } = require("nodejs-health-checker");
```

**After (v2.x)**:

```javascript
import { HealthcheckerSimpleCheck } from "nodejs-health-checker";
```

### What's Fixed

- 🔧 Fixed memory leaks and open handles in tests
- 🔧 Improved connection cleanup for all integrations
- 🔧 Better timeout handling for web requests
- 🔧 Enhanced error messages for Redis ping failures

### Internal Changes

- 📦 Migrated to ESLint v9 with flat config
- 📦 Updated TypeScript to v5.7.3
- 📦 Removed deprecated TSLint and Prettier (now using ESLint for formatting)
- 📦 Improved type safety with discriminated union types

- ✅ **NO API CHANGES** ✅: You can keep your existing code structure, just change `require` to `import` 🚀

___
