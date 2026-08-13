---
name: S.I.D.E.F.
description: Consola operativa de inteligencia fiscal, densa, sobria y orientada a evidencia.
colors:
  midnight: "#06111b"
  command-navy: "#0a1824"
  panel-navy: "#0d2030"
  active-navy: "#132a3d"
  structural-line: "#284052"
  analysis-canvas: "#dfe5e9"
  canvas-highlight: "#eef2f4"
  primary-text: "#eef5f9"
  secondary-text: "#91a5b4"
  canvas-ink: "#132332"
  selection-blue: "#3e9be8"
  entity-cyan: "#35aeb3"
  verified-green: "#55b985"
  attention-amber: "#e7a11a"
  alert-red: "#ef5357"
typography:
  title:
    fontFamily: "Arial Narrow, Roboto Condensed, Segoe UI, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Arial Narrow, Roboto Condensed, Segoe UI, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Arial Narrow, Roboto Condensed, Segoe UI, Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.055em"
rounded:
  sharp: "0px"
  tag: "2px"
  circular: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
components:
  action-button:
    backgroundColor: "{colors.command-navy}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.sharp}"
    padding: "0 8px"
    height: "28px"
  risk-tag:
    backgroundColor: "{colors.command-navy}"
    textColor: "{colors.alert-red}"
    rounded: "{rounded.sharp}"
    padding: "2px 5px"
    height: "20px"
  search-field:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.sharp}"
    padding: "0 10px"
    height: "34px"
---

# Design System: S.I.D.E.F.

## Overview

**Creative North Star: "La Sala de Situación"**

S.I.D.E.F. se comporta como una herramienta de investigación estatal: sobria, continua y concentrada en relaciones verificables. Combina chrome navy mate con un lienzo analítico gris frío; la información se organiza por paneles contiguos, no por tarjetas de métricas.

La densidad es deliberada. Cada separador, color y jerarquía ayuda a pasar de una señal a su evidencia, sin dramatizar el resultado ni sugerir culpabilidad.

**Key Characteristics:**

- Paneles contiguos y bordes de un píxel.
- Tipografía sans condensada, pequeña y legible.
- Color reservado para selección, tipología de entidad y estados.
- Datos de demostración siempre rotulados como sintéticos.

## Colors

La paleta usa navy casi negro como infraestructura, gris frío para el análisis y acentos estrictamente funcionales.

### Primary

- **Azul de selección:** foco, pestaña activa y caso seleccionado.

### Secondary

- **Cian registral:** direcciones y entidades geográficas del grafo.
- **Verde verificado:** bienes, cuentas y estados confirmados.

### Tertiary

- **Ámbar de atención:** señales intermedias que requieren evaluación.
- **Rojo de alerta:** riesgo alto y discrepancias materiales.

### Neutral

- **Navy de comando:** barra, rail, cola, inspector y cronología.
- **Lienzo analítico:** separa el trabajo relacional de la navegación.
- **Línea estructural:** divide regiones sin producir tarjetas flotantes.

**The Signal Color Rule.** Los acentos expresan estado o semántica; nunca decoran superficies completas.

## Typography

**Display Font:** Arial Narrow con fallbacks condensados del sistema  
**Body Font:** Arial Narrow con fallbacks condensados del sistema  
**Label/Mono Font:** misma familia, mayúsculas y tracking controlado

**Character:** Técnica, compacta y neutral. No se usan tipografías editoriales o gestuales.

### Hierarchy

- **Title** (700, 12px, 1.2): encabezados de panel y marca operativa.
- **Body** (400–600, 10–13px, 1.4): nombres, evidencia y valores.
- **Label** (600, 9px, 0.055em, mayúsculas): columnas, secciones y metadatos.

**The Density Rule.** La jerarquía surge de peso, contraste y alineación; no de titulares grandes.

## Layout

Escritorio usa barra de 56px, rail de 58px, cola de 330px, grafo flexible, inspector de 334px y cronología inferior. Los paneles comparten bordes y ocupan toda la pantalla. Entre 761px y 1199px el inspector baja de fila; desde 760px los módulos se apilan sin desborde horizontal.

El ritmo base es compacto (4, 8, 12 y 18px). Los espacios grandes sólo separan regiones funcionales.

## Elevation & Depth

El sistema es plano. La profundidad proviene del contraste tonal, líneas y selección; la única sombra corresponde al drawer modal de criterios.

**The Flat Operations Rule.** Los paneles de trabajo permanecen al mismo nivel y no flotan como tarjetas.

## Shapes

Los controles, campos, tags y paneles son rectos. Sólo avatares, nodos de grafo e indicadores son circulares porque su geometría tiene significado. Los bordes son de un píxel.

## Components

### Buttons

- **Shape:** rectangular, sin radio.
- **Primary:** navy o azul operativo, borde de un píxel, 28–38px de alto.
- **Hover / Focus:** cambio tonal y foco azul visible de 2px.
- **Disabled:** menor opacidad y sin interacción.

### Chips

- **Style:** tags delineados, pequeños y en mayúsculas.
- **State:** rojo para alto, ámbar para medio y amarillo apagado para bajo.

### Cards / Containers

- **Corner Style:** esquinas rectas.
- **Background:** navy para chrome; gris frío sólo para el grafo.
- **Shadow Strategy:** ninguna en estado normal.
- **Border:** línea estructural de un píxel.
- **Internal Padding:** 8–18px.

### Inputs / Fields

- **Style:** fondo midnight, borde estructural, 34px de alto.
- **Focus:** el borde cambia a azul de selección.
- **Disabled:** contraste reducido sin ocultar la estructura.

### Navigation

El rail usa iconos lineales propios. El activo combina fondo navy azulado y barra azul de 3px; en móvil se vuelve horizontal y conserva sólo acciones disponibles.

### Relationship Graph

El lienzo es la firma del producto. Las líneas son funcionales, los nodos usan color por tipo y el sujeto seleccionado ocupa el centro. La retícula está permitida sólo dentro de este canvas.

## Do's and Don'ts

### Do:

- **Do** mantener visibles cola, relaciones y evidencia cuando el ancho lo permita.
- **Do** usar color para estado, selección o tipo de entidad.
- **Do** rotular toda información ficticia como demostrativa o sintética.
- **Do** conservar foco visible, contraste y controles nativos accesibles.

### Don't:

- **Don't** introducir tarjetas de KPI, gradientes, glassmorphism o sombras ambientales.
- **Don't** usar serif, titulares de marketing ni ilustraciones decorativas.
- **Don't** confundir una señal analítica con una conclusión de fraude.
- **Don't** copiar logos o pantallas de Palantir; la referencia es de calidad, no de identidad.
