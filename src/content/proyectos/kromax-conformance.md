---
clave: kromax-conformance
nombre: KromaxConformance
lema: Suite de tests de conformidad para backends Kromax
rol: Herramienta
estado: activo
stack:
  - C++20
  - GoogleTest
  - CMake
  - CTest
repositorio: https://github.com/KromaxGFX/KromaxConformance
licencia: Apache-2.0
color: '#34495e'
orden: 9
aspectos:
  - "Tests funcionales: cada operación del contrato tiene tests de referencia."
  - "Tests de estrés: validación de límites, sincronización, memoria."
  - "Tests de rendimiento: baselines por backend y GPU de referencia."
  - "Tests de compatibilidad: versiones de API, drivers, capas de validación."
  - "Reporte JUnit/XML para CI y dashboard de conformidad público."
---

## Qué es

`KromaxConformance` es la **suite de tests de conformidad** que todo backend
debe pasar para considerarse "conforme Kromax vX.Y". No es opcional: es el
contrato vivo que garantiza portabilidad real.

La suite se ejecuta en CI de cada backend y en el dashboard público de
conformidad. Un backend que no pasa el 100% de tests obligatorios no puede
publicarse como release estable.

## Qué aporta

- Cobertura completa del contrato: creación/destrucción de recursos, comandos de render, compute, sincronización, memoria.
- Tests parametrizados por límites del dispositivo (max bindings, max texture size, etc.).
- Validación de comportamiento indefinido: uso después de free, race conditions, memory leaks.
- Benchmarks integrados: frame time, submit overhead, memory bandwidth.
- Dashboard web: `conformance.kromaxgfx.org` con histórico por backend, versión y hardware.