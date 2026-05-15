import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";

export const Route = createFileRoute("/facility")({
  head: () => ({ meta: [{ title: "Airport Facility Systems — HIA SCADA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="Facility & Airside" title="Airport Facility Systems" description="Cross-domain visibility into HVAC, lifts/escalators, hangars, GPU/PCA, and ground support systems integrated to SCADA.">
        <Tag tone="info">Cross-domain</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {t:"Lifts & Escalators",d:"Live status, fault polling, planned isolation register and maintenance KPIs across all terminal vertical transport."},
          {t:"Hangar Door Automation",d:"PLC-driven door sequences with safety interlocks and weather-aware operation."},
          {t:"Ground Power & PCA",d:"Per-stand monitoring of GPU and pre-conditioned air units with utilisation analytics."},
          {t:"Compressed Air",d:"Plant pressure, dew-point, header redundancy, and demand-based compressor staging."},
          {t:"Crane & Maintenance Equipment",d:"Crane access permits, runway crane interlocks, and condition monitoring."},
          {t:"CCTV Analytics",d:"Edge analytics for crowd density, perimeter intrusion, abandoned object detection."},
        ].map(c=>(
          <Panel key={c.t} title={c.t}><p className="text-sm text-muted-foreground">{c.d}</p></Panel>
        ))}
      </section>
    </div>
  ),
});
