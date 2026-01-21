import type { IDomainManifest } from "@manoxen/shared-types";

export const manifest: IDomainManifest = {
  domain: "automation",
  type: "supporting",
  status: "active",
  version: "1.0.0",
  description: "Orchestration layer for automated tasks and workflows",
  dependencies: ["@manoxen/core-util"],
  notes: "This context contains no complex domain models by design; it acts as an application-level orchestrator."
};
