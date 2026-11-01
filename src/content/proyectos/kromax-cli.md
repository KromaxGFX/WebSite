---
clave: kromax-cli
nombre: KromaxCLI
lema: Interfaz de línea de comandos para gestión de proyectos Kromax
rol: Herramienta
estado: activo
stack:
  - C++20
  - CLI11
  - nlohmann/json
  - CMake
repositorio: https://github.com/KromaxGFX/KromaxCLI
licencia: Apache-2.0
color: '#f39c12'
orden: 7
aspectos:
  - "Inicializa proyectos nuevos con plantillas para cada tipo de aplicación."
  - "Gestiona backends: lista, instala, actualiza y selecciona el backend por defecto."
  - "Compila shaders del contrato a SPIR-V, WGSL, Metal IR y DXIL."
  - "Ejecuta la suite de conformidad contra cualquier backend instalado."
  - "Genera bindings para C, C++, Rust, C#, Python y JavaScript."
---

## Qué es

`KromaxCLI` es la **herramienta de línea de comandos** oficial para trabajar con
Kromax. Centraliza todas las tareas repetitivas: crear proyectos, gestionar
backends, compilar shaders, validar conformidad y generar bindings de lenguaje.

Está diseñada para integrarse en CI/CD y en flujos de trabajo de editores
(VS Code, CLion, Visual Studio, Zed).

## Qué aporta

- `kromax init` — andamiaje de proyecto (ejecutable, librería, shader library).
- `kromax backend list|add|remove|use` — gestiona backends instalados.
- `kromax shader compile` — compila `.kromax` (DSL del contrato) a SPIR-V/WGSL/Metal/DXIL.
- `kromax conformance run` — ejecuta tests de conformidad del backend activo.
- `kromax bindgen` — genera headers C, bindings Rust (kromax-sys), C# (KromaxSharp), etc.