// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Fan, Lightbulb, Gauge, Thermometer, Zap, Cpu, CheckCircle } from "lucide-react";
// import { clients } from "../data/bmsData";

// function MetricRow({ label, value, tone = "default" }) {
//   const valueClass = tone === "healthy" ? "text-emerald-400" : "text-white";

//   return (
//     <div className="flex items-center justify-between border-b border-blue-900/30 py-3 text-sm">
//       <span className="font-semibold text-blue-200">{label}</span>
//       <strong className={`font-extrabold ${valueClass} text-base`}>{value}</strong>
//     </div>
//   );
// }

// function InstrumentPanel({ title, icon: Icon, children }) {
//   return (
//     <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
//       {/* Decorative metal panel top line */}
//       <div className="absolute top-0 inset-x-0 h-[3px] bg-[#004AAD]" />
      
//       <div>
//         <div className="flex items-center gap-3 mb-5 border-b border-blue-900/50 pb-3">
//           <div className="bg-[#05143C] p-2 border border-[#004AAD] rounded text-[#00E5FF]">
//             <Icon className="h-6 w-6" />
//           </div>
//           <h3 className="text-lg font-black tracking-widest uppercase">{title}</h3>
//         </div>
//         <div className="space-y-1">
//           {children}
//         </div>
//       </div>
      
//       <div className="mt-6 border-t border-blue-900/40 pt-3 flex items-center justify-between">
//         <span className="text-[9px] font-bold text-blue-300 uppercase">FEEDER TELEMETRY</span>
//         <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function ClientOverview() {
//   const { buildingId, floorId, clientId } = useParams();
//   const clientName = clients[Number(clientId) - 1] || "Client";

//   return (
//     <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               to={`/building/${buildingId}/floor/${floorId}`}
//               className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" /> BACK
//             </Link>
//             <div>
//               <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
//                 SCADA Client Console
//               </p>
//               <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
//                 {clientName}
//               </h1>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
//               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
//               {buildingId.toUpperCase()} - LEVEL {floorId}
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
//         {/* Status Banner */}
//         <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="bg-[#05143C] p-3 border border-blue-900 rounded-full text-emerald-400">
//               <CheckCircle className="h-7 w-7" />
//             </div>
//             <div>
//               <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">SYSTEM INTEGRITY LOG</span>
//               <h2 className="text-2xl font-black mt-0.5">All Subsystems Operational</h2>
//             </div>
//           </div>
//           <span className="bg-[#004AAD] border border-blue-400 text-white text-xs font-black px-4 py-2 tracking-widest uppercase inline-block text-center shadow">
//             LIVE FEEDS
//           </span>
//         </div>

//         {/* 5 Instrument Panels Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
//           {/* AHU / Chillers */}
//           <InstrumentPanel title="AHU / Chillers" icon={Fan}>
//             <MetricRow label="AHU-1 State" value="Running" tone="healthy" />
//             <MetricRow label="AHU-2 State" value="Running" tone="healthy" />
//             <MetricRow label="Chilled Water Supply Temp" value="22°C" />
//             <MetricRow label="Return Loop Humidity" value="48%" />
//           </InstrumentPanel>

//           {/* LDB / Lighting */}
//           <InstrumentPanel title="LDB / Lighting" icon={Lightbulb}>
//             <MetricRow label="Lighting Zone A" value="ON" />
//             <MetricRow label="Lighting Zone B" value="ON" />
//             <MetricRow label="Lighting Zone C" value="OFF" />
//             <MetricRow label="Lighting Board Load" value="64%" />
//           </InstrumentPanel>

//           {/* EMS / Energy */}
//           <InstrumentPanel title="EMS / Energy" icon={Gauge}>
//             <MetricRow label="Active Energy Draw" value="2,430 kWh" />
//             <MetricRow label="Real-time Demand" value="128 kW" />
//             <MetricRow label="Current Power Factor" value="0.96" />
//             <MetricRow label="Bus Voltage Supply" value="415 V" />
//             <MetricRow label="Average Current Draw" value="186 A" />
//           </InstrumentPanel>

//           {/* Comfort Status */}
//           <InstrumentPanel title="Comfort Status" icon={Thermometer}>
//             <MetricRow label="Ambient Room Temp" value="23°C" />
//             <MetricRow label="CO₂ Concentration" value="620 ppm" />
//             <MetricRow label="Air Quality Index (AQI)" value="Good" tone="healthy" />
//           </InstrumentPanel>

//           {/* Power Quality */}
//           <InstrumentPanel title="Power Quality" icon={Zap}>
//             <MetricRow label="Grid Frequency" value="50 Hz" />
//             <MetricRow label="Apparent Demand" value="142 kVA" />
//             <MetricRow label="System Fault Alarm" value="None" tone="healthy" />
//           </InstrumentPanel>

//         </div>

//         {/* Diagnostics helper info */}
//         <div className="mt-8 bg-[#05143C] border-l-4 border-[#004AAD] p-5 text-white">
//           <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
//             <Cpu className="h-4 w-4 text-[#00E5FF]" /> SCADA INSTRUMENTS DIAGNOSTIC
//           </h4>
//           <p className="text-xs text-blue-200 mt-2 leading-relaxed">
//             Telemetry is polled continuously. This panel displays localized electrical distribution data specifically isolated to the {clientName} console grid. Report anomalies directly to the facility command desk.
//           </p>
//         </div>

//       </section>

//       {/* Footer System Diagnostics */}
//       <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
//           <p>© 2026 Arcot Industries. All systems operational.</p>
//           <div className="flex items-center gap-2 text-emerald-600">
//             <span className="w-2 h-2 rounded-full bg-emerald-500" />
//             <span>Telemetry Calibrated</span>
//           </div>
//         </div>
//       </footer>
      
//     </main>
//   );
// }



