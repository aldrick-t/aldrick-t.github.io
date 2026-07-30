#import "./resume.typ": *

// Put your personal information here, replacing mine
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

/*
* Lines that start with == are formatted into section headings
* You can use the specific formatting functions if needed
* The following formatting functions are listed below
* #edu(dates: "", degree: "", gpa: "", institution: "", location: "", consistent: false)
* #work(company: "", dates: "", location: "", title: "")
* #project(dates: "", name: "", role: "", url: "")
* certificates(name: "", issuer: "", url: "", date: "")
* #extracurriculars(activity: "", dates: "")
* There are also the following generic functions that don't apply any formatting
* #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
* #generic-one-by-two(left: "", right: "")
*/
== 

Robotics, AI, and embedded software engineer focused on ROS 2 autonomous systems, perception, SLAM, and sensor fusion. Experienced in real-time telemetry, computer vision, embedded firmware, and robotic control software across academic and industry environments.

== Education

#edu(
  degree: "B.S. in Robotics and Digital Systems Engineering",
  institution: "Monterrey Institute of Technology and Higher Education (Tecnológico de Monterrey)",
  dates: dates-helper(start-date: "2022", end-date: "2026"),
  gpa: "CGPA: 95/100",

  // Uncomment the line below if you want edu formatting to be consistent with everything else
  consistent: true
)
- Academic Excellence Scholarship recipient.
- Specialization in Cyberphysical Systems 

== Experience

#work(
  title: "Software Engineer Intern",
  company: "GE Aerospace",
  dates: dates-helper(start-date: "Nov 2025", end-date: "Jul 2026"),
  one-liner: true,
)
- Designed usage-event models and PostgreSQL schemas for CAD/CAE and PLM workflow analysis.
- Integrated telemetry through C\#/.NET services, REST interfaces, and NX Open plugins, ensuring reliability across any platform.
- Built Grafana dashboards to track adoption, workflow bottlenecks, and reliability trends across CAD/PLM tooling. 
- Developed Frontline Spatial AR/VR prototypes to visualize maintainance and assembly procedures for aerospace components.
- Implemented Azure DevOps CI/CD pipelines for the entire telemetry tooling suite.


== Projects

#project(
  name: "LiDAR-Based SLAM for Autonomous Navigation",
  org: "Manchester Robotics, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "Mar 2026", end-date: "Jun 2026"),
  url: "",
)
- Developed a ROS2 LiDAR SLAM pipeline for autonomous navigation targeting real-time execution on embedded hardware.
- Built ROS 2 modules for ArUco localization, EKF pose fusion, LiDAR obstacle avoidance, and reactive motion control.
- Implemented Bug0/Bug2 wall-following behaviors and validated eight Gazebo/RViz trajectories with 1-10 cm residuals.

#project(
  name: "MORI - Delicate Ripe Fruit Harvesting Robot",
  org: "IEEE RoboSoft 2026 Manipulation Challenge",
  dates: dates-helper(start-date: "Oct 2025", end-date: "Apr 2026"),
  url: "",
)
- developed a fruit-parameterized granular-jamming gripper for low-damage fruit handling. Built to extend commercial 2F grippers.
- Developed an experimental monolithic manufacture, silicone mold design and workflow.
- Integrated UR5e manipulation with in-hand RGB-D sensing, object detection with YOLO-11, and PnP pose estimation.

#project(
  name: "Yeaberry - Autonomous Harvesting Robot",
  role: "Robotic Design & Software Lead",
  dates: dates-helper(start-date: "Aug 2025", end-date: "Dec 2025"),
  url: "",
)
- Created an object localization system using an in-hand RGB-D camera, YOLO11 object detection, and PnP pose estimation.
- Led design of a three-finger pneumatic soft gripper and ESP32 electro-pneumatic control PCB.
- Built a RoboDK simulation cell for UR5e manipulation, robust path planning, and collision detection and avoidance harnesses.

#project(
  name: "Computer Vision-Based Autonomous Navigation",
  org: "Manchester Robotics, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Aug 2025"),
  url: "",
)
- Developed autonomous navigation and control systems on the MCR2 Puzzlebot platform using minimal hardware and processing.
- Implemented traffic sign and light recognition systems, improving reliability, accuracy, and environmental adaptability by 33%. 
- Enhanced navigation and positioning precision by fusing visual and internal sensors for improved real-world performance. 
- Built vision redundancy features, reducing false positives and lowering detection/decision error rates by 15%. 
- Redesigned the ROS2 node-topic architecture, optimizing data throughput and minimizing system failure points.



== Skills

#skills(
  category: "Programming",
  items: "Python, C/C++, C#/.NET, MATLAB, JavaScript"
)

#skills(
  category: "Robotics & Autonomy",
  items: "ROS2, SLAM, RGB-D cameras, LiDAR, Robot Control, Gazebo, RViz"
)

#skills(
  category: "Embedded & Hardware",
  items: "Circuit Design, Embedded Systems, KiCAD, FPGAs, ESP32, STM32, Arduino"
)

#skills(
  category: "AI & Perception",
  items: "Machine Learning, Deep Learning, Computer Vision, Object Detection, OpenCV"
)

#skills(
  category: "Tools",
  items: "Linux, Docker, Grafana, PostgreSQL, Siemens NX, SolidWorks, Autodesk Fusion, RoboDK"
)

#skills(
  category: "DevOps",
  items: "Git/GitHub, CI/CD, Azure DevOps, Azure Pipelines, Github Actions, Agile/Scrum, Unit Testing"
)

#skills(
  category: "Languages",
  items: "English (Native / C2), Spanish (Native), Japanese (Limited Working Proficiency)"
)

== Certificates

#certificates(
  name: "Fundamentals of Deep Learning",
  issuer: "NVIDIA",
  url: "",
  id: "W-y3ytgySYGKL1ps1Yh-EA"
)

#certificates(
  name: "Generative AI with Diffusion Models",
  issuer: "NVIDIA",
  url: "",
  id: "x91OqtdARUWi07HsVf5Vyg"
)

#certificates(
  name: "UR e-Series Tracks (Core, Pro, Application)",
  issuer: "Universal Robots",
  url: "",
  id: ""
)

#certificates(
  name: "OpenCV Bootcamp",
  issuer: "OpenCV University",
  url: "",
  id: "65a25e083f50497dba5f5538026087"
)
