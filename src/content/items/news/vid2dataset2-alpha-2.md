---
title: "vid2dataset2 Alpha 2: A Rust and Tauri Rewrite for Video Dataset Creation"
summary: "The current vid2dataset2 alpha brings a shared Rust core, full CLI, and Tauri desktop application to a video-to-image dataset workflow."
newsKind: "post"
datePosted: "2026-07"
published: true
relations:
  - id: "vid2dataset"
    label: "Related project"
---

vid2dataset began as a small Python, OpenCV, and PySide utility for extracting image datasets from video. The current vid2dataset2 Alpha 2 release train is a ground-up Rust and Tauri rewrite that keeps the original workflow while making the processing core reusable from both a command-line interface and a desktop application.

The Rust workspace is organized around `vid2dataset-core`, which handles configuration, FFmpeg discovery, video inspection, extraction, manifests, and legacy profile import. The CLI exposes those capabilities for scripted workflows, while the Tauri + React application adds guided and advanced controls for local desktop use.

Extraction is built around FFmpeg filtergraphs for frame sampling, crop, resize, color conversion, and image-sequence output. Each run can write JSONL and CSV manifests containing the source path, output path, inferred frame index, sampling rule, crop semantics, transforms, image format, file size, and SHA-256 checksum. This keeps the resulting dataset connected to the process that produced it.

The desktop application adds video preview, scrubbing, time and frame seeking, drag-to-create crop selection, crop editing, and explicit crop/no-crop confirmation. It uses the same Rust core as the CLI rather than maintaining a separate extraction implementation.

This is a functional alpha, not a signed stable production release. Legacy Python code and configuration import remain available for migration. Hosted processing and COCO/YOLO annotation exports are intentionally deferred while the local extraction workflow and release packaging mature.

The pre-release tag is available on GitHub at [vid2dataset2-alpha-2](https://github.com/aldrick-t/vid2dataset/releases/tag/v0.2.0-alpha.2).
