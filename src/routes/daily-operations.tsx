import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { CheckCircle2, Clock, MoonStar, Sun } from "lucide-react";

export const Route = createFileRoute("/daily-operations")({
  head: () => ({ meta: [{ title: "Daily Operations — HIA SCADA" }] }),
  component: DailyOps,
});

const DUTIES = [
  "Monitor all SCADA alarms across BMS, EMS, BHS, AGL, fire & WWTP subsystems",
  "Verify critical system availability (UPS, gensets, redundant servers)",
  "Check BMS operational trends — temperature, humidity, AHU status",
  "Review overnight alarm history and outstanding acknowledgements",
  "Monitor electrical demand against forecast and trigger DR if required",
  "Verify chiller plant staging, COP and cooling tower operation",
  "Check generator fuel levels and weekly test schedule",
  "Verify UPS redundancy, battery health and runtime",
  "Monitor HVAC comfort conditions in passenger zones",
  "Review fire alarm panels — armed, disabled, supervisory zones",
  "Monitor baggage handling system faults and EDS performance",
  "Verify data center cooling — CRAC redundancy and humidity bands",
  "Monitor runway and taxiway lighting status with ATC",
  "Review pumping station operation — booster, drainage, sewage",
  "Monitor WWTP process values — pH, DO, turbidity, chlorine",
  "Check communication system health — PA/VA, intercom, fiber backbone",
  "Coordinate with maintenance teams on planned interventions",
  "Log all abnormal events in shift journal with timestamps",
  "Perform shift handover reporting per standard template",
  "Escalate critical alarms per defined matrix",
];

const DAY = ["07:00 Pre-shift briefing & handover", "08:00 Energy demand check vs forecast", "10:00 BMS comfort audit (T1-T5)", "12:00 Peak load monitoring", "14:00 BHS performance review", "16:00 Maintenance window coordination"];
const NIGHT = ["19:00 Pre-shift briefing & handover", "20:00 Generator weekly test verification", "22:00 Reduced load reconfiguration", "00:00 Overnight cleaning HVAC adjustments", "02:00 Predictive maintenance review", "05:00 Pre-morning bank readiness"];

function DailyOps() {
  return (
    <div>
      <PageHeader eyebrow="Operator Workflow" title="Daily Operator Duties" description="Standard operating cadence for SCADA operators across day and night shifts at the HIA Integrated Operations Centre.">
        <Tag tone="info">SOP-OPS-101</Tag>
        <Tag tone="ok">Rev. 8.4</Tag>
      </PageHeader>

      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel title="Day Shift · 07:00 – 19:00" action={<Sun className="h-4 w-4 text-warn"/>}>
          <ol className="space-y-2 text-sm">
            {DAY.map((d) => <li key={d} className="flex items-start gap-2"><Clock className="h-4 w-4 text-primary mt-0.5"/><span>{d}</span></li>)}
          </ol>
        </Panel>
        <Panel title="Night Shift · 19:00 – 07:00" action={<MoonStar className="h-4 w-4 text-primary"/>}>
          <ol className="space-y-2 text-sm">
            {NIGHT.map((d) => <li key={d} className="flex items-start gap-2"><Clock className="h-4 w-4 text-primary mt-0.5"/><span>{d}</span></li>)}
          </ol>
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-10">
        <Panel title="Mandatory Operator Duties" accent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {DUTIES.map((d) => (
              <li key={d} className="flex items-start gap-2 rounded border border-border bg-background/40 p-3">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0"/><span>{d}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-12">
        <Panel title="Alarm Severity Matrix">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mono">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Severity</th><th className="py-2 pr-4">Acknowledge</th><th className="py-2 pr-4">Response</th><th className="py-2">Escalation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-2 pr-4 text-crit">CRITICAL</td><td className="py-2 pr-4">≤ 60 s</td><td className="py-2 pr-4">≤ 5 min</td><td className="py-2">Duty Engineer + Ops Manager</td></tr>
                <tr><td className="py-2 pr-4 text-warn">HIGH</td><td className="py-2 pr-4">≤ 3 min</td><td className="py-2 pr-4">≤ 15 min</td><td className="py-2">Duty Engineer</td></tr>
                <tr><td className="py-2 pr-4 text-primary">MEDIUM</td><td className="py-2 pr-4">≤ 10 min</td><td className="py-2 pr-4">≤ 60 min</td><td className="py-2">Maintenance Lead</td></tr>
                <tr><td className="py-2 pr-4 text-muted-foreground">LOW / INFO</td><td className="py-2 pr-4">Shift end</td><td className="py-2 pr-4">Routine</td><td className="py-2">Log only</td></tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    </div>
  );
}
