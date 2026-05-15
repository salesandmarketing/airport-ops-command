import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";
import img from "@/assets/runway-lights.jpg";

export const Route = createFileRoute("/airfield-lighting")({
  head: () => ({ meta: [{ title: "Airfield Lighting — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "Airfield Ground Lighting · CCMS",
    title: "Airfield Lighting Control & Monitoring",
    description: "Constant Current Regulators and series lighting circuits for runways, taxiways, and approach lighting — interfaced via CCMS to ATC tower with full lamp-failure detection.",
    image: img,
    imageAlt: "Airport runway at night with brilliant cyan edge lighting",
    stats: [
      { label: "RWY 16L/34R", value: "ON", status: "ok", hint: "Step 4 · 6.6A" },
      { label: "RWY 16R/34L", value: "ON", status: "ok", hint: "Step 3 · 5.5A" },
      { label: "Approach Lights", value: "CAT III", status: "ok" },
      { label: "Lamp Failures", value: "3", status: "warn", hint: "Within tolerance" },
      { label: "CCR Online", value: "42 / 42", status: "ok" },
      { label: "Vault Power", value: "DUAL", status: "ok" },
    ],
    monitoring: [
      "CCR output current per circuit (5 brightness steps)",
      "Series circuit insulation resistance (megger)",
      "Individual lamp failure detection via ILCMS",
      "ATC commands and brightness step changes",
      "Vault transformer winding temperatures",
      "UPS readiness for AGL critical circuits",
      "Photocell ambient lux for auto operation",
      "Generator standby readiness for vaults",
    ],
    setpoints: [
      { tag: "CCR.STEP5.CUR", normal: "6.6 A ± 1 %", warn: "± 3 %", crit: "± 5 %" },
      { tag: "CCR.INSUL.RES", normal: "≥ 50 MΩ", warn: "≤ 20 MΩ", crit: "≤ 5 MΩ" },
      { tag: "AGL.LAMP.FAIL", normal: "≤ 5 lamps", warn: "≥ 6", crit: "≥ 10 (CAT III limit)" },
      { tag: "VAULT.TEMP", normal: "≤ 35 °C", warn: "≥ 40 °C", crit: "≥ 45 °C" },
      { tag: "AGL.UPS.RUN", normal: "≥ 60 min", warn: "≤ 30 min", crit: "≤ 10 min" },
      { tag: "AGL.PHOTO.LUX", normal: "Auto", warn: "Sensor fault", crit: "Manual override > 4h" },
    ],
    responsibilities: [
      "Confirm ATC brightness commands match HMI",
      "Pre-arrival check of CAT II/III readiness during LVP",
      "Coordinate runway closures with airfield maintenance",
      "Verify lamp failure trends — schedule replacement",
      "Test AGL UPS transfer monthly with airfield ops",
    ],
    failures: [
      "Series circuit open — CCR drops to standby",
      "Cable insulation breakdown after rain — earth fault",
      "Isolating transformer failure — single lamp out",
      "CCR thyristor module failure — step jump",
      "Photocell drift causing premature switching",
    ],
    emergency: [
      "Notify ATC immediately on any RWY circuit loss",
      "Switch to standby CCR via CCMS interlock",
      "Initiate manual override only with ATC permission",
      "Dispatch airfield electrician under escort",
      "Log NOTAM-relevant outage time precisely",
      "Coordinate with LVP procedure if CAT III affected",
    ],
    philosophy: "Each circuit fed by redundant CCR with hot-standby. Vaults dual-fed from independent substations. CCMS provides selective brightness to ATC across 5 steps with automatic regulation against ambient illumination.",
  }} />,
});
