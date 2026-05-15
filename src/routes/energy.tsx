import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag, GaugeRing } from "@/components/scada/Primitives";
import { TrendArea, MultiLine, BarTrend, genSeries } from "@/components/scada/Charts";

export const Route = createFileRoute("/energy")({
  head: () => ({ meta: [{ title: "Energy Management — HIA SCADA" }] }),
  component: Energy,
});

function Energy() {
  const power = genSeries(24, 42, 6, (i)=>`${String(i).padStart(2,"0")}:00`);
  const carbon = genSeries(7, 320, 60, (i)=>`D-${6-i}`);
  const split = Array.from({length:24},(_,i)=>({t:`${String(i).padStart(2,"0")}:00`, hvac:+(18+Math.sin(i/3)*4).toFixed(1), it:+(8+Math.random()*1.5).toFixed(1), light:+(4+Math.cos(i/5)*1.5).toFixed(1)}));

  return (
    <div>
      <PageHeader eyebrow="Energy & Carbon" title="Energy Management & Optimisation" description="Real-time power demand, sub-metering, demand response, and AI-assisted optimisation across all HIA infrastructure.">
        <Tag tone="info">Demand Response Ready</Tag>
        <Tag tone="ok">Carbon Tracking</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Live Demand" value="47.3" unit="MW" status="ok" />
        <Stat label="Forecast 14:00" value="49.1" unit="MW" status="warn" />
        <Stat label="Power Factor" value="0.96" status="ok" />
        <Stat label="Today Energy" value="1 124" unit="MWh" status="ok" />
        <Stat label="Carbon Intensity" value="312" unit="gCO₂/kWh" status="warn" />
        <Stat label="DR Capacity" value="3.6" unit="MW" status="ok" />
      </section>
      <section className="px-6 lg:px-10 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Panel title="Total Demand · 24h" className="xl:col-span-2"><TrendArea data={power}/></Panel>
        <Panel title="Energy Mix Health">
          <div className="grid grid-cols-3 gap-2">
            <GaugeRing value={62} label="HVAC" unit="%" status="ok"/>
            <GaugeRing value={22} label="IT" unit="%" status="ok"/>
            <GaugeRing value={16} label="Other" unit="%" status="ok"/>
          </div>
        </Panel>
        <Panel title="Sub-metered Load · MW" className="xl:col-span-2">
          <MultiLine data={split} keys={[{key:"hvac",color:"var(--chart-1)"},{key:"it",color:"var(--chart-2)"},{key:"light",color:"var(--chart-3)"}]}/>
        </Panel>
        <Panel title="Carbon · 7d (tCO₂)"><BarTrend data={carbon} color="var(--chart-3)"/></Panel>
      </section>
    </div>
  );
}
