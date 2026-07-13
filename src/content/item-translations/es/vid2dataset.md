---
title: "vid2dataset — Herramienta de video a imágenes para datasets"
summary: "Herramienta de código abierto de línea de comandos y escritorio para convertir videos en datasets de imágenes reproducibles mediante procesamiento con FFmpeg y manifiestos trazables."
highlights:
  - "Reescribí la aplicación original en Python, OpenCV y PySide como un workspace de Rust con un núcleo de extracción compartido."
  - "Desarrollé una CLI completa y una aplicación de escritorio con Tauri + React para inspeccionar videos y extraer datasets."
  - "Implementé muestreo reproducible de fotogramas, recorte, redimensionamiento, conversión de color y manifiestos JSONL/CSV mediante filtergraphs de FFmpeg."
  - "Añadí previsualización interactiva, desplazamiento por el video, búsqueda por fotograma, edición de recortes, importación de perfiles heredados y detección portable de FFmpeg."
tags: ["Herramientas para desarrolladores", "Visión por computadora", "Ingeniería de datasets", "Rust", "Software de escritorio"]
links:
  - label: "Repositorio en GitHub"
---

vid2dataset comenzó como una utilidad en Python, OpenCV y PySide para convertir archivos de video en datasets de imágenes. La línea de versiones actual vid2dataset2 conserva ese propósito y traslada la aplicación a un workspace de Rust con un núcleo compartido, una interfaz completa de línea de comandos y una aplicación de escritorio basada en Tauri + React.

La reescritura trata la creación de datasets como un problema de reproducibilidad. Los filtergraphs respaldados por FFmpeg gestionan el muestreo, la semántica del recorte, el redimensionamiento y la conversión de color sin cargar videos completos en la memoria de la aplicación. Los manifiestos JSONL y CSV registran el origen, las transformaciones, la salida y los checksums de cada fotograma extraído. La interfaz de escritorio añade inspección de video, desplazamiento, búsqueda por fotograma y edición interactiva de recortes sobre el mismo núcleo utilizado por la CLI.

El proyecto se encuentra actualmente en una alpha funcional, no en una versión estable de producción firmada. Ya están implementadas la importación de configuraciones heredadas y la detección portable de FFmpeg; el procesamiento alojado y las exportaciones de anotaciones COCO/YOLO permanecen como trabajo futuro.
