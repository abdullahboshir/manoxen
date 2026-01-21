import type { IDomainManifest } from "@manoxen/shared-types";

export const manifest: IDomainManifest = {
  domain: "marketing",
  type: "supporting",
  status: "active",
  version: "1.0.0",
  description: "Marketing automation and campaign management",
  dependencies: ["@manoxen/core-util"],
  notes: "Primarily handles integration with marketing tools and campaign orchestration."
};
