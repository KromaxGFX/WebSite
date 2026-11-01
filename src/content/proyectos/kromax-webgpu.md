---
clave: kromax-webgpu
nombre: KromaxWebGPU
lema: Backend WebGPU para Kromax en navegadores y nativo
rol: Backend
estado: activo
stack:
  - C++20
  - WebGPU (WGPU native / Dawn / wgpu)
  - CMake
  - Emscripten (para WASM)
repositorio: https://github.com/KromaxGFX/KromaxWebGPU
licencia: Apache-2.0
color: '#9b59b6'
orden: 5
aspectos:
  - "Implementación sobre WebGPU estándar (Chrome, Firefox, Safari, Edge)."
  - "Funciona en navegador (WASM) y nativo vía wgpu-rs / Dawn."
  - "Mapeo directo del contrato a GPUBindGroupLayout y GPURenderPipeline."
  - "Soporte para compute shaders y storage buffers del contrato."
  - "Fallback a WebGL 2 cuando WebGPU no está disponible (experimental)."
---

## Qué es

`KromaxWebGPU` es el backend para **la web y cualquier plataforma con
implementación WebGPU**. Permite que aplicaciones Kromax corran en el navegador
sin cambios de código, compilando a WebAssembly.

Usa la implementación nativa de WebGPU del navegador (Dawn en Chrome/Edge,
WebGPU en Firefox/Safari) o `wgpu` en builds nativos para Linux/macOS/Windows
sin Vulkan/Metal/DX12.

## Qué aporta

- Mapeo del contrato a `GPUDevice`, `GPUCommandEncoder`, `GPURenderPipeline`.
- Bind group layouts generados desde la reflexión del contrato.
- Soporte para `GPUComputePassEncoder` para cargas de trabajo de compute.
- Pipeline de shaders: WGSL generado desde SPIR-V cruzado (Naga / Tint).
- Streaming de recursos y control de latencia para frame pacing en web.