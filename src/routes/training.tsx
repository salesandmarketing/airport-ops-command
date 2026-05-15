import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { BookOpen, Award, Download, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({ meta: [{ title: "Training & SOP — HIA SCADA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Capability Programme" title="Operator Training & SOP Library" description="Structured competency programme — from induction through advanced fault simulation and certification renewal.">
        <Tag tone="info">42 modules</Tag>
        <Tag tone="ok">ICAO + IATA aligned</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Certification Path" className="lg:col-span-2" action={<GraduationCap className="h-4 w-4 text-primary"/>}>
          <ol className="space-y-3 text-sm">
            <li><b className="text-primary">Level 1 — Induction:</b> SCADA HMI navigation, alarm acknowledgement, communication protocol.</li>
            <li><b className="text-primary">Level 2 — Systems Operator:</b> BMS, EMS, fire panel, BHS oversight under supervision.</li>
            <li><b className="text-primary">Level 3 — Lead Operator:</b> Full-shift authority including escalation and emergency response.</li>
            <li><b className="text-primary">Level 4 — Trainer / Auditor:</b> Train new joiners, audit shift performance, drive RCA.</li>
            <li><b className="text-primary">Renewal:</b> Annual simulator-based assessment + biennial first-aid / fire warden.</li>
          </ol>
        </Panel>
        <Panel title="Recent Achievements" action={<Award className="h-4 w-4 text-warn"/>}>
          <ul className="text-sm space-y-2">
            <li>M. Al-Rashid — L4 Auditor</li>
            <li>A. Nassar — L3 Lead, July 2024</li>
            <li>F. Ahmed — L3 Lead, Nov 2024</li>
            <li>S. Park — L2 Sys Op, Jan 2025</li>
          </ul>
        </Panel>
      </section>
      <section className="px-6 lg:px-10 pb-12">
        <Panel title="SOP & Runbook Library" action={<BookOpen className="h-4 w-4 text-primary"/>}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm mono">
            {[
              "SOP-OPS-101 Daily Operator Duties",
              "SOP-OPS-102 Shift Handover Protocol",
              "SOP-CHW-001 Chiller Trip Response",
              "SOP-CHW-014 Pre-cool & DR",
              "SOP-UPS-004 Battery Failure",
              "SOP-UPS-007 Static Switch Bypass",
              "SOP-FIRE-002 FM-200 Discharge",
              "SOP-FIRE-005 Phased Evacuation",
              "SOP-AGL-007 RWY Circuit Loss",
              "SOP-BHS-013 Sorter Cascade Fault",
              "SOP-FUEL-005 Hydrant Leak",
              "SOP-WWTP-009 MBR CIP",
              "SOP-DC-003 CRAC Failover",
              "SOP-NET-002 Fiber Path B Failover",
              "SOP-PA-001 Mass Notification",
            ].map(s=>(
              <li key={s} className="flex items-center justify-between rounded border border-border bg-background/40 px-3 py-2">
                <span>{s}</span><Download className="h-3.5 w-3.5 text-primary"/>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </div>
  ),
});
