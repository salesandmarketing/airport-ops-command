import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/alarms")({
  head: () => ({ meta: [{ title: "Alarm Management — HIA SCADA" }] }),
  component: Alarms,
});

const SEVS = ["ALL", "CRIT", "WARN", "INFO"] as const;

const ALARMS = [
  { time: "03:42:18", tag: "BHS-T2-S08-MOTOR", area: "Baggage T2", msg: "Motor overload trip — sorter row 8", sev: "CRIT", state: "ACTIVE", op: "—" },
  { time: "03:39:51", tag: "FUEL-HYDRANT-P7", area: "Fuel Farm", msg: "Pressure deviation — leak suspected", sev: "CRIT", state: "ACTIVE", op: "—" },
  { time: "03:36:02", tag: "CHWP-03.VFD.TEMP", area: "Chiller Plant 1", msg: "Drive temperature 72°C — upper warn", sev: "WARN", state: "ACK", op: "M.RASHID" },
  { time: "03:31:44", tag: "CRAC-12.RH", area: "Data Hall B", msg: "Relative humidity 62% — outside band", sev: "WARN", state: "ACTIVE", op: "—" },
  { time: "03:28:10", tag: "WWTP.TURB.IN", area: "WWTP Inlet", msg: "Turbidity 4.1 NTU rising trend", sev: "WARN", state: "ACK", op: "A.NASSAR" },
  { time: "03:21:55", tag: "GEN-04.SYNC", area: "Substation E", msg: "Synchronization lock acquired", sev: "INFO", state: "CLOSED", op: "AUTO" },
  { time: "03:18:22", tag: "CCR-RWY16L.CUR", area: "Airfield Vault 3", msg: "Constant current 6.6A — nominal", sev: "INFO", state: "CLOSED", op: "AUTO" },
  { time: "02:54:08", tag: "AHU-T3-04.SF", area: "Terminal 3", msg: "Supply fan VFD warning — restart required", sev: "WARN", state: "ACK", op: "M.RASHID" },
  { time: "02:31:11", tag: "UPS-A.LOAD", area: "Data Hall A", msg: "Load 41% — within nominal", sev: "INFO", state: "CLOSED", op: "AUTO" },
  { time: "02:09:42", tag: "FIRE.ZN.14.SUP", area: "Concourse C", msg: "Smoke detector supervisory — verified clean", sev: "WARN", state: "CLOSED", op: "F.AHMED" },
  { time: "01:42:33", tag: "BHS-T1-EDS04.QUE", area: "Baggage T1", msg: "EDS queue 38 bags — peak bank", sev: "WARN", state: "CLOSED", op: "AUTO" },
  { time: "01:21:09", tag: "DRAIN-PS-04.LVL", area: "Pump Station 4", msg: "Wet-well high level — pump 2 started", sev: "WARN", state: "CLOSED", op: "AUTO" },
];

function tone(s: string) { return s === "CRIT" ? "crit" : s === "WARN" ? "warn" : "info" as const; }

function Alarms() {
  const [sev, setSev] = useState<(typeof SEVS)[number]>("ALL");
  const [q, setQ] = useState("");
  const filtered = ALARMS.filter((a) => (sev === "ALL" || a.sev === sev) && (q === "" || `${a.tag} ${a.area} ${a.msg}`.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <PageHeader eyebrow="Alarm Console" title="Alarm Management" description="Live, acknowledged and historical alarms across all monitored airport infrastructure systems.">
        <Tag tone="crit">2 Critical</Tag>
        <Tag tone="warn">7 Warning</Tag>
        <Tag tone="info">Historian Sync 98.7%</Tag>
      </PageHeader>

      <section className="px-6 lg:px-10 py-6">
        <Panel title="Active & Recent Alarms" action={
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded border border-border bg-background/50">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search tag, area..." className="bg-transparent outline-none text-xs w-48 mono" />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              {SEVS.map((s) => (
                <button key={s} onClick={()=>setSev(s)} className={`text-[10px] mono uppercase tracking-widest px-2 py-1 rounded border transition ${sev===s?"bg-primary/15 text-primary border-primary/40":"border-border text-muted-foreground hover:text-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>
        }>
          <div className="overflow-x-auto">
            <table className="w-full text-xs mono">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Time</th><th className="py-2 pr-4">Sev</th><th className="py-2 pr-4">Tag</th><th className="py-2 pr-4">Area</th><th className="py-2 pr-4">Message</th><th className="py-2 pr-4">State</th><th className="py-2">Operator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.time+a.tag} className="hover:bg-background/40">
                    <td className="py-2 pr-4 text-muted-foreground">{a.time}</td>
                    <td className="py-2 pr-4"><Tag tone={tone(a.sev)}>{a.sev}</Tag></td>
                    <td className="py-2 pr-4 text-foreground">{a.tag}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{a.area}</td>
                    <td className="py-2 pr-4">{a.msg}</td>
                    <td className="py-2 pr-4">{a.state}</td>
                    <td className="py-2 text-muted-foreground">{a.op}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <section className="px-6 lg:px-10 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Escalation Workflow" className="lg:col-span-2">
          <ol className="space-y-3 text-sm">
            <li><Tag tone="crit">L1</Tag> Operator acknowledges within 60s, applies first-response from runbook.</li>
            <li><Tag tone="warn">L2</Tag> Duty Engineer notified if not resolved in 15 min or impact widens.</li>
            <li><Tag tone="info">L3</Tag> Operations Manager + System Owner engaged for cascading or safety-critical events.</li>
            <li><Tag tone="info">L4</Tag> Airport Duty Manager + Vendor Tier-2 — incident bridge opened.</li>
          </ol>
        </Panel>
        <Panel title="SOP Quick Access">
          <ul className="space-y-2 text-sm">
            {["SOP-CHW-001 Chiller Trip","SOP-UPS-004 Battery Failure","SOP-FIRE-002 FM-200 Discharge","SOP-AGL-007 RWY Circuit Loss","SOP-BHS-013 Sorter Cascade Fault","SOP-FUEL-005 Hydrant Leak"].map(s=>(
              <li key={s} className="flex items-center justify-between rounded border border-border bg-background/40 px-3 py-2"><span>{s}</span><Tag tone="info">PDF</Tag></li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
