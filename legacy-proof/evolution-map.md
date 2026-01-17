# System Evolution Map

This document outlines the architectural transition from the legacy **Signature Bangla POS** to the modern **Manoxen Enterprise Platform**, authored and architected by **Abdullah Bashir**.

## 🛡️ Architectural Shift

| Feature           | Legacy (Signature Bangla POS) | Modern (Manoxen)                                    |
| :---------------- | :---------------------------- | :-------------------------------------------------- |
| **Architecture**  | Monolithic / Separated Repos  | **DDD Monorepo** (Turbo)                            |
| **Language**      | JavaScript/Node.js            | **TypeScript (Strict Mode)**                        |
| **Multi-tenancy** | Simple Schema                 | **4-Level Hierarchy** (Platform > Co > BU > Outlet) |
| **Caching**       | Local Cache                   | **Redis Centralized Cache**                         |
| **Build Tool**    | Standard Webpack/Node         | **Turborepo + TSX + Bundler**                       |

## 📈 Evolutionary Milestones

### 1. The Foundation (Legacy Era)

Modular logic was first established in the `signature-bangla-pos` repositories (Express and Nest.js versions). This era focused on business requirements and POS stability.

### 2. The Great Re-architecture

The decision was made to move towards a **High-Scale Multi-tenant** environment.

- **Decoupling:** Business logic was decoupled from the controller layer.
- **Unification:** Frontend and Backend were brought under a unified Monorepo for better dependency management.

### 3. Manoxen (Current Era)

Implementation of Domain-Driven Design (DDD) to allow the platform to scale into an Enterprise Resource Planning (ERP) suite.

---

## 🔬 Technical Lineage Verification

- **Code Patterns:** Custom middlewares and context handling logic in Manoxen are refined versions of successful patterns established in the legacy projects.
- **Data Models:** The core schema (Category, Brand, Product) has been evolved to support advanced industrial standards while preserving original data relationships.
