import type { IDomainManifest } from "@manoxen/shared-types";

export const manifest: IDomainManifest = {
  domain: "organization",
  type: "core",
  status: "active",
  createdAt: "2026-01-19",
  description: "Organizational structure and multi-tenancy core domain",
  dependencies: ["@manoxen/core-util", "@manoxen/shared-types"],
  optional: ["@manoxen/identity"],
  version: "1.0.0",
  roadmap: {
    phase1: "Organization and hierarchy setup",
    phase2: "Business unit and Outlet management",
    phase3: "Context-aware routing and permissions",
    phase4: "Platform global administration",
  },
};
