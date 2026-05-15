import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/scada/SystemPage";
import img from "@/assets/baggage.jpg";

export const Route = createFileRoute("/baggage")({
  head: () => ({ meta: [{ title: "Baggage Handling System — HIA SCADA" }] }),
  component: () => <SystemPage spec={{
    eyebrow: "BHS · ICS · Sortation",
    title: "Baggage Handling System Operations",
    description: "High-speed sortation with EDS inline screening, RFID tracking, and PLC-controlled conveyor networks across check-in, transfer and make-up.",
    image: img,
    imageAlt: "Automated airport baggage handling conveyor system",
    stats: [
      { label: "Throughput", value: "11 240", unit: "bag/h", status: "ok" },
      { label: "Sortation Acc.", value: "99.83", unit: "%", status: "ok" },
      { label: "Active Faults", value: "2", status: "warn", hint: "T2-S08 motor" },
      { label: "RFID Read", value: "98.4", unit: "%", status: "ok" },
      { label: "EDS Reject", value: "0.42", unit: "%", status: "ok" },
      { label: "PLC Comm", value: "OK", status: "ok", hint: "All nodes" },
    ],
    monitoring: [
      "Conveyor speed and motor current per zone",
      "Jam detection and emergency stop status",
      "RFID/Barcode read accuracy per scanner",
      "Inline EDS machine throughput and reject queue",
      "High-speed sorter divert success rate",
      "Make-up carousel utilisation",
      "PLC heartbeat and Profibus/Ethernet/IP health",
      "Maintenance & manual mode status per cell",
    ],
    setpoints: [
      { tag: "BHS.MOT.CUR", normal: "≤ 70 % FLA", warn: "≥ 85 %", crit: "≥ 95 % (trip)" },
      { tag: "BHS.JAM.TIMER", normal: "0", warn: "≥ 8 s", crit: "≥ 15 s (estop)" },
      { tag: "BHS.RFID.READ", normal: "≥ 98 %", warn: "≤ 96 %", crit: "≤ 92 %" },
      { tag: "EDS.QUEUE", normal: "≤ 20 bags", warn: "≥ 35", crit: "≥ 50" },
      { tag: "SORTER.MISSORT", normal: "≤ 0.2 %", warn: "≥ 0.5 %", crit: "≥ 1.0 %" },
      { tag: "BHS.PLC.HB", normal: "< 200 ms", warn: "≥ 500 ms", crit: "Lost > 2 s" },
    ],
    responsibilities: [
      "Monitor flight allocations and adjust sortation rules",
      "Coordinate with airline GHS during peak banks",
      "Acknowledge faults and dispatch BHS maintenance",
      "Track manual encoding rate and root causes",
      "Confirm EDS Level-3 inspection process status",
    ],
    failures: [
      "Motor overload — drive trip on sorter spur",
      "Photo-eye contamination causing false jams",
      "RFID tag damage — fallback to barcode",
      "EDS conveyor desynchronisation",
      "Profinet ring break — partial PLC island",
    ],
    emergency: [
      "Acknowledge fault and identify zone on HMI",
      "Activate bypass route if available",
      "Notify airline operations of impact",
      "Coordinate manual encoding for affected flights",
      "Reset only after maintenance lockout cleared",
      "Log timestamps and bag count for SLA reporting",
    ],
    philosophy: "Distributed PLC architecture with ring topology. Sortation rules driven by AODB feed; ICS provides redundant tracking via RFID and barcode. Each cell fail-safes to last-known-good state.",
  }} />,
});
