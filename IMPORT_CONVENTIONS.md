# Import Conventions - Manoxen Monorepo

This document defines the import rules for the monorepo. Follow these strictly.

## Package Hierarchy

```
┌─────────────────────────────────────────┐
│          SHARED PACKAGES                │
│  @manoxen/core-util                     │
│  @manoxen/iam-core                      │
│  @manoxen/shared-types                  │
├─────────────────────────────────────────┤
│          DOMAIN PACKAGES                │
│  @manoxen/catalog, @manoxen/erp, etc.  │
├─────────────────────────────────────────┤
│          APPLICATIONS                   │
│  apps/backend, apps/frontend           │
└─────────────────────────────────────────┘
```

## Import Rules

| From                | Can Import                        | Cannot Import              |
| ------------------- | --------------------------------- | -------------------------- |
| **Domain packages** | `@manoxen/*`                      | `#core/*`, `#app/*`, `@/*` |
| **apps/backend**    | `@manoxen/*`, `#core/*`, `#app/*` | `@/*`                      |
| **apps/frontend**   | `@manoxen/*`, `@/*`               | `#core/*`, `#app/*`        |

## Common Imports Reference

| Need                             | Import From                                       |
| -------------------------------- | ------------------------------------------------- |
| QueryBuilder                     | `@manoxen/core-util`                              |
| resolveBusinessUnitId            | `@manoxen/core-util`                              |
| ApiResponse, catchAsync          | `@manoxen/core-util`                              |
| USER_ROLE, permissions           | `@manoxen/iam-core`                               |
| contextGuard, resourceOwnerGuard | `@manoxen/iam-core`                               |
| Auth middleware (routes)         | `#core/middleware/auth` **(backend only)**        |
| Module guard                     | `#app/middlewares/moduleGuard` **(backend only)** |

## Example

```typescript
// ✅ CORRECT - Domain file using package imports
import { QueryBuilder, resolveBusinessUnitId } from "@manoxen/core-util";
import { USER_ROLE } from "@manoxen/iam-core";

// ❌ WRONG - Domain file using backend internal paths
import { AppError, QueryBuilder } from "@manoxen/core-util";
import auth from "#core/middleware/auth";
```
