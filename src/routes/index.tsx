import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowUpRight, Brain, Cpu, Database, Droplets, Flame, Gauge as GaugeIcon, Lightbulb, Network, Package, Plane, Radio, Server, Shield, Wind, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Panel, Stat, Tag, GaugeRing } from "@/components/scada/Primitives";
import { TrendArea, MultiLine, BarTrend, genSeries } from "@/components/scada/Charts";
import hero from "@/assets/hero-control-room.jpg";
import twin from "@/assets/airport-twin.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Control — HIA SCADA Operations Portal" },
      { name: "description", content: "Live mission-critical airport infrastructure dashboard for SCADA operators at Hamad International Airport." },
    ],
  }),
  component: HomePage,
});

const KPI = [
  { label: "Total Power Load", value: "47.3", unit: "MW", status: "ok" as const, hint: "Demand forecast 49.1 MW @ 14:00" },
  { label: "Chiller Plant Eff.", value: "0.61", unit: "kW/RT", status: "ok" as const, hint: "12 of 14 chillers online" },
  { label: "Water Consumption", value: "8 412", unit: "m³/day", status: "warn" as const, hint: "+6.4% vs 7d avg" },
  { label: "Jet Fuel Storage", value: "82.4", unit: "%", status: "ok" as const, hint: "Hydrant pressure 8.6 bar" },
  { label: "UPS Redundancy", value: "N+1", unit: "OK", status: "ok" as const, hint: "Bank A 41% · Bank B 39%" },
  { label: "Fire System", value: "READY", unit: "", status: "ok" as const, hint: "All 14 zones armed" },
  { label: "Baggage Throughput", value: "11 240", unit: "bag/h", status: "ok" as const, hint: "Peak 13 800 @ 09:14" },
  { label: "Flight Integration", value: "LIVE", unit: "", status: "ok" as const, hint: "AODB sync 2.1s lag" },
  { label: "Network Redundancy", value: "DUAL", unit: "FIBER", status: "ok" as const, hint: "Path A/B active" },
];

const QUICK = [
  { to: "/control-room", icon: Radio, label: "Control Room", desc: "Live mimic & video wall" },
  { to: "/alarms", icon: AlertTriangle, label: "Alarm Manager", desc: "Active · Ack · History" },
  { to: "/energy", icon: Zap, label: "Energy", desc: "Demand · Carbon · DR" },
  { to: "/chiller-plant", icon: Wind, label: "District Cooling", desc: "Chiller plant SCADA" },
  { to: "/data-center", icon: Server, label: "Data Center", desc: "CRAC · UPS · Hall" },
  { to: "/wwtp", icon: Droplets, label: "WWTP", desc: "Treatment process" },
  { to: "/airfield-lighting", icon: Lightbulb, label: "Airfield Lighting", desc: "CCRs · Vaults" },
  { to: "/baggage", icon: Package, label: "Baggage", desc: "BHS · Sorters · RFID" },
  { to: "/fire-safety", icon: Flame, label: "Fire & Life Safety", desc: "Detection · Suppression" },
  { to: "/predictive", icon: Cpu, label: "Predictive Maint.", desc: "Failure forecasting" },
  { to: "/ai-analytics", icon: Brain, label: "AI Analytics", desc: "Optimization engine" },
  { to: "/architecture", icon: Network, label: "SCADA Arch.", desc: "Servers · PLC · Fiber" },
];

const ALARMS = [
  { time: "03:42:18", tag: "BHS-T2-S08-MOTOR", area: "Baggage T2", msg: "Motor overload trip — sorter row 8", sev: "crit" as const },
  { time: "03:39:51", tag: "FUEL-HYDRANT-P7", area: "Fuel Farm", msg: "Pressure deviation — leak suspected", sev: "crit" as const },
  { time: "03:36:02", tag: "CHWP-03.VFD.TEMP", area: "Chiller Plant 1", msg: "Drive temperature 72°C — upper warn", sev: "warn" as const },
  { time: "03:31:44", tag: "CRAC-12.RH", area: "Data Hall B", msg: "Relative humidity 62% — outside band", sev: "warn" as const },
  { time: "03:28:10", tag: "WWTP.TURB.IN", area: "WWTP Inlet", msg: "Turbidity 4.1 NTU rising trend", sev: "warn" as const },
  { time: "03:21:55", tag: "GEN-04.SYNC", area: "Substation E", msg: "Synchronization lock acquired", sev: "info" as const },
  { time: "03:18:22", tag: "CCR-RWY16L.CUR", area: "Airfield Vault 3", msg: "Constant current 6.6A — nominal", sev: "info" as const },
];

