// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Building2, Activity, Cpu } from "lucide-react";
// import { clients } from "../data/bmsData";

// export default function FloorOverview() {
//   const { buildingId, floorId } = useParams();

//   const floorNumber = Number(floorId);
//   const startIndex = (floorNumber - 1) * 4;
//   const floorClients = clients.slice(startIndex, startIndex + 4);

//   return (
//     <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               to={`/building/${buildingId}`}
//               className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" /> BACK
//             </Link>
//             <div>
//               <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
//                 SCADA Floor Consoles
//               </p>
//               <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
//                 {buildingId.toUpperCase()} - Floor {floorId}
//               </h1>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
//               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
//               FLOOR ACTIVE
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
//         {/* Info Banner */}
//         <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg mb-8">
//           <span className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">Distribution Blueprint</span>
//           <h2 className="text-xl font-black tracking-wide text-[#081F5C] uppercase mt-1">
//             Floor {floorId} Tenant Distribution
//           </h2>
//           <p className="text-xs text-slate-500 font-semibold mt-1">
//             Active electricity draw and subsystem logs mapped for the 4 tenant client zones on this floor.
//           </p>
//         </div>

//         {/* 4 Client Zones Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {floorClients.map((client, index) => {
//             const clientPowerKwh = 120 + index * 18;
//             return (
//               <Link
//                 key={client}
//                 to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
//                 className="group bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white hover-lift rounded shadow-lg relative flex flex-col justify-between"
//               >
//                 {/* Visual panel header line */}
//                 <div className="absolute top-0 inset-x-0 h-[3px] bg-[#004AAD]" />
                
//                 <div>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="bg-[#05143C] p-2 border border-blue-900 rounded text-blue-200">
//                       <Building2 className="h-6 w-6" />
//                     </div>
//                     <span className="text-[9px] font-black text-[#00E5FF] tracking-wider uppercase bg-[#05143C] border border-blue-900 px-2 py-0.5">
//                       ZONE {index + 1}
//                     </span>
//                   </div>

//                   <h3 className="text-xl font-black tracking-wide group-hover:text-blue-200 transition-colors mb-4">
//                     {client}
//                   </h3>

//                   <div className="space-y-2 border-t border-blue-900/40 pt-3">
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="text-blue-200 font-semibold">AHU / HVAC:</span>
//                       <span className="font-extrabold text-emerald-400">Running</span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="text-blue-200 font-semibold">Lighting Board:</span>
//                       <span className="font-extrabold text-white">ON</span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="text-blue-200 font-semibold">Power Load:</span>
//                       <span className="font-extrabold text-white">{clientPowerKwh} kW</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 border-t border-blue-900/40 pt-3 flex items-center justify-between">
//                   <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
//                     <Activity className="h-4 w-4" />
//                     Healthy
//                   </div>
//                   <span className="text-[9px] font-black bg-[#004AAD] text-white px-2 py-1 border border-blue-400">
//                     DIAGNOSTICS
//                   </span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Console helper */}
//         <div className="mt-8 bg-[#05143C] border-l-4 border-[#004AAD] p-5 text-white">
//           <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
//             <Cpu className="h-4 w-4 text-[#00E5FF]" /> TECHNICAL MANUAL
//           </h4>
//           <p className="text-xs text-blue-200 mt-2 leading-relaxed">
//             Selecting any of the tenant consoles above will open the specific zone telemetry drawer, revealing detailed logs on frequency, peak demand, room temperature, CO₂ parts-per-million, and energy performance metrics.
//           </p>
//         </div>

//       </section>

