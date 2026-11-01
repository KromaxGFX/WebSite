---
clave: kromax-dx12
nombre: KromaxDX12
lema: Backend DirectX 12 para Kromax en Windows y Xbox
rol: Backend
estado: activo
stack:
  - C++20
  - DirectX 12 / DXGI
  - D3D12MA (Memory Allocator)
  - CMake / vcpkg
repositorio: https://github.com/KromaxGFX/KromaxDX12
licencia: Apache-2.0
color: '#27ae60'
orden: 4
aspectos:
  - "Implementación sobre DirectX 12 en Windows 10/11 y Xbox Series X|S."
  - "Root signatures y descriptor heaps mapeados al modelo bindless del contrato."
  - "Soporte para Shader Model 6.6+ y DXR (ray tracing) cuando el contrato lo exponga."
  - "Gestión de memoria con D3D12MA (DirectX 12 Memory Allocator)."
  - "Interoperabilidad con D3D11/DXGI para swap chains y present."
---

## Qué es

`KromaxDX12` es el backend para **Windows (Win32/UWP) y Xbox**. Implementa el
contrato directamente sobre DirectX 12, usando root signatures y descriptor
heaps para replicar el modelo bindless del contrato.

Está optimizado para las arquitecturas de GPU modernas de NVIDIA, AMD e Intel
en Windows, y para las GPUs personalizadas de Xbox Series.

## Qué aporta

- Mapeo del contrato a `ID3D12Device`, `ID3D12CommandQueue`, `ID3D12PipelineState`.
- Root signature version 1.1+ con descriptor tables para bindless.
- Heap tiers y resource binding tiers consultados en runtime para paths óptimos.
- Soporte para ExecuteIndirect y Mesh Shaders (Shader Model 6.5+).
- Validación con D3D12 Debug Layer en builds de desarrollo.