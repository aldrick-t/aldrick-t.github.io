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
  phone: phone,
  accent-color: "#3D5475",
  font: "Helvetica Neue",
  font-size: 9pt,
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

Robotics and embedded software engineer focused on ROS2-based autonomous systems, perception, SLAM, and sensor fusion. Experienced in developing real-time telemetry, computer vision pipelines, embedded firmware, and robotic control software across academic, competition, and industry environments.

== Education

#edu(
  degree: "Bachelors of Science, Robotics and Digital Systems Engineering",
  institution: "Monterrey Institute of Technology and Higher Education (ITESM)",
  dates: dates-helper(start-date: "2022", end-date: "2026"),
  gpa: "GPA: 4.0/4.0",

  // Uncomment the line below if you want edu formatting to be consistent with everything else
  consistent: true
)
- Academic Excellence Scholarship recipient.
- Specialization in Cyberphysical Systems 

== Experience

#work(
  title: "Software Engineer Intern",
  company: "GE Aerospace",
  dates: dates-helper(start-date: "Nov 2025", end-date: "Present"),
  one-liner: true,
)
- Designed a usage-telemetry framework for multiple internal CAD/CAE (Siemens NX) and PLM/data tools; defined event model + PostgreSQL schema for hundreds of daily users. 
- Integrated telemetry into engineering toolchains via a C\#/.NET service wrapper, sending events through REST + internal service calls. 
- Developed NX Open plugins to employ NX workflows with internal tools and capture usage/error data with minimal impact to engineers. 
- Built Grafana dashboards to track adoption, workflow bottlenecks, and reliability trends across CAD/PLM tooling. 

#work(
  title: "Telemetry Development Division Lead & Founder",
  company: "Electrum Performance Racing Team",
  dates: dates-helper(start-date: "Jun 2024", end-date: "Oct 2025"),
  one-liner: true,
)

- Founded and led the Telemetry Division, building a robust real-time data acquisition system designed for high-stress environments. 
- Developed failsafe telemetry solutions using serial communication protocols, reducing transmission failures by 15%. 
- Improved cross-team collaboration by implementing Fusion 360's cloud-based version control, cutting design iteration times by 10%. 
- Directed a cost optimization initiative, reducing manufacturing and component expenses by 35% while maintaining system reliability. 
- Engineered firmware components to streamline workflows and enhance data accuracy across multiple vehicle subsystems.

== Projects

#project(
  name: "LiDAR Based SLAM for Autonomous Navigation",
  role: "Lead Developer",
  dates: dates-helper(start-date: "Mar 2026", end-date: "Present"),
  url: "",
)
- Developed a ROS2 LiDAR SLAM pipeline for autonomous navigation using scan matching and pose graph optimization, targeting real-time execution on embedded compute hardware.
- Implemented a custom SLAM algorithm combining scan matching and graph optimization, improving localization accuracy by 20% compared to traditional methods.
- Integrated using ROS2, enabling seamless communication with other robotic components and facilitating multi-sensor fusion.

#project(
  name: "IEEE Robosoft Competition 2026",
  role: "Robotic Design & Software Lead",
  dates: dates-helper(start-date: "Aug 2025", end-date: "Apr 2026"),
  url: "",
)
- Designed a soft robotic gripper for berry harvesting, including the tool, control software, and circuitry; optimized through iterative design to reduce material costs and enhance flexibility. 
- Developed IoT-based crop monitoring hardware and software for greenhouse environments, improving real-time tracking of crop health. 
- Built an AI vision system for in-field strawberry and raspberry classification, optimized for deployment on both remote servers and edge devices.
- Created an object localization system using an in-hand RGB-D camera to guide robotic tool positioning with precision

#project(
  name: "Manchester Robotics & Tec de Monterrey",
  role: "AI Navigation Systems Developer",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Aug 2025"),
  url: "",
)
- Developed autonomous navigation and control systems on the MCR2 Puzzlebot platform, enabling robust mobile robotics operation. 
- Implemented traffic sign and traffic light recognition systems, improving reliability, accuracy, and environmental adaptability by 33%. 
- Enhanced navigation and positioning precision by fusing visual and internal sensors for improved real-world performance. 
- Built vision redundancy features, reducing false positives and lowering detection/decision error rates by 15%. 
- Redesigned the ROS2 node-topic architecture, optimizing data throughput and minimizing system failure points.

== Skills

#skills(
  category: "Programming",
  items: "Python, C/C++, C\#, MATLAB, JavaScript, VHDL"
)

#skills(
  category: "Robotics & Autonomy",
  items: "ROS2, SLAM, RGB-D cameras, LiDAR, Robot Control"
)

#skills(
  category: "Embedded & Hardware",
  items: "Circuit Design, KiCAD, FPGAs, ESP32, STM32, Arduino, Raspberry Pi"
)

#skills(
  category: "AI & Perception",
  items: "OpenCV, Machine Learning, Deep Learning, Computer Vision, Object Detection"
)

#skills(
  category: "Tools",
  items: "Linux, Docker, Grafana, PostgreSQL, Siemens NX, SolidWorks, Fusion 360"
)

#skills(
  category: "DevOps",
  items: "Git/GitHub, CI/CD, Azure DevOps, Agile/Scrum, Unit Testing"
)

#skills(
  category: "DevOps",
  items: "Git/GitHub, CI/CD, Azure DevOps, Agile/Scrum, Unit Testing"
)

== Certificates

#certificates(
  name: "Fundamentals of Deep Learning",
  issuer: "NVIDIA",
  url: "",
  id: "1tO0Ys3ITkGJkXM3sgBKrQ"
)

#certificates(
  name: "Generative AI with Diffusion Models",
  issuer: "NVIDIA",
  url: "",
  id: "TauXuWfURMOBYNutOVkopw"
)

#certificates(
  name: "OpenCV Bootcamp",
  issuer: "OpenCV University",
  url: "",
  id: "65a25e083f50497dba5f5538026087"
)

#certificates(
  name: "UR e-Series Tracks (Core, Pro, Application)",
  issuer: "Universal Robots",
  url: "",
  id: ""
)

