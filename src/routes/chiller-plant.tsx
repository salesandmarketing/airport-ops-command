import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";
import img from "@/assets/chiller-plant.jpg";

export const Route = createFileRoute("/chiller-plant")({
  head: () => ({ meta: [{ title: "District Cooling & Chiller Plant — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "District Cooling · CCP-01",
    title: "District Cooling & Chiller Plant SCADA",
    description: "Centralised chilled water production for the entire HIA terminal complex — 14 water-cooled centrifugal chillers feeding the secondary distribution network through the energy centre.",
    image: img,
    imageAlt: "Industrial chiller plant with blue piping",
    stats: [
      { label: "Total Capacity", value: "44 800", unit: "RT", status: "ok" },
      { label: "Active Chillers", value: "12 / 14", status: "ok", hint: "CH-13 standby · CH-14 maint." },
      { label: "Plant kW/RT", value: "0.61", status: "ok", hint: "Design 0.65" },
      { label: "CHWS Temp", value: "6.1", unit: "°C", status: "ok" },
      { label: "CHWR Temp", value: "11.9", unit: "°C", status: "ok" },
      { label: "Diff. Pressure", value: "3.2", unit: "bar", status: "ok" },
    ],
    monitoring: [
      "Chilled water supply / return temperature per chiller",
      "Condenser water inlet / outlet temperature",
      "Differential pressure across primary / secondary loop",
      "Chiller compressor amperage and bearing vibration",
      "Cooling tower fan speed and basin level",
      "CHWP / CWP variable speed drive frequency and torque",
      "Approach temperature and refrigerant pressures",
      "Plant thermal load (RT) and instantaneous COP",
    ],
    setpoints: [
      { tag: "CCP01.CHWS.TEMP", normal: "5.5 – 7.0 °C", warn: "≥ 8.5 °C", crit: "≥ 9.5 °C" },
      { tag: "CCP01.CHWR.TEMP", normal: "11 – 13 °C", warn: "≥ 14 °C", crit: "≥ 15.5 °C" },
      { tag: "CCP01.DP.SEC", normal: "2.5 – 4.0 bar", warn: "< 2.0 / > 4.5", crit: "< 1.5 / > 5.0" },
      { tag: "CHILLER.OIL.PRESS", normal: "180 – 220 kPa", warn: "< 160 kPa", crit: "< 140 kPa" },
      { tag: "COND.APPROACH", normal: "≤ 2.5 K", warn: "≥ 3.5 K", crit: "≥ 4.5 K" },
      { tag: "CT.BASIN.LVL", normal: "70 – 90 %", warn: "< 60 / > 95", crit: "< 50 / > 98" },
    ],
    responsibilities: [
      "Verify chiller staging matches load forecast every shift",
      "Monitor approach temperatures — early indicator of fouling",
      "Inspect VFD trends for abnormal harmonics or trips",
      "Coordinate condenser water treatment dosing with maintenance",
      "Log COP / kW/RT every two hours during peak demand",
      "Initiate pre-cooling sequence prior to demand peaks",
    ],
    failures: [
      "Chiller surge from condenser high pressure",
      "CHWP VFD trip on overcurrent or DC bus over-volt",
      "Cooling tower fan VFD failure during ambient peak",
      "Refrigerant low charge — slow temperature creep",
      "Sensor drift on CHWS — verify with handheld",
    ],
    emergency: [
      "Confirm alarm priority and acknowledge on SCADA HMI",
      "Cross-check with BMS comfort temperatures across terminal zones",
      "Stage standby chiller (CH-13) — verify sequence completion",
      "If trip cascade > 2 chillers — escalate to Energy Duty Engineer",
      "Activate load shedding plan B (non-essential AHUs) if DP < 1.5 bar",
      "Log event with timestamps in SCADA event journal",
    ],
    philosophy: "Plant operates in lead/lag/standby with optimum start sequencing driven by predicted load. Secondary loop uses ΔP-controlled VSD pumps maintaining constant DP across critical risers. Chiller selection minimises kW/RT through equal run-hours and condenser water reset.",
  }} />,
});
