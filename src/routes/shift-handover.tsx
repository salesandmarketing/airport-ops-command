import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { ArrowRightLeft, FileText, Users } from "lucide-react";

export const Route = createFileRoute("/shift-handover")({
  head: () => ({ meta: [{ title: "Shift Handover — HIA SCADA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Operator Continuity" title="Shift Handover Reference" description="Structured handover ensuring zero loss of operational context between outgoing and incoming SCADA operators.">
        <Tag tone="info">Template v6</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Outgoing → Incoming" className="lg:col-span-2" action={<ArrowRightLeft className="h-4 w-4 text-primary"/>}>
          <ol className="space-y-3 text-sm list-decimal list-inside">
            <li>Walkthrough of active alarms with severity and ownership</li>
            <li>Open work orders, isolations and lock-outs in effect</li>
            <li>Equipment running outside normal configuration</li>
            <li>Forecast events: weather, peak banks, planned maintenance</li>
            <li>Pending vendor calls, escalations and incident bridges</li>
            <li>Outstanding shift journal entries — sign-off both operators</li>
          </ol>
        </Panel>
        <Panel title="On-Duty Crew" action={<Users className="h-4 w-4 text-primary"/>}>
          <ul className="text-sm space-y-2 mono">
            <li className="flex justify-between"><span>Lead Operator</span><span className="text-primary">M. AL-RASHID</span></li>
            <li className="flex justify-between"><span>Operator 1</span><span className="text-primary">A. NASSAR</span></li>
            <li className="flex justify-between"><span>Operator 2</span><span className="text-primary">F. AHMED</span></li>
            <li className="flex justify-between"><span>Duty Engineer</span><span className="text-primary">S. CHEN</span></li>
            <li className="flex justify-between"><span>Ops Manager</span><span className="text-primary">K. THOMPSON</span></li>
          </ul>
        </Panel>
      </section>
      <section className="px-6 lg:px-10 pb-10">
        <Panel title="Handover Note · Shift A → Shift B" action={<FileText className="h-4 w-4 text-primary"/>}>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><b className="text-warn">CHWP-03 VFD</b> running with elevated drive temperature — switch to CHWP-04 within 4h. Maintenance ticket #INC-44218 raised.</p>
            <p><b className="text-crit">Fuel hydrant P-7</b> showing pressure deviation; isolated upstream. Fuel ops on-site, do not re-energise without approval.</p>
            <p><b className="text-warn">CRAC-12 Hall B</b> humidifier suspect — run on units 11/13 with higher airflow until parts arrive.</p>
            <p><b className="text-ok">Generator-04</b> weekly load test completed at 02:21, no findings.</p>
            <p><b className="text-primary">Forecast 14:00</b> demand 49.1 MW. Pre-cool Zone B from 12:30 per energy plan EM-22.</p>
          </div>
        </Panel>
      </section>
    </div>
  ),
});
