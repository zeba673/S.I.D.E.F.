<div align="center">

# S.I.D.E.F.

### Sistema Inteligente de Detección de Evasión Fiscal

**Inteligencia fiscal basada en evidencia, relaciones y revisión humana.**

[![Next.js](https://img.shields.io/badge/Next.js-16-06111B?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-132A3D?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-0D2030?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Proxmox VE](https://img.shields.io/badge/Proxmox_VE-Infrastructure-06111B?style=flat-square&logo=proxmox&logoColor=E57000)](https://www.proxmox.com/)

</div>

S.I.D.E.F. es una plataforma privada de análisis fiscal-patrimonial. Consolida datos gubernamentales y fuentes abiertas para construir relaciones entre personas, entidades, ingresos y bienes, y detectar inconsistencias que merecen investigación.

El sistema produce **indicios reproducibles y explicables**. Cada señal conserva sus fuentes, parámetros y cálculo; ninguna alerta determina por sí sola fraude, infracción o culpabilidad.

> [!IMPORTANT]
> La versión actual es un MVP demostrativo con datos sintéticos. No representa personas ni organizaciones reales.

## Espacio de investigación

![Vista conceptual de la consola operativa de S.I.D.E.F.](.impeccable/mocks/workspace-graph.png)

La interfaz reúne en un único espacio la cola de trabajo, el grafo de relaciones, el inspector de evidencia y la línea temporal del caso. Los umbrales de atención son configurables para contemplar tolerancias patrimoniales, ingresos no observados y diferencias económicamente poco relevantes.

## Flujo operativo

```mermaid
flowchart LR
    A[Fuentes controladas] --> B[Normalización]
    B --> C[Resolución de entidades]
    C --> D[Grafo fiscal-patrimonial]
    D --> E[Reglas configurables]
    E --> F[Señal de atención]
    F --> G[Revisión humana]
    G --> H[Hallazgo respaldado]
```

| Etapa | Función |
| --- | --- |
| **Ingesta** | Incorpora conjuntos CSV/JSON controlados y fuentes públicas seleccionadas. |
| **Vinculación** | Relaciona sujetos, sociedades, domicilios, bienes y acontecimientos en el tiempo. |
| **Evaluación** | Compara patrimonio observado con capacidad económica estimada mediante criterios configurables. |
| **Investigación** | Permite revisar evidencia, procedencia, relaciones y cronología antes de comunicar un resultado. |

## Arquitectura del MVP

```text
Proxmox VE                 Infraestructura de virtualización
VM o contenedor LXC        Entorno aislado de ejecución
Next.js + TypeScript       Interfaz y lógica de aplicación
PostgreSQL                 Persistencia y políticas de acceso
CSV / JSON                 Ingesta controlada inicial
```

La arquitectura objetivo es autoalojada. Proxmox VE administra la infraestructura; S.I.D.E.F. se ejecuta dentro de una máquina virtual o contenedor LXC, mientras PostgreSQL conserva los datos en una instancia controlada por el operador.

## Estado actual

- [x] Consola operativa adaptable a escritorio y móvil.
- [x] Cola de entidades y expediente contextual.
- [x] Grafo fiscal-patrimonial demostrativo.
- [x] Criterios de riesgo configurables.
- [x] Motor de cálculo con prueba automatizada.
- [ ] Esquema y autenticación adaptados a PostgreSQL autoalojado.
- [ ] Autenticación conectada al entorno productivo.
- [ ] Importación real de conjuntos de datos autorizados.
- [ ] Conectores a fuentes públicas seleccionadas.
- [ ] Exportación formal de hallazgos respaldados.

## Desarrollo local

### Requisitos

- Node.js 20 o superior
- pnpm
- PostgreSQL será necesario al habilitar la persistencia

```bash
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000). La aplicación funciona actualmente con el escenario sintético incluido; la conexión a PostgreSQL autoalojado forma parte de la siguiente etapa.

```bash
pnpm test
pnpm build
```

## Estructura

```text
app/                    Interfaz Next.js
lib/                    Datos demostrativos y motor de riesgo
Documentación/          Antecedentes y marco legal del proyecto
Palantir-plantillas/    Referencias visuales, no assets de producto
.impeccable/            Sistema y decisiones de diseño
```

## Principios

1. **Evidencia antes que inferencia.**
2. **Revisión humana antes de comunicar un hallazgo.**
3. **Toda señal debe poder reproducirse y explicarse.**
4. **La incertidumbre se configura; no se oculta.**
5. **Privacidad, procedencia y finalidad desde el diseño.**

## Alcance y responsabilidad

S.I.D.E.F. está pensado como una herramienta de apoyo a la investigación. El acceso a datos identificables, su conservación y cualquier comunicación a terceros deben responder a una finalidad legítima, fuentes autorizadas, controles de acceso y normativa aplicable.

---

<div align="center">

**S.I.D.E.F.** · Evidencia conectada para decisiones fiscales mejor fundamentadas.

</div>
