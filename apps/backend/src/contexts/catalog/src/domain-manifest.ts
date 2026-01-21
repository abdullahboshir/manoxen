import type { IDomainManifest } from "@manoxen/shared-types";

export const manifest: IDomainManifest = {
  domain: "catalog",
  type: "core",
  status: "active",
  version: "1.0.0",
  description: "Product master data, categories, brands, and attributes",
  dependencies: ["@manoxen/core-util", "@manoxen/shared-types"],
  exposes: ["Product", "Category", "Brand", "Attribute"],
  roadmap: {
    "phase1": "Basic product management",
    "phase2": "Advanced attributes and variants",
    "phase3": "Inventory integration"
  }
};
