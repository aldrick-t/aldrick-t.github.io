---
title: "Computer Vision Based Autonomous Navigation"
type: "project"
summary: "ROS 2 autonomy stack for a differential-drive Puzzlebot, combining OpenCV line following, custom YOLOv8 traffic-sign and traffic-light detection, encoder odometry, and parameterized crossing control."
organization: "Manchester Robotics, Tecnológico de Monterrey"
dateStart: "2025-02"
dateEnd: "2025-08"
highlights:
  - "Built and packaged a Python ROS 2 Humble workspace for the Manchester Robotics Puzzlebot with dedicated perception, command, control, and odometry nodes."
  - "Implemented a grayscale/OpenCV contour pipeline using proximal and mid-range camera regions to publish line centroids and crossing cues."
  - "Developed a custom YOLOv8 detector for three traffic-light states and six traffic-sign classes, with class-specific confidence thresholds and ROS topics for control."
  - "Connected line commands, crossing state, traffic detections, and encoder-based Pose2D odometry in a parameterized robot-control node that selects straight, left, or right paths and applies stop or slowdown behavior."
  - "Supported onboard, remote, and Gazebo simulation launch modes; physical deployment exposed 2.4 GHz Wi-Fi interference and latency as constraints on distributed ROS 2 communication."
skills: ["python", "ros2", "opencv", "computer-vision", "object-detection", "sensor-integration", "robot-control", "gazebo"]
tags: ["ROS 2", "Computer vision", "Autonomous navigation"]
published: true
portfolio: true
timeline: true
thumbnail:
  path: "/items/computer-vision-autonomous-navigation/thumbnail.png"
  alt: "Differential-drive Puzzlebot following a marked track beside traffic signs."
  objectFit: "contain"
  objectPosition: "50% 50%"
links:
  - kind: "repository"
    label: "GitHub repository"
    url: "https://github.com/aldrick-t/puzzlebot-emdial"
  - kind: "file"
    label: "Poster"
    url: "/items/computer-vision-autonomous-navigation/Poster-Puzzlebot-Emdial.pdf"
    icon: "publication"
  - kind: "video"
    label: "Presentation Video (ES)"
    url: "https://youtu.be/C__XYonTsjs"
    icon: "video"
media:
  - kind: "pdf"
    path: "/items/computer-vision-autonomous-navigation/Poster-Puzzlebot-Emdial.pdf"
    title: "Technical poster (ES)"
    caption: "Expo Ingenierías 2025 poster describing the ROS 2 pipeline, hardware distribution, and real-time communication constraints."
collaborators:
  - name: "Diego Quezada Colorado"
    url: "https://www.linkedin.com/in/diegoquezadaco/"
  - name: "Emanuel Vega"
    url: "https://www.linkedin.com/in/emanueljvegag/"
relations:
  - id: "bs-robotics-digital-systems"
    label: "Academic context"
cvReview: ["engineering", "academic", "full"]
---

## System architecture

The project used Manchester Robotics' differential-drive Puzzlebot to navigate a marked track autonomously. The GitHub repository packages the final challenge as a Python ROS 2 Humble workspace for Ubuntu 22.04, with dedicated nodes for camera processing, line recognition, command generation, traffic detection, control, and odometry.

The recommended onboard deployment runs `line_recogni`, `line_cmd`, `robot_ctrl`, and `x_odometry_node` on the robot side, while a local launch mode runs the traffic-sign and traffic-light detector separately. The repository also provides remote and Gazebo simulation launch modes for development and testing.

## Perception and control pipeline

The line-recognition node converts camera frames to grayscale, applies Gaussian blur and inverse binary thresholding, then uses morphological cleanup and contour extraction. It evaluates proximal and mid-range image regions, publishing the detected line centroid, mid-range centroid arrays, and viewfield dimensions. A downstream command node converts the centroid offset into a normalized line-following command and detects crossings from the spatial arrangement of multiple centroids and their vertical spacing.

Traffic perception uses a custom YOLOv8 model loaded by the `tlts_detector` node. The model distinguishes three traffic-light states (`tl_green`, `tl_yellow`, and `tl_red`) and six traffic-sign classes for stop, give-way, left, right, straight, and work signs. Class-specific confidence thresholds are exposed as ROS parameters, and the selected detections are published as topics alongside an annotated image stream.

The `robot_ctrl` node combines line commands, traffic detections, crossing state, and encoder-based `Pose2D` odometry. Its parameterized angular controller reduces speed on sharper curves, stops for red lights and stop signs, slows for yellow/work/give-way conditions, and selects preset straight, left-turn, or right-turn paths at crossings. The odometry node filters wheel-encoder readings, integrates differential-drive motion, publishes pose estimates, and resets the local pose when a crossing sequence begins.

## Deployment and evaluation

The system distributed responsibilities across an ESP32, an NVIDIA Jetson Nano, and a laptop running traffic inference. The combined stack produced a functional physical integration of line following, traffic-aware control, crossing navigation, and neural-network image recognition.

The report and repository document a practical deployment limitation: latency and interference on the 2.4 GHz Wi-Fi channel, amplified by nearby networks, affected real-time communication between distributed ROS 2 nodes. This constraint makes the project a useful example of how network architecture and execution placement can be as important as perception and control algorithms in a mobile robot.
