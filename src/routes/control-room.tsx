import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag, GaugeRing } from "@/components/scada/Primitives";
import { TrendArea, MultiLine, genSeries } from "@/components/scada/Charts";
import hero from "@/assets/hero-control-room.jpg";

export const Route = createFileRoute("/control-room")({
  head: () => ({ meta: [{ title: "Control Room — HIA SCADA" }] }),
  component: ControlRoom,
});

function ControlRoom() {
  const power = genSeries(40, 45, 5, (i)=>`-${40-i}m`);
  const dual = Array.from({length:30},(_,i)=>({t:`-${30-i}m`, srvA:+(98+Math.random()*2).toFixed(1), srvB:+(98+Math.random()*2).toFixed(1)}));
  return (
    <div>
      <div className="relative">
        <img src={hero} alt="Airport SCADA control room video wall" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background"/>
        <div className="relative">
          <PageHeader eyebrow="Integrated Operations Centre" title="Control Room · Live View" description="Mirror of the IOC video wall — primary SCADA mimic, alarm summary, network topology and KPI overview.">
            <Tag tone="ok">Server A · ACTIVE</Tag>
            <Tag tone="info">Server B · STANDBY</Tag>
            <Tag tone="ok">Failover &lt; 2s</Tag>
          </PageHeader>
        </div>
      </div>

      <section className="px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Active Alarms" value="14" status="warn"/>
        <Stat label="Critical" value="2" status="crit"/>
        <Stat label="Live Tags" value="184 320" status="ok"/>
        <Stat label="Sample Rate" value="1.2" unit="s" status="ok"/>
        <Stat label="Server A CPU" value="38" unit="%" status="ok"/>
        <Stat label="Server B CPU" value="11" unit="%" status="ok"/>
      </section>

      <section className="px-6 lg:px-10 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Panel title="Mimic · Energy Centre" className="xl:col-span-2">
          <ProcessMimic />
        </Panel>
        <Panel title="Health · Servers / PLC / Net">
          <div className="grid grid-cols-3 gap-2">
            <GaugeRing value={99} label="Srv A" unit="%" status="ok"/>
            <GaugeRing value={97} label="Srv B" unit="%" status="ok"/>
            <GaugeRing value={94} label="PLCs" unit="%" status="ok"/>
            <GaugeRing value={98} label="Fiber A" unit="%" status="ok"/>
            <GaugeRing value={96} label="Fiber B" unit="%" status="ok"/>
            <GaugeRing value={99} label="Hist." unit="%" status="ok"/>
          </div>
        </Panel>
        <Panel title="Total Demand · Last 40m" className="xl:col-span-2"><TrendArea data={power}/></Panel>
        <Panel title="Server Heartbeat (%)"><MultiLine data={dual} keys={[{key:"srvA",color:"var(--chart-1)"},{key:"srvB",color:"var(--chart-3)"}]}/></Panel>
      </section>
    </div>
  );
}

function ProcessMimic() {
  return (
    <svg viewBox="0 0 720 320" className="w-full">
      <defs>
        <linearGradient id="pipe" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      {/* Chillers */}
      {[0,1,2].map(i=>(
        <g key={i} transform={`translate(${40+i*120}, 40)`}>
          <rect width="90" height="60" rx="6" fill="var(--panel)" stroke="var(--primary)" strokeOpacity="0.6"/>
          <text x="45" y="25" textAnchor="middle" fill="var(--primary)" fontSize="11" className="mono">CH-0{i+1}</text>
          <text x="45" y="42" textAnchor="middle" fill="var(--ok)" fontSize="10" className="mono">RUN</text>
          <text x="45" y="55" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8" className="mono">{6+i*0.1}°C</text>
        </g>
      ))}
      {/* Header pipe */}
      <line x1="40" y1="120" x2="680" y2="120" stroke="url(#pipe)" strokeWidth="6" className="flow-line"/>
      {/* Pumps */}
      {[0,1,2,3].map(i=>(
        <g key={i} transform={`translate(${100+i*140}, 150)`}>
          <circle cx="20" cy="20" r="18" fill="var(--panel)" stroke="var(--primary)" strokeOpacity="0.6"/>
          <circle cx="20" cy="20" r="6" fill={i===2?"var(--warn)":"var(--ok)"}/>
          <text x="20" y="55" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" className="mono">CHWP-0{i+1}</text>
          <text x="20" y="68" textAnchor="middle" fill={i===2?"var(--warn)":"var(--ok)"} fontSize="9" className="mono">{i===2?"72°C":"OK"}</text>
        </g>
      ))}
      {/* Distribution */}
      <line x1="40" y1="220" x2="680" y2="220" stroke="url(#pipe)" strokeWidth="6" className="flow-line"/>
      {[
        {x:80,l:"T1"},{x:200,l:"T2"},{x:320,l:"T3"},{x:440,l:"T4"},{x:560,l:"T5"},{x:660,l:"DC"},
      ].map(z=>(
        <g key={z.l}>
          <line x1={z.x} y1="220" x2={z.x} y2="270" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="3" className="flow-line"/>
          <rect x={z.x-22} y="270" width="44" height="30" rx="4" fill="var(--panel)" stroke="var(--border)"/>
          <text x={z.x} y="290" textAnchor="middle" fill="var(--primary)" fontSize="11" className="mono">{z.l}</text>
        </g>
      ))}
    </svg>
  );
}
