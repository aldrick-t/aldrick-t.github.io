---
title: "Dual-Mode Electro-Pneumatic Control System"
type: "project"
summary: "Fabricated electro-pneumatic controller reused for Yeaberry's positive-pressure soft gripper and MORI's vacuum pneumatic circuit."
dateStart: "2025-09"
dateEnd: "Present"
highlights:
  - "Designed and fabricated a reusable two-layer controller integrating an ESP32, pressure feedback, and PWM interfaces for a pump and solenoid valve through external MOSFET drivers."
  - "Deployed the same controller for Yeaberry's positive-pressure soft gripper, then retrofitted it for MORI's vacuum pneumatic circuit."
  - "Implemented the R5 vacuum-control revision with atmospheric zeroing, sensor-fault handling, safe venting, configurable PID tuning, and a 50 ms control loop."
skills: ["cpp", "embedded", "circuit-design", "kicad", "sensor-integration", "robot-control"]
tags: ["Soft robotics", "Embedded systems", "Pneumatic control"]
published: true
portfolio: true
timeline: true
links:
  - kind: "repository"
    label: "GitHub repository"
    url: "https://github.com/aldrick-t/softrobot-electropneu-ctrlsys"
assets: []
media: []
collaborators: []
relations:
  - id: "autonomous-harvesting-robot"
    label: "Deployed in Yeaberry"
  - id: "robosoft-2026-harvesting-robot"
    label: "Deployed in MORI"
cvReview: ["academic", "full"]
---

## Reusable pneumatic control

I designed and fabricated this electro-pneumatic controller as a reusable subsystem for soft-robotic pneumatic circuits. The two-layer board coordinates an ESP32, pressure sensing, and PWM interfaces to a pump and solenoid valve through separate MOSFET drivers. Its hardware includes 12 V and 5 V power handling, an ADS1115 for pressure acquisition from an XGZP6847A sensor, and level-shifted I2C communication.

The original controller was developed and deployed from September through December 2025 for Yeaberry's positive-pressure soft gripper. From December 2025 through February 2026, I retrofitted the same physical board for MORI's vacuum pneumatic circuit. Designing the electronics as a shared subsystem made it possible to adapt one controller across distinct pneumatic operating modes instead of treating the robot-specific integrations as isolated designs.

## R5 vacuum-control revision

The current R5 revision refines the vacuum configuration in firmware. It samples pressure through the ADS1115 on a 50 ms control period and requires an atmospheric `ZERO` calibration before accepting a negative-pressure target. The controller vents on malformed commands and pressure-signal faults, constrains targets to the configured vacuum range, and exposes proportional, integral, derivative, deadband, and vent-pulse settings for serial tuning and persistence.

R5 is an implemented ongoing refinement. Its closed-loop vacuum behavior is awaiting physical validation, so this record does not claim pressure accuracy, settling time, or other measured control performance.
