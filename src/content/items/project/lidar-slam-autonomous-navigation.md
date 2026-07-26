---
title: "LiDAR-Based SLAM for Autonomous Navigation"
type: "project"
summary: "Developed a modular ROS 2 navigation stack that combines LiDAR obstacle sensing, ArUco localization, EKF fusion, and reactive planning for the Puzzlebot."
organization: "Manchester Robotics, Tecnológico de Monterrey"
dateStart: "2026-03"
dateEnd: "2026-06"
highlights:
  - "Built independent ROS 2 modules for visual localization, EKF pose fusion, path generation, motion control, wall following, and obstacle avoidance."
  - "Combined wheel odometry with ArUco marker observations to correct accumulated pose drift and reduce localization uncertainty."
  - "Implemented Bug0 and Bug2 behaviors that use LiDAR obstacle detection and wall following to recover the route toward a goal."
  - "Validated goal-to-goal navigation in Gazebo and RViz across eight logged trajectories, with residual distances ranging from 1 to 10 cm."
  - "Configured a 0.095 m goal-acceptance threshold and documented marker placements, goal coordinates, TF frames, and repeatable launch/test procedures."
skills: ["cpp", "python", "ros2", "slam", "gazebo", "sensor-integration", "robot-control", "linux"]
tags: ["Autonomy", "Mobile robotics", "Sim-to-real"]
published: true
portfolio: true
timeline: true
featuredRank: 1
thumbnail:
  path: "/items/lidar-slam-autonomous-navigation/thumbnail.jpg"
  alt: "MCR2 Puzzlebot navigating a taped maze while a laptop displays its colored route and map."
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
    path: "/items/lidar-slam-autonomous-navigation/presentation-optimized.mp4"
    title: "Final Presentation Video."
    poster:
      path: "/items/lidar-slam-autonomous-navigation/thumbnail.jpg"
      alt: "MCR2 Puzzlebot navigating a taped maze while a laptop displays its colored route and map."
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

This project developed an autonomous-navigation stack for the MCR2 Puzzlebot using ROS 2, Gazebo, RViz, LiDAR, camera-based ArUco markers, wheel odometry, and an extended Kalman filter (EKF). The report’s validated experiment focused on simulated navigation: the robot had to reach predefined goals in a maze while estimating its pose, detecting obstacles, and recovering its route after encounters with walls.

The implementation was organized as independent ROS 2 nodes. A localization node provided odometry, while the ArUco/EKF module fused odometric motion with known marker positions and published a corrected global estimate. The controller consumed that estimate and LiDAR scans, driving toward the active goal in direct mode and switching to wall following when an obstacle was detected. Bug0 returned to the goal whenever a clear path was available; Bug2 used the start-to-goal reference line (the m-line) to decide when to leave the obstacle boundary and resume the route.

The report compares the pose estimate before and after visual correction: detecting an ArUco marker reduced the RViz confidence ellipse and corrected both position and orientation. Eight goal-to-goal runs were recorded with residual distances between 0.01 m and 0.10 m; 0.095 m was used as the goal-acceptance threshold. The results supported the feasibility of combining visual references, sensor fusion, and reactive navigation in a controlled environment, while also exposing sensitivity to controller calibration, marker visibility, sensor noise, and node synchronization.

The accompanying repository packages the simulation, launch files, YAML parameters, RViz configuration, unit tests, and a separate physical-robot bringup package. That bringup includes RPLIDAR and micro-ROS integration plus launch wrappers for SLAM Toolbox and Nav2, extending the simulation architecture toward real Puzzlebot deployment. The report itself identifies physical validation, more robust planning, improved calibration, and more systematic measurement as future work.
