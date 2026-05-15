import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Stat, Tag } from "@/components/scada/Primitives";
import { TrendArea, BarTrend, genSeries } from "@/components/scada/Charts";
import { Cpu, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/predictive")({
  head: () => ({ meta: [{ title: "Predictive Maintenance — HIA SCADA" }] }),
  component: Predictive,
});

const RISK = [
  { asset: "CHWP-03 Drive", risk: 78, eta: "4 h", action: "Rotate to CHWP-04", sev: "warn" as const },
  { asset: "Fuel Hydrant P-7", risk: 92, eta: "Now", action: "Dispatch — leak signature", sev: "crit" as const },
  { asset: "CRAC-12 Humidifier", risk: 64, eta: "36 h", action: "Replace cartridge", sev: "warn" as const },
  { asset: "Generator-02 Battery", risk: 41, eta: "10 d", action: "Capacity test", sev: "info" as const },
  { asset: "BHS Sorter T2-S08 Bearing", risk: 73, eta: "12 h", action: "Lubricate / inspect", sev: "warn" as const },
  { asset: "AHU-T3-04 Belt", risk: 28, eta: "30 d", action: "Schedule replacement", sev: "info" as const },
];

function Predictive() {
  const vib = genSeries(48, 4.2, 1.4, (i)=>`${i}h`);
  const failrate = genSeries(12, 6, 3, (i)=>`M${i+1}`);
  return (
    <div>
      <PageHeader eyebrow="AI · Predictive" title="Predictive Maintenance Engine" description="Vibration, thermal, electrical and process pattern analytics forecasting failures before they impact operations.">
        <Tag tone="info">ML Models · 24 active</Tag>
        <Tag tone="warn">14 risk insights</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="MTTR Trend" value="2.4" unit="h" status="ok" />
        <Stat label="MTBF Trend" value="412" unit="h" status="ok" />
        <Stat label="Open WO" value="38" status="warn" />
        <Stat label="Forecast Failures" value="6" unit="/30d" status="warn" />
        <Stat label="False Positives" value="3.1" unit="%" status="ok" />
        <Stat label="Avoided Downtime" value="48" unit="h/30d" status="ok" />
      </section>
      <section className="px-6 lg:px-10 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Panel title="Top Asset Risk Index" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mono">
              <thead><tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="py-2 pr-4">Asset</th><th className="py-2 pr-4">Risk</th><th className="py-2 pr-4">ETA</th><th className="py-2 pr-4">Recommended</th><th className="py-2">Sev</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {RISK.map(r=>(
                  <tr key={r.asset}>
                    <td className="py-2 pr-4">{r.asset}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-border rounded">
                          <div className="h-full rounded" style={{width:`${r.risk}%`, background: `var(--${r.sev})`}}/>
                        </div>
                        <span className={`text-${r.sev}`}>{r.risk}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4">{r.eta}</td>
                    <td className="py-2 pr-4">{r.action}</td>
                    <td className="py-2"><Tag tone={r.sev}>{r.sev.toUpperCase()}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Vibration · CHWP-03 (mm/s)"><TrendArea data={vib}/></Panel>
        <Panel title="Failures Avoided · 12 mo" className="xl:col-span-2"><BarTrend data={failrate}/></Panel>
        <Panel title="Why It Matters" accent>
          <p className="text-sm text-muted-foreground"><Cpu className="inline h-4 w-4 text-primary mr-1"/>Predictive insights fuse historian data, vibration sensors and process trends — replacing calendar-based maintenance with condition-based intervention.</p>
          <p className="text-sm text-muted-foreground mt-3"><AlertTriangle className="inline h-4 w-4 text-warn mr-1"/>Critical insights are escalated automatically through the alarm console with severity tagging.</p>
        </Panel>
      </section>
    </div>
  );
}