import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Fan,
  Lightbulb,
  Gauge,
  Thermometer,
  Zap,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Wifi,
} from "lucide-react";
import { clients } from "../data/bmsData";
import prestigeLogo from "../assets/ser-removebg.png";
export default function ClientOverview() {
  const { buildingId, floorId, clientId } = useParams();

  const floorNumber = Number(floorId);
  const clientNumber = Number(clientId);

  const startIndex = (floorNumber - 1) * 4;
  const clientName =
    clients[startIndex + clientNumber - 1] || `Client ${clientId}`;

  const clientData = getSampleClientRealtimeData(floorNumber, clientNumber);

  const hasAlert = clientData.alerts.count > 0;

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-[#071B4D] border-b border-[#004AAD] px-4 sm:px-6 py-3 text-white shadow-sm">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to={`/building/${buildingId}/floor/${floorId}`}
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400/60 px-3 py-2 text-[10px] font-black transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>

            <div>
              <p className="text-[8px] font-black tracking-[0.35em] text-blue-300 uppercase">
                ARCOT IIoT Command Center
              </p>
              <h1 className="text-base sm:text-lg font-black tracking-wider text-white uppercase">
                {clientName} Monitoring Console
              </h1>
            </div>
          </div>

          <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD]/70 px-3 py-1.5 text-[9px] font-black tracking-widest text-white uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {buildingId.toUpperCase()} / Floor {floorId} / Zone {clientId}
          </span>
        </div>
      </header> */}
<header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
  <div className="h-full mx-auto max-w-7xl flex justify-between items-center">

    {/* LEFT */}
    <Link
      to="/"
      className="ml-1 flex items-center cursor-pointer no-underline"
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
          ARCOT
          <span className="ml-2 text-[#67E8F9]">
            IIoT 1.0
          </span>
        </h1>

        <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
          Industrial Internet of Things
        </span>
      </div>

      <div className="h-[58px] border-l border-[#004AAD] ml-5" />

      <img
        src={prestigeLogo}
        alt="Prestige Group"
        className="h-[60px] w-[110px] object-cover"
      />
    </Link>

    {/* CENTER */}
    <div className="hidden lg:flex flex-col items-center">
      <span className="text-[8px] font-bold uppercase tracking-[0.30em] text-cyan-300">
        CLIENT MONITORING CONSOLE
      </span>

      <h2 className="mt-1 text-[18px] font-black uppercase tracking-[0.08em] text-white">
        {clientName}
      </h2>

      <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-slate-400">
        {buildingId.toUpperCase()} • FLOOR {floorId} • ZONE {clientId}
      </span>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">

      <Link
        to={`/building/${buildingId}/floor/${floorId}`}
        className="h-[32px] px-4 flex items-center bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-[#0058d6]"
      >
        Back
      </Link>

      <div className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 rounded-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />

        <span className="text-[10px] font-bold tracking-[0.15em]">
          REALTIME ACTIVE
        </span>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("bmsLoggedIn");
          window.location.href = "/auth";
        }}
        className="h-[32px] px-4 bg-red-600 border border-red-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-red-700"
      >
        Logout
      </button>

    </div>

  </div>
