---
clave: kromax-opengl
nombre: KromaxOpenGL
lema: Backend OpenGL 4.6 / OpenGL ES 3.2 para compatibilidad amplia
rol: Backend
estado: mantenimiento
stack:
  - C++20
  - OpenGL 4.6 / OpenGL ES 3.2
  - GLAD / Khronos headers
  - CMake
repositorio: https://github.com/KromaxGFX/KromaxOpenGL
licencia: Apache-2.0
color: '#1abc9c'
orden: 6
aspectos:
  - "Implementación sobre OpenGL 4.6 Core Profile y OpenGL ES 3.2+."
  - "Compatibilidad con hardware antiguo y drivers embebidos."
  - "Emulación de bindless con UBOs/SSBOs y texture arrays."
  - "Útil para CI, testing y plataformas sin Vulkan/Metal/DX12/WebGPU."
  - "No expone características avanzadas (ray tracing, mesh shaders, etc.)."
---

## Qué es

`KromaxOpenGL` es el backend de **compatibilidad** para plataformas donde no
están disponibles las APIs modernas: hardware antiguo, sistemas embebidos,
entornos de CI sin GPU discreta, o drivers que solo exponen OpenGL.

Implementa el subconjunto del contrato que OpenGL 4.6 / ES 3.2 puede expresar
de forma eficiente. No es un backend de alto rendimiento, pero garantiza que
el código Kromax **compila y corre en cualquier sitio**.

## Qué aporta

- Mapeo del contrato a objetos OpenGL (VAO, VBO, textures, FBO, UBO/SSBO).
- Emulación de descriptor sets bindless con uniform buffers y texture arrays.
- Soporte para compute shaders (OpenGL 4.3+ / ES 3.1+).
- Validación con `GL_KHR_debug` en builds de desarrollo.
- Path de fallback automático cuando el backend preferido no está disponible.