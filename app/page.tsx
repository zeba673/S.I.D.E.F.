"use client";

import { useMemo, useState, type ReactNode } from "react";
import { demoEntities, type Entity } from "@/lib/demo-data";
import { calculateRisk, type RiskConfig } from "@/lib/risk";

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  notation: "compact",
  maximumFractionDigits: 1,
});

type IconName = "search" | "grid" | "graph" | "file" | "database" | "building" | "sliders" | "chart" | "shield" | "person" | "briefcase" | "pin" | "car" | "bank" | "gear" | "chevron" | "close";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/></>,
    grid: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
    graph: <><circle cx="5" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m7 11 9-4m-9 6 9 4"/></>,
    file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
    database: <><ellipse cx="12" cy="5" rx="7.5" ry="3"/><path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5m-15 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/></>,
    building: <><path d="M5 21V7l7-4 7 4v14M3 21h18"/><path d="M9 9h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2"/></>,
    sliders: <><path d="M4 6h5m4 0h7M4 12h10m4 0h2M4 18h2m4 0h10"/><circle cx="11" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></>,
    chart: <><path d="M4 20V4m0 16h16"/><path d="m7 16 4-5 3 2 5-7"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.7 3 8.2 7 10 4-1.8 7-5.3 7-10V6z"/><path d="m9 12 2 2 4-5"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M5 21c.7-4.3 3-6.5 7-6.5s6.3 2.2 7 6.5"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13"/><path d="M9 7V4h6v3M3 12h18"/></>,
    pin: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></>,
    car: <><path d="m5 10 2-5h10l2 5M4 10h16v7H4z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    bank: <><path d="m3 9 9-5 9 5M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M3 20h18"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1"/></>,
    chevron: <path d="m9 6 6 6-6 6"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function riskLabel(ratio: number, attention: boolean) {
  if (!attention) return "BAJO";
  return ratio >= 2 ? "ALTO" : "MEDIO";
}

function GraphNode({ className, icon, title, subtitle, score }: { className: string; icon: IconName; title: string; subtitle: string; score?: number }) {
  return <div className={`graph-node ${className}`}><span className="node-symbol"><Icon name={icon} size={22}/>{score && <b>{score}</b>}</span><strong>{title}</strong><small>{subtitle}</small></div>;
}

function RelationshipGraph({ entity, ratio }: { entity: Entity; ratio: number }) {
  const score = Math.min(99, Math.max(18, Math.round(ratio * 39)));
  const isCompany = entity.kind === "Persona jurídica";
  return <div className="graph-canvas">
    <svg className="edge-layer" viewBox="0 0 1000 660" preserveAspectRatio="none" aria-hidden="true">
      <g><path d="M500 345 245 140"/><path d="M500 345 570 112"/><path d="M500 345 790 180"/><path d="M500 345 850 345"/><path d="M500 345 785 515"/><path d="M500 345 505 590"/><path d="M500 345 225 500"/><path className="indirect" d="M500 345 145 310"/></g>
      <g className="edge-labels"><text x="348" y="222">VINCULADO</text><text x="539" y="222">DIRECTOR</text><text x="648" y="258">DOMICILIO</text><text x="685" y="333">TITULAR</text><text x="655" y="438">COTITULAR</text><text x="516" y="476">PROPIETARIO</text><text x="330" y="436">APODERADO</text><text x="310" y="315">RELACIÓN INDIRECTA</text></g>
    </svg>
    <GraphNode className="node-nw company" icon="building" title={entity.links[0] ?? "Entidad vinculada"} subtitle="CUIT DEMO · vínculo societario" score={81}/>
    <GraphNode className="node-n company" icon="building" title={entity.links[1] ?? "Proveedor demostrativo"} subtitle="CUIT DEMO · registro societario" score={74}/>
    <GraphNode className="node-ne address" icon="pin" title="Domicilio fiscal demostrado" subtitle={`${entity.jurisdiction} · Argentina`}/>
    <GraphNode className="node-e asset" icon="bank" title="Cuenta bancaria demostrativa" subtitle="CBU DEMO · fuente abierta"/>
    <GraphNode className="node-se asset" icon="car" title={entity.assets[1]?.label ?? "Bien registrable"} subtitle={entity.assets[1]?.source ?? "Registro demostrativo"}/>
    <GraphNode className="node-s address" icon="pin" title={entity.assets[0]?.label ?? "Bien inmueble"} subtitle={entity.assets[0]?.source ?? "Registro demostrativo"}/>
    <GraphNode className="node-sw company" icon="building" title="Entidad relacionada DEMO" subtitle="CUIT DEMO · representación" score={68}/>
    <GraphNode className="node-w person" icon="person" title="Persona relacionada DEMO" subtitle="CUIT DEMO · relación declarada" score={65}/>
    <GraphNode className={`node-center ${isCompany ? "company" : "person"}`} icon={isCompany ? "building" : "person"} title={entity.name} subtitle={entity.taxId} score={score}/>
    <div className="graph-legend"><strong>REFERENCIAS</strong><span><i className="dot person-dot"/>Persona</span><span><i className="dot company-dot"/>Empresa</span><span><i className="dot address-dot"/>Dirección</span><span><i className="dot asset-dot"/>Bien / cuenta</span><span><i className="line"/>Relación directa</span></div>
    <div className="minimap" aria-hidden="true"><i/><i/><i/><i/><i/></div>
    <div className="demo-watermark">DATOS SINTÉTICOS · ENTORNO DEMOSTRATIVO</div>
  </div>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(demoEntities[0].id);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<RiskConfig>({ tolerancePercent: 25, informalIncomePercent: 35, attentionRatio: 1.35, minimumGap: 10_000_000 });

  const rows = useMemo(() => demoEntities.map((entity) => ({ entity, risk: calculateRisk(entity, config) }))
    .filter(({ entity }) => `${entity.name} ${entity.taxId}`.toLowerCase().includes(query.trim().toLowerCase())), [config, query]);
  const selected = rows.find(({ entity }) => entity.id === selectedId) ?? rows[0] ?? null;
  const attentionCount = rows.filter(({ risk }) => risk.requiresAttention).length;

  return <main className="command-shell">
    <header className="command-bar">
      <div className="system-brand"><span className="system-seal"><Icon name="shield" size={20}/></span><strong>S.I.D.E.F.</strong><small>Sistema Inteligente de<br/>Detección de Evasión Fiscal</small></div>
      <div className="global-search"><Icon name="search"/><label className="sr-only" htmlFor="global-search">Buscar entidades</label><input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar personas, CUIT, entidades, direcciones..."/><kbd>Ctrl K</kbd></div>
      <div className="environment"><span>Entorno</span><strong><i/>DEMOSTRACIÓN</strong></div>
      <button className="operator-settings" onClick={() => setShowSettings(true)}><span className="operator-avatar">SD</span><span><strong>Analista</strong><small>Operador principal</small></span><Icon name="chevron" size={14}/></button>
    </header>

    <nav className="icon-rail" aria-label="Navegación principal">
      <button className="rail-mark" aria-label="Inicio"><Icon name="shield"/></button>
      <button className="active" aria-label="Cola de trabajo"><Icon name="search"/></button>
      <button disabled aria-label="Módulos"><Icon name="grid"/></button>
      <button disabled aria-label="Relaciones"><Icon name="graph"/></button>
      <button disabled aria-label="Expedientes"><Icon name="file"/></button>
      <button disabled aria-label="Fuentes"><Icon name="database"/></button>
      <button disabled aria-label="Instituciones"><Icon name="building"/></button>
      <button onClick={() => setShowSettings(true)} aria-label="Criterios"><Icon name="sliders"/></button>
      <button disabled aria-label="Indicadores"><Icon name="chart"/></button>
      <span className="rail-spacer"/>
      <button onClick={() => setShowSettings(true)} aria-label="Configuración"><Icon name="gear"/></button>
    </nav>

    <section className="queue-panel" aria-labelledby="queue-title">
      <header><div><h1 id="queue-title">COLA DE TRABAJO</h1><small>{rows.length} de {demoEntities.length} casos</small></div><button onClick={() => setShowSettings(true)}><Icon name="sliders" size={15}/>Criterios</button></header>
      <div className="queue-tabs"><strong>Todos <b>{rows.length}</b></strong><span>En atención <b>{attentionCount}</b></span><span>Sin señal <b>{rows.length - attentionCount}</b></span></div>
      <div className="queue-head"><span>ENTIDAD</span><span>RIESGO</span><span>ACTUALIZADO</span></div>
      <div className="queue-list">
        {rows.map(({ entity, risk }) => {
          const label = riskLabel(risk.ratio, risk.requiresAttention);
          return <button key={entity.id} className={selected?.entity.id === entity.id ? "selected" : ""} onClick={() => setSelectedId(entity.id)}>
            <span className="queue-entity"><i><Icon name={entity.kind === "Persona jurídica" ? "building" : "person"} size={19}/></i><span><strong>{entity.name}</strong><small>{entity.taxId}</small></span></span>
            <span className={`risk-tag ${label.toLowerCase()}`}>{label}</span><time>{entity.updatedAt.replace(" ago ", " ")}</time>
          </button>;
        })}
        {!rows.length && <p className="empty-state">No hay coincidencias.</p>}
      </div>
      <footer><span>1–{rows.length} de {rows.length}</span><span>‹ &nbsp; 1 &nbsp; ›</span></footer>
    </section>

    <section className="analysis-panel" aria-live="polite">
      {selected ? <>
        <header className="entity-toolbar"><div><Icon name={selected.entity.kind === "Persona jurídica" ? "building" : "person"}/><strong>{selected.entity.name}</strong><span>{selected.entity.taxId}</span></div><span className="toolbar-status">Riesgo: <b>{riskLabel(selected.risk.ratio, selected.risk.requiresAttention)}</b></span><span>Índice: <b>{selected.risk.ratio.toFixed(2)}×</b></span><span>Fuentes: <b>{selected.entity.sources}</b></span><span>Últ. actividad: <b>{selected.entity.updatedAt}</b></span></header>
        <RelationshipGraph entity={selected.entity} ratio={selected.risk.ratio}/>
      </> : <div className="empty-state">Seleccioná un caso para abrir el espacio de análisis.</div>}
    </section>

    <aside className="evidence-panel">
      <header><h2>INSPECTOR DE EVIDENCIA</h2></header>
      <div className="inspector-tabs"><strong>Resumen</strong><span>Evidencia {selected?.entity.sources ?? 0}</span><span>Historial</span></div>
      {selected && <div className="inspector-body">
        <section><h3>PERFIL</h3><dl><dt>Nombre</dt><dd>{selected.entity.name}</dd><dt>CUIT</dt><dd>{selected.entity.taxId}</dd><dt>Tipo</dt><dd>{selected.entity.kind}</dd><dt>Jurisdicción</dt><dd>{selected.entity.jurisdiction}</dd><dt>Fuentes</dt><dd>{selected.entity.sources} registros</dd><dt>Estado S.I.D.E.F.</dt><dd><span className={`risk-tag ${riskLabel(selected.risk.ratio, selected.risk.requiresAttention).toLowerCase()}`}>{riskLabel(selected.risk.ratio, selected.risk.requiresAttention)} RIESGO</span></dd></dl></section>
        <section><h3>DISCREPANCIA PATRIMONIAL <span title="Señal orientativa; requiere revisión humana">ⓘ</span></h3><dl className="numbers"><dt>Ingresos declarados</dt><dd>{money.format(selected.entity.declaredIncome)}</dd><dt>Patrimonio observado</dt><dd>{money.format(selected.entity.patrimonialIncrease)}</dd><dt>Capacidad estimada</dt><dd>{money.format(selected.risk.estimatedCapacity)}</dd><dt>Brecha estimada</dt><dd>{money.format(selected.risk.gap)}</dd><dt className="ratio-row">Discrepancia (índice)</dt><dd className="ratio-row">{selected.risk.ratio.toFixed(2)}×</dd></dl><p>Señal analítica, no determina infracción ni culpabilidad.</p></section>
        <section><h3>INDICADORES CLAVE</h3><dl className="indicators"><dt>Entidades vinculadas</dt><dd>{selected.entity.links.length}<i className="red-dot"/></dd><dt>Bienes registrables</dt><dd>{selected.entity.assets.length}<i className="amber-dot"/></dd><dt>Fuentes contrastadas</dt><dd>{selected.entity.sources}<i className="green-dot"/></dd><dt>Alertas activas</dt><dd>{selected.risk.requiresAttention ? 1 : 0}<i className={selected.risk.requiresAttention ? "red-dot" : "green-dot"}/></dd></dl></section>
      </div>}
    </aside>

    <section className="timeline-panel" aria-label="Línea de tiempo del caso">
      <header><h2>LÍNEA DE TIEMPO DEL CASO</h2><span>Vista: cronológica</span></header>
      {selected && <div className="timeline-track">
        {[{date:"15/04/2026", icon:"person" as IconName, title:"Perfil incorporado", detail:selected.entity.taxId}, ...selected.entity.assets.slice(0, 3).map((asset, index) => ({date:["21/04/2026","03/05/2026","19/05/2026"][index], icon:(asset.label.toLowerCase().includes("veh") ? "car" : "building") as IconName, title:"Bien detectado", detail:asset.label})), {date:"02/08/2026", icon:"chart" as IconName, title:"Señal generada", detail:`Índice ${selected.risk.ratio.toFixed(2)}×`}].map((event, index) => <article key={`${event.date}-${index}`}><time>{event.date}</time><i className={`timeline-node node-${index}`}><Icon name={event.icon} size={16}/></i><strong>{event.title}</strong><small>{event.detail}</small></article>)}
      </div>}
    </section>

    {showSettings && <div className="settings-overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title"><button className="settings-scrim" aria-label="Cerrar criterios" onClick={() => setShowSettings(false)}/><section className="settings-drawer">
      <header><div><span>CONFIGURACIÓN OPERATIVA</span><h2 id="settings-title">Criterios de atención</h2><p>Los parámetros generan indicios para revisión humana; nunca determinan culpabilidad.</p></div><button onClick={() => setShowSettings(false)} aria-label="Cerrar"><Icon name="close"/></button></header>
      <label><span>Tolerancia patrimonial <strong>{config.tolerancePercent}%</strong></span><input type="range" min="0" max="100" step="5" value={config.tolerancePercent} onChange={(event) => setConfig({...config, tolerancePercent: Number(event.target.value)})}/><small>Margen para ahorros previos, valuaciones y variaciones registrales.</small></label>
      <label><span>Ajuste por ingresos no observados <strong>{config.informalIncomePercent}%</strong></span><input type="range" min="0" max="150" step="5" value={config.informalIncomePercent} onChange={(event) => setConfig({...config, informalIncomePercent: Number(event.target.value)})}/><small>Reconoce actividad económica que las fuentes disponibles pueden no reflejar.</small></label>
      <label><span>Índice mínimo de atención <strong>{config.attentionRatio.toFixed(2)}×</strong></span><input type="range" min="1" max="3" step="0.05" value={config.attentionRatio} onChange={(event) => setConfig({...config, attentionRatio: Number(event.target.value)})}/><small>Relación mínima entre patrimonio observado y capacidad estimada.</small></label>
      <label><span>Brecha absoluta mínima <strong>{money.format(config.minimumGap)}</strong></span><input type="range" min="0" max="100000000" step="5000000" value={config.minimumGap} onChange={(event) => setConfig({...config, minimumGap: Number(event.target.value)})}/><small>Evita señales por diferencias económicamente poco relevantes.</small></label>
      <div className="settings-result"><span>RESULTADO ACTUAL</span><strong>{attentionCount} de {rows.length} entidades requieren atención</strong></div>
      <button className="apply-button" onClick={() => setShowSettings(false)}>Aplicar criterios</button>
    </section></div>}
  </main>;
}
