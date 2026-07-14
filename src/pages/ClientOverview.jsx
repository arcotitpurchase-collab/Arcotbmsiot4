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