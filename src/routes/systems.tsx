import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/systems")({
  head: () => ({ meta: [{ title: "Systems Overview — HIA SCADA" }] }),
  component: Systems,
});

const GROUPS: { name: string; items: { name: string; to?: string; tag?: string }[] }[] = [
  { name: "Mechanical & HVAC", items: [
    { name: "District Cooling", to: "/chiller-plant" },
    { name: "Chiller Plants", to: "/chiller-plant" },
    { name: "HVAC & Air Handling Units (BMS)" },
    { name: "CRAC / Precision Cooling", to: "/data-center" },
    { name: "Compressed Air Systems" },
    { name: "Ventilation Control" },
  ]},
  { name: "Electrical", items: [
    { name: "Power Distribution & Backup", to: "/energy" },
    { name: "Generator Systems" },
    { name: "UPS & Critical Power" },
    { name: "High-capacity Transformers" },
    { name: "Generator Synchronisation" },
    { name: "Dual Power Feeds" },
  ]},
  { name: "Water & Wastewater", items: [
    { name: "WWTP", to: "/wwtp" },
    { name: "Booster Pumping Stations" },
    { name: "Drainage Pumping Stations" },
    { name: "Sewage Lift Stations" },
    { name: "Potable Water Network" },
    { name: "Fire Water Network" },
    { name: "Irrigation & Landscape" },
  ]},
  { name: "Airfield & Airside", items: [
    { name: "Runway Lighting", to: "/airfield-lighting" },
    { name: "Taxiway Lighting", to: "/airfield-lighting" },
    { name: "Approach Lighting", to: "/airfield-lighting" },
    { name: "Constant Current Regulators" },
    { name: "Airfield Electrical Vaults" },
    { name: "Hangar Door Automation" },
    { name: "Ground Power Units" },
    { name: "Pre-Conditioned Air (PCA)" },
  ]},
  { name: "Baggage & Passenger", items: [
    { name: "Baggage Handling System", to: "/baggage" },
    { name: "Inline Explosive Detection" },
    { name: "RFID Baggage Tracking" },
    { name: "High-speed Sorter PLCs" },
    { name: "Conveyor VFD Networks" },
    { name: "FIDS / Gate Assignment" },
    { name: "CUTE / CUSS" },
    { name: "Passenger Flow Monitoring" },
  ]},
  { name: "Safety & Security", items: [
    { name: "Fire Alarm & Suppression", to: "/fire-safety" },
    { name: "FM-200 Suppression", to: "/fire-safety" },
    { name: "Smoke Extraction & Jet Fans" },
    { name: "Access Control & CCTV" },
    { name: "Emergency Comms (PA/VA)" },
    { name: "Lift / Escalator Monitoring" },
  ]},
  { name: "Fuel", items: [
    { name: "Jet Fuel Hydrant System" },
    { name: "Fuel Farm Automation" },
    { name: "Leak Detection" },
    { name: "Pump Sequencing" },
    { name: "Tank Gauging" },
    { name: "Pipeline SCADA & ESD" },
  ]},
  { name: "Data Center & IT/OT", items: [
    { name: "Data Hall Monitoring", to: "/data-center" },
    { name: "Environmental Monitoring", to: "/data-center" },
    { name: "Redundant SCADA Servers", to: "/architecture" },
    { name: "Historians & Real-time Diagnostics", to: "/architecture" },
    { name: "Fiber Backbone & Failover", to: "/architecture" },
    { name: "Middleware & Airport Data Buses" },
  ]},
];

function Systems() {
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Systems Overview" description="Encyclopaedia of every monitored airport infrastructure system at HIA — from mechanical plants to airside lighting and IT/OT backbones.">
        <Tag tone="info">{GROUPS.reduce((a,g)=>a+g.items.length,0)} systems</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {GROUPS.map(g=>(
          <Panel key={g.name} title={g.name}>
            <ul className="space-y-1.5 text-sm">
              {g.items.map(it => (
                <li key={it.name}>
                  {it.to ? (
                    <Link to={it.to} className="group flex items-center justify-between rounded px-2 py-1.5 hover:bg-background/40">
                      <span className="text-foreground">{it.name}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary"/>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <span className="text-muted-foreground">{it.name}</span>
                      <Tag tone="info">SCADA</Tag>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </section>
    </div>
  );
}
