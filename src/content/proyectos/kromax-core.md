---
clave: kromax-core
nombre: KromaxCore
lema: El contrato de render de la API, sin dependencias gráficas
rol: Núcleo
estado: activo
stack:
  - C++20
  - CMake
  - CTest
repositorio: https://github.com/KromaxGFX/KromaxCore
licencia: Apache-2.0
color: '#8fa3c7'
orden: 1
aspectos:
  - "Define el contrato de render: recursos, estados, uniformes y objetivos que necesita el motor."
  - "Cero dependencias gráficas: no enlaza contra Vulkan, Metal, DX12 ni WebGPU."
  - "Versionado semántico con tests de conformidad obligatorios por versión."
  - "Carga dinámica de backends: el motor descubre y usa el backend disponible."
  - "Diseñado para motores de juegos, renderizadores científicos y UIs aceleradas."
---

## Qué es

`KromaxCore` es el **núcleo de la API**: define el contrato de render —qué
recursos, estados, uniformes y objetivos de render necesita la aplicación— y
deja la implementación gráfica en manos de un backend.

Por defecto, la API arranca sin backend: define el contrato y **no dibuja**.
Un backend real (Vulkan, Metal, DirectX 12, WebGPU, OpenGL) se registra antes
de crear el dispositivo.

Esta separación es la razón de ser del repositorio: el código de la aplicación
no habla el dialecto de ninguna API gráfica. Pide un recurso por tipo y el
backend lo construye con el suyo.

## Qué aporta

- Contrato de render (`IRenderBackend`) con handles opacos, buffers, texturas,
  estados de pipeline, render targets y uniform buffers.
- Gestión de memoria explícita con allocators personalizables.
- Sistema de eventos tipado y machine de estados del dispositivo.
- API de descubrimiento y carga de backends en tiempo de ejecución.
- Suite de tests de conformidad que todo backend debe pasar.