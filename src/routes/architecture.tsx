import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";

export const Route = createFileRoute("/architecture")({
  head: () => ({ meta: [{ title: "SCADA Architecture — HIA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Reference Architecture" title="SCADA System Architecture" description="Redundant servers, ring-topology PLC networks, dual-fiber backbones and historian replication form the backbone of HIA infrastructure operations.">
        <Tag tone="info">Tier IV Equivalent</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Layer Topology" className="lg:col-span-2">
          <Diagram />
        </Panel>
        <Panel title="Redundancy Posture" accent>
          <ul className="text-sm space-y-3">
            <li><b className="text-primary">SCADA Servers:</b> Primary + Hot Standby with sub-second failover, geographically split.</li>
            <li><b className="text-primary">Historian:</b> Active-Active replication with deferred sync to DR site.</li>
            <li><b className="text-primary">PLC Networks:</b> Profinet/EtherNet/IP MRP rings, MRPD recovery &lt; 200 ms.</li>
            <li><b className="text-primary">Field Bus:</b> Dual-bus segregation per criticality tier.</li>
            <li><b className="text-primary">Backbone:</b> Diverse-route OS2 fiber, MPLS over carrier + dark fiber.</li>
          </ul>
        </Panel>
      </section>
      <section className="px-6 lg:px-10 pb-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {t:"Level 0 — Field",d:"Sensors, actuators, valves, drives, smart instruments"},
          {t:"Level 1 — Control",d:"PLCs, SIS, distributed controllers in MRP rings"},
          {t:"Level 2 — Supervisory",d:"SCADA HMIs, redundant servers, alarm engine"},
          {t:"Level 3 — Operations",d:"Historian, MES-like reporting, AI analytics"},
          {t:"Level 4 — Enterprise",d:"AODB, asset mgmt, regulatory reporting (DMZ-segregated)"},
          {t:"Security",d:"IEC 62443 zones & conduits, IDS, OT firewall, jump hosts"},
        ].map(c=>(
          <Panel key={c.t} title={c.t}><p className="text-sm text-muted-foreground">{c.d}</p></Panel>
        ))}
      </section>
    </div>
  ),
});

function Diagram() {
  return (
    <svg viewBox="0 0 720 360" className="w-full">
      <defs>
        <linearGradient id="lvl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="var(--chart-5)" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      {[
        {y:30,t:"Level 4 · Enterprise (AODB, ERP)"},
        {y:90,t:"Level 3 · Operations (Historian, AI, Reporting)"},
        {y:150,t:"Level 2 · SCADA Servers (Primary / Standby) + HMI"},
        {y:210,t:"Level 1 · PLCs / SIS · MRP Rings"},
        {y:270,t:"Level 0 · Field Devices & Smart Instruments"},
      ].map((b,i)=>(
        <g key={i}>
          <rect x="40" y={b.y} width="640" height="40" rx="6" fill="var(--panel)" stroke="var(--border)"/>
          <text x="60" y={b.y+25} fill="var(--foreground)" fontSize="13" className="mono">{b.t}</text>
        </g>
      ))}
      {[70,150,230].map(y => (
        <line key={y} x1="360" y1={y} x2="360" y2={y+20} stroke="var(--primary)" strokeWidth="2" className="flow-line"/>
      ))}
      <line x1="360" y1="250" x2="360" y2="270" stroke="var(--primary)" strokeWidth="2" className="flow-line"/>
      <text x="360" y="345" fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" className="mono">DMZ · OT FIREWALL · IEC 62443 ZONE BOUNDARIES</text>
    </svg>
  );
}
