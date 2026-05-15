import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Operations Team — HIA SCADA" }] }),
  component: () => {
    const TEAM = [
      { n: "K. Thompson", r: "Head of Integrated Operations", e: "L4" },
      { n: "S. Chen", r: "Duty Engineer (Energy)", e: "L4" },
      { n: "M. Al-Rashid", r: "Lead SCADA Operator", e: "L4" },
      { n: "A. Nassar", r: "Lead SCADA Operator", e: "L3" },
      { n: "F. Ahmed", r: "Lead SCADA Operator", e: "L3" },
      { n: "S. Park", r: "Systems Operator", e: "L2" },
      { n: "R. Iqbal", r: "Systems Operator", e: "L2" },
      { n: "L. Costa", r: "Systems Operator", e: "L2" },
    ];
    return (
      <div>
        <PageHeader eyebrow="People" title="Integrated Operations Team" description="The 24/7 SCADA operations crew responsible for keeping HIA's critical infrastructure online.">
          <Tag tone="info">3-shift rotation</Tag>
        </PageHeader>
        <section className="px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM.map(p => (
            <Panel key={p.n} title={p.e}>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/15 grid place-items-center text-primary mono">{p.n.split(" ").map(s=>s[0]).join("")}</div>
                <div>
                  <div className="font-medium">{p.n}</div>
                  <div className="text-xs text-muted-foreground">{p.r}</div>
                </div>
              </div>
            </Panel>
          ))}
        </section>
        <section className="px-6 lg:px-10 pb-12">
          <Panel title="Contact the Operations Centre" accent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mono">
              <div className="rounded border border-border bg-background/40 p-3"><div className="text-muted-foreground text-[10px] uppercase tracking-widest">IOC Desk</div>+974 4010-4444</div>
              <div className="rounded border border-border bg-background/40 p-3"><div className="text-muted-foreground text-[10px] uppercase tracking-widest">Email</div>ioc@hamadairport.qa</div>
              <div className="rounded border border-border bg-background/40 p-3"><div className="text-muted-foreground text-[10px] uppercase tracking-widest">Location</div>Energy Centre · Level 2</div>
            </div>
          </Panel>
        </section>
      </div>
    );
  },
});
