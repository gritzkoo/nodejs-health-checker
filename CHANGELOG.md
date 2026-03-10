# nodejs-health-checker Change Log

## [2.0.0] - 2025-01-05

**Special thanks to [@rmartins0](https://github.com/rmartins0) for opening [issue #86](https://github.com/gritzkoo/nodejs-health-checker/issues/86) and driving these dependency updates!**

> ### ⚠️ BREAKING CHANGES

- 🚨 **ES MODULES ONLY**: This package now uses `"type": "module"`. CommonJS `require()` is no longer supported; use `import` statements instead.
- 🚨 **MINIMUM NODE VERSION >=18**: Only modern Node.js versions are supported.
- 🚨 **MAJOR DEPENDENCY UPGRADES**:
  - `@aws-sdk/client-dynamodb`: `^3.276.0` -> `^3.716.0`
  - `mariadb`: `^2.5.6` -> `^3.5.1`
  - `mysql2`: `^3.9.4` -> `^3.11.5`
  - `node-fetch`: **REMOVED** (now using native Node.js 18+ fetch API)
  - `pg`: `^8.9.0` -> `^8.13.1`
  - `redis`: `^3.1.2` -> `^5.11.0` (Includes major API changes)
  - `sequelize`: `^6.28.1` -> `^6.37.7`
  - `sqlite3`: `^5.0.2` -> `^5.1.7`
  - `memcached`: **REPLACED** with `memcache ^1.4.0` for modern ES Module support.
- 🚨 **PEER DEPENDENCIES**: Integration drivers are now **peer dependencies**. You must manually install only what you need:
  - **Redis**: `npm install redis`
  - **Memcached**: `npm install memcache`
  - **Databases**: `npm install sequelize` + driver (`pg`, `mysql2`, `sqlite3`, or `mariadb`)
  - **AWS DynamoDB**: `npm install @aws-sdk/client-dynamodb`

---

### Migration Guide

#### 📦 Simplified Imports

The package now provides a single entry point. You no longer need to navigate through internal folders.

**Before (v1.x)**:

```javascript
// CJS or Deep Imports
const { HealthcheckerSimpleCheck } = require("nodejs-health-checker/dist/healthchecker/healthchecker.js");
// or
import { HealthcheckerSimpleCheck } from "nodejs-health-checker/dist/healthchecker/healthchecker";
import { HealthTypes, Dialects } from "nodejs-health-checker/dist/interfaces/types";

```

**After (v2.x)**:

```javascript
import { 
  HealthcheckerSimpleCheck, 
  HealthcheckerDetailedCheck, 
  HealthTypes, 
  Dialects 
} from "nodejs-health-checker";

```

#### 📦 Installing Integration Dependencies

Install the base package plus your specific drivers:

```bash
# Base package (Native Web checks work out of the box)
npm install nodejs-health-checker

# Add specific integrations as needed:
npm install redis                # For Redis
npm install memcache             # For Memcached
npm install sequelize pg         # For PostgreSQL
npm install @aws-sdk/client-dynamodb # For AWS DynamoDB

```

### 🚨 Error Handling

If an integration check returns `ERR_MODULE_NOT_FOUND`, it indicates a missing peer dependency:

```json
{
  "name": "my-app",
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

**Bundle Size Improvements:**

- **Before**: ~70MB (all potential dependencies bundled)
- **After**: **~400KB** (base package + only your chosen drivers)

---

### What's Fixed

- 🔧 Resolved memory leaks and open handles in the test suite.
- 🔧 Improved connection cleanup across all integrations.
- 🔧 Optimized timeout handling for web requests.
- 🔧 Enhanced error messaging for Redis ping failures.
- 🔧 Modernized Memcached integration for better ESM compatibility.

### Internal Changes

- 📦 Migrated to **ESLint v9** (flat config).
- 📦 Updated **TypeScript to v5.7.3**.
- 📦 Replaced legacy TSLint/Prettier with ESLint-native formatting.
- 📦 Improved type safety using discriminated union types.
- 📦 Removed `node-fetch` in favor of native fetch.
- 📦 Added `engines` field to `package.json` (Node.js >=18.0.0).

✅ **LOGIC PRESERVED**: Your existing health check configurations remain compatible. Simply update your import statements to the new unified path! 🚀
