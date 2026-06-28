---
title: "SLAM Basado en LiDAR para Navegación Autónoma"
summary: "Desarrollo de un pipeline de SLAM con LiDAR en ROS 2 para navegación autónoma en tiempo real sobre hardware embebido de robot móvil."
highlights:
  - "Implemento flujos de scan matching y generación de mapas para localización robusta."
  - "Integro simulación en Gazebo con pruebas físicas en MCR2 Puzzlebot."
  - "Diseño experimentos repetibles de mapeo de laberintos y navegación para evaluación sim-to-real."
tags: ["Autonomía", "Robótica móvil", "Sim-to-real"]
---

El proyecto investiga mapeo y localización en tiempo real sobre hardware con cómputo limitado. La simulación y las pruebas físicas usan la misma arquitectura ROS 2 para que los cambios de algoritmo puedan evaluarse contra tareas de navegación comparables.

El sistema está estructurado para futura fusión multisensorial y benchmarking comparativo de SLAM.
