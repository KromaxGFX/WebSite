---
clave: kromax-metal
nombre: KromaxMetal
lema: Backend Metal 3+ para Kromax en Apple platforms
rol: Backend
estado: activo
stack:
  - C++20
  - Objective-C++
  - Metal 3
  - Xcode / CMake
repositorio: https://github.com/KromaxGFX/KromaxMetal
licencia: Apache-2.0
color: '#3498db'
orden: 3
aspectos:
  - "Implementación nativa sobre Metal 3 en macOS, iOS, iPadOS, tvOS y visionOS."
  - "Uso de Argument Buffers para bindless rendering equivalente a Vulkan."
  - "Soporte para MetalFX (upscaling) y tile shaders en GPUs Apple Silicon."
  - "Compilación de shaders a Metal IR (AIR) en build-time."
  - "Interoperabilidad con Core Animation y MetalKit para integración en apps UIKit/SwiftUI."
---

## Qué es

`KromaxMetal` es el backend para **todas las plataformas Apple**: macOS, iOS,
iPadOS, tvOS y visionOS. Implementa el contrato usando Metal 3 directamente,
sin capas de traducción intermedias.

Aprovecha las características únicas de Metal (Argument Buffers, tile shaders,
MetalFX) para ofrecer rendimiento nativo en Apple Silicon y GPUs AMD/Intel
soportadas por Apple.

## Qué aporta

- Mapeo nativo del contrato a `MTLDevice`, `MTLCommandQueue`, `MTLRenderPipeline`.
- Argument Buffers tier 2 para binding model bindless.
- Gestión de memoria con `MTLHeap` y `MTLResourceOptions` optimizados.
- Shaders precompilados a `.metallib` con validación en build-time.
- Soporte para render passes con tile memory en GPUs Apple Silicon (M1/M2/M3+).