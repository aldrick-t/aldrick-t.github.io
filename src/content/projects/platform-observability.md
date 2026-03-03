---
title: "Platform Observability Upgrade"
summary: "Redesigned service observability with trace-driven debugging, improving incident triage speed and reliability visibility."
role: "Backend Engineer"
stack:
  - "Go"
  - "OpenTelemetry"
  - "Prometheus"
  - "Grafana"
  - "Kubernetes"
dateStart: "2024-02"
dateEnd: "2024-09"
githubUrl: "https://github.com/aldrick-t/platform-observability-upgrade"
featured: true
order: 1
problem: "Microservice incidents took too long to diagnose because logs, traces, and metrics were disconnected, making root-cause analysis inconsistent."
approach: "Defined an observability standard, instrumented critical paths with OpenTelemetry, added service-level dashboards, and aligned alert rules to SLO boundaries."
impact:
  - "Reduced average incident triage time by 46%."
  - "Improved alert precision by removing noisy non-actionable alarms."
  - "Introduced cross-service trace IDs used across all incident reports."
lessons:
  - "Instrumentation standards are as important as tooling choice."
  - "SLO-aligned alerts prevent alert fatigue in growing systems."
  - "Dashboards should be built from incident response workflows, not vanity metrics."
---

### Architecture Notes

The rollout used incremental instrumentation by service tier to avoid destabilizing production. A shared middleware package enforced consistent trace propagation and semantic attribute naming.

### Delivery Strategy

The migration was split into pilot and expansion phases. The pilot targeted the checkout domain where incident frequency was highest. Once stable, the same pattern was replicated across supporting APIs.
