# nodejs-health-checker Change Log

## [2.0.2] - 2026-03-25

***Github Dependabot updates***

Bumps [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) and [@aws-sdk/xml-builder](https://github.com/aws/aws-sdk-js-v3/tree/HEAD/packages-internal/xml-builder). These dependencies needed to be updated together.
Updates `fast-xml-parser` from 5.4.1 to 5.5.8
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a href="https://github.com/NaturalIntelligence/fast-xml-parser/releases">fast-xml-parser's releases</a>.</em></p>
<blockquote>
<h2>fix entity expansion and incorrect replacement and performance</h2>
<p><strong>Full Changelog</strong>: <a href="https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.5...v5.5.6">https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.5...v5.5.6</a></p>
<h2>support onDangerousProperty</h2>
<p><strong>Full Changelog</strong>: <a href="https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.3...v5.5.5">https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.3...v5.5.5</a></p>
<h2>update dependecies to fix typings</h2>
<p><strong>Full Changelog</strong>: <a href="https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.1...v5.5.2">https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.5.1...v5.5.2</a></p>
<h2>integrate path-expression-matcher</h2>
<ul>
<li>support path-expression-matcher</li>
<li>fix: stopNode should not be parsed</li>
<li>performance improvement for stopNode checking</li>
</ul>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/CHANGELOG.md">fast-xml-parser's changelog</a>.</em></p>
<blockquote>
<p><!-- raw HTML omitted -->Note: If you find missing information about particular minor version, that version must have been changed without any functional change in this library.<!-- raw HTML omitted --></p>
<p>Note: Due to some last quick changes on v4, detail of v4.5.3 &amp; v4.5.4 are not updated here. v4.5.4x is the last tag of v4 in github repository. I'm extremely sorry for the confusion</p>
<p><strong>4.5.5 / 2026-03-22</strong></p>
<p>apply fixes from v5 (legacy maintenance branch v4-maintenance)</p>
<ul>
<li>support maxEntityCount</li>
<li>support onDangerousProperty</li>
<li>support maxNestedTags</li>
<li>handle prototype pollution</li>
<li>fix incorrect entity name replacement</li>
<li>fix incorrect condition for entity expansion</li>
</ul>
<p><strong>5.5.8 / 2026-03-20</strong></p>
<ul>
<li>pass read only matcher in callback</li>
</ul>
<p><strong>5.5.7 / 2026-03-19</strong></p>
<ul>
<li>fix: entity expansion limits</li>
<li>update strnum package to 2.2.0</li>
</ul>
<p><strong>5.5.6 / 2026-03-16</strong></p>
<ul>
<li>update builder dependency</li>
<li>fix incorrect regex to replace . in entity name</li>
<li>fix check for entitiy expansion for lastEntities and html entities too</li>
</ul>
<p><strong>5.5.5 / 2026-03-13</strong></p>
<ul>
<li>sanitize dangerous tag or attribute name</li>
<li>error on critical property name</li>
<li>support onDangerousProperty option</li>
</ul>
<p><strong>5.5.4 / 2026-03-13</strong></p>
<ul>
<li>declare Matcher &amp; Expression as unknown so user is not forced to install path-expression-matcher</li>
</ul>
<p><strong>5.5.3 / 2026-03-11</strong></p>
<ul>
<li>upgrade builder</li>
</ul>
<p><strong>5.5.2 / 2026-03-11</strong></p>
<ul>
<li>update dependency to fix typings</li>
</ul>
<p><strong>5.5.1 / 2026-03-10</strong></p>
<ul>
<li>fix dependency</li>
</ul>
<p><strong>5.5.0 / 2026-03-10</strong></p>
<ul>
<li>support path-expression-matcher</li>
<li>fix: stopNode should not be parsed</li>
<li>performance improvement for stopNode checking</li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/a92a665e00c146a4ea3ff7760f3399e5ed51dfc5"><code>a92a665</code></a> pass read only matcher in call back</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/a21c44123cdf0f8fb5b56d33386ed3be4e180953"><code>a21c441</code></a> update package detail</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/239b64aa1fc5c5455ddebbbb54a187eb68c9fdb7"><code>239b64a</code></a> check for min value for entity exapantion options</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/61cb666d13044b483aa495a6c020789f22e670b4"><code>61cb666</code></a> restrict more properties to be unsafe</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/41abd66adc54cbc6ebea615a9f5396d8582afdb1"><code>41abd66</code></a> performance improvement of reading DOCTYPE</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/3dfcd20c8cffc310335510ff72a211be0672a8dd"><code>3dfcd20</code></a> refactor: performance improvement</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/870043e75e78545192bc70950c6286d36c7cdf23"><code>870043e</code></a> update release info</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/6df401ef2bb1d152313276add24cdfa860819751"><code>6df401e</code></a> update builder dependency</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/bd26122c838e6a55e7d7ac49b4ccc01a49999a01"><code>bd26122</code></a> check for entitiy expansion for lastEntities and html entities too</li>
<li><a href="https://github.com/NaturalIntelligence/fast-xml-parser/commit/7e70dd8f758f3f494c4e14a281cea35b7d8d0d13"><code>7e70dd8</code></a> fix incorrect regex to replace . in entity name</li>
<li>Additional commits viewable in <a href="https://github.com/NaturalIntelligence/fast-xml-parser/compare/v5.4.1...v5.5.8">compare view</a></li>
</ul>
</details>
<br />

Updates `@aws-sdk/xml-builder` from 3.972.10 to 3.972.15
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a href="https://github.com/aws/aws-sdk-js-v3/blob/main/packages-internal/xml-builder/CHANGELOG.md"><code>@​aws-sdk/xml-builder</code>'s changelog</a>.</em></p>
<blockquote>
<h1>3.972.15 (2026-03-20)</h1>
<h3>Chores</h3>
<ul>
<li><strong>xml-builder:</strong> bump fast-xml-parser to 5.5.8 (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/7876">#7876</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/80ef60146a5f1ba7e584cfdc595550c9e97b52f1">80ef601</a>)</li>
</ul>
<h1>3.972.14 (2026-03-18)</h1>
<h3>Bug Fixes</h3>
<ul>
<li><strong>xml-builder:</strong> configure maxTotalExpansions on fast-xml-parser (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/7868">#7868</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/2ad14770e35ed1eed1918657ae7670dffcf980a0">2ad1477</a>)</li>
</ul>
<h3>Chores</h3>
<ul>
<li><strong>xml-builder:</strong> single-pass XML escape for escapeElement and escapeAttribute (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/7833">#7833</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/97de5649ff5fc8692d5c41e087e6828a718e46db">97de564</a>)</li>
</ul>
<h1>3.972.12 (2026-03-18)</h1>
<h3>Chores</h3>
<ul>
<li>bump fast-xml-parser to 5.5.6 (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/7862">#7862</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/5e8d73bafb2f447b517e9af047595930acbffced">5e8d73b</a>)</li>
</ul>
<h1>3.972.11 (2026-03-13)</h1>
<h3>Chores</h3>
<ul>
<li><strong>codegen:</strong> sync for retry strategy lifecycle fix (<a href="https://redirect.github.com/aws/aws-sdk-js-v3/issues/7842">#7842</a>) (<a href="https://github.com/aws/aws-sdk-js-v3/commit/7bf8888b2423d2342ea2b689532e526715ec1d50">7bf8888</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li>See full diff in <a href="https://github.com/aws/aws-sdk-js-v3/commits/HEAD/packages-internal/xml-builder">compare view</a></li>
</ul>
</details>
<br />

Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

### Manual changes

- Update package github actions pipeline
- Fixed `README.md` test badge link

___

## [2.0.1] - 2026-03-25

***Github Dependabot updates***

Bumps [flatted](https://github.com/WebReflection/flatted) from 3.4.1 to 3.4.2.
<details>
<summary>Commits</summary>
<ul>
<li><a href="https://github.com/WebReflection/flatted/commit/3bf09091c3562e17a0647bc06710dd6097079cf7"><code>3bf0909</code></a> 3.4.2</li>
<li><a href="https://github.com/WebReflection/flatted/commit/885ddcc33cf9657caf38c57c7be45ae1c5272802"><code>885ddcc</code></a> fix CWE-1321</li>
<li><a href="https://github.com/WebReflection/flatted/commit/0bdba705d130f00892b1b8fcc80cf4cdea0631e3"><code>0bdba70</code></a> added flatted-view to the benchmark</li>
<li>See full diff in <a href="https://github.com/WebReflection/flatted/compare/v3.4.1...v3.4.2">compare view</a></li>
</ul>
</details>
<br />

[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=flatted&package-manager=npm_and_yarn&previous-version=3.4.1&new-version=3.4.2)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

___

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

___

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

___

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
