#import "./resume.typ": *

#let name = "Aldrick Victor Tadeo Arellano"
#let email = "aldricktadeo@gmail.com"
#let github = "github.com/aldrick-t"
#let linkedin = "linkedin.com/in/aldrick-t"
#let phone = "+52 (442) 849-3300"

#show: resume.with(
  author: name,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  accent-color: "#3D5475",
  font: "Helvetica Neue",
  font-size: 10pt,
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
  marginxy: (x: 0.25in, y: 0.25in),
)

== 

Robotics and Digital Systems Engineering undergraduate focused on autonomous robotic systems, sim-to-real development, perception, SLAM, and deployable embodied AI. Seeking graduate study opportunities to advance research in robotic autonomy, digital-twin-based experimentation, and field-ready intelligent systems that transfer reliably from simulation to real-world environments.

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

== Research Interests

- Sim-to-real robotics, digital twins, and simulation-based experimentation for autonomous systems.
- SLAM, perception, sensor fusion, and autonomous navigation using LiDAR, RGB-D, and visual sensing.
- Embodied AI and field robotics for robust deployment in uncertain, real-world environments.
- Robotic manipulation, soft robotic end-effectors, and perception-guided agricultural robotics.

== Research and Academic Projects

#project(
  name: "LiDAR-Based SLAM for Autonomous Navigation",
  org: "Manchester Robotics, Tec de Monterrey",
  dates: dates-helper(start-date: "Mar 2026", end-date: "Present"),
  url: "",
  one-liner: false,
)
- Developing a ROS2-based LiDAR SLAM pipeline for autonomous navigation on the MCR2 Puzzlebot platform, with emphasis on real-time execution on embedded compute hardware.
- Implementing scan matching and map-generation workflows to improve localization robustness and mapping consistency.
- Integrated Gazebo-based simulation workflows with physical robot testing to support iterative sim-to-real evaluation.
- Designed experimental protocols for maze mapping, solving, and navigation in simulated and real-world environments.
- Structured the system for future integration with multi-sensor fusion, autonomy stacks, and comparative SLAM benchmarking.

#project(
  name: "Delicate Ripe Fruit Harvesting Robot",
  org: "IEEE RoboSoft 2026 - Manipulation Challenge Competition",
  dates: dates-helper(start-date: "Aug 2025", end-date: "Apr 2026"),
  url: "",
  one-liner: false,
)
- Collaborated in a four-member team to design and build a robotic harvesting system using a UR5e manipulator, custom soft gripper, and in-hand RGB-D sensing for object detection and pose estimation.
- Jointly developed a soft gripper design inspired by raspberry morphology, incorporating granular jamming for stiffness modulation and dexterous, low-damage fruit interaction.
- Developed monolithic silicone manufacturing workflows using 3D-printed molds and primitive-based design strategies to improve fabrication consistency and gripper performance.

#project(
  name: "Autonomous Harvesting Robot",
  org: "Cyberphysical Systems Specialization Project ",  
  dates: dates-helper(start-date: "Aug 2025", end-date: "Nov 2026"),
  url: "",
  one-liner: false,
)
- Led development of a bio-inspired soft robotic gripper for strawberry harvesting and small-object picking within a cyberphysical systems capstone project.
- Designed and fabricated a three-finger silicone gripper using 3D-printed molds, iterative prototyping, and experimental manufacturing refinements.
- Developed embedded control software for gripper actuation, sensor integration, and manipulation testing on a UR3e robot arm.
- Built an AI vision pipeline for strawberry classification, optimized for deployment on both workstation and edge-compute devices.
- Implemented RGB-D-based object localization to estimate fruit pose for perception-guided autonomous picking.
- Integrated perception, manipulation, and gripper-control subsystems into a functional autonomous harvesting prototype.

#project(
  name: "Computer Vision Based Autonomous Navigation",
  org: "Manchester Robotics, Tec de Monterrey",
  dates: dates-helper(start-date: "Feb 2025", end-date: "Aug 2025"),
  url: "",
  one-liner: false,
)
- Developed ROS2-based autonomous navigation and control software on the MCR2 Puzzlebot platform for mobile robotics experimentation.
- Implemented traffic-sign and traffic-light recognition modules, improving environmental adaptability and perception reliability by 33%.
- Combined visual perception with onboard sensing to reduce false positives and navigation decision errors by 15% during real-world tests.
- Redesigned the ROS2 node-topic architecture to improve modularity, data flow, and deployment robustness.
- Integrated Gazebo simulation, real-world testing protocols, and telemetry dashboards to support sim-to-real development and performance analysis.

