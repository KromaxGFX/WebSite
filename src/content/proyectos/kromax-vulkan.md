---
clave: kromax-vulkan
nombre: KromaxVulkan
lema: Backend Vulkan 1.3+ para Kromax
rol: Backend
estado: activo
stack:
  - C++20
  - Vulkan 1.3
  - CMake
  - SPIR-V Tools
repositorio: https://github.com/KromaxGFX/KromaxVulkan
licencia: Apache-2.0
color: '#e67e22'
orden: 2
aspectos:
  - "Implementación completa del contrato sobre Vulkan 1.3+."
  - "Soporte para extensiones clave: sincronización 2, timeline semaphores, descriptor indexing."
  - "Gestión automática de memoria con VMA (Vulkan Memory Allocator)."
  - "Compilación de shaders a SPIR-V en build-time con validación."
  - "Paths optimizados para tile-based renderers (mobile) y desktop."
---

## Qué es

`KromaxVulkan` es el **backend de referencia** para plataformas que soportan
Vulkan 1.3 o superior: Linux, Windows, Android y (vía MoltenVK) macOS/iOS.

Implementa cada operación del contrato mapeándola directamente a la API de
Vulkan, aprovechando extensiones modernas para igualar o superar el rendimiento
de código Vulkan escrito a mano.

## Qué aporta

- Mapeo 1:1 de recursos, pipelines y estados del contrato a objetos Vulkan.
- Gestión de descriptor sets con descriptor indexing para bindless rendering.
- Sincronización fina con timeline semaphores y barrier2.
- Soporte para ray tracing (extensión VK_KHR_ray_tracing) cuando el contrato lo exponga.
- Validación automática en Debug con capas de validación Vulkan.