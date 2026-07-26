---
title: "Yeaberry - Autonomous Harvesting Robot"
type: "project"
summary: "A cyber-physical strawberry harvesting cell combining a pneumatic soft gripper, YOLO11-S RGB-D perception, UR3e control, and crop monitoring."
organization: "Tecnológico de Monterrey"
dateStart: "2025-08"
dateEnd: "2025-12"
highlights:
  - "Designed and fabricated a three-finger pneumatic soft gripper with a center pad, adjustable mounting rails, universal UR3e coupler, and custom molds."
  - "Developed a YOLO11-S perception service using about 18,000 public images, 62,213 annotations, RealSense D435 depth, and PnP pose estimation."
  - "Implemented a configurable RoboDK/UR3e pick-and-place cycle with pre-pick, pick, post-pick, place, MQTT gripper commands, collision pre-checks, and visual success verification."
  - "Designed a two-layer electro-pneumatic control PCB with ESP32 pressure feedback and PWM control for the pump and valve."
  - "Integrated an ESP32/Raspberry Pi 5 crop-monitoring system with environmental sensors, MQTT logging, dashboard views, and Telegram alerts."
  - "Exceeded the project’s >75% success target in controlled tests using artificial strawberries across visible and partially occluded scenarios."
skills: ["python", "cpp", "computer-vision", "opencv", "machine-learning", "object-detection", "pose-estimation", "embedded", "sensor-integration", "circuit-design", "fea", "robot-control", "fusion"]
tags: ["Cyber-physical systems", "Soft robotics", "Agricultural robotics", "RGB-D perception"]
published: true
portfolio: true
timeline: true
thumbnail:
  path: "/items/autonomous-harvesting-robot/thumbnail.jpg"
  alt: "UR3e arm with Yeaberry's three-finger soft gripper harvesting strawberries beside a RoboDK simulation and monitoring dashboard."
  objectFit: "fill"
links:
  - kind: "repository"
    label: "GitHub"
    url: "https://github.com/YaoCr003/pickafresa_yea/"
  - kind: "file"
    label: "Technical Report (Spanish)"
    url: "/items/autonomous-harvesting-robot/technical_report_yea_r2.pdf"
    icon: "publication"
  - kind: "file"
    label: "Video (Spanish)"
    url: "/items/autonomous-harvesting-robot/demo-optimized.mp4"
    icon: "video"
media:
  - kind: "pdf"
    path: "/items/autonomous-harvesting-robot/technical_report_yea_r2.pdf"
    title: "Technical Report (Spanish)"
    caption: "Full technical report for the YEA autonomous strawberry harvesting system, dated December 7, 2025."
  - kind: "video"
    path: "/items/autonomous-harvesting-robot/demo-optimized.mp4"
    title: "Short Format Video"
    caption: "Short-format demonstration of the integrated harvesting cell."
    poster:
      path: "/items/autonomous-harvesting-robot/thumbnail.jpg"
      alt: "UR3e arm with Yeaberry's three-finger soft gripper harvesting strawberries beside a RoboDK simulation and monitoring dashboard."
collaborators:
  - name: "Yael Cortés"
    url: "mailto:A01275893@tec.mx"
  - name: "Emiliano González"
    url: "mailto:A01705488@tec.mx"
relations:
  - id: "robosoft-2026-harvesting-robot"
    label: "Related system"
  - id: "bs-robotics-digital-systems"
    label: "Academic context"
cvReview: ["academic", "full"]
---

Yeaberry was developed over 16 weeks as a proof-of-concept cyber-physical cell for delicate strawberry harvesting in a controlled environment. The project addressed the full loop from detecting fruit and estimating its 3D pose to moving a collaborative robot, actuating a compliant tool, placing the fruit, and checking whether the pick succeeded.

## Contribution

I designed the three-finger pneumatic soft gripper, its universal quick-change coupler for the UR3e, the actuator molds, and the soft center pad that keeps rigid parts away from the fruit. The actuator geometry uses curved, friction-enhancing fingers with two rows of pneumatic chambers so the gripper can conform to irregular fruit. I also used finite-element simulations to study deformation and iterated the manufacturing and sealing process in silicone.

I was responsible for the main vision and robot-integration path. The perception service combines a RealSense D435 RGB-D camera with a YOLO11-S detector trained on roughly 18,000 public images and 62,213 annotations. The model classifies ripe and unripe fruit; depth filtering and a PnP solve then turn each detection into a usable 6-DOF pose. A configurable confidence threshold of 0.65 was selected to reduce unsafe detections in the test setup.

## System architecture

The control stack uses RoboDK as a digital twin and intermediary for the UR3e. A complete cycle moves through fixed photo and home poses, calculates pre-pick and pick targets from the detected fruit pose, sends MQTT commands to inflate and release the gripper, and applies calibrated post-pick motions to separate the fruit from the plant. Before physical execution, trajectories are checked in simulation for collisions. After placement, the robot returns to the photo pose and uses a second vision pass to verify that no ripe fruit remains.

The gripper is driven by an ESP32, a pneumatic pump, a 3/2 solenoid valve, a pressure sensor, MOSFET drivers, and a two-layer control PCB. Pressure/PWM characterization supported a PI controller tuned with gains of Kp = 7 and Ki = 2. In parallel, the team built an agricultural monitoring service around a second ESP32 and Raspberry Pi 5: a DHT22, LDR, and three capacitive soil-moisture sensors publish readings over MQTT, while the Raspberry Pi stores data and images for dashboard views and Telegram alerts.

## Evaluation and lessons

The final experiments used artificial strawberries arranged to reproduce the size, position, and resistance of real fruit. The test matrix included an unobstructed ripe strawberry, a ripe fruit touching an unripe one with up to 20% occlusion, and a ripe fruit with at least 40% leaf occlusion. The report states that the integrated system exceeded the original success target of 75% for identifying and collecting fruit in the specified maturity state.

The result is a functional controlled-environment demonstration rather than a field-ready agricultural machine. Testing exposed false negatives under occlusion, model confusion with leaf-like backgrounds, inconsistent actuator sealing during fabrication, sensor-calibration issues, data loss after a Raspberry Pi failure, pump-induced vibration, and limited UR3e reach in the fixed setup. The report identifies a more representative greenhouse setup, a scenario-specific training dataset, more repeatable soft-actuator manufacturing, stronger data backups, and adaptive control as the next steps.
