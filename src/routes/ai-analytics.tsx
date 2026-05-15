import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel, Tag } from "@/components/scada/Primitives";
import { Brain, Sparkles, TrendingDown, Zap } from "lucide-react";

export const Route = createFileRoute("/ai-analytics")({
  head: () => ({ meta: [{ title: "AI Analytics — HIA SCADA" }] }),
  component: () => (
    <div>
      <PageHeader eyebrow="AI Operations" title="AI Operational Analytics" description="Self-learning models continuously optimise energy, cooling, occupancy and alarm prioritisation across HIA infrastructure.">
        <Tag tone="info">12 models live</Tag>
      </PageHeader>
      <section className="px-6 lg:px-10 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {i:Brain,t:"Predictive Maintenance",d:"Vibration, electrical and process pattern fusion forecasting failure 4–72h ahead."},
          {i:TrendingDown,t:"Energy Optimisation",d:"Reinforcement learning agent reducing chiller plant kW/RT by 6–9% during peak."},
          {i:Sparkles,t:"Occupancy Prediction",d:"Computer-vision feed from concourses driving HVAC + lighting setpoint trim."},
          {i:Zap,t:"Alarm Prioritisation",d:"NLP + correlation engine collapses cascades to root cause within seconds."},
          {i:Brain,t:"Carbon Optimisation",d:"Carbon-aware scheduling for non-critical loads against grid intensity."},
          {i:Brain,t:"Failure Forecasting",d:"Survival models on critical assets producing time-to-failure with confidence."},
          {i:Brain,t:"Chiller Selection",d:"Model-predictive control selects chiller mix minimising kW/RT under forecast."},
          {i:Brain,t:"Anomaly Detection",d:"Unsupervised models flag deviations 11× faster than fixed-threshold alarms."},
        ].map(({i:Icon,t,d})=>(
          <Panel key={t} title={t}>
            <Icon className="h-6 w-6 text-primary mb-2"/>
            <p className="text-sm text-muted-foreground">{d}</p>
          </Panel>
        ))}
      </section>
    </div>
  ),
});