function HomePage() {
  const power = genSeries(24, 42, 6, (i) => `${String(i).padStart(2,"0")}:00`);
  const chwTemp = Array.from({length: 24}, (_, i) => ({
    t: `${String(i).padStart(2,"0")}:00`,
    supply: +(6 + Math.sin(i/3)*0.6 + Math.random()*0.3).toFixed(2),
    return: +(11.8 + Math.sin(i/3)*0.7 + Math.random()*0.3).toFixed(2),
  }));
  const baggage = genSeries(12, 9000, 3500, (i)=>`${i*2}h`);

  return (
    <div className="text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={hero} alt="Hamad International Airport SCADA control room with curved video walls and live telemetry" className="h-full w-full object-cover opacity-50" width={1920} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>
        <div className="relative px-6 lg:px-10 pt-12 lg:pt-20 pb-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-[0.25em] text-primary mb-5">
              <span className="pulse-dot" style={{ background: "var(--primary)", color: "var(--primary)" }} />
              Integrated Operations · DOH · OTH-SCADA
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight max-w-4xl glow-text">
              Hamad International Airport
              <span className="block text-primary">SCADA Operations Portal</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base lg:text-lg text-muted-foreground">
              Mission-critical airport infrastructure monitoring, operator training, and shift-handover intelligence — engineered to aviation-grade reliability for a 24/7 control room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/control-room" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium glow-border hover:brightness-110 transition">
                Open Control Room <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/training" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-panel/40 hover:bg-panel transition">
                Operator Training <Shield className="h-4 w-4" />
              </Link>
              <Link to="/alarms" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-warn/40 bg-warn/10 text-warn hover:bg-warn/20 transition">
                Alarm Console <AlertTriangle className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPI GRID */}
      <section className="px-6 lg:px-10 py-8 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mono">Live Operational KPIs</h2>
          <Tag tone="ok">Telemetry · 1.2s</Tag>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-3">
          {KPI.map((k) => <Stat key={k.label} {...k} />)}
        </div>
      </section>

      {/* MAIN DASHBOARD */}
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Panel title="Total Airport Power Load · 24h" className="xl:col-span-2" action={<Tag tone="info">Demand</Tag>}>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl mono text-primary">47.3 <span className="text-sm text-muted-foreground">MW</span></span>
            <span className="text-xs text-ok mono">+1.8% vs 24h</span>
          </div>
          <TrendArea data={power} />
        </Panel>

        <Panel title="System Health" action={<Tag tone="ok">Nominal</Tag>}>
          <div className="grid grid-cols-3 gap-2">
            <GaugeRing value={87} label="Power" unit="%" status="ok" />
            <GaugeRing value={71} label="Cooling" unit="%" status="ok" />
            <GaugeRing value={94} label="Network" unit="%" status="ok" />
            <GaugeRing value={62} label="Water" unit="%" status="warn" />
            <GaugeRing value={83} label="Fire" unit="%" status="ok" />
            <GaugeRing value={45} label="Risk" unit="idx" status="warn" />
          </div>
        </Panel>

        <Panel title="Chilled Water · Supply / Return" className="xl:col-span-2" action={<div className="flex gap-2"><Tag tone="info">CHWS 6°C</Tag><Tag tone="info">CHWR 12°C</Tag></div>}>
          <MultiLine data={chwTemp} keys={[
            { key: "supply", color: "var(--chart-1)" },
            { key: "return", color: "var(--chart-3)" },
          ]} />
        </Panel>

        <Panel title="Active Alarms · Live Feed" action={<Tag tone="warn">14 Active</Tag>}>
          <ul className="divide-y divide-border text-xs mono">
            {ALARMS.slice(0,7).map((a) => (
              <li key={a.time} className="py-2 flex items-start gap-2">
                <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${a.sev==="crit"?"bg-crit":a.sev==="warn"?"bg-warn":"bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 text-[10px] text-muted-foreground">
                    <span>{a.time}</span><span className="truncate">{a.area}</span>
                  </div>
                  <div className="text-foreground truncate">{a.tag}</div>
                  <div className="text-muted-foreground truncate">{a.msg}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/alarms" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">View alarm console <ArrowUpRight className="h-3 w-3" /></Link>
        </Panel>

        <Panel title="Baggage Throughput · bags / 2h" action={<Tag tone="ok">11 240 bag/h</Tag>}>
          <BarTrend data={baggage} />
        </Panel>

        <Panel title="Network Redundancy" action={<Tag tone="ok">DUAL FIBER</Tag>}>
          <NetworkTopology />
        </Panel>

        <Panel title="AI Operational Insights" accent action={<Tag tone="info">AI · Live</Tag>}>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Brain className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span><b>Chiller CHWP-03</b> drive temperature trending up 0.6°C/h — recommend rotation within 4 hours.</span></li>
            <li className="flex gap-2"><Brain className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span><b>Demand forecast 14:00</b> projects 49.1 MW (95% CI). Pre-cooling Zone B reduces peak by 1.4 MW.</span></li>
            <li className="flex gap-2"><Brain className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span><b>Fuel hydrant P-7</b> pattern matches historical leak signature (87%). Dispatch maintenance.</span></li>
            <li className="flex gap-2"><Brain className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span><b>WWTP turbidity</b> spike correlates with terminal flush cycle — informational.</span></li>
          </ul>
        </Panel>
      </section>

      {/* DIGITAL TWIN */}
      <section className="px-6 lg:px-10 py-8 border-y border-border bg-panel/20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 relative rounded-lg overflow-hidden border border-border min-h-[360px]">
            <img src={twin} alt="Digital twin aerial view of HIA at night with cyan wireframe overlay" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1536} height={896} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><Plane className="h-4 w-4 text-primary"/><span className="text-xs uppercase tracking-widest mono text-primary">Digital Twin · HIA</span></div>
              <Tag tone="ok">12 systems online</Tag>
            </div>
            {/* hotspots */}
            {[
              { x: "30%", y: "55%", label: "Terminal", tone: "ok" },
              { x: "55%", y: "40%", label: "Concourse D", tone: "ok" },
              { x: "70%", y: "70%", label: "Energy Centre", tone: "warn" },
              { x: "20%", y: "30%", label: "Cargo", tone: "ok" },
              { x: "85%", y: "45%", label: "Fuel Farm", tone: "crit" },
            ].map((h)=>(
              <div key={h.label} className="absolute" style={{ left: h.x, top: h.y }}>
                <span className="pulse-dot" style={{ background: `var(--${h.tone})`, color: `var(--${h.tone})` }} />
                <span className="ml-3 text-[10px] mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-background/70 border border-border">{h.label}</span>
              </div>
            ))}
          </div>
          <Panel title="Digital Twin Telemetry" action={<Tag tone="info">12 zones</Tag>}>
            <div className="space-y-3 text-sm">
              {[
                { z: "Terminal Complex", v: "23.1°C / 51% RH", s: "ok" as const },
                { z: "Concourse D HVAC", v: "AHU 14/14 ON", s: "ok" as const },
                { z: "Energy Centre", v: "47.3 MW · PF 0.96", s: "ok" as const },
                { z: "WWTP Process", v: "pH 7.2 · DO 4.1", s: "warn" as const },
                { z: "Fuel Farm", v: "Hydrant P7 ALARM", s: "crit" as const },
                { z: "Airfield Lighting", v: "RWY 16L/34R OK", s: "ok" as const },
              ].map((r)=>(
                <div key={r.z} className="flex items-center justify-between rounded border border-border bg-background/40 px-3 py-2">
                  <div>
                    <div className="text-xs text-muted-foreground mono">{r.z}</div>
                    <div className="mono">{r.v}</div>
                  </div>
                  <Tag tone={r.s === "ok" ? "ok" : r.s === "warn" ? "warn" : "crit"}>{r.s.toUpperCase()}</Tag>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mono">Operator Quick Access</h2>
          <Link to="/systems" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">All Systems <ArrowUpRight className="h-3 w-3"/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {QUICK.map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.to} to={q.to} className="group glass-panel p-4 hover:-translate-y-0.5 hover:glow-border transition">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <div className="font-medium text-sm">{q.label}</div>
                <div className="text-[11px] text-muted-foreground mono mt-1">{q.desc}</div>
                <ArrowUpRight className="mt-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function NetworkTopology() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-44">
      <defs>
        <radialGradient id="node" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {/* center core */}
      <g>
        <circle cx="160" cy="90" r="22" fill="url(#node)" />
        <circle cx="160" cy="90" r="10" fill="var(--primary)" />
        <text x="160" y="125" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" className="mono">CORE</text>
      </g>
      {[
        { x: 40, y: 30, l: "PLC-A", c: "var(--ok)" },
        { x: 280, y: 30, l: "PLC-B", c: "var(--ok)" },
        { x: 30, y: 150, l: "BMS", c: "var(--ok)" },
        { x: 290, y: 150, l: "HIST", c: "var(--warn)" },
        { x: 160, y: 20, l: "AODB", c: "var(--ok)" },
        { x: 160, y: 165, l: "FW", c: "var(--ok)" },
      ].map((n)=>(
        <g key={n.l}>
          <line x1="160" y1="90" x2={n.x} y2={n.y} stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1" className="flow-line" />
          <circle cx={n.x} cy={n.y} r="6" fill={n.c} />
          <text x={n.x} y={n.y - 10} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" className="mono">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}