== Work and Technical Experience

#work(
  title: "Software Engineer Intern",
  company: "GE Aerospace",
  dates: dates-helper(start-date: "Nov 2025", end-date: "Present"),
  one-liner: false,
)
- Designed a telemetry framework for internal CAD/CAE and PLM engineering tools, defining event models and PostgreSQL schemas for engineering workflow analysis.
- Integrated telemetry into Siemens NX-centered toolchains through C\#/.NET services, REST interfaces, and NX Open extensions.
- Built Grafana dashboards to analyze adoption patterns, bottlenecks, and reliability trends across engineering software systems.

#work(
  title: "Telemetry Development Division Lead and Founder",
  company: "Electrum Performance Racing Team",
  dates: dates-helper(start-date: "Jun 2024", end-date: "Oct 2025"),
  one-liner: false,
)
- Founded and led the telemetry division, building a real-time data acquisition stack for high-stress electric vehicle environments.
- Developed embedded telemetry and serial communication solutions that reduced data-transmission failures by 15%.
- Engineered firmware and data workflows across multiple vehicle subsystems while coordinating technical collaboration, documentation, and cost optimization.

== Honors, Leadership, and Service

#extracurriculars(
  activity: "600+ Hours of Community Service Award, Dept. Formación Social - Tecnológico de Monterrey",
  dates: "Apr 2026",
)
- Recognized for accumulating over 600 hours of community service throughout my undergraduate program.

#extracurriculars(
  activity: "IEEE RoboSoft 2026 Participant, IEEE Robotics and Automation Society",
  dates: "Apr 2026",
)
- Competitor in the Manipulation Challenge at the _9th IEEE International Conference on Soft Robotics_ hosted in Kanazawa, Japan. Member of the first team from Mexico to participate; contributed to soft robotics design, perception, and system integration.

#extracurriculars(
  activity: "STEM Workshops, Clinica Koi",
  dates: dates-helper(start-date: "Apr 2025", end-date: "Jun 2025"),
)
- Delivered hands-on robotics and engineering workshops for children and teenagers in vulnerable situations.
- Designed outreach activities using computer vision, gesture recognition, and interactive robotics to make STEM concepts accessible and motivating.

#extracurriculars(
  activity: "ExpoIngenierías 2025 Finalist, Tecnológico de Monterrey",
  dates: "Jul 2025",
)
- Finalist in the engineering expo at Tecnológico de Monterrey, presenting a ROS2-based autonomous navigation system for mobile robotics applications.

#extracurriculars(
  activity: "Academic Excellence Scholarship, Tecnológico de Monterrey",
  dates: dates-helper(start-date: "2022", end-date: "2026"),
)
- Merit-based scholarship supporting undergraduate studies in recognition of academic performance and potential.

== Technical Skills

#skills(
  category: "Programming",
  items: "Python, C/C++, C#, MATLAB, JavaScript, VHDL, Typst"
)

#skills(
  category: "Robotics",
  items: "ROS2, SLAM, Gazebo, RViz, Nav2D, Sensor Integration, Robot Kinematics, Robot Control"
)

#skills(
  category: "AI and Perception",
  items: "Machine Learning, Deep Learning, Computer Vision, Object Detection, Pose Estimation"
)

#skills(
  category: "Embedded and Hardware",
  items: "ESP32, STM32, Arduino, Raspberry Pi, KiCAD, Circuit Design, FPGAs"
)

#skills(
  category: "Software and Tools",
  items: "Linux, Docker/Podman, PostgreSQL, Grafana, Git/GitHub, RoboDK"
)

#skills(
  category: "CAD/CAE/SIM",
  items: "Autodesk Fusion, SolidWorks, Siemens NX, AutoCAD, SimScale, Ansys Static Structural, Finite Element Analysis (FEA), Hyperelastic Material Modeling"
)

#skills(
  category: "Libraries and Frameworks",
  items: "OpenCV, TensorFlow, PyTorch, NumPy, Ultralytics"
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
  proficiency: "Elementary Proficiency",
)

== Certifications

#certificates(
  name: "Fundamentals of Deep Learning",
  issuer: "NVIDIA",
  url: "",
  id: "1tO0Ys3ITkGJkXM3sgBKrQ",
)

#certificates(
  name: "Generative AI with Diffusion Models",
  issuer: "NVIDIA",
  url: "",
  id: "TauXuWfURMOBYNutOVkopw",
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
