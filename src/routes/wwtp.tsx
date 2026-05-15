import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";

export const Route = createFileRoute("/wwtp")({
  head: () => ({ meta: [{ title: "WWTP Operations — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "Wastewater Treatment Plant",
    title: "WWTP Operations & Process Control",
    description: "On-site activated sludge treatment plant serving HIA — full SCADA monitoring from inlet screens through MBR and chlorination, with treated effluent reused for irrigation and cooling tower make-up.",
    stats: [
      { label: "Inlet Flow", value: "412", unit: "m³/h", status: "ok" },
      { label: "pH", value: "7.2", status: "ok" },
      { label: "DO Aeration", value: "4.1", unit: "mg/L", status: "warn", hint: "Setpoint 2.5" },
      { label: "Turbidity Out", value: "1.8", unit: "NTU", status: "ok" },
      { label: "Cl₂ Residual", value: "0.6", unit: "mg/L", status: "ok" },
      { label: "Sludge Age", value: "11", unit: "days", status: "ok" },
    ],
    monitoring: [
      "Inlet flow, pH, conductivity, temperature",
      "Aeration tank DO, MLSS, ORP",
      "MBR transmembrane pressure & permeate flow",
      "Chlorine dosing rate and residual",
      "Sludge blanket level in clarifiers",
      "Effluent turbidity, BOD, COD analyzers",
      "Pump VFD speeds and motor currents",
      "Reject water tank levels and storm bypass",
    ],
    setpoints: [
      { tag: "WWTP.INLET.PH", normal: "6.5 – 8.0", warn: "< 6.2 / > 8.4", crit: "< 5.8 / > 9.0" },
      { tag: "WWTP.AER.DO", normal: "2.0 – 3.0 mg/L", warn: "< 1.5 / > 4.0", crit: "< 1.0 / > 5.0" },
      { tag: "WWTP.TMP", normal: "≤ 0.4 bar", warn: "≥ 0.55 bar", crit: "≥ 0.7 bar" },
      { tag: "WWTP.OUT.TURB", normal: "≤ 2 NTU", warn: "≥ 3.5 NTU", crit: "≥ 5 NTU" },
      { tag: "WWTP.CL2.RES", normal: "0.5 – 1.0 mg/L", warn: "< 0.3 / > 1.5", crit: "< 0.2 / > 2.0" },
      { tag: "WWTP.MLSS", normal: "3 500 – 4 500 mg/L", warn: "< 3 000 / > 5 000", crit: "< 2 500 / > 6 000" },
    ],
    responsibilities: [
      "Log process values hourly and validate against lab samples",
      "Manage blower staging based on DO setpoint",
      "Initiate CIP cycles for MBR per OEM schedule",
      "Coordinate sludge tanker dispatch when WAS > 80%",
      "Verify chlorine dosing and replace cylinders safely",
    ],
    failures: [
      "Blower fault causing DO crash — risk of filamentous bulking",
      "MBR fouling — TMP spike requires CIP",
      "Inlet pump trip — wet well overflow risk",
      "Chlorine analyzer drift — cross-check with DPD test",
      "ORP probe coating — false alarms",
    ],
    emergency: [
      "Acknowledge alarm and identify affected stream",
      "Switch to standby blower/pump via SCADA",
      "Activate storm bypass only with Plant Manager approval",
      "Notify Environmental Compliance if effluent > permit",
      "Initiate manual chlorination if analyzer fails",
      "Log full event chronology for regulator submission",
    ],
    philosophy: "PLC-driven process with cascade control on aeration DO, ratio control on chemical dosing, and adaptive CIP scheduling on MBR. Effluent quality enforced by triple-redundant turbidity instruments before reuse distribution.",
  }} />,
});
