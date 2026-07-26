---
title: "SLAM basado en LiDAR para navegación autónoma"
summary: "Desarrollé un stack modular de navegación en ROS 2 que combina detección de obstáculos con LiDAR, localización con ArUco, fusión mediante EKF y planificación reactiva para el Puzzlebot."
highlights:
  - "Construí módulos ROS 2 independientes para localización visual, fusión de pose con EKF, generación de trayectorias, control de movimiento, seguimiento de paredes y evitación de obstáculos."
  - "Combiné la odometría de las ruedas con observaciones de marcadores ArUco para corregir la deriva acumulada y reducir la incertidumbre de localización."
  - "Implementé los comportamientos Bug0 y Bug2 usando detección de obstáculos con LiDAR y seguimiento de paredes para recuperar la ruta hacia el objetivo."
  - "Validé la navegación entre objetivos en Gazebo y RViz con ocho trayectorias registradas y distancias residuales de entre 1 y 10 cm."
  - "Configuré un umbral de aceptación de objetivos de 0.095 m y documenté marcadores, coordenadas, marcos TF y procedimientos de prueba repetibles."
tags: ["Autonomía", "Robótica móvil", "Sim-to-real"]
links:
  - label: "GitHub"
  - label: "Reporte técnico (ES)"
---

Este proyecto desarrolló un stack de navegación autónoma para el Puzzlebot MCR2 usando ROS 2, Gazebo, RViz, LiDAR, marcadores ArUco, odometría de ruedas y un filtro de Kalman extendido (EKF). La experimentación validada se concentró en navegación simulada: el robot debía alcanzar objetivos predefinidos en un laberinto mientras estimaba su pose, detectaba obstáculos y recuperaba la ruta después de encontrarse con paredes.

La implementación se organizó como nodos ROS 2 independientes. Un nodo de localización proporcionaba la odometría, mientras que el módulo ArUco/EKF fusionaba el movimiento odométrico con posiciones conocidas de marcadores y publicaba una estimación global corregida. El controlador consumía esa estimación y los escaneos LiDAR: avanzaba directamente hacia el objetivo cuando la ruta estaba despejada y cambiaba al seguimiento de paredes al detectar un obstáculo. Bug0 regresaba al objetivo cuando volvía a existir una ruta libre; Bug2 usaba la línea de referencia entre el inicio y el objetivo para decidir cuándo abandonar el contorno del obstáculo.

La detección de un marcador ArUco redujo la elipse de confianza de RViz y corrigió la posición y la orientación estimadas. Se registraron ocho recorridos entre objetivos con distancias residuales de entre 0.01 m y 0.10 m; el umbral de aceptación utilizado fue de 0.095 m. Los resultados respaldaron la viabilidad de combinar referencias visuales, fusión sensorial y navegación reactiva en un entorno controlado, aunque también mostraron sensibilidad a la calibración, la visibilidad de los marcadores, el ruido de los sensores y la sincronización entre nodos.

El repositorio incluye la simulación, archivos de lanzamiento, parámetros YAML, configuración de RViz, pruebas unitarias y un paquete separado de puesta en marcha para el robot físico. Esta última parte incluye integración con RPLIDAR y micro-ROS, además de envoltorios de lanzamiento para SLAM Toolbox y Nav2, como base para una futura validación física. La validación en hardware, una planificación más robusta, una mejor calibración y mediciones más sistemáticas permanecen como trabajo futuro.
