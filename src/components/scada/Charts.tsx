import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const axis = { stroke: "oklch(0.55 0.03 230)", fontSize: 10 };
const grid = { stroke: "oklch(0.32 0.04 240 / 0.4)" };

export function TrendArea({ data, dataKey = "value", color = "var(--primary)" }: { data: any[]; dataKey?: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id={`a-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...grid} strokeDasharray="3 3" />
        <XAxis dataKey="t" {...axis} />
        <YAxis {...axis} />
        <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#a-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({ data, keys }: { data: any[]; keys: { key: string; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid {...grid} strokeDasharray="3 3" />
        <XAxis dataKey="t" {...axis} />
        <YAxis {...axis} />
        <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} />
        {keys.map((k) => <Line key={k.key} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={2} dot={false} />)}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarTrend({ data, color = "var(--chart-2)" }: { data: any[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid {...grid} strokeDasharray="3 3" />
        <XAxis dataKey="t" {...axis} />
        <YAxis {...axis} />
        <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} />
        <Bar dataKey="value" fill={color} radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Generators
export function genSeries(n: number, base: number, amp: number, label = (i:number)=>`${i}`) {
  return Array.from({ length: n }, (_, i) => ({
    t: label(i),
    value: +(base + Math.sin(i / 2) * amp + (Math.random() - 0.5) * amp * 0.6).toFixed(2),
  }));
}
