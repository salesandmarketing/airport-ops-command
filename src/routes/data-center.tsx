import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";
import img from "@/assets/data-center.jpg";

export const Route = createFileRoute("/data-center")({
  head: () => ({ meta: [{ title: "Data Center Operations — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "Tier IV · Data Hall A & B",
    title: "Data Center Operations",
    description: "Mission-critical airport data halls hosting AODB, FIDS, BHS controllers and SCADA historians — fully redundant power, cooling and network infrastructure with continuous environmental monitoring.",
    image: img,
    imageAlt: "Modern data center hot aisle with glowing blue racks",
    stats: [
      { label: "Hall A Temp", value: "22.4", unit: "°C", status: "ok" },
      { label: "Hall B Temp", value: "23.1", unit: "°C", status: "ok" },
      { label: "Avg RH", value: "47", unit: "%", status: "ok" },
      { label: "UPS Load", value: "41", unit: "%", status: "ok", hint: "Bank A · N+1" },
      { label: "PUE 24h", value: "1.34", status: "ok" },
      { label: "CRAC Online", value: "11 / 12", status: "warn", hint: "CRAC-12 RH alert" },
    ],
    monitoring: [
      "CRAC unit supply / return temperature & humidity",
      "Cold aisle vs hot aisle differential",
      "UPS bank load, battery voltage, runtime remaining",
      "Dual feed availability (Feed A / Feed B)",
      "Generator readiness and ATS position",
      "VESDA early smoke detection and FM-200 status",
      "Rack-level inlet temperature (top/middle/bottom)",
      "Leak detection cables under raised floor",
    ],
    setpoints: [
      { tag: "DH.HALL.TEMP", normal: "20 – 24 °C", warn: "≥ 26 °C", crit: "≥ 28 °C" },
      { tag: "DH.HALL.RH", normal: "40 – 55 %", warn: "< 35 / > 60", crit: "< 30 / > 65" },
      { tag: "UPS.BAT.VOLT", normal: "≥ 540 V", warn: "≤ 520 V", crit: "≤ 500 V" },
      { tag: "UPS.LOAD", normal: "≤ 65 %", warn: "≥ 75 %", crit: "≥ 85 %" },
      { tag: "VESDA.SMOKE", normal: "< 0.05 %obs/m", warn: "≥ 0.08", crit: "≥ 0.15 (Pre-Action)" },
      { tag: "ATS.POSITION", normal: "Utility", warn: "Transfer", crit: "Genset > 60s" },
    ],
    responsibilities: [
      "Verify CRAC redundancy each shift — N+1 minimum",
      "Cross-check UPS bypass / static switch state",
      "Audit dual-feed status across all critical racks",
      "Review VESDA alert log every 4 hours",
      "Coordinate any maintenance with airport IT change board",
    ],
    failures: [
      "CRAC compressor short-cycle on low pressure",
      "Humidifier overflow — leak detection trip",
      "UPS rectifier fault — automatic bypass to static",
      "Battery string imbalance — flagged by BMS health",
      "Network spine fan failure on core switch",
    ],
    emergency: [
      "Acknowledge VESDA pre-alert and mute audible",
      "Confirm fire panel zone — initiate Stage-1 hold",
      "Notify Airport IT NOC and Duty Engineer",
      "If FM-200 discharge required — confirm 30s evac countdown",
      "Verify ATS transfer to generator and stable bus voltage",
      "Log event and prepare incident report within 30 minutes",
    ],
    philosophy: "Tier IV concurrent maintainability with 2N power and N+1 cooling. CRAC units operate in lead/lag with ESP-controlled fans matched to IT load. UPS feeds isolated A/B paths to dual-corded equipment. All control loops monitored by BMS with secondary SCADA historian.",
  }} />,
});
