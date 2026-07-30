#import "./resume.typ": *

#let name = "Aldrick Victor Tadeo Arellano"
#let email = "aldricktadeo@gmail.com"
#let github = "github.com/aldrick-t"
#let linkedin = "linkedin.com/in/aldrick-t"
#let phone = "+1 (702) 624-4515"

#show: resume.with(
  author: name,
  email: email,
  github: github,
  linkedin: linkedin,
  accent-color: "#3D5475",
  font-size: 10pt,
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

== 

Robotics and Digital Systems Engineering graduate focused on autonomous robotic systems, sim-to-real development, perception, SLAM, and deployable embodied AI. Seeking graduate study opportunities to advance research in robotic autonomy, digital-twin-based experimentation, and field-ready intelligent systems that transfer reliably from simulation to real-world environments.

== Education

#edu(
  degree: "B.S. in Robotics and Digital Systems Engineering",
  institution: "Monterrey Institute of Technology and Higher Education (Tecnológico de Monterrey)",
  dates: dates-helper(start-date: "2022", end-date: "2026"),
  gpa: "CGPA: 95/100",
  consistent: true,
)
- Academic Excellence Scholarship recipient for sustained high academic performance.
- Specialization in Cyberphysical Systems, with emphasis on embedded systems, robotics, control, and intelligent automation.
- Diploma of Student Development for sustained participation in extracurricular formative activities.

== Research Interests

- Sim-to-real robotics, digital twins, and simulation-based experimentation for autonomous systems.
- SLAM, perception, sensor fusion, and autonomous navigation using LiDAR, RGB-D, and visual sensing.
- Embodied AI and field robotics for robust deployment in uncertain, real-world environments.
- Robotic manipulation, soft robotic end-effectors, and perception-guided agricultural robotics.

== Research and Academic Projects

#project(
  name: "LiDAR-Based SLAM for Autonomous Navigation",
  org: "Manchester Robotics, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "Mar 2026", end-date: "Jun 2026"),
  url: "",
  one-liner: false,
)
- Developed a ROS 2 autonomy stack for the MCR2 Puzzlebot with ArUco visual localization, EKF pose fusion, LiDAR obstacle sensing, and reactive motion control.
- Built independent modules for path generation, wall following, and obstacle avoidance; implemented Bug0 and Bug2 behaviors to recover routes toward a goal.
- Validated goal-to-goal navigation in Gazebo and RViz across eight logged trajectories, with residual distances from 1 to 10 cm.
- Configured a 0.095 m goal-acceptance threshold and documented marker placements, goal coordinates, TF frames, and repeatable launch and test procedures.
- Packaged simulation, launch files, YAML parameters, RViz configuration, unit tests, and a separate physical-robot bringup path for future deployment.

#project(
  name: "MORI - Delicate Ripe Fruit Harvesting Robot",
  org: "IEEE RoboSoft 2026 Manipulation Challenge",
  dates: dates-helper(start-date: "Oct 2025", end-date: "Apr 2026"),
  url: "",
  one-liner: false,
)
- Co-developed a fruit-parameterized granular-jamming gripper for low-damage fruit handling, designed to extend commercial 2F grippers.
- Developed an experimental monolithic silicone manufacturing workflow with custom mold design for iterative fabrication.
- Integrated a UR5e manipulator with in-hand RGB-D sensing, YOLO11 object detection, and PnP pose estimation in a four-person team.
- Presented the complete harvesting system in the Manipulation Challenge at the 9th IEEE International Conference on Soft Robotics in Kanazawa, Japan.

#project(
  name: "Yeaberry - Autonomous Harvesting Robot",
  org: "Cyberphysical Systems Specialization Project ",  
  dates: dates-helper(start-date: "Aug 2025", end-date: "Dec 2025"),
  url: "",
  one-liner: false,
)
- Designed and fabricated a three-finger pneumatic soft gripper with a center pad, universal UR3e coupler, adjustable mounting rails, and custom molds.
- Designed a two-layer electro-pneumatic control PCB with ESP32 pressure feedback and PWM control for the pump and valve.
- Developed an in-hand RealSense D435 RGB-D perception service using YOLO11-S, roughly 18,000 public images, 62,213 annotations, depth filtering, and PnP pose estimation.
- Implemented a configurable RoboDK/UR3e pick-and-place cycle with pre-pick, pick, post-pick, and place poses; MQTT gripper commands; collision pre-checks; and visual success verification.
- Integrated an ESP32/Raspberry Pi 5 crop-monitoring system with environmental sensors, MQTT logging, dashboard views, and Telegram alerts.
- Exceeded the project’s 75% success target in controlled artificial-strawberry tests across visible and partially occluded scenarios.

