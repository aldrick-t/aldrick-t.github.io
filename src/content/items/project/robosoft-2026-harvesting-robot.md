---
title: "MORI - Delicate Ripe Fruit Harvesting Robot"
type: "project"
summary: "MORI (MOdular RIgidity-adaptive Instrument) is a soft robotic harvesting system combining a UR5e manipulator, custom jamming gripper, and in-hand RGB-D perception."
organization: "IEEE RoboSoft 2026 Manipulation Challenge"
dateStart: "2025-10"
dateEnd: "2026-04"
highlights:
  - "Co-developed a raspberry-inspired soft gripper with granular jamming for stiffness modulation."
  - "Built monolithic silicone manufacturing workflows using iterative 3D-printed molds."
  - "Integrated manipulation, RGB-D sensing, object detection, and pose estimation in a four-person team."
skills: ["python", "ros2", "computer-vision", "object-detection", "pose-estimation", "robot-control", "embedded", "fusion"]
tags: ["Soft robotics", "Agricultural robotics", "Manipulation"]
published: true
portfolio: true
timeline: true
featuredRank: 2
thumbnail:
  path: "/items/robosoft-2026-harvesting-robot/thumbnail.jpg"
  alt: "UR5e manipulator with an RGB-D camera and soft gripper positioned over a fruit during a lab harvesting test."
  objectFit: "fill"
  objectPosition: "50% 0%"
collaborators:
  - name: "Carol Rodriguez"
    url: "https://www.linkedin.com/in/carol-rodriguez-/"
  - name: "Fiona Stasi"
    url: "https://www.linkedin.com/in/stasifiona/"
  - name: "Daniel De Regules"
    url: "https://www.linkedin.com/in/daniel-de-regules/"
media:
  - kind: "youtube"
    url: "https://www.youtube.com/watch?v=st76D2HfAnI"
    title: "MORI - Delicate Ripe Fruit Harvesting Robot"
    caption: "MORI Demonstration Video (Recorded Jan 2026)"
relations:
  - id: "ieee-robosoft-2026"
    label: "Presented at"
  - id: "autonomous-harvesting-robot"
    label: "Related system"
cvReview: ["engineering", "academic", "full"]
---

MORI (MOdular RIgidity-adaptive Instrument) was developed for the Manipulation Challenge at the 9th IEEE International Conference on Soft Robotics. The system targets low-damage interaction with delicate fruit by combining a UR5e manipulator, an end effector inspired by raspberry morphology, granular jamming for stiffness modulation, and RGB-D perception mounted at the tool.

## System design

The four-person team developed the soft gripper and its monolithic silicone manufacturing workflow together with the manipulation and perception stack. Iterative 3D-printed molds supported repeated fabrication changes, while granular jamming allowed the gripper to change its stiffness during interaction. This connected mechanical design decisions directly to the requirements of handling delicate fruit rather than evaluating the gripper as an isolated component.

The manipulation workflow combines the UR5e arm with in-hand RGB-D sensing, object detection, and pose estimation. The perception and control components provide the information needed to locate fruit, plan an approach, and evaluate the interaction as part of a complete harvesting sequence. The project demonstrates an integrated soft-robotics system while leaving broader field deployment, crop variation, and systematic damage benchmarking as future work.
