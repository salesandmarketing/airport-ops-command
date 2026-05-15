import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Panel({ title, action, children, className = "", accent = false }: {
  title?: string; action?: ReactNode; children: ReactNode; className?: string; accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`glass-panel relative overflow-hidden ${accent ? "glow-border" : ""} ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/30">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mono">{title}</h3>
          </div>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

export function Stat({ label, value, unit, status = "ok", hint }: {
  label: string; value: string | number; unit?: string;
  status?: "ok" | "warn" | "crit" | "muted"; hint?: string;
}) {
  const color =
    status === "ok" ? "text-ok" :
    status === "warn" ? "text-warn" :
    status === "crit" ? "text-crit" : "text-muted-foreground";
  return (
    <div className="rounded-md border border-border bg-background/40 p-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mono">
        <span>{label}</span>
        <span className={`pulse-dot`} style={{ background: `var(--${status === "muted" ? "muted-foreground" : status})`, color: `var(--${status === "muted" ? "muted-foreground" : status})` }} />
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className={`text-2xl font-semibold mono ${color}`}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground mono">{unit}</span>}
      </div>
      {hint && <div className="text-[10px] text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}

export function Tag({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "ok" | "warn" | "crit" }) {
  const map = {
    info: "bg-primary/10 text-primary border-primary/30",
    ok: "bg-ok/10 text-ok border-ok/30",
    warn: "bg-warn/10 text-warn border-warn/30",
    crit: "bg-crit/10 text-crit border-crit/30",
  } as const;
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] uppercase tracking-widest mono ${map[tone]}`}>{children}</span>;
}

export function PageHeader({ eyebrow, title, description, children }: {
  eyebrow?: string; title: string; description?: string; children?: ReactNode;
}) {
  return (
    <div className="relative border-b border-border bg-panel/30 grid-bg">
      <div className="px-6 lg:px-10 py-8 lg:py-12 flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
        <div className="max-w-3xl">
          {eyebrow && <div className="text-[11px] uppercase tracking-[0.25em] text-primary mono mb-3">{eyebrow}</div>}
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight glow-text">{title}</h1>
          {description && <p className="mt-3 text-muted-foreground max-w-2xl">{description}</p>}
        </div>
        {children && <div className="flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
}

export function GaugeRing({ value, max = 100, label, unit, status = "ok" }: {
  value: number; max?: number; label: string; unit?: string; status?: "ok" | "warn" | "crit";
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = 42; const c = 2 * Math.PI * r;
  const color = `var(--${status})`;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 110 110" className="w-28 h-28">
        <defs>
          <linearGradient id={`g-${label}`} x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} stroke="var(--border)" strokeWidth="8" fill="none" />
        <circle
          cx="55" cy="55" r={r}
          stroke={`url(#g-${label})`} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 55 55)"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="55" y="52" textAnchor="middle" className="mono" fill="currentColor" fontSize="18" fontWeight="600">{value}</text>
        <text x="55" y="68" textAnchor="middle" className="mono" fill="var(--muted-foreground)" fontSize="9">{unit}</text>
      </svg>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mono">{label}</div>
    </div>
  );
}
