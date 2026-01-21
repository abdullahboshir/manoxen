import type { IDomainManifest } from "@manoxen/shared-types";

export const manifest: IDomainManifest = {
  domain: "system",
  type: "generic",
  status: "active",
  version: "1.0.0",
  description: "Global system settings, health checks, and platform-wide configurations",
  dependencies: ["@manoxen/core-util", "@manoxen/platform-core"],
  notes: "Core system services required for platform operation."
};
