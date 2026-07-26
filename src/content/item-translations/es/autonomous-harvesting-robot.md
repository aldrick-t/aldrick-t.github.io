---
title: "Yeaberry - Robot Autónomo de Cosecha de Fresas"
summary: "Celda ciberfísica para cosecha de fresas que combina una pinza neumática blanda, percepción RGB-D con YOLO11-S, control de un UR3e y monitoreo de cultivos."
highlights:
  - "Lideré el desarrollo de una pinza de silicón de tres dedos para cosecha de fresas."
  - "Desarrollé un servicio de percepción YOLO11-S con aproximadamente 18,000 imágenes públicas, 62,213 anotaciones, profundidad RealSense D435 y estimación de pose mediante PnP."
  - "Implementé un ciclo configurable de pick-and-place para RoboDK/UR3e con comandos MQTT para la pinza, comprobaciones de colisión y verificación visual del éxito."
  - "Diseñé una PCB de control electroneumático de dos capas con retroalimentación de presión mediante ESP32 y control PWM para la bomba y la válvula."
  - "Integré un sistema de monitoreo con ESP32 y Raspberry Pi 5, sensores ambientales, registro MQTT, paneles y alertas de Telegram."
  - "Superé el objetivo de éxito de más del 75% en pruebas controladas con fresas artificiales, incluyendo escenarios visibles y parcialmente ocluidos."
tags: ["Sistemas ciberfísicos", "Robótica blanda", "IA"]
links:
  - label: "GitHub"
  - label: "Reporte técnico"
  - label: "Video corto"
---

Yeaberry se desarrolló durante 16 semanas como una celda ciberfísica de prueba de concepto para cosechar fresas delicadas en un entorno controlado. El proyecto cubrió el ciclo completo: detectar el fruto, estimar su pose 3D, mover un robot colaborativo, accionar una herramienta compatible, colocar la fresa y verificar si la recolección tuvo éxito.

## Contribución

Diseñé la pinza neumática blanda de tres dedos, su acoplador universal de cambio rápido para el UR3e, los moldes de los actuadores y el pad central blando que mantiene las partes rígidas alejadas del fruto. La geometría utiliza dedos curvos con mayor fricción y dos filas de cámaras neumáticas para adaptarse a fresas irregulares. También utilicé simulaciones de elementos finitos para estudiar la deformación e iteré el proceso de fabricación y sellado en silicón.

Fui responsable de la ruta principal de percepción e integración robótica. El servicio combina una cámara RGB-D RealSense D435 con un detector YOLO11-S entrenado con aproximadamente 18,000 imágenes públicas y 62,213 anotaciones. El modelo clasifica fresas maduras e inmaduras; el filtrado de profundidad y un cálculo PnP convierten cada detección en una pose 6-DOF utilizable. En el entorno de prueba se seleccionó un umbral de confianza configurable de 0.65 para reducir detecciones inseguras.

## Arquitectura del sistema

RoboDK funciona como gemelo digital e intermediario del UR3e. El ciclo completo pasa por poses fijas de fotografía y reposo, calcula objetivos de pre-pick y pick a partir de la pose detectada, envía comandos MQTT para inflar y liberar la pinza y aplica movimientos calibrados posteriores a la recolección. Antes de la ejecución física, las trayectorias se comprueban en simulación para detectar colisiones. Después de colocar la fresa, el robot vuelve a la pose de fotografía y utiliza una segunda pasada de visión para verificar que no queden fresas maduras.

La pinza utiliza un ESP32, una bomba neumática, una válvula solenoide 3/2, un sensor de presión, controladores MOSFET y una PCB de dos capas. La caracterización de presión y PWM permitió ajustar un controlador PI con ganancias Kp = 7 y Ki = 2. En paralelo, el equipo construyó un servicio de monitoreo agrícola alrededor de un segundo ESP32 y una Raspberry Pi 5: un DHT22, un LDR y tres sensores capacitivos de humedad del suelo publican lecturas mediante MQTT, mientras la Raspberry Pi almacena datos e imágenes para paneles y alertas de Telegram.

## Evaluación y aprendizajes

Los experimentos finales utilizaron fresas artificiales organizadas para reproducir el tamaño, la posición y la resistencia de frutos reales. La matriz incluyó una fresa madura sin obstrucciones, un fruto maduro tocando uno inmaduro con hasta 20% de oclusión y un fruto maduro con al menos 40% de oclusión por hojas. El reporte indica que el sistema integrado superó el objetivo original de éxito del 75% para identificar y recolectar frutos en el estado de madurez especificado.

El resultado es una demostración funcional en un entorno controlado, no una máquina agrícola lista para operar en campo. Las pruebas mostraron falsos negativos bajo oclusión, confusión del modelo con fondos parecidos a hojas, problemas de sellado durante la fabricación, dificultades de calibración, pérdida de datos tras una falla de la Raspberry Pi, vibración de la bomba y alcance limitado del UR3e. El reporte propone como siguientes pasos un invernadero más representativo, un dataset específico por escenario, fabricación más repetible de los actuadores, mejores respaldos de datos y control adaptativo.
