import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, Radio, Layers, Plane, Cpu, Droplets, Flame, Database,
  Zap, Wind, Lightbulb, Package, Brain, ShieldAlert, BookOpen, Users, Gauge,
  Server, Network, ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { group: "Overview", items: [
    { to: "/", label: "Mission Control", icon: Gauge },
    { to: "/control-room", label: "Control Room", icon: Radio },
    { to: "/daily-operations", label: "Daily Operations", icon: Activity },
    { to: "/shift-handover", label: "Shift Handover", icon: Users },
  ]},
  { group: "Critical Systems", items: [
    { to: "/systems", label: "Systems Overview", icon: Layers },
    { to: "/energy", label: "Energy Management", icon: Zap },
    { to: "/chiller-plant", label: "District Cooling", icon: Wind },
    { to: "/data-center", label: "Data Center", icon: Server },
    { to: "/wwtp", label: "WWTP Operations", icon: Droplets },
    { to: "/airfield-lighting", label: "Airfield Lighting", icon: Lightbulb },
    { to: "/baggage", label: "Baggage Handling", icon: Package },
    { to: "/fire-safety", label: "Fire & Life Safety", icon: Flame },
    { to: "/facility", label: "Facility Systems", icon: Plane },
  ]},
  { group: "Response & Intelligence", items: [
    { to: "/alarms", label: "Alarm Management", icon: AlertTriangle },
    { to: "/emergency", label: "Emergency Response", icon: ShieldAlert },
    { to: "/predictive", label: "Predictive Maintenance", icon: Cpu },
    { to: "/ai-analytics", label: "AI Analytics", icon: Brain },
    { to: "/architecture", label: "SCADA Architecture", icon: Network },
    { to: "/training", label: "Training & SOP", icon: BookOpen },
    { to: "/team", label: "Operations Team", icon: Database },
  ]},
];

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return t;
}

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const t = useClock();
  const utc = t.toUTCString().split(" ").slice(4, 5)[0];
  const local = t.toLocaleTimeString("en-GB");

  return (
    <div className="min-h-screen flex w-full text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-md bg-primary/10 grid place-items-center glow-border">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">HIA · SCADA</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Operations Portal</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="px-2 mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{g.group}</div>
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const active = path === it.to;
                  const Icon = it.icon;
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        className={`group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-all
                          ${active
                            ? "bg-primary/15 text-primary glow-border"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                      >
                        <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                        <span className="flex-1 truncate">{it.label}</span>
                        {active && <ChevronRight className="h-3.5 w-3.5 text-primary" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4 text-[11px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-2"><span className="pulse-dot text-ok" style={{ background: "var(--ok)" }} /> SCADA Server A · ONLINE</div>
          <div className="flex items-center gap-2"><span className="pulse-dot text-ok" style={{ background: "var(--ok)" }} /> SCADA Server B · STANDBY</div>
          <div className="flex items-center gap-2"><span className="pulse-dot text-warn" style={{ background: "var(--warn)" }} /> Historian Sync · 98.7%</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top status bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 lg:px-8 h-14">
            <div className="flex items-center gap-3 min-w-0">
              <div className="lg:hidden h-8 w-8 rounded-md bg-primary/10 grid place-items-center"><Plane className="h-4 w-4 text-primary"/></div>
              <div className="hidden md:flex items-center gap-2 text-xs mono text-muted-foreground">
                <span className="text-primary">●</span> OPS-NET LINK SECURE
                <span className="mx-2 text-border">|</span>
                <span>NODE: SCADA-PRI-01</span>
                <span className="mx-2 text-border">|</span>
                <span>SHIFT: NIGHT-B</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mono text-xs">
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-muted-foreground">DOH · LOCAL</span>
                <span className="text-foreground">{local}</span>
              </div>
              <div className="hidden md:flex flex-col items-end leading-tight">
                <span className="text-muted-foreground">UTC</span>
                <span className="text-foreground">{t.toISOString().slice(11,19)}</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-ok/10 text-ok border border-ok/30">
                <span className="pulse-dot" style={{ background: "var(--ok)", color: "var(--ok)"}} /> SYSTEM NOMINAL
              </div>
            </div>
          </div>
          {/* Alarm ticker */}
          <div className="border-t border-border bg-panel/40 overflow-hidden">
            <div className="flex items-center gap-3 px-3 h-8">
              <span className="shrink-0 mono text-[10px] uppercase tracking-widest text-warn flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3" /> Live Alarm Feed
              </span>
              <div className="overflow-hidden flex-1">
                <div className="ticker whitespace-nowrap mono text-[11px] text-muted-foreground">
                  {Array.from({length:2}).map((_,i)=>(
                    <span key={i}>
                      <span className="text-warn"> ● </span> CHWP-03 VFD HIGH TEMP 72°C [WARN] &nbsp;&nbsp;
                      <span className="text-ok"> ● </span> GEN-04 SYNC LOCK ACQUIRED [INFO] &nbsp;&nbsp;
                      <span className="text-crit"> ● </span> BHS T2-S08 MOTOR OVERLOAD [CRIT] &nbsp;&nbsp;
                      <span className="text-warn"> ● </span> CRAC-12 RH 62% UPPER LIMIT [WARN] &nbsp;&nbsp;
                      <span className="text-ok"> ● </span> UPS-A LOAD 41% RUNTIME 38m [OK] &nbsp;&nbsp;
                      <span className="text-warn"> ● </span> WWTP TURBIDITY 4.1 NTU TREND UP [WARN] &nbsp;&nbsp;
                      <span className="text-ok"> ● </span> CCR-RWY-16L 6.6A NOMINAL [OK] &nbsp;&nbsp;
                      <span className="text-crit"> ● </span> FUEL HYDRANT P-7 LEAK SUSPECTED [CRIT] &nbsp;&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

        <footer className="border-t border-border bg-panel/40 px-6 py-4 text-[11px] mono text-muted-foreground flex flex-wrap gap-4 justify-between">
          <span>© {new Date().getFullYear()} HAMAD INTERNATIONAL AIRPORT · INTEGRATED OPERATIONS · OTH-SCADA v8.4.2</span>
          <span>CLASSIFICATION: INTERNAL · OPS-CONTROL</span>
        </footer>
      </div>
    </div>
  );
}