//       {/* Footer System Diagnostics */}
//       <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
//           <p>© 2026 Arcot Industries. All systems operational.</p>
//           <div className="flex items-center gap-2 text-emerald-600">
//             <span className="w-2 h-2 rounded-full bg-emerald-500" />
//             <span>Zone Feeders Connected</span>
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
  Building2,
  Activity,
  Fan,
  Lightbulb,
  Gauge,
  Wind,
  Users,
  AlertTriangle,
} from "lucide-react";
import { clients } from "../data/bmsData";
import prestigeLogo from "../assets/ser-removebg.png";
export default function FloorOverview() {
  const { buildingId, floorId } = useParams();

  const floorNumber = Number(floorId);
  const startIndex = (floorNumber - 1) * 4;
  const floorClients = clients.slice(startIndex, startIndex + 4);

  // Sample realtime data for selected floor only
  // Later replace this with backend API response
  const floorData = getSampleFloorRealtimeData(floorNumber);

  const floorMonitoring = [
    {
      title: "AHU / HVAC",
      icon: Fan,
      metrics: [
        ["Running AHUs", `${floorData.ahu.running} Units`],
        ["Stopped AHUs", `${floorData.ahu.stopped}`],
        ["Avg Temp", floorData.ahu.temperature],
        ["Humidity", floorData.ahu.humidity],
      ],
    },
    {
      title: "LDB / LIGHTING",
      icon: Lightbulb,
      metrics: [
        ["Active Zones", `${floorData.lighting.activeZones}`],
        ["Inactive Zones", `${floorData.lighting.inactiveZones}`],
        ["Load", floorData.lighting.load],
        ["Status", floorData.lighting.status],
      ],
    },
    {
      title: "EMS / ENERGY",
      icon: Gauge,
      metrics: [
        ["Energy Used", floorData.energy.kwh],
        ["Demand", floorData.energy.demand],
        ["PF", floorData.energy.pf],
        ["Voltage", floorData.energy.voltage],
        ["Current", floorData.energy.current],
      ],
    },
    {
      title: "AIR QUALITY",
      icon: Wind,
      metrics: [
        ["CO₂", floorData.air.co2],
        ["PM2.5", floorData.air.pm25],
        ["Temperature", floorData.ahu.temperature],
        ["Status", floorData.air.status],
      ],
    },
    {
      title: "TENANT ZONES",
      icon: Users,
      metrics: [
        ["Clients", `${floorClients.length}`],
        ["Occupied", `${floorData.tenants.occupied}`],
        ["Available", `${floorData.tenants.available}`],
        ["Status", floorData.tenants.status],
      ],
    },
    {
      title: "ALERTS",
      icon: AlertTriangle,
      metrics: [
        ["Active Alerts", `${floorData.alerts.count}`],
        ["Communication", floorData.alerts.communication],
        ["Health", floorData.alerts.health],
        ["Last Update", floorData.alerts.lastUpdate],
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      {/* <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-4 sm:px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/building/${buildingId}`}
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> BACK
            </Link>

            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                SCADA Floor Consoles
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                {buildingId.toUpperCase()} - Floor {floorId}
              </h1>
            </div>
          </div>

          <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            REALTIME ACTIVE
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
          <span className="text-[#67E8F9] ml-2">
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
      <span className="text-[8px] uppercase tracking-[0.28em] text-cyan-300 font-bold">
        FLOOR MONITORING CONSOLE
      </span>

      <h2 className="mt-1 text-[18px] font-black uppercase tracking-[0.08em] text-white">
        {buildingId.toUpperCase()} • FLOOR {floorId}
      </h2>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-3">

      <Link
        to={`/building/${buildingId}`}
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

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg mb-8">
          <span className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">
            Floor Realtime Monitoring
          </span>
          <h2 className="text-xl font-black tracking-wide text-[#081F5C] uppercase mt-1">
            Floor {floorId} Tenant Distribution
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            This page displays only Floor {floorId} client zones and Floor {floorId}
            monitoring data.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-6">
          {/* Left Side - Current Floor Clients Only */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="mb-5">
              <p className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">
                Current Floor Clients
              </p>
              <h3 className="text-lg font-black uppercase text-[#081F5C]">
                Floor {floorId} Clients
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              {floorClients.map((client, index) => {
                const zone = floorData.zones[index];

                return (
                  <Link
                    key={client}
                    to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
                    className="group bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white rounded shadow-lg relative flex flex-col justify-between min-h-[190px]"
                  >
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-[#004AAD]" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-[#05143C] p-2 border border-blue-900 rounded text-blue-200">
                          <Building2 className="h-5 w-5" />
                        </div>

                        <span className="text-[9px] font-black text-[#00E5FF] tracking-wider uppercase bg-[#05143C] border border-blue-900 px-2 py-0.5">
                          ZONE {index + 1}
                        </span>
                      </div>

                      <h3 className="text-lg font-black tracking-wide group-hover:text-blue-200 transition-colors mb-4">
                        {client}
                      </h3>

                      <div className="space-y-2 border-t border-blue-900/40 pt-3">
                        <MetricRow label="AHU / HVAC" value={zone.ahu} />
                        <MetricRow label="Lighting" value={zone.lighting} />
                        <MetricRow label="Power Load" value={zone.load} />
                      </div>
                    </div>

                    <div className="mt-5 border-t border-blue-900/40 pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                        <Activity className="h-4 w-4" />
                        {zone.health}
                      </div>

                      <span className="text-[9px] font-black bg-[#004AAD] text-white px-2 py-1 border border-blue-400">
                        DIAGNOSTICS
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side - Current Floor Monitoring Only */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">
                  Selected Floor Monitoring
                </p>
                <h3 className="text-lg font-black uppercase text-[#081F5C]">
                  Floor {floorId} Live Data
                </h3>
              </div>

              <span className="hidden sm:inline-flex items-center gap-2 bg-[#081F5C] text-white border border-[#004AAD] px-3 py-1.5 text-[10px] font-black uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Realtime
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {floorMonitoring.map((item) => (
                <MonitoringCard
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  metrics={item.metrics}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Floor {floorId} Feeders Connected</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

const getSampleFloorRealtimeData = (floorNumber) => {
  const baseLoad = 150 + floorNumber * 6;
  const hasAlert = floorNumber % 5 === 0;

  return {
    ahu: {
      running: 2 + (floorNumber % 3),
      stopped: hasAlert ? 1 : 0,
      temperature: `${22 + (floorNumber % 4)}°C`,
      humidity: `${45 + (floorNumber % 8)}%`,
    },
    lighting: {
      activeZones: 14 + (floorNumber % 5),
      inactiveZones: floorNumber % 3,
      load: `${18 + floorNumber} kW`,
      status: "ON",
    },
    energy: {
      kwh: `${2200 + floorNumber * 95} kWh`,
      demand: `${baseLoad} kW`,
      pf: hasAlert ? "0.96" : "0.98",
      voltage: `${430 + (floorNumber % 5)}V`,
      current: `${190 + floorNumber * 4}A`,
    },
    air: {
      co2: `${540 + floorNumber * 8} ppm`,
      pm25: `${10 + (floorNumber % 10)} μg/m³`,
      status: hasAlert ? "Moderate" : "Healthy",
    },
    tenants: {
      occupied: 4,
      available: 0,
      status: hasAlert ? "Attention" : "Healthy",
    },
    alerts: {
      count: hasAlert ? 1 : 0,
      communication: "Online",
      health: hasAlert ? "Warning" : "Normal",
      lastUpdate: "2 sec ago",
    },
    zones: [
      {
        ahu: "Running",
        lighting: "ON",
        load: `${Math.round(baseLoad * 0.24)} kW`,
        health: "Healthy",
      },
      {
        ahu: "Running",
        lighting: "ON",
        load: `${Math.round(baseLoad * 0.26)} kW`,
        health: "Healthy",
      },
      {
        ahu: hasAlert ? "Check" : "Running",
        lighting: "ON",
        load: `${Math.round(baseLoad * 0.25)} kW`,
        health: hasAlert ? "Warning" : "Healthy",
      },
      {
        ahu: "Running",
        lighting: "ON",
        load: `${Math.round(baseLoad * 0.25)} kW`,
        health: "Healthy",
      },
    ],
  };
};

const MonitoringCard = ({ title, icon: Icon, metrics }) => (
  <div className="bg-[#081F5C] border-2 border-[#004AAD] text-white rounded shadow-lg p-5 min-h-[245px] flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#05143C] border border-blue-900 p-2 text-[#00E5FF]">
          <Icon className="h-4 w-4" />
        </div>

        <h4 className="text-sm font-black tracking-[0.22em] uppercase text-white">
          {title}
        </h4>
      </div>

      <div className="border-t border-blue-900/50 pt-4 space-y-3">
        {metrics.map(([label, value]) => (
          <MetricRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>

    <div className="mt-6 border-t border-blue-900/50 pt-3 flex items-center justify-between">
      <span className="text-[9px] font-black text-blue-300 tracking-widest">
        TELEM
      </span>
      <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Online
      </span>
    </div>
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 text-xs">
    <span className="text-blue-200 font-semibold">{label}</span>
    <span className="text-white font-black text-right">{value}</span>
  </div>
);