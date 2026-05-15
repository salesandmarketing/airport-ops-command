import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { Phone, Siren, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency Response — HIA SCADA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Emergency Operations" title="Emergency Response Handbook" description="Pre-defined response playbooks for major airport infrastructure incidents — designed to be executed under time pressure with absolute clarity.">
        <Tag tone="crit">Life Safety</Tag>
        <Tag tone="warn">Tier-1 Asset</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[
          { t: "Total Power Loss", steps: ["Confirm utility outage on EMS","Verify ATS transfer in all substations","Cross-check generator sync within 30s","Notify Airport Duty Manager","Activate load-shed plan A","Track UPS runtime margin"] },
          { t: "Fire Alarm — Concourse", steps: ["Acknowledge zone on fire panel","Cross-verify with CCTV and PA/VA","Notify QCDD and Airport Fire Services","Initiate phased evacuation","Halt smoke extraction handover","Coordinate lift recall to ground floor"] },
          { t: "Data Center Cooling Loss", steps: ["Acknowledge CRAC alarms","Activate Hall A → B chilled water cross-feed","Increase airflow to standby units","Notify Airport IT NOC","Stage emergency portable cooling","Track temperature rise rate"] },
          { t: "Fuel Hydrant Leak", steps: ["Isolate upstream pump","Notify Fuel Ops + Airfield Safety","Stop refuelling on affected stand","Activate spill response per ICAO","Coordinate aircraft tow if required","Initiate environmental containment"] },
          { t: "Runway Lighting Failure", steps: ["Notify ATC immediately","Switch to standby CCR","Verify CAT III readiness","Coordinate runway closure if required","Dispatch electrician with airfield escort","Issue NOTAM via airfield ops"] },
          { t: "Severe Weather Event", steps: ["Pre-stage drainage pump stations","Verify storm bypass interlocks","Increase AHU outdoor damper trim","Confirm lightning protection self-test","Pre-cool data halls","Brief shift on extended-event protocol"] },
        ].map(c => (
          <Panel key={c.t} title={c.t} action={<Siren className="h-4 w-4 text-crit"/>}>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">{c.steps.map(s=> <li key={s} className="text-foreground">{s}</li>)}</ol>
          </Panel>
        ))}
      </section>
      <section className="px-6 lg:px-10 pb-10">
        <Panel title="Emergency Contacts" accent action={<Phone className="h-4 w-4 text-primary"/>}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mono">
            {[
              ["Airport Fire Services","Ext. 911 / +974 4010-7777"],
              ["Duty Operations Manager","Ext. 4010 / +974 4010-2222"],
              ["Energy Duty Engineer","Ext. 4112"],
              ["IT NOC","Ext. 4500"],
              ["QCDD Civil Defence","999"],
              ["Vendor Tier-2 SCADA","+974 4010-9000"],
            ].map(([k,v])=>(
              <div key={k} className="rounded border border-border bg-background/40 p-3 flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-primary mt-0.5"/><div><div className="text-muted-foreground text-[10px] uppercase tracking-widest">{k}</div><div>{v}</div></div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  ),
});
