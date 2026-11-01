---
clave: kromax-shaderc
nombre: KromaxShaderC
lema: Compilador y validador de shaders del contrato Kromax
rol: Herramienta
estado: activo
stack:
  - C++20
  - SPIR-V Tools
  - DXC (DirectX Shader Compiler)
  - Metal Shader Compiler
  - Naga / Tint (WGSL)
  - CMake
repositorio: https://github.com/KromaxGFX/KromaxShaderC
licencia: Apache-2.0
color: '#e74c3c'
orden: 8
aspectos:
  - "Compila el DSL de shaders del contrato (.kromax) a SPIR-V, DXIL, Metal IR y WGSL."
  - "Valida que el shader cumple el contrato: recursos, layouts, puntos de entrada."
  - "Optimización cruzada: dead code elimination, constant folding, vectorization."
  - "Integración con KromaxCLI y CMake para build-time compilation."
  - "Diagnósticos ricos: errores en fuente original, sugerencias de corrección."
---

## Qué es

`KromaxShaderC` es el **compilador de shaders** del ecosistema Kromax. Toma
shaders escritos en el DSL del contrato (`.kromax`, un subconjunto tipado de
GLSL/WGSL) y los compila a los formatos nativos de cada backend: SPIR-V para
Vulkan, DXIL para DirectX 12, Metal IR para Metal, WGSL para WebGPU.

Valida que el shader respeta el contrato (layouts de descriptores, puntos de
entrada, tipos de recursos) y emite diagnósticos accionables.

## Qué aporta

- Frontend común: parsing, análisis semántico, validación del contrato.
- Backends de emisión: SPIR-V (vulkan), DXIL (dx12), AIR/MetalLib (metal), WGSL (webgpu).
- Pipeline de optimización compartida (SPIR-V Tools, DXC optimizer, Naga).
- Reflexión automática: genera layouts de bind groups, push constants, vertex attributes.
- Integración CMake: `kromax_shader_add()` compila y valida en build-time.