---
title: "Internal Developer Portal"
summary: "Built a self-service engineering portal to standardize service ownership metadata and reduce onboarding friction."
role: "Full-Stack Engineer"
stack:
  - "TypeScript"
  - "Astro"
  - "Node.js"
  - "PostgreSQL"
  - "GitHub Actions"
dateStart: "2023-06"
dateEnd: "2023-12"
githubUrl: "https://github.com/aldrick-t/internal-developer-portal"
featured: true
order: 2
problem: "Team knowledge around services, runbooks, and ownership was fragmented across docs, tickets, and tribal knowledge."
approach: "Designed a metadata model for service ownership, built searchable project pages, and linked deployment/runbook references through one interface."
impact:
  - "Cut new engineer onboarding time from weeks to days for service discovery tasks."
  - "Created a single source of truth for service ownership and operational metadata."
  - "Reduced dependency on synchronous handoff meetings."
lessons:
  - "Developer experience products require high trust in data freshness."
  - "Search quality is a first-class feature, not a nice-to-have."
  - "Adoption improved when portal workflows mirrored existing developer habits."
---

### Product Decisions

The portal prioritized clarity and speed over visual complexity. Every service page included ownership, runbook links, deployment status, and repository metadata above the fold.

### Operational Fit

A nightly sync job reconciled repository metadata and ownership records to minimize manual drift.
