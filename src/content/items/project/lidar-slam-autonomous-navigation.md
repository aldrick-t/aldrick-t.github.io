---
title: "LiDAR-Based SLAM for Autonomous Navigation"
type: "project"
summary: "Developing a ROS 2 LiDAR SLAM pipeline for real-time autonomous navigation on embedded mobile-robot hardware."
organization: "Manchester Robotics, Tecnológico de Monterrey"
dateStart: "2026-03"
dateEnd: "2026-06"
highlights:
  - "Implementing scan matching and map-generation workflows for robust localization."
  - "Integrating Gazebo simulation with physical MCR2 Puzzlebot testing."
  - "Designing repeatable maze-mapping and navigation experiments for sim-to-real evaluation."
skills: ["cpp", "python", "ros2", "slam", "gazebo", "sensor-integration", "robot-control", "linux"]
tags: ["Autonomy", "Mobile robotics", "Sim-to-real"]
published: true
portfolio: true
timeline: true
featuredRank: 1
thumbnail:
  path: "/items/lidar-slam-autonomous-navigation/thumbnail.png"
  alt: "Short description of the thumbnail"
links:
  - kind: "repository"
    label: "GitHub"
    url: "https://github.com/EmanuelVegaGlz/puzzlebot-bremdial"
  - kind: "file"
    label: "Technical report (ES)"
    url: "/items/lidar-slam-autonomous-navigation/ev1_reporte_final_bremdial_v2.pdf"
    icon: "publication"
media:
  - kind: "video"
    path: "public/items/lidar-slam-autonomous-navigation/video-final-presentation-bremdial.mp4"
    title: "Final Presentation Video."
  - kind: "pdf"
    path: "/items/lidar-slam-autonomous-navigation/ev1_reporte_final_bremdial_v2.pdf"
    title: "Technical Report (ES)"
collaborators:
  - name: "Diego Quezada Colorado"
    url: "https://www.linkedin.com/in/diegoquezadaco/"
  - name: "Emanuel Vega"
    url: "https://www.linkedin.com/in/emanueljvegag/"
  - name: "Brisa Reyes"
    url: "https://www.linkedin.com/in/brisa-itzel-reyes-castro-a69775357/"
relations:
  - id: "bs-robotics-digital-systems"
    label: "Academic context"
cvReview: ["engineering", "academic", "full"]
---

The project investigates real-time mapping and localization on constrained compute hardware. Simulation and physical testing use the same ROS 2 architecture so algorithm changes can be evaluated against comparable navigation tasks.

The system is structured for later multi-sensor fusion and comparative SLAM benchmarking.