</header>
      {/* Main content */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Status Banner */}
        <div className="bg-[#071B4D] border border-[#004AAD] p-5 text-white shadow-sm mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00E5FF]" />

          <div className="flex items-center gap-3">
            <div
              className={`bg-[#05143C] p-2.5 border border-blue-900 rounded-full ${
                hasAlert ? "text-yellow-300" : "text-emerald-400"
              }`}
            >
              {hasAlert ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
            </div>

            <div>
              <span className="text-[8px] font-black text-blue-300 tracking-[0.3em] block uppercase">
                Client Realtime Status
              </span>
              <h2 className="text-lg font-black mt-0.5 tracking-wide">
                {hasAlert ? "Attention Required" : "All Subsystems Normal"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <SummaryBox label="Load" value={clientData.energy.demand} />
            <SummaryBox label="Temp" value={clientData.comfort.roomTemp} />
            <SummaryBox label="PF" value={clientData.energy.pf} />
            <SummaryBox label="Alerts" value={clientData.alerts.count} />
          </div>
        </div>

        {/* Monitoring Panels */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InstrumentPanel title="AHU / HVAC" icon={Fan}>
            <MetricRow
              label="AHU-1"
              value={clientData.hvac.ahu1}
              tone={clientData.hvac.ahu1 === "Running" ? "healthy" : "warning"}
            />
            <MetricRow
              label="AHU-2"
              value={clientData.hvac.ahu2}
              tone={clientData.hvac.ahu2 === "Running" ? "healthy" : "warning"}
            />
            <MetricRow label="Supply Temp" value={clientData.hvac.supplyTemp} />
            <MetricRow label="Return Temp" value={clientData.hvac.returnTemp} />
            <MetricRow label="Humidity" value={clientData.hvac.humidity} />
          </InstrumentPanel>

          <InstrumentPanel title="LDB / Lighting" icon={Lightbulb}>
            <MetricRow label="Zone A" value={clientData.lighting.zoneA} />
            <MetricRow label="Zone B" value={clientData.lighting.zoneB} />
            <MetricRow label="Zone C" value={clientData.lighting.zoneC} />
            <MetricRow label="Lighting Load" value={clientData.lighting.load} />
            <MetricRow label="Mode" value={clientData.lighting.mode} />
          </InstrumentPanel>

          <InstrumentPanel title="EMS / Energy" icon={Gauge}>
            <MetricRow label="Energy Used" value={clientData.energy.kwh} />
            <MetricRow label="Demand" value={clientData.energy.demand} />
            <MetricRow label="Apparent" value={clientData.energy.kva} />
            <MetricRow label="Power Factor" value={clientData.energy.pf} />
            <MetricRow label="Voltage" value={clientData.energy.voltage} />
            <MetricRow label="Current" value={clientData.energy.current} />
          </InstrumentPanel>

          <InstrumentPanel title="Comfort / IAQ" icon={Thermometer}>
            <MetricRow label="Room Temp" value={clientData.comfort.roomTemp} />
            <MetricRow label="CO₂" value={clientData.comfort.co2} />
            <MetricRow label="PM2.5" value={clientData.comfort.pm25} />
            <MetricRow
              label="AQI"
              value={clientData.comfort.aqi}
              tone={clientData.comfort.aqi === "Good" ? "healthy" : "warning"}
            />
            <MetricRow label="Occupancy" value={clientData.comfort.occupancy} />
          </InstrumentPanel>

          <InstrumentPanel title="Power Quality" icon={Zap}>
            <MetricRow label="Frequency" value={clientData.power.frequency} />
            <MetricRow
              label="Voltage"
              value={clientData.power.voltageStatus}
              tone={
                clientData.power.voltageStatus === "Normal"
                  ? "healthy"
                  : "warning"
              }
            />
            <MetricRow
              label="Load"
              value={clientData.power.loadStatus}
              tone={
                clientData.power.loadStatus === "Normal"
                  ? "healthy"
                  : "warning"
              }
            />
            <MetricRow
              label="Fault"
              value={clientData.power.faultAlarm}
              tone={clientData.power.faultAlarm === "None" ? "healthy" : "warning"}
            />
            <MetricRow label="Comms" value={clientData.power.communication} />
          </InstrumentPanel>

          <InstrumentPanel title="Communication" icon={Wifi}>
            <MetricRow label="Meter Link" value={clientData.communication.meterLink} />
            <MetricRow
              label="Controller"
              value={clientData.communication.controllerLink}
            />
            <MetricRow label="Last Update" value={clientData.communication.lastUpdate} />
            <MetricRow label="Alerts" value={clientData.alerts.count} />
            <MetricRow
              label="Health"
              value={clientData.alerts.health}
              tone={clientData.alerts.health === "Normal" ? "healthy" : "warning"}
            />
          </InstrumentPanel>
        </div>

       
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-4 px-6 text-slate-500 text-[11px]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-3 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>

          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Client Telemetry Calibrated</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InstrumentPanel({ title, icon: Icon, children, status = "ONLINE" }) {
  return (
    <div className="bg-[#071B4D] border border-[#004AAD] p-4 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[255px]">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00E5FF]" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-3 border-b border-blue-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#05143C] p-2 border border-[#004AAD]/70 text-[#00E5FF]">
              <Icon className="h-4 w-4" />
            </div>

            <h3 className="text-xs font-black tracking-[0.22em] uppercase text-white">
              {title}
            </h3>
          </div>

          <span className="text-[8px] font-black tracking-[0.25em] text-[#00E5FF]">
            LIVE
          </span>
        </div>

        <div className="space-y-0.5">{children}</div>
      </div>

      <div className="mt-4 border-t border-blue-900/40 pt-2.5 flex items-center justify-between">
        <span className="text-[8px] font-black text-blue-300 uppercase tracking-[0.25em]">
          Telem
        </span>

        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {status}
        </span>
      </div>
    </div>
  );
}

function MetricRow({ label, value, tone = "default" }) {
  const valueClass =
    tone === "healthy"
      ? "text-emerald-400"
      : tone === "warning"
      ? "text-yellow-300"
      : tone === "danger"
      ? "text-red-400"
      : "text-white";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-blue-900/25 py-2 text-[11px]">
      <span className="font-semibold text-blue-200">{label}</span>
      <strong className={`font-black ${valueClass} text-sm text-right`}>
        {value}
      </strong>
    </div>
  );
}

function SummaryBox({ label, value }) {
  return (
    <div className="bg-[#05143C] border border-blue-900 px-4 py-2.5 min-w-[90px] text-center">
      <p className="text-[8px] font-black text-blue-300 tracking-[0.25em] uppercase">
        {label}
      </p>
      <h4 className="text-base font-black text-white mt-1">{value}</h4>
    </div>
  );
}

function getSampleClientRealtimeData(floorNumber, clientNumber) {
  const seed = floorNumber * 10 + clientNumber;
  const hasAlert = seed % 6 === 0;

  const demand = 32 + seed * 2;
  const kva = Math.round(demand / 0.92);
  const current = 65 + seed * 3;

  return {
    hvac: {
      ahu1: "Running",
      ahu2: hasAlert ? "Check" : "Running",
      supplyTemp: `${20 + (seed % 4)}°C`,
      returnTemp: `${23 + (seed % 4)}°C`,
      humidity: `${45 + (seed % 10)}%`,
    },
    lighting: {
      zoneA: "ON",
      zoneB: "ON",
      zoneC: seed % 3 === 0 ? "OFF" : "ON",
      load: `${45 + (seed % 20)}%`,
      mode: "Auto",
    },
    energy: {
      kwh: `${1200 + seed * 85} kWh`,
      demand: `${demand} kW`,
      kva: `${kva} kVA`,
      pf: hasAlert ? "0.94" : "0.98",
      voltage: `${415 + (seed % 5)} V`,
      current: `${current} A`,
    },
    comfort: {
      roomTemp: `${22 + (seed % 4)}°C`,
      co2: `${560 + seed * 7} ppm`,
      pm25: `${10 + (seed % 12)} μg/m³`,
      aqi: hasAlert ? "Moderate" : "Good",
      occupancy: `${18 + (seed % 12)} Persons`,
    },
    power: {
      frequency: "50 Hz",
      voltageStatus: hasAlert ? "Low" : "Normal",
      loadStatus: hasAlert ? "High Load" : "Normal",
      faultAlarm: hasAlert ? "Load Warning" : "None",
      communication: "Online",
    },
    communication: {
      meterLink: "Online",
      controllerLink: "Online",
      lastUpdate: "2 sec ago",
    },
    alerts: {
      count: hasAlert ? 1 : 0,
      health: hasAlert ? "Warning" : "Normal",
    },
  };
}






// import React, { useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Activity,
//   ArrowDownToLine,
//   ArrowLeft,
//   Building2,
//   CheckCircle2,
//   Clock3,
//   Cpu,
//   Fan,
//   Gauge,
//   Lightbulb,
//   MapPin,
//   Power,
//   Thermometer,
//   TrendingUp,
//   Users,
//   Wifi,
//   Zap,
// } from "lucide-react";
// import { clients } from "../data/bmsData";
// import prestigeLogo from "../assets/ser-removebg.png";

// const PERIODS = [
//   { id: "hourly", label: "Hourly" },
//   { id: "daily", label: "Daily" },
//   { id: "weekly", label: "Weekly" },
//   { id: "monthly", label: "Monthly" },
// ];

// const COST_PER_KWH = 8.4;

// export default function ClientOverview() {
//   const { buildingId = "", floorId = "1", clientId = "1" } = useParams();
//   const [period, setPeriod] = useState("hourly");

//   const floorNumber = Number(floorId) || 1;
//   const clientNumber = Number(clientId) || 1;
//   const startIndex = (floorNumber - 1) * 4;

//   const clientName =
//     clients[startIndex + clientNumber - 1] || `Client ${clientId}`;

//   const clientData = useMemo(
//     () => getSampleClientRealtimeData(floorNumber, clientNumber),
//     [floorNumber, clientNumber]
//   );

//   const consumptionData = useMemo(
//     () => getConsumptionData(period, floorNumber, clientNumber),
//     [period, floorNumber, clientNumber]
//   );

//   const analytics = useMemo(
//     () => calculateAnalytics(consumptionData),
//     [consumptionData]
//   );

//   const buildingLabel = buildingId
//     ? buildingId.replace(/[-_]/g, " ").toUpperCase()
//     : "BUILDING";

//   const hasAlert = clientData.alerts.count > 0;

//   const downloadCsv = () => {
//     const headers = [
//       "Period",
//       "Consumption (kWh)",
//       "Demand (kW)",
//       "Estimated Cost (INR)",
//     ];

//     const rows = consumptionData.map((item) => [
//       item.label,
//       item.consumption.toFixed(2),
//       item.demand.toFixed(2),
//       item.cost.toFixed(2),
//     ]);

//     const csv = [
//       headers.join(","),
//       ...rows.map((row) =>
//         row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.download = `${clientName
//       .replace(/[^a-z0-9]/gi, "-")
//       .toLowerCase()}-${period}-consumption.csv`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <main className="min-h-screen bg-[#EEF3F9] font-sans text-[#081F5C]">
//       <DashboardHeader
//         buildingId={buildingId}
//         floorId={floorId}
//       />

//       <section className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4 lg:px-5">
//         <div className="grid gap-3 xl:grid-cols-[360px_minmax(0,1fr)]">
//           <aside className="space-y-3">
//             <ClientProfileCard
//               clientName={clientName}
//               buildingLabel={buildingLabel}
//               floorId={floorId}
//               clientId={clientId}
//               hasAlert={hasAlert}
//               clientData={clientData}
//             />

//             <LiveAssetCard clientData={clientData} hasAlert={hasAlert} />
//           </aside>

//           <div className="min-w-0 space-y-3">
//             <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
//               <MetricCard
//                 icon={Zap}
//                 label="Current Demand"
//                 value={clientData.energy.demand}
//                 meta="Live electrical load"
//                 accent="cyan"
//               />
//               <MetricCard
//                 icon={Activity}
//                 label="Today Consumption"
//                 value={clientData.energy.todayKwh}
//                 meta="+4.8% from yesterday"
//                 accent="blue"
//               />
//               <MetricCard
//                 icon={TrendingUp}
//                 label="Monthly Consumption"
//                 value={clientData.energy.monthKwh}
//                 meta="Current billing period"
//                 accent="violet"
//               />
//               <MetricCard
//                 icon={ArrowDownToLine}
//                 label="Estimated Cost"
//                 value={clientData.energy.estimatedCost}
//                 meta="Based on ₹8.40 / kWh"
//                 accent="emerald"
//               />
//             </div>

//             <AnalyticsWorkspace
//               period={period}
//               setPeriod={setPeriod}
//               data={consumptionData}
//               analytics={analytics}
//               onDownload={downloadCsv}
//             />
//           </div>
//         </div>

//         <section className="mt-3">
//           <div className="mb-2 flex items-end justify-between gap-3">
//             <div>
//               <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#004AAD]">
//                 Block Monitoring
//               </p>
//               <h2 className="mt-1 text-[17px] font-black text-[#081F5C]">
//                 Live Equipment Readings
//               </h2>
//             </div>

//             <div className="hidden items-center gap-2 text-[8px] font-bold uppercase tracking-[0.15em] text-emerald-600 sm:flex">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
//               API stream connected
//             </div>
//           </div>

//           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//             <EquipmentCard title="AHU / HVAC" icon={Fan}>
//               <EquipmentMetric label="AHU-1" value={clientData.hvac.ahu1} healthy />
//               <EquipmentMetric
//                 label="AHU-2"
//                 value={clientData.hvac.ahu2}
//                 healthy={clientData.hvac.ahu2 === "Running"}
//               />
//               <EquipmentMetric label="Supply Temp" value={clientData.hvac.supplyTemp} />
//               <EquipmentMetric label="Return Temp" value={clientData.hvac.returnTemp} />
//               <EquipmentMetric label="Humidity" value={clientData.hvac.humidity} />
//             </EquipmentCard>

//             <EquipmentCard title="Lighting" icon={Lightbulb}>
//               <EquipmentMetric label="Zone A" value={clientData.lighting.zoneA} healthy />
//               <EquipmentMetric label="Zone B" value={clientData.lighting.zoneB} healthy />
//               <EquipmentMetric
//                 label="Zone C"
//                 value={clientData.lighting.zoneC}
//                 healthy={clientData.lighting.zoneC === "ON"}
//               />
//               <EquipmentMetric label="Lighting Load" value={clientData.lighting.load} />
//               <EquipmentMetric label="Mode" value={clientData.lighting.mode} />
//             </EquipmentCard>

//             <EquipmentCard title="Energy Meter" icon={Gauge}>
//               <EquipmentMetric label="Energy Used" value={clientData.energy.kwh} />
//               <EquipmentMetric label="Demand" value={clientData.energy.demand} />
//               <EquipmentMetric label="Apparent Power" value={clientData.energy.kva} />
//               <EquipmentMetric label="Power Factor" value={clientData.energy.pf} healthy={!hasAlert} />
//               <EquipmentMetric label="Voltage / Current" value={`${clientData.energy.voltage} / ${clientData.energy.current}`} />
//             </EquipmentCard>

//             <EquipmentCard title="Comfort / IAQ" icon={Thermometer}>
//               <EquipmentMetric label="Room Temp" value={clientData.comfort.roomTemp} />
//               <EquipmentMetric label="CO₂" value={clientData.comfort.co2} />
//               <EquipmentMetric label="PM2.5" value={clientData.comfort.pm25} />
//               <EquipmentMetric label="Air Quality" value={clientData.comfort.aqi} healthy={!hasAlert} />
//               <EquipmentMetric label="Occupancy" value={clientData.comfort.occupancy} />
//             </EquipmentCard>

//             <EquipmentCard title="Power Quality" icon={Power}>
//               <EquipmentMetric label="Frequency" value={clientData.power.frequency} />
//               <EquipmentMetric label="Voltage Health" value={clientData.power.voltageStatus} healthy={!hasAlert} />
//               <EquipmentMetric label="Load Health" value={clientData.power.loadStatus} healthy={!hasAlert} />
//               <EquipmentMetric label="Fault Alarm" value={clientData.power.faultAlarm} healthy={!hasAlert} />
//               <EquipmentMetric label="Communication" value={clientData.power.communication} healthy />
//             </EquipmentCard>

//             <EquipmentCard title="Communication" icon={Wifi}>
//               <EquipmentMetric label="Meter Link" value={clientData.communication.meterLink} healthy />
//               <EquipmentMetric label="Controller" value={clientData.communication.controllerLink} healthy />
//               <EquipmentMetric label="Last Update" value={clientData.communication.lastUpdate} />
//               <EquipmentMetric label="Active Alerts" value={clientData.alerts.count} healthy={!hasAlert} />
//               <EquipmentMetric label="System Health" value={clientData.alerts.health} healthy={!hasAlert} />
//             </EquipmentCard>
//           </div>
//         </section>

//         <footer className="mt-3 flex flex-col items-center justify-between gap-2 border-t border-slate-200 px-1 py-3 text-[10px] font-semibold text-slate-500 sm:flex-row">
//           <p>© 2026 Arcot Industries. Client monitoring overview.</p>
//           <div className="flex items-center gap-2 text-emerald-600">
//             <span className="h-2 w-2 rounded-full bg-emerald-500" />
//             Realtime telemetry active
//           </div>
//         </footer>
//       </section>
//     </main>
//   );
// }

// function DashboardHeader({ buildingId, floorId }) {
//   return (
//     <header className="sticky top-0 z-[1000] h-[72px] border-b-4 border-[#004AAD] bg-[#081F5C] px-3 text-white shadow-[0_8px_30px_rgba(3,23,65,0.18)] sm:px-4">
//       <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-3">
//         <Link to="/" className="flex min-w-0 items-center no-underline">
//           <div className="min-w-0">
//             <h1 className="truncate text-[clamp(18px,2vw,26px)] font-semibold uppercase leading-none tracking-[0.16em] text-white">
//               ARCOT
//               <span className="ml-2 text-[#67E8F9]">IIoT 1.0</span>
//             </h1>
//             <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[0.3em] text-blue-300 sm:block">
//               Industrial Internet of Things
//             </span>
//           </div>

//           <div className="ml-4 hidden h-[48px] border-l border-[#004AAD] sm:block" />

//           <img
//             src={prestigeLogo}
//             alt="Prestige Group"
//             className="ml-4 hidden h-[54px] w-[105px] object-contain sm:block"
//           />
//         </Link>

//         <div className="hidden flex-col items-center xl:flex">
//           <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-300">
//             Building Management System
//           </span>
//           <h2 className="mt-1 text-[16px] font-black uppercase tracking-[0.1em] text-white">
//             Client Overview
//           </h2>
//         </div>

//         <div className="flex shrink-0 items-center gap-2">
//           <Link
//             to={`/building/${buildingId}/floor/${floorId}`}
//             className="inline-flex h-[34px] items-center gap-2 border border-cyan-400 bg-[#004AAD] px-3 text-[9px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#0058D6]"
//           >
//             <ArrowLeft className="h-3.5 w-3.5" />
//             <span className="hidden sm:inline">Back</span>
//           </Link>

//           <div className="hidden items-center gap-2 border border-[#004AAD] bg-[#05143C] px-3 py-2 md:flex">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
//             <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
//               Realtime Active
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               localStorage.removeItem("bmsLoggedIn");
//               window.location.href = "/auth";
//             }}
//             className="h-[34px] border border-red-400 bg-red-600 px-3 text-[9px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// function ClientProfileCard({
//   clientName,
//   buildingLabel,
//   floorId,
//   clientId,
//   hasAlert,
//   clientData,
// }) {
//   return (
//     <article className="relative overflow-hidden border border-[#0C4A8A] bg-[linear-gradient(145deg,#071B4D_0%,#081F5C_58%,#031237_100%)] p-5 text-white shadow-[0_16px_34px_rgba(8,31,92,0.18)]">
//       <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#00E5FF,#2563EB,#00E5FF)]" />
//       <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

//       <div className="relative">
//         <div className="flex items-start justify-between gap-3">
//           <div className="min-w-0">
//             <p className="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-300">
//               Client Account
//             </p>
//             <h1 className="mt-2 truncate text-[25px] font-black tracking-tight">
//               {clientName}
//             </h1>
//             <p className="mt-1 text-[10px] font-medium text-blue-200">
//               Block-level energy and facility monitoring
//             </p>
//           </div>

//           <div
//             className={`flex shrink-0 items-center gap-2 border px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] ${
//               hasAlert
//                 ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
//                 : "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
//             }`}
//           >
//             <span
//               className={`h-2 w-2 rounded-full ${
//                 hasAlert ? "bg-amber-400" : "animate-pulse bg-emerald-400"
//               }`}
//             />
//             {hasAlert ? "Attention" : "Healthy"}
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-2 gap-2">
//           <ProfileItem icon={Building2} label="Building" value={buildingLabel} />
//           <ProfileItem icon={MapPin} label="Floor" value={`Floor ${floorId}`} />
//           <ProfileItem icon={Cpu} label="Block / Zone" value={`Zone ${clientId}`} />
//           <ProfileItem icon={Users} label="Occupancy" value={clientData.comfort.occupancy} />
//         </div>

//         <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
//           <SmallReading label="Power Factor" value={clientData.energy.pf} />
//           <SmallReading label="Peak Demand" value={clientData.energy.peakDemand} />
//         </div>
//       </div>
//     </article>
//   );
// }

// function ProfileItem({ icon: Icon, label, value }) {
//   return (
//     <div className="border border-white/10 bg-white/[0.05] p-3">
//       <div className="flex items-center gap-2 text-cyan-300">
//         <Icon className="h-3.5 w-3.5" />
//         <span className="text-[7px] font-black uppercase tracking-[0.2em]">
//           {label}
//         </span>
//       </div>
//       <p className="mt-2 truncate text-[11px] font-black text-white">{value}</p>
//     </div>
//   );
// }

// function SmallReading({ label, value }) {
//   return (
//     <div>
//       <p className="text-[7px] font-black uppercase tracking-[0.2em] text-blue-300">
//         {label}
//       </p>
//       <p className="mt-1 text-[17px] font-black text-white">{value}</p>
//     </div>
//   );
// }

// function LiveAssetCard({ clientData, hasAlert }) {
//   const assets = [
//     { label: "AHU / HVAC", value: clientData.hvac.ahu2 === "Running" ? "Normal" : "Check", healthy: clientData.hvac.ahu2 === "Running" },
//     { label: "Lighting", value: "Normal", healthy: true },
//     { label: "Energy Meter", value: "Online", healthy: true },
//     { label: "Power Quality", value: hasAlert ? "Warning" : "Normal", healthy: !hasAlert },
//   ];

//   return (
//     <article className="border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
//       <div className="flex items-center justify-between border-b border-slate-100 pb-3">
//         <div>
//           <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#004AAD]">
//             Connected Systems
//           </p>
//           <h3 className="mt-1 text-[15px] font-black text-[#081F5C]">
//             Asset Health
//           </h3>
//         </div>
//         <CheckCircle2 className="h-5 w-5 text-emerald-500" />
//       </div>

//       <div className="mt-3 space-y-2">
//         {assets.map((asset) => (
//           <div
//             key={asset.label}
//             className="flex items-center justify-between border border-slate-100 bg-slate-50 px-3 py-2.5"
//           >
//             <span className="text-[9px] font-bold text-slate-600">{asset.label}</span>
//             <span
//               className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.12em] ${
//                 asset.healthy ? "text-emerald-600" : "text-amber-600"
//               }`}
//             >
//               <span
//                 className={`h-2 w-2 rounded-full ${
//                   asset.healthy ? "bg-emerald-500" : "bg-amber-500"
//                 }`}
//               />
//               {asset.value}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
//         <div className="flex items-center gap-2 text-[8px] font-semibold text-slate-400">
//           <Clock3 className="h-3.5 w-3.5" />
//           Updated {clientData.communication.lastUpdate}
//         </div>
//         <div className="text-[8px] font-black uppercase tracking-[0.13em] text-emerald-600">
//           Live
//         </div>
//       </div>
//     </article>
//   );
// }

// function MetricCard({ icon: Icon, label, value, meta, accent }) {
//   const accents = {
//     cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
//     blue: "border-blue-200 bg-blue-50 text-blue-700",
//     violet: "border-violet-200 bg-violet-50 text-violet-700",
//     emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
//   };

//   return (
//     <article className="border border-slate-200 bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.09)]">
//       <div className="flex items-start justify-between gap-3">
//         <div className={`border p-2.5 ${accents[accent]}`}>
//           <Icon className="h-4 w-4" />
//         </div>
//         <span className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">
//           Live
//         </span>
//       </div>

//       <p className="mt-4 text-[8px] font-black uppercase tracking-[0.18em] text-slate-500">
//         {label}
//       </p>
//       <h3 className="mt-1 text-[20px] font-black tracking-tight text-[#081F5C]">
//         {value}
//       </h3>
//       <p className="mt-1 truncate text-[8px] font-semibold text-slate-400">{meta}</p>
//     </article>
//   );
// }

// function AnalyticsWorkspace({
//   period,
//   setPeriod,
//   data,
//   analytics,
//   onDownload,
// }) {
//   return (
//     <article className="overflow-hidden border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
//       <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#004AAD]">
//             Consumption Analytics
//           </p>
//           <h2 className="mt-1 text-[18px] font-black text-[#081F5C]">
//             Energy Usage Trend
//           </h2>
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <div className="flex border border-slate-200 bg-slate-50 p-1">
//             {PERIODS.map((item) => (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={() => setPeriod(item.id)}
//                 className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] transition ${
//                   period === item.id
//                     ? "bg-[#004AAD] text-white shadow-sm"
//                     : "text-slate-500 hover:bg-white hover:text-[#004AAD]"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={onDownload}
//             className="inline-flex items-center gap-2 border border-[#004AAD] bg-[#081F5C] px-3 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#004AAD]"
//           >
//             <ArrowDownToLine className="h-3.5 w-3.5" />
//             Download CSV
//           </button>
//         </div>
//       </div>

//       <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
//         <div className="min-w-0 p-4">
//           <div className="h-[300px] w-full">
//             <ConsumptionChart data={data} />
//           </div>

//           <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-3 text-[8px] font-bold text-slate-500">
//             <Legend color="bg-[#004AAD]" label="Consumption (kWh)" />
//             <Legend color="bg-cyan-400" label="Demand (kW)" />
//           </div>
//         </div>

//         <div className="border-t border-slate-100 bg-[#F8FAFD] p-4 lg:border-l lg:border-t-0">
//           <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
//             Period Summary
//           </p>

//           <div className="mt-3 space-y-2">
//             <SummaryStat label="Total Usage" value={`${analytics.total.toFixed(1)} kWh`} />
//             <SummaryStat label="Average Usage" value={`${analytics.average.toFixed(1)} kWh`} />
//             <SummaryStat label="Peak Demand" value={`${analytics.peakDemand.toFixed(1)} kW`} />
//             <SummaryStat
//               label="Estimated Cost"
//               value={`₹${analytics.totalCost.toLocaleString("en-IN", {
//                 maximumFractionDigits: 0,
//               })}`}
//               strong
//             />
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// function SummaryStat({ label, value, strong = false }) {
//   return (
//     <div className={`border p-3 ${strong ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}>
//       <p className="text-[7px] font-black uppercase tracking-[0.16em] text-slate-400">
//         {label}
//       </p>
//       <p className={`mt-1 text-[15px] font-black ${strong ? "text-[#004AAD]" : "text-[#081F5C]"}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// function Legend({ color, label }) {
//   return (
//     <span className="flex items-center gap-2">
//       <span className={`h-2 w-2 rounded-full ${color}`} />
//       {label}
//     </span>
//   );
// }

// function ConsumptionChart({ data }) {
//   const width = 920;
//   const height = 300;
//   const padding = { top: 18, right: 20, bottom: 44, left: 52 };

//   const maxValue = Math.max(
//     ...data.flatMap((item) => [item.consumption, item.demand]),
//     1
//   );

//   const plotWidth = width - padding.left - padding.right;
//   const plotHeight = height - padding.top - padding.bottom;
//   const step = data.length > 1 ? plotWidth / (data.length - 1) : plotWidth;

//   const scaleY = (value) =>
//     padding.top + plotHeight - (value / maxValue) * plotHeight;

//   const consumptionPoints = data
//     .map(
//       (item, index) =>
//         `${padding.left + index * step},${scaleY(item.consumption)}`
//     )
//     .join(" ");

//   const demandPoints = data
//     .map(
//       (item, index) =>
//         `${padding.left + index * step},${scaleY(item.demand)}`
//     )
//     .join(" ");

//   const areaPath = [
//     `M ${padding.left},${padding.top + plotHeight}`,
//     ...data.map(
//       (item, index) =>
//         `L ${padding.left + index * step},${scaleY(item.consumption)}`
//     ),
//     `L ${padding.left + (data.length - 1) * step},${padding.top + plotHeight}`,
//     "Z",
//   ].join(" ");

//   return (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       className="h-full w-full overflow-visible"
//       role="img"
//       aria-label="Energy consumption and demand chart"
//     >
//       <defs>
//         <linearGradient id="clientConsumptionArea" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="#004AAD" stopOpacity="0.22" />
//           <stop offset="100%" stopColor="#004AAD" stopOpacity="0.02" />
//         </linearGradient>
//       </defs>

//       {[0, 1, 2, 3, 4].map((index) => {
//         const y = padding.top + (plotHeight / 4) * index;
//         const value = maxValue - (maxValue / 4) * index;

//         return (
//           <g key={index}>
//             <line
//               x1={padding.left}
//               x2={width - padding.right}
//               y1={y}
//               y2={y}
//               stroke="#E2E8F0"
//               strokeWidth="1"
//               strokeDasharray="4 5"
//             />
//             <text
//               x={padding.left - 10}
//               y={y + 3}
//               textAnchor="end"
//               fontSize="9"
//               fill="#94A3B8"
//               fontWeight="700"
//             >
//               {value.toFixed(0)}
//             </text>
//           </g>
//         );
//       })}

//       <path d={areaPath} fill="url(#clientConsumptionArea)" />

//       <polyline
//         points={consumptionPoints}
//         fill="none"
//         stroke="#004AAD"
//         strokeWidth="3"
//         strokeLinejoin="round"
//         strokeLinecap="round"
//       />

//       <polyline
//         points={demandPoints}
//         fill="none"
//         stroke="#22D3EE"
//         strokeWidth="2.5"
//         strokeDasharray="7 6"
//         strokeLinejoin="round"
//         strokeLinecap="round"
//       />

//       {data.map((item, index) => {
//         const x = padding.left + index * step;
//         const showLabel =
//           data.length <= 12 ||
//           index === 0 ||
//           index === data.length - 1 ||
//           index % Math.ceil(data.length / 8) === 0;

//         return (
//           <g key={`${item.label}-${index}`}>
//             <circle
//               cx={x}
//               cy={scaleY(item.consumption)}
//               r="3.5"
//               fill="#FFFFFF"
//               stroke="#004AAD"
//               strokeWidth="2"
//             />
//             <circle
//               cx={x}
//               cy={scaleY(item.demand)}
//               r="2.8"
//               fill="#22D3EE"
//               stroke="#FFFFFF"
//               strokeWidth="1.5"
//             />

//             {showLabel && (
//               <text
//                 x={x}
//                 y={height - 14}
//                 textAnchor="middle"
//                 fontSize="8"
//                 fill="#64748B"
//                 fontWeight="700"
//               >
//                 {item.label}
//               </text>
//             )}
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// function EquipmentCard({ title, icon: Icon, children }) {
//   return (
//     <article className="overflow-hidden border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
//       <div className="flex items-center justify-between border-b border-slate-100 bg-[#F8FAFD] px-4 py-3">
//         <div className="flex items-center gap-2">
//           <div className="border border-blue-200 bg-blue-50 p-2 text-[#004AAD]">
//             <Icon className="h-4 w-4" />
//           </div>
//           <h3 className="text-[10px] font-black uppercase tracking-[0.17em] text-[#081F5C]">
//             {title}
//           </h3>
//         </div>

//         <span className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.16em] text-emerald-600">
//           <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
//           Live
//         </span>
//       </div>

//       <div className="px-4 py-2">{children}</div>
//     </article>
//   );
// }

// function EquipmentMetric({ label, value, healthy = null }) {
//   const valueClass =
//     healthy === true
//       ? "text-emerald-600"
//       : healthy === false
//       ? "text-amber-600"
//       : "text-[#081F5C]";

//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 last:border-0">
//       <span className="text-[9px] font-semibold text-slate-500">{label}</span>
//       <strong className={`text-right text-[10px] font-black ${valueClass}`}>
//         {value}
//       </strong>
//     </div>
//   );
// }

// function calculateAnalytics(data) {
//   const total = data.reduce((sum, item) => sum + item.consumption, 0);
//   const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
//   const peakDemand = Math.max(...data.map((item) => item.demand), 0);

//   return {
//     total,
//     totalCost,
//     peakDemand,
//     average: data.length ? total / data.length : 0,
//   };
// }

// function getConsumptionData(period, floorNumber, clientNumber) {
//   const seed = floorNumber * 17 + clientNumber * 11;

//   const labels = {
//     hourly: [
//       "00:00",
//       "02:00",
//       "04:00",
//       "06:00",
//       "08:00",
//       "10:00",
//       "12:00",
//       "14:00",
//       "16:00",
//       "18:00",
//       "20:00",
//       "22:00",
//     ],
//     daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     weekly: ["W1", "W2", "W3", "W4", "W5"],
//     monthly: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//   };

//   const periodMultiplier = {
//     hourly: 1,
//     daily: 18,
//     weekly: 95,
//     monthly: 410,
//   };

//   return labels[period].map((label, index) => {
//     const wave = Math.sin((index + seed) * 0.72) * 8;
//     const trend = index * 1.65;
//     const base = 34 + (seed % 13);
//     const multiplier = periodMultiplier[period];

//     const consumption = Math.max(
//       10,
//       (base + wave + trend + ((index * seed) % 7)) * multiplier
//     );

//     const demand = Math.max(
//       8,
//       base * 0.72 + wave * 0.35 + ((index + seed) % 6)
//     );

//     return {
//       label,
//       consumption: Number(consumption.toFixed(2)),
//       demand: Number(demand.toFixed(2)),
//       cost: Number((consumption * COST_PER_KWH).toFixed(2)),
//     };
//   });
// }

// function getSampleClientRealtimeData(floorNumber, clientNumber) {
//   const seed = floorNumber * 10 + clientNumber;
//   const hasAlert = seed % 6 === 0;

//   const demand = 32 + seed * 2;
//   const kva = Math.round(demand / 0.92);
//   const current = 65 + seed * 3;
//   const todayKwh = 420 + seed * 18;
//   const monthKwh = 9650 + seed * 210;
//   const peakDemand = demand + 14 + (seed % 8);
//   const estimatedCost = monthKwh * COST_PER_KWH;

//   return {
//     hvac: {
//       ahu1: "Running",
//       ahu2: hasAlert ? "Check" : "Running",
//       supplyTemp: `${20 + (seed % 4)}°C`,
//       returnTemp: `${23 + (seed % 4)}°C`,
//       humidity: `${45 + (seed % 10)}%`,
//     },
//     lighting: {
//       zoneA: "ON",
//       zoneB: "ON",
//       zoneC: seed % 3 === 0 ? "OFF" : "ON",
//       load: `${45 + (seed % 20)}%`,
//       mode: "Auto",
//     },
//     energy: {
//       kwh: `${1200 + seed * 85} kWh`,
//       todayKwh: `${todayKwh.toLocaleString("en-IN")} kWh`,
//       monthKwh: `${monthKwh.toLocaleString("en-IN")} kWh`,
//       demand: `${demand} kW`,
//       peakDemand: `${peakDemand} kW`,
//       estimatedCost: `₹${estimatedCost.toLocaleString("en-IN", {
//         maximumFractionDigits: 0,
//       })}`,
//       kva: `${kva} kVA`,
//       pf: hasAlert ? "0.94" : "0.98",
//       voltage: `${415 + (seed % 5)} V`,
//       current: `${current} A`,
//     },
//     comfort: {
//       roomTemp: `${22 + (seed % 4)}°C`,
//       co2: `${560 + seed * 7} ppm`,
//       pm25: `${10 + (seed % 12)} μg/m³`,
//       aqi: hasAlert ? "Moderate" : "Good",
//       occupancy: `${18 + (seed % 12)} Persons`,
//     },
//     power: {
//       frequency: "50 Hz",
//       voltageStatus: hasAlert ? "Low" : "Normal",
//       loadStatus: hasAlert ? "High Load" : "Normal",
//       faultAlarm: hasAlert ? "Load Warning" : "None",
//       communication: "Online",
//     },
//     communication: {
//       meterLink: "Online",
//       controllerLink: "Online",
//       lastUpdate: "2 sec ago",
//     },
//     alerts: {
//       count: hasAlert ? 1 : 0,
//       health: hasAlert ? "Warning" : "Normal",
//     },
//   };
// }
