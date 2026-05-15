import { ReactNode } from "react";
import { PageHeader, Panel, Stat, Tag, GaugeRing } from "@/components/scada/Primitives";
import { TrendArea, MultiLine, BarTrend, genSeries } from "@/components/scada/Charts";
import { AlertTriangle, BookOpen, CheckCircle2, Wrench, Zap } from "lucide-react";

export type SystemSpec = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  stats: { label: string; value: string | number; unit?: string; status?: "ok"|"warn"|"crit"|"muted"; hint?: string }[];
  monitoring: string[];
  setpoints: { tag: string; normal: string; warn: string; crit: string }[];
  responsibilities: string[];
  failures: string[];
  emergency: string[];
  philosophy?: string;
  trendLabel?: string;
};

export function SystemPage({ spec, extra }: { spec: SystemSpec; extra?: ReactNode }) {
  const trend = genSeries(24, 50, 18, (i)=>`${String(i).padStart(2,"0")}:00`);
  const multi = Array.from({length: 24}, (_, i) => ({
    t: `${String(i).padStart(2,"0")}:00`,
    a: +(60 + Math.sin(i/3)*8 + Math.random()*4).toFixed(1),
    b: +(45 + Math.cos(i/4)*6 + Math.random()*3).toFixed(1),
  }));
  const bar = genSeries(12, 70, 25, (i)=>`${i*2}h`);

  return (
    <div>
      <PageHeader eyebrow={spec.eyebrow} title={spec.title} description={spec.description}>
        <Tag tone="ok">SCADA Online</Tag>
        <Tag tone="info">Operator Manual</Tag>
      </PageHeader>

      {spec.image && (
        <div className="px-6 lg:px-10 pt-6">
          <div className="relative rounded-lg overflow-hidden border border-border max-h-[320px]">
            <img src={spec.image} alt={spec.imageAlt || spec.title} className="w-full h-[320px] object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      )}

      <section className="px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {spec.stats.map((s) => <Stat key={s.label} {...s} />)}
      </section>

      <section className="px-6 lg:px-10 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Panel title={spec.trendLabel || "Primary Process Trend · 24h"} className="xl:col-span-2">
          <TrendArea data={trend} />
        </Panel>
        <Panel title="System Health">
          <div className="grid grid-cols-3 gap-2">
            <GaugeRing value={88} label="Avail" unit="%" status="ok" />
            <GaugeRing value={71} label="Load" unit="%" status="ok" />
            <GaugeRing value={42} label="Risk" unit="idx" status="warn" />
          </div>
        </Panel>
        <Panel title="Comparative Telemetry" className="xl:col-span-2">
          <MultiLine data={multi} keys={[{key:"a",color:"var(--chart-1)"},{key:"b",color:"var(--chart-3)"}]} />
        </Panel>
        <Panel title="Throughput">
          <BarTrend data={bar} />
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel title="Monitoring Points">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {spec.monitoring.map((m)=>(
              <li key={m} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span>{m}</span></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Operator Responsibilities">
          <ul className="space-y-2 text-sm">
            {spec.responsibilities.map((r)=>(
              <li key={r} className="flex items-start gap-2"><BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span>{r}</span></li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-10">
        <Panel title="Normal Operating Values · Alarm Setpoints">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mono">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">SCADA Tag</th>
                  <th className="py-2 pr-4">Normal</th>
                  <th className="py-2 pr-4">Warning</th>
                  <th className="py-2">Critical</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {spec.setpoints.map((s)=>(
                  <tr key={s.tag}>
                    <td className="py-2 pr-4 text-foreground">{s.tag}</td>
                    <td className="py-2 pr-4 text-ok">{s.normal}</td>
                    <td className="py-2 pr-4 text-warn">{s.warn}</td>
                    <td className="py-2 text-crit">{s.crit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel title="Typical Failure Modes">
          <ul className="space-y-2 text-sm">
            {spec.failures.map((f)=>(
              <li key={f} className="flex items-start gap-2"><Wrench className="h-4 w-4 text-warn mt-0.5 shrink-0"/><span>{f}</span></li>
            ))}
          </ul>
        </Panel>
        <Panel title="Emergency Response Protocol">
          <ol className="space-y-2 text-sm list-decimal list-inside">
            {spec.emergency.map((e,i)=>(
              <li key={i} className="text-muted-foreground"><span className="text-foreground">{e}</span></li>
            ))}
          </ol>
        </Panel>
      </section>

      {spec.philosophy && (
        <section className="px-6 lg:px-10 pb-12">
          <Panel title="Control Philosophy" accent>
            <p className="text-sm leading-relaxed text-muted-foreground"><Zap className="inline h-4 w-4 text-primary mr-1"/>{spec.philosophy}</p>
          </Panel>
        </section>
      )}

      {extra && <section className="px-6 lg:px-10 pb-12">{extra}</section>}
    </div>
  );
}