#pagebreak()

#project(
  name: "Computer Vision-Based Autonomous Navigation",
  org: "Manchester Robotics, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Aug 2025"),
  url: "",
  one-liner: false,
)
- Built and packaged a Python ROS 2 Humble workspace for the Manchester Robotics Puzzlebot with dedicated perception, command, control, and odometry nodes.
- Implemented grayscale/OpenCV contour processing for line following and crossing cues, using proximal and mid-range camera regions.
- Developed a custom YOLOv8 detector for three traffic-light states and six traffic-sign classes, improving environmental adaptability and perception reliability by 33%.
- Connected line commands, crossing state, traffic detections, and encoder-based Pose2D odometry in a parameterized control node; fused visual and onboard sensing to reduce false positives and decision errors by 15%.
- Supported onboard, remote, and Gazebo launch modes; documented 2.4 GHz Wi-Fi interference and latency as constraints on distributed ROS 2 deployment.

#project(
  name: "vid2dataset - Video-to-Image Dataset Tool",
  org: "Open-source developer tooling",
  dates: dates-helper(start-date: "Dec 2025", end-date: "Present"),
  url: "",
  one-liner: false,
)
- Rebuilt the original Python, OpenCV, and PySide application as a Rust workspace with a shared extraction core.
- Delivered both a complete CLI and a Tauri + React desktop application for video inspection and dataset extraction.
- Implemented reproducible frame sampling, crop and resize transforms, color conversion, and JSONL/CSV manifests through FFmpeg filtergraphs.
- Added interactive video preview, scrubbing, frame seeking, crop editing, legacy-profile import, and portable FFmpeg discovery in the functional alpha release.

#work(
  title: "Telemetry Development Division Lead and Founder",
  company: "Electrum Performance Racing Team",
  dates: dates-helper(start-date: "Jun 2024", end-date: "Oct 2025"),
  one-liner: false,
)
- Founded and led the telemetry division, building a real-time data acquisition stack for high-stress electric vehicle environments.
- Developed failsafe serial telemetry architecture, reducing data-transmission failures by 15%.
- Improved cross-team collaboration with Fusion 360 cloud version control, cutting design iteration time by 10%.
- Directed cost optimization that reduced manufacturing and component expenses by 35% while maintaining system reliability.
- Engineered firmware and data workflows across multiple vehicle subsystems while coordinating technical collaboration and documentation.

== Work and Technical Experience

#work(
  title: "Software Engineer Intern",
  company: "GE Aerospace",
  dates: dates-helper(start-date: "Nov 2025", end-date: "Jul 2026"),
  one-liner: false,
)
- Designed usage-event models and PostgreSQL schemas for internal CAD/CAE and PLM engineering workflow analysis.
- Integrated telemetry into Siemens NX-centered toolchains through C\#/.NET services, REST interfaces, and NX Open extensions.
- Built Grafana dashboards to analyze adoption patterns, bottlenecks, and reliability trends across engineering software systems.
- Implemented backend system monitoring and alerting with Prometheus and Grafana.
- Developed TeamViewer Frontline Spatial AR/VR training and visualization prototypes for aerospace manufacturing and maintenance.
- Created Azure DevOps CI/CD pipelines for telemetry services, NX extensions, Grafana provisioning, and Prometheus exporters.


== Honors, Leadership, and Service

#extracurriculars(
  activity: "600+ Hours of Community Service Award, Department of Social Formation - Tecnológico de Monterrey",
  dates: "Apr 2026",
)
- Recognized for accumulating over 600 hours of community service throughout my undergraduate program.

#extracurriculars(
  activity: "IEEE RoboSoft 2026 Participant, IEEE Robotics and Automation Society",
  dates: "Apr 2026",
)
- Competitor in the Manipulation Challenge at the _9th IEEE International Conference on Soft Robotics_ hosted in Kanazawa, Japan. Member of the first team from Mexico to participate; contributed to soft robotics design, perception, and system integration.

