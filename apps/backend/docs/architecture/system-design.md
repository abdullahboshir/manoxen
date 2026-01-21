# System Design & Architectural Standards

## 1. Directory Structure (Monorepo)

### 1.1 High-Level Architecture

- **`core/`**: Critical Infrastructure Domains that are foundational to the platform (IAM, Organization).
- **`domains/`**: Business Logic Domains decomposed by functional area (Commerce, Enterprise, Platform).
- **`apps/`**: Deployable Applications (Backend API, Frontend, etc).
- **`packages/`**: Shared internal packages used across apps and domains (e.g., shared-types, iam-core).
- **`libs/`**: Utility libraries (e.g., core-util).

### 1.2 Module Strategy

- **Domain Modules**: Each domain (e.g., `commerce/catalog`) is a self-contained package.
- **Independence**: Domains should not tightly couple. Use shared libraries or events for communication.
- **Gateway**: The `apps/backend` acts as the API Gateway, importing services from `core` and `domains` to expose REST/GraphQL endpoints.

### 1.3 Routing Strategy

- **Internal Definition**: Routes are defined within the `apps/backend` but delegates logic to Domain Services.
- **External Exposure**: `apps/backend/src/app/routes` defines the public API surface.

## 2. Naming Conventions (Strict)

| Type           | Suffix           | Purpose                                | Example              |
| -------------- | ---------------- | -------------------------------------- | -------------------- |
| **Interface**  | `.interface.ts`  | TypeScript Definitions / DB Shape      | `user.interface.ts`  |
| **DTO**        | `.dto.ts`        | Request/Response Data Transfer Objects | `create-user.dto.ts` |
| **Model**      | `.model.ts`      | Mongoose/ORM Schema Definition         | `user.model.ts`      |
| **Service**    | `.service.ts`    | Business Logic / Transaction handling  | `user.service.ts`    |
| **Controller** | `.controller.ts` | HTTP Request Handler (Req/Res)         | `user.controller.ts` |
| **Routes**     | `.routes.ts`     | Router Definition                      | `user.routes.ts`     |
| **Validation** | `.validation.ts` | Zod/Joi Schemas                        | `user.validation.ts` |
| **Utils**      | `.utils.ts`      | Helper Functions                       | `user.utils.ts`      |

## 3. Storage Strategy

- **Production Safety**: Backend **MUST NOT** rely on local `storage/` in Production.
- **Implementation**:
  - `local.provider.ts`: Enabled ONLY for Development (`NODE_ENV!=production`).
  - `s3.provider.ts` / `cloudinary.provider.ts`: Mandatory for Production.
  - **Guard**: System will throw a critical error if `local` provider is detected in `production` environment.
- **Data Integrity**: Database stores **metadata & URLs only**. Files reside in Object Storage.

## 4. API Response Structure

- **Consistency**: All responses must use `ApiResponse` utility.
- **Login**: Return `accessToken` only. User details fetched via `/auth/me`.
- **Permissions**: Flattened string array `["resource:action"]`.

## 5. Domain Boundaries (Risk Mitigation)

### 5.1 Business Unit Core

- **Rule**: `business-unit/core` is the **source of truth**.
- **Constraint**: Sub-modules (`finance`, `analytics`) depend on `core`. `core` **MUST NEVER** import from sub-modules to prevent circular dependencies.

### 5.2 Platform vs ERP

- **Platform (`core/` + `domains/platform`)**: Handles **Configuration**, **Enable/Disable** switches, and **Global Settings**.
  - Example: `TaxSettings` (Enable VAT, Set Standard Rate).
- **ERP (`domains/enterprise`)**: Handles **Accounting Logic**, **Calculations**, and **Transactional Data**.
  - Example: `TaxCalculator` (Apply VAT to Order, generate Ledger Entry).
- **Constraint**: Platform settings **DO NOT** perform complex math. ERP modules **DO NOT** store global configurations.
