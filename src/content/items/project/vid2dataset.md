---
title: "vid2dataset — Video-to-Image Dataset Tool"
type: "project"
summary: "An open-source CLI and desktop tool for converting video into reproducible image datasets with FFmpeg-backed processing and traceable manifests."
dateStart: "2025-12"
dateEnd: "Present"
highlights:
  - "Rebuilt the original Python, OpenCV, and PySide application as a Rust workspace with a shared extraction core."
  - "Delivered both a full CLI and a Tauri + React desktop application for video inspection and dataset extraction."
  - "Implemented reproducible frame sampling, crop and resize transforms, color conversion, and JSONL/CSV manifests through FFmpeg filtergraphs."
  - "Added interactive video preview, scrubbing, frame seeking, crop editing, legacy profile import, and portable FFmpeg discovery."
skills: ["rust", "typescript", "react", "tauri", "ffmpeg", "computer-vision", "linux", "git"]
tags: ["Developer tooling", "Computer vision", "Dataset engineering", "Rust", "Desktop software"]
published: true
portfolio: true
timeline: false
links:
  - kind: "repository"
    label: "GitHub"
    url: "https://github.com/aldrick-t/vid2dataset"
cvReview: ["full"]
---

vid2dataset began as a Python, OpenCV, and PySide utility for turning video files into image datasets. The current vid2dataset2 release train preserves that purpose while moving the application to a Rust workspace with a shared core, a complete command-line interface, and a Tauri + React desktop application.

The rewrite treats dataset creation as a reproducibility problem. FFmpeg-backed filtergraphs handle sampling, crop semantics, resizing, and color conversion without loading entire videos into application memory, while JSONL and CSV manifests record the source, transforms, output, and checksums for each extracted frame. The desktop interface adds video inspection, scrubbing, frame seeking, and interactive crop editing around the same core used by the CLI.

The project is currently a functional alpha rather than a signed stable production release. Legacy configuration import and portable FFmpeg discovery are implemented; hosted processing and COCO/YOLO annotation exports remain future work.
