# CRM Domain (Customer Relationship Management)

**Status:** Placeholder | **Priority:** TBD | **Started:** 2026-01-18

## Overview

Customer Relationship Management domain for managing customer interactions, leads, opportunities, and sales pipelines.

## Licensed Products
- CRM (Standalone)
- Can be bundled with Commerce or ERP suite

## Core Modules (Planned)

- **Customers** - Customer master, contact management
- **Leads** - Lead management & qualification
- **Opportunities** - Sales pipeline & forecasting
- **Accounts** - Account management (B2B)
- **Activities** - Calls, meetings, notes, tasks
- **Reports** - CRM analytics & dashboards

## Dependencies

### System Core Required
- @manoxen/iam (User & permission management)
- @manoxen/organization (Organization hierarchy)
- @manoxen/governance (Compliance & audit)

### Optional
- @manoxen/finance (For deal value tracking)
- @manoxen/communication (Email/SMS integration)

## Development Roadmap

```
Phase 1: Core Setup
  - Domain structure & configuration
  - Customer entity modeling
  - Basic CRUD operations

Phase 2: Sales Pipeline
  - Lead management
  - Opportunity tracking
  - Sales forecasting

Phase 3: Integration
  - Email integration
  - Calendar sync
  - Activity tracking

Phase 4: Analytics
  - CRM dashboards
  - Sales reports
  - Pipeline visibility
```

## Quick Start (When Development Begins)

```bash
# Add models
src/
  ├── customer/
  ├── lead/
  ├── opportunity/
  ├── account/
  └── activity/

# Export from index.ts
export { CustomerModule } from './customer';
export { LeadModule } from './lead';
// ... etc
```

## Notes

- Currently under planning/design phase
- Will follow same architecture pattern as other domains
- Expected to be implemented in Q2/Q3 2026
