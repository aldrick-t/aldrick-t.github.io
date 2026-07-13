---
title: "vid2dataset2 Alpha 2: una reescritura en Rust y Tauri para crear datasets de video"
summary: "La alpha actual de vid2dataset2 incorpora un núcleo compartido en Rust, una CLI completa y una aplicación de escritorio con Tauri al flujo de creación de datasets de imágenes desde video."
---

vid2dataset comenzó como una pequeña utilidad en Python, OpenCV y PySide para extraer datasets de imágenes desde videos. La línea de lanzamiento vid2dataset2 Alpha 2 es una reescritura completa en Rust y Tauri que conserva el flujo original y vuelve reutilizable el núcleo de procesamiento desde una interfaz de línea de comandos y una aplicación de escritorio.

El workspace de Rust se organiza alrededor de `vid2dataset-core`, que gestiona la configuración, la detección de FFmpeg, la inspección de videos, la extracción, los manifiestos y la importación de perfiles heredados. La CLI expone estas capacidades para flujos automatizados, mientras que la aplicación Tauri + React añade controles guiados y avanzados para el uso local en escritorio.

La extracción utiliza filtergraphs de FFmpeg para el muestreo de fotogramas, el recorte, el redimensionamiento, la conversión de color y la generación de secuencias de imágenes. Cada ejecución puede escribir manifiestos JSONL y CSV con la ruta de origen, la ruta de salida, el índice de fotograma inferido, la regla de muestreo, la semántica del recorte, las transformaciones, el formato de imagen, el tamaño del archivo y el checksum SHA-256. Así, el dataset resultante permanece vinculado al proceso que lo produjo.

La aplicación de escritorio añade previsualización de video, desplazamiento, búsqueda por tiempo y fotograma, selección de recorte mediante arrastre, edición del recorte y confirmación explícita de recortar o no recortar. Utiliza el mismo núcleo de Rust que la CLI en lugar de mantener una implementación de extracción separada.

Se trata de una alpha funcional, no de una versión estable de producción firmada. El código Python heredado y la importación de configuraciones siguen disponibles para facilitar la migración. El procesamiento alojado y las exportaciones de anotaciones COCO/YOLO están deliberadamente pospuestos mientras maduran el flujo de extracción local y el empaquetado de lanzamientos.
