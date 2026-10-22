---
title: "Sistema de Control Electroneumático de Doble Modo"
summary: "Controlador electroneumático fabricado y reutilizado para la pinza de presión positiva de Yeaberry y el circuito neumático de vacío de MORI."
highlights:
  - "Diseñé y fabriqué un controlador reutilizable de dos capas que integra un ESP32, retroalimentación de presión e interfaces PWM para una bomba y una válvula solenoide mediante controladores MOSFET externos."
  - "Implementé el mismo controlador para la pinza de presión positiva de Yeaberry y posteriormente lo adapté al circuito neumático de vacío de MORI."
  - "Implementé la revisión R5 de control de vacío con calibración atmosférica, manejo de fallas del sensor, venteo seguro, ajuste PID configurable y un ciclo de control de 50 ms."
tags: ["Robótica blanda", "Sistemas embebidos", "Control neumático"]
links:
  - label: "Repositorio de GitHub"
---

## Control neumático reutilizable

Diseñé y fabriqué este controlador electroneumático como un subsistema reutilizable para circuitos neumáticos de robótica blanda. La PCB de dos capas coordina un ESP32, sensado de presión e interfaces PWM para una bomba y una válvula solenoide mediante controladores MOSFET externos. El hardware incluye manejo de alimentación de 12 V y 5 V, un ADS1115 para adquirir la presión de un sensor XGZP6847A y comunicación I2C con conversión de nivel.

El controlador original se desarrolló e implementó entre septiembre y diciembre de 2025 para la pinza blanda de presión positiva de Yeaberry. Entre diciembre de 2025 y febrero de 2026, adapté la misma placa física al circuito neumático de vacío de MORI. Diseñar la electrónica como un subsistema compartido permitió adaptar un controlador a modos neumáticos distintos, en lugar de tratar las integraciones específicas de cada robot como diseños aislados.

## Revisión R5 de control de vacío

La revisión R5 actual refina la configuración de vacío en el firmware. Muestrea la presión mediante el ADS1115 en un periodo de control de 50 ms y requiere una calibración atmosférica con `ZERO` antes de aceptar un objetivo de presión negativa. El controlador ventila ante comandos malformados y fallas de señal de presión, limita los objetivos al rango de vacío configurado y expone ajustes proporcional, integral, derivativo, de banda muerta y de pulso de venteo para ajuste y persistencia por serie.

R5 es una mejora continua ya implementada. Su comportamiento de vacío en lazo cerrado aún espera validación física; por ello, este registro no afirma precisión de presión, tiempo de establecimiento ni otro desempeño medido de control.