#extracurriculars(
  activity: "STEM Workshops, Clínica Koi",
  dates: dates-helper(start-date: "Apr 2025", end-date: "Jun 2025"),
)
- Delivered hands-on robotics and engineering workshops for children and teenagers in vulnerable situations.
- Designed outreach activities using computer vision, gesture recognition, and interactive robotics to make STEM concepts accessible and motivating.

#extracurriculars(
  activity: "ExpoIngenierías 2025 Finalist, Tecnológico de Monterrey",
  dates: "Jul 2025",
)
- Finalist in the engineering expo at Tecnológico de Monterrey, presenting a ROS 2-based autonomous navigation system for mobile robotics applications.

#extracurriculars(
  activity: "Academic Excellence Scholarship, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "2022", end-date: "2026"),
)
- Merit-based scholarship supporting undergraduate studies in recognition of academic performance and potential.

== Technical Skills

#skills(
  category: "Programming",
  items: "Python, C/C++, C# / .NET, MATLAB, JavaScript, TypeScript, Rust, VHDL, Typst"
)

#skills(
  category: "Robotics",
  items: "ROS 2, SLAM, Gazebo, RViz, Nav2D, Sensor Integration, Robot Kinematics, Robot Control, LiDAR, RGB-D Cameras"
)

#skills(
  category: "AI and Perception",
  items: "Machine Learning, Deep Learning, Computer Vision, Object Detection, Pose Estimation"
)

#skills(
  category: "Embedded and Hardware",
  items: "Embedded Systems, ESP32, STM32, Arduino, Raspberry Pi, KiCad, Circuit Design, FPGAs"
)

#skills(
  category: "Software and Tools",
  items: "Linux, Docker / Podman, PostgreSQL, Grafana, Prometheus, Git / GitHub, CI/CD, Azure DevOps, Azure Pipelines, GitHub Actions, TeamViewer Frontline Spatial, RoboDK"
)

#skills(
  category: "CAD/CAE/SIM",
  items: "Autodesk Fusion, SolidWorks, Siemens NX, AutoCAD, SimScale, Ansys Static Structural, Finite Element Analysis (FEA), Hyperelastic Material Modeling"
)

#skills(
  category: "Libraries and Frameworks",
  items: "OpenCV, TensorFlow, PyTorch, NumPy, Ultralytics, React, Tauri"
)

== Languages

#language(
  language: "English",
  proficiency: "Native Proficiency",
  cert: "IELTS",
  score: "8.5",
  level: "C2",
  date: "05/2026",
)

#language(
  language: "Spanish",
  proficiency: "Native Proficiency",
)

#language(
  language: "Japanese",
  proficiency: "Limited Working Proficiency",
)

== Certifications

#certificates(
  name: "Fundamentals of Deep Learning",
  issuer: "NVIDIA",
  url: "",
  id: "W-y3ytgySYGKL1ps1Yh-EA",
)

#certificates(
  name: "Generative AI with Diffusion Models",
  issuer: "NVIDIA",
  url: "",
  id: "x91OqtdARUWi07HsVf5Vyg",
)

#certificates(
  name: "OpenCV Bootcamp",
  issuer: "OpenCV University",
  url: "",
  id: "65a25e083f50497dba5f5538026087",
)

#certificates(
  name: "UR e-Series Tracks (Core, Pro, Application)",
  issuer: "Universal Robots",
  url: "",
  id: "",
)

#certificates(
  name: "Tecnológico de Monterrey Competency Credentials",
  issuer: "Tecnológico de Monterrey",
)
- Embedded Systems; Smart Interfaces; Cyberphysical Systems; Social Intelligence; Intelligent Robotic and Digital Systems.

// Suggested additions for MEXT / graduate applications:
//
// == Proposed Graduate Study Focus
// Add a 3-4 line research-focus statement aligned with the MEXT field of study and target laboratories.
//
// == Relevant Coursework
// Add 6-10 courses most relevant to robotics, AI, control, embedded systems, and research preparation.
//
// == Selected Presentations and Demonstrations
// Add posters, demos, expo presentations, competition presentations, or technical talks.
//
// == Research Methods and Tools
// Add concise evidence of experimental design, benchmarking, data analysis, simulation, and documentation practices.
