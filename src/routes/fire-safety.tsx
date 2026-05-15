import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";

export const Route = createFileRoute("/fire-safety")({
  head: () => ({ meta: [{ title: "Fire & Life Safety — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "Fire Detection · Suppression · L&LS",
    title: "Fire & Life Safety Systems",
    description: "Addressable fire alarm, FM-200 / pre-action sprinkler suppression, jet fan ventilation and emergency communication — all monitored and supervised through the integrated graphics interface.",
    stats: [
      { label: "Active Zones", value: "1 248", status: "ok" },
      { label: "Disabled", value: "6", status: "warn", hint: "Maintenance" },
      { label: "Pump Pressure", value: "9.4", unit: "bar", status: "ok" },
      { label: "Tank Level", value: "92", unit: "%", status: "ok" },
      { label: "FM-200 Banks", value: "14 / 14", status: "ok" },
      { label: "PA/VA Health", value: "OK", status: "ok" },
    ],
    monitoring: [
      "Loop integrity and per-device polling",
      "Smoke / heat detector status and pre-alarm thresholds",
      "Sprinkler header pressure and flow switches",
      "Fire pump status — duty / standby / diesel",
      "FM-200 cylinder pressure & discharge readiness",
      "Jet fan and smoke extraction operation",
      "PA/VA broadcast and amplifier health",
      "Door release and stair pressurisation",
    ],
    setpoints: [
      { tag: "FIRE.PUMP.PRESS", normal: "9 – 10 bar", warn: "≤ 8.5 bar", crit: "≤ 7 bar (auto-start)" },
      { tag: "FIRE.TANK.LVL", normal: "≥ 90 %", warn: "≤ 85 %", crit: "≤ 70 %" },
      { tag: "SMOKE.DET.OBS", normal: "< 1.5 %/m", warn: "≥ 2.5 %/m", crit: "≥ 3.5 %/m (alarm)" },
      { tag: "FM200.CYL.PRESS", normal: "24.8 bar @ 21°C", warn: "≤ 22 bar", crit: "≤ 20 bar" },
      { tag: "FM200.DISCH.DLY", normal: "30 s", warn: "Override engaged", crit: "Manual abort" },
      { tag: "PA.AMP.FAULT", normal: "0", warn: "≥ 1", crit: "≥ 3 zones" },
    ],
    responsibilities: [
      "Acknowledge supervisory alerts within 3 minutes",
      "Coordinate hot work permits with disabled zones",
      "Verify weekly fire pump churn test",
      "Confirm FM-200 readiness in critical rooms",
      "Maintain panel access log and isolation register",
    ],
    failures: [
      "Loop short / open after building works",
      "Detector contamination — false pre-alarms",
      "Diesel pump failure to start on weekly test",
      "PA amplifier fault in concourse zone",
      "Door release relay sticking",
    ],
    emergency: [
      "Acknowledge zone — verify with CCTV and on-site staff",
      "Notify Airport Fire Services and Duty Manager",
      "Initiate phased evacuation per zone strategy",
      "Confirm smoke extraction and jet fans engaged",
      "Halt baggage and HVAC handover for affected zone",
      "Maintain command bridge until standdown",
    ],
    philosophy: "Cause-and-effect matrix executed by the addressable panel with cross-zone interlocks. SCADA mirrors panel state for situational awareness only — never overrides life-safety logic.",
  }} />,
});
