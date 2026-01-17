/**
 * Governance Module Public API
 * Shareholder management and voting.
 */

// NOTE: These are available if needed cross-module
// Currently only used internally within Governance

// Export interfaces and routes for cross-module usage
// Export interfaces and routes for cross-module usage
// Organization - Outlet, etc.
export { Outlet } from "./organization/outlet/outlet.model";
export * from "./organization/outlet/outlet.interface";

export { ShareholderRoutes } from "./shareholder/shareholder.routes";
export { VotingRoutes } from "./voting/voting.routes";
export { MeetingRoutes } from "./meeting/meeting.routes";
export { ComplianceRoutes } from "./compliance/compliance.routes";







