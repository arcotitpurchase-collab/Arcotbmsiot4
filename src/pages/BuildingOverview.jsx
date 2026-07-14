// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Fan, Lightbulb, Gauge, Cpu, Activity } from "lucide-react";
// import { buildings, systemSummary } from "../data/bmsData";

// function MetricRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between border-b border-blue-900/25 py-2 text-xs">
//       <span className="font-semibold text-blue-200">{label}</span>
//       <strong className="font-extrabold text-white text-sm">{value}</strong>
//     </div>
//   );
// }

// function SystemConsolePanel({ title, icon: Icon, children }) {
//   return (
//     <div className="bg-[#081F5C] border border-[#004AAD] p-4 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[230px]">
//       <div className="absolute top-0 inset-x-0 h-[2px] bg-[#004AAD]" />

//       <div>
//         <div className="flex items-center gap-2 mb-3 border-b border-blue-900/50 pb-2">
//           <div className="bg-[#05143C] p-1.5 border border-[#004AAD] text-[#00E5FF]">
//             <Icon className="h-4 w-4" />
//           </div>

//           <h3 className="text-[12px] font-black tracking-widest uppercase">
//             {title}
//           </h3>
//         </div>

//         <div className="space-y-0.5">{children}</div>
//       </div>

//       <div className="mt-4 border-t border-blue-900/40 pt-2 flex items-center justify-between">
//         <span className="text-[8px] font-bold text-blue-300 uppercase">
//           Telem
//         </span>

//         <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//           Online
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function BuildingOverview() {
//   const { buildingId } = useParams();
//   const building = buildings.find((item) => item.id === buildingId);

//   if (!building) {
//     return (
//       <main className="min-h-screen bg-white px-6 py-10 flex flex-col justify-center items-center">
//         <div className="bg-[#081F5C] border-2 border-[#004AAD] p-8 text-center text-white max-w-md shadow-2xl rounded">
//           <h2 className="text-2xl font-black mb-2">Building Console Offline</h2>
//           <p className="text-xs text-blue-200 mb-6">Requested building identifier is not registered in the SCADA configuration.</p>
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#004AAD] border border-blue-400 text-white font-black text-sm px-6 py-2.5 hover:bg-[#003b8a] transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" /> BACK TO COMMAND CENTER
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const floors = Array.from({ length: building.floors }, (_, i) => building.floors - i);

//   return (
//     <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" /> BACK
//             </Link>
//             <div>
//               <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
//                 SCADA Digital Twin Consoles
//               </p>
//               <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
//                 {building.name} Overview
//               </h1>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
//               <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
//               BUILDING HEALTHY
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Grid Layout */}
//       <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
//         <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          
//           {/* Left Column: Skyscraper Stack */}
//           <div className="flex flex-col">
//             <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-lg flex flex-col h-[780px] overflow-hidden">
              
//               {/* Helipad design */}
//               <div className="text-center pb-3 border-b border-blue-900/60 shrink-0">
//                 <span className="text-[9px] font-black tracking-widest text-blue-300 uppercase">Physical Stack Console</span>
//                 <h2 className="text-lg font-black tracking-wider mt-1">{building.floors} LEVELS REGISTERED</h2>
//               </div>
              
//               {/* Scrollable vertical building slices */}
//               <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-2">
//                 {floors.map((floor) => (
//                   <Link
//                     key={floor}
//                     to={`/building/${building.id}/floor/${floor}`}
//                     className="flex items-center justify-between bg-[#05143C] border border-blue-900 p-3 hover-lift text-white group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded bg-[#004AAD] flex items-center justify-center font-extrabold text-xs text-white border border-blue-400 shrink-0">
//                         {floor}F
//                       </div>
//                       <div>
//                         <span className="text-[9px] text-blue-300 font-bold block uppercase">FLOOR UNIT</span>
//                         <strong className="text-sm font-extrabold tracking-wide">Level {floor}</strong>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
//                       <span className="text-[10px] font-bold text-emerald-400 uppercase">HEALTHY</span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>

//               {/* Building Ground Base decoration */}
//               <div className="mt-4 pt-3 border-t border-blue-900/60 shrink-0 text-center text-xs text-blue-300 font-semibold uppercase tracking-wider">
//                 Ground Terminal Base
//               </div>

//             </div>
//           </div>

//           {/* Right Column: Building-Wide Metrics console */}
//         <div className="flex flex-col space-y-4">
//   {/* Context Heading */}
//   <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg shadow-sm">
//     <div className="flex items-center justify-between">
//       <div>
//         <span className="text-[9px] font-black text-[#004AAD] tracking-[0.22em] uppercase">
//           Live Telemetry
//         </span>

//         <h2 className="text-lg font-black tracking-wide text-[#081F5C] uppercase mt-1">
//           {building.name} Real-time Monitoring
//         </h2>
//       </div>

//       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
//         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//         Online
//       </div>
//     </div>
//   </div>

//   {/* Premium Compact Instrument Panels */}
//   <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
//     {/* HVAC */}
//     <SystemConsolePanel title={systemSummary.ahu.title} icon={Fan}>
//       <MetricRow label="Running AHUs" value={`${systemSummary.ahu.running} Units`} />
//       <MetricRow label="Stopped AHUs" value={`${systemSummary.ahu.stopped} Units`} />
//       <MetricRow label="Avg Temp" value={systemSummary.ahu.temperature} />
//       <MetricRow label="Humidity" value={systemSummary.ahu.humidity} />
//     </SystemConsolePanel>

//     {/* Lighting */}
//     <SystemConsolePanel title={systemSummary.ldb.title} icon={Lightbulb}>
//       <MetricRow label="Lights Active" value={`${systemSummary.ldb.on} zones`} />
//       <MetricRow label="Lights Inactive" value={`${systemSummary.ldb.off} zones`} />
//       <MetricRow label="Load Factor" value={systemSummary.ldb.load} />
//     </SystemConsolePanel>

//     {/* EMS */}
//     <SystemConsolePanel title={systemSummary.ems.title} icon={Gauge}>
//       <MetricRow label="Energy Used" value={systemSummary.ems.kwh} />
//       <MetricRow label="Demand" value={`${systemSummary.ems.kw} kW`} />
//       <MetricRow label="PF" value={systemSummary.ems.pf} />
//       <MetricRow label="Voltage" value={systemSummary.ems.voltage} />
//       <MetricRow label="Current" value={systemSummary.ems.amps} />
//     </SystemConsolePanel>

//     {/* Electrical */}
//     <SystemConsolePanel title="Electrical" icon={Activity}>
//       <MetricRow label="PCC" value="Online" />
//       <MetricRow label="Busduct" value="Healthy" />
//       <MetricRow label="Raising Mains" value="4 Active" />
//       <MetricRow label="Breakers" value="98% Closed" />
//     </SystemConsolePanel>

//     {/* Transformers */}
//     <SystemConsolePanel title="Transformers" icon={Cpu}>
//       <MetricRow label="Running" value="6 Units" />
//       <MetricRow label="Oil Temp" value="62°C" />
//       <MetricRow label="Winding Temp" value="68°C" />
//       <MetricRow label="Load" value="74%" />
//     </SystemConsolePanel>

//     {/* DG */}
//     <SystemConsolePanel title="DG" icon={Gauge}>
//       <MetricRow label="Running" value="2 Units" />
//       <MetricRow label="Fuel" value="78%" />
//       <MetricRow label="Engine Temp" value="84°C" />
//       <MetricRow label="Battery" value="24V" />
//       <MetricRow label="Load" value="58%" />
//     </SystemConsolePanel>

//     {/* Water */}
//     <SystemConsolePanel title="Water" icon={Activity}>
//       <MetricRow label="UG Tank" value="82%" />
//       <MetricRow label="OH Tank" value="76%" />
//       <MetricRow label="Pumps" value="3 Running" />
//       <MetricRow label="Usage" value="18 KL" />
//     </SystemConsolePanel>

//     {/* Lifts */}
//     <SystemConsolePanel title="Lifts" icon={Activity}>
//       <MetricRow label="Online" value="6 Units" />
//       <MetricRow label="Running" value="4 Units" />
//       <MetricRow label="Faulted" value="0" />
//       <MetricRow label="Energy" value="320 kWh" />
//     </SystemConsolePanel>

//     {/* Fire */}
//     <SystemConsolePanel title="Fire Safety" icon={Activity}>
//       <MetricRow label="Panel" value="Online" />
//       <MetricRow label="Alarms" value="0" />
//       <MetricRow label="Fire Pump" value="Standby" />
//       <MetricRow label="Pressure" value="7.2 bar" />
//     </SystemConsolePanel>

//     {/* IAQ */}
//     <SystemConsolePanel title="Air Quality" icon={Fan}>
//       <MetricRow label="CO₂" value="620 ppm" />
//       <MetricRow label="PM2.5" value="18 µg/m³" />
//       <MetricRow label="VOC" value="Normal" />
//       <MetricRow label="Air Quality" value="Good" />
//     </SystemConsolePanel>

//     {/* UPS */}
//     <SystemConsolePanel title="UPS" icon={Cpu}>
//       <MetricRow label="Status" value="Online" />
//       <MetricRow label="Backup" value="42 min" />
//       <MetricRow label="Battery" value="94%" />
//       <MetricRow label="Load" value="61%" />
//     </SystemConsolePanel>

//     {/* Tenant Zones */}
//     <SystemConsolePanel title="Tenant Zones" icon={Activity}>
//       <MetricRow label="Clients" value="40" />
//       <MetricRow label="Occupied" value="36" />
//       <MetricRow label="Vacant" value="4" />
//       <MetricRow label="Alerts" value="0" />
//     </SystemConsolePanel>
//   </div>
// </div>

//         </div>
//       </section>

//       {/* Footer System Diagnostics */}
//       <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
//         <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
//           <p>© 2026 Arcot Industries. All systems operational.</p>
//           <div className="flex items-center gap-2 text-emerald-600">
//             <span className="w-2 h-2 rounded-full bg-emerald-500" />
//             <span>Telemetry Online</span>
//           </div>
//         </div>
//       </footer>
      
//     </main>
//   );
// }


import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fan, Lightbulb, Gauge, Cpu, Activity } from "lucide-react";
import { buildings, systemSummary } from "../data/bmsData";
import prestigeLogo from "../assets/ser-removebg.png";
function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-blue-900/20 py-1.5 text-[11px]">
      <span className="font-medium text-blue-200 truncate">{label}</span>
      <strong className="font-bold text-white text-[12px] whitespace-nowrap">
        {value}
      </strong>
    </div>
  );
}

function SystemConsolePanel({ title, icon: Icon, children }) {
  return (
    <div className="bg-[#081F5C] border border-[#004AAD]/80 p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[190px]">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00E5FF]/70" />

      <div>
        <div className="flex items-center gap-2 mb-2.5 border-b border-blue-900/40 pb-2">
          <div className="bg-[#05143C] p-1.5 border border-[#004AAD]/70 text-[#00E5FF] shrink-0">
            <Icon className="h-3.5 w-3.5" />
          </div>

          <h3 className="text-[11px] font-black tracking-[0.12em] uppercase truncate">
            {title}
          </h3>
        </div>

        <div>{children}</div>
      </div>

      <div className="mt-3 border-t border-blue-900/30 pt-2 flex items-center justify-between">
        <span className="text-[7px] font-bold text-blue-300 uppercase">
          Telem
        </span>

        <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Online
        </span>
      </div>
    </div>
  );
}

export default function BuildingOverview() {
  const { buildingId } = useParams();
  const building = buildings.find((item) => item.id === buildingId);

  if (!building) {
    return (
      
      <main className="min-h-screen bg-white px-6 py-10 flex flex-col justify-center items-center">
       
        <div className="bg-[#081F5C] border-2 border-[#004AAD] p-8 text-center text-white max-w-md shadow-2xl rounded">
          <h2 className="text-2xl font-black mb-2">
            Building Console Offline
          </h2>

          <p className="text-xs text-blue-200 mb-6">
            Requested building identifier is not registered in the SCADA
            configuration.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#004AAD] border border-blue-400 text-white font-black text-sm px-6 py-2.5 hover:bg-[#003b8a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO COMMAND CENTER
          </Link>
        </div>
      </main>
    );
  }

  const floors = Array.from(
    { length: building.floors },
    (_, i) => building.floors - i
  );

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-5 py-3 text-white shadow-md">
        <div className="mx-auto max-w-[1500px] flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2 text-xs font-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              BACK
            </Link>

            <div>
              <p className="text-[8px] font-black tracking-[0.3em] text-blue-300 uppercase">
                SCADA Digital Twin Consoles
              </p>

              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                {building.name} Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              BUILDING HEALTHY
            </span>
          </div>
        </div>
      </header> */}

      {/* Header */}
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

      <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

      <img
        src={prestigeLogo}
        alt="Prestige Group"
        className="h-[60px] w-[110px] object-cover"
      />
    </Link>

    {/* RIGHT */}
    <div className="flex items-center gap-3">

      <button
        onClick={() => window.history.back()}
        className="h-[32px] px-4 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-[#0058d6]"
      >
        Back
      </button>

      <div className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 rounded-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="text-[10px] font-bold tracking-[0.15em]">
          BLE CONNECTED
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

      {/* Main Layout */}
      <section className="flex-1 w-full max-w-[1500px] mx-auto px-4 py-5">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          {/* Left Floors Console */}
          <div className="flex flex-col">
            <div className="bg-[#081F5C] border border-[#004AAD] p-4 text-white shadow-md flex flex-col h-[720px] overflow-hidden">
              <div className="text-center pb-3 border-b border-blue-900/50 shrink-0">
                <span className="text-[8px] font-black tracking-[0.22em] text-blue-300 uppercase">
                  Physical Stack Console
                </span>

                <h2 className="text-base font-black tracking-wider mt-1">
                  {building.floors} LEVELS REGISTERED
                </h2>
              </div>

             <div className="flex-1 overflow-y-auto mt-3 space-y-1.5 pr-0 scrollbar-hide">
  {floors.map((floor) => (
    <Link
      key={floor}
      to={`/building/${building.id}/floor/${floor}`}
      className="flex items-center justify-between bg-[#05143C] border border-blue-900/70 px-3 py-2 text-white group hover:bg-[#0A276E] transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-[#004AAD] flex items-center justify-center font-black text-[11px] text-white border border-blue-400 shrink-0">
          {floor}F
        </div>

        <strong className="text-xs font-bold tracking-wide">
          Floor {floor}
        </strong>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

        <span className="text-[8px] font-bold text-emerald-400 uppercase">
          Healthy
        </span>
      </div>
    </Link>
  ))}
</div>

              <div className="mt-3 pt-3 border-t border-blue-900/50 shrink-0 text-center text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
                Ground Terminal Base
              </div>
            </div>
          </div>

          {/* Right Monitoring Console */}
          <div className="flex flex-col space-y-4">
            <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] font-black text-[#004AAD] tracking-[0.22em] uppercase">
                    Live Telemetry
                  </span>

                  <h2 className="text-lg font-black tracking-wide text-[#081F5C] uppercase mt-1">
                    {building.name} Real-time Monitoring
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              <SystemConsolePanel title={systemSummary.ahu.title} icon={Fan}>
                <MetricRow
                  label="Running AHUs"
                  value={`${systemSummary.ahu.running} Units`}
                />
                <MetricRow
                  label="Stopped AHUs"
                  value={`${systemSummary.ahu.stopped} Units`}
                />
                <MetricRow
                  label="Avg Temp"
                  value={systemSummary.ahu.temperature}
                />
                <MetricRow label="Humidity" value={systemSummary.ahu.humidity} />
              </SystemConsolePanel>

              <SystemConsolePanel title={systemSummary.ldb.title} icon={Lightbulb}>
                <MetricRow
                  label="Lights Active"
                  value={`${systemSummary.ldb.on} zones`}
                />
                <MetricRow
                  label="Lights Inactive"
                  value={`${systemSummary.ldb.off} zones`}
                />
                <MetricRow label="Load Factor" value={systemSummary.ldb.load} />
              </SystemConsolePanel>

              <SystemConsolePanel title={systemSummary.ems.title} icon={Gauge}>
                <MetricRow label="Energy Used" value={systemSummary.ems.kwh} />
                <MetricRow
                  label="Demand"
                  value={`${systemSummary.ems.kw} kW`}
                />
                <MetricRow label="PF" value={systemSummary.ems.pf} />
                <MetricRow label="Voltage" value={systemSummary.ems.voltage} />
                <MetricRow label="Current" value={systemSummary.ems.amps} />
              </SystemConsolePanel>

              <SystemConsolePanel title="Electrical" icon={Activity}>
                <MetricRow label="PCC" value="Online" />
                <MetricRow label="Busduct" value="Healthy" />
                <MetricRow label="Raising Mains" value="4 Active" />
                <MetricRow label="Breakers" value="98% Closed" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Transformers" icon={Cpu}>
                <MetricRow label="Running" value="6 Units" />
                <MetricRow label="Oil Temp" value="62°C" />
                <MetricRow label="Winding Temp" value="68°C" />
                <MetricRow label="Load" value="74%" />
              </SystemConsolePanel>

              <SystemConsolePanel title="DG" icon={Gauge}>
                <MetricRow label="Running" value="2 Units" />
                <MetricRow label="Fuel" value="78%" />
                <MetricRow label="Engine Temp" value="84°C" />
                <MetricRow label="Battery" value="24V" />
                <MetricRow label="Load" value="58%" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Water" icon={Activity}>
                <MetricRow label="UG Tank" value="82%" />
                <MetricRow label="OH Tank" value="76%" />
                <MetricRow label="Pumps" value="3 Running" />
                <MetricRow label="Usage" value="18 KL" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Lifts" icon={Activity}>
                <MetricRow label="Online" value="6 Units" />
                <MetricRow label="Running" value="4 Units" />
                <MetricRow label="Faulted" value="0" />
                <MetricRow label="Energy" value="320 kWh" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Fire Safety" icon={Activity}>
                <MetricRow label="Panel" value="Online" />
                <MetricRow label="Alarms" value="0" />
                <MetricRow label="Fire Pump" value="Standby" />
                <MetricRow label="Pressure" value="7.2 bar" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Air Quality" icon={Fan}>
                <MetricRow label="CO₂" value="620 ppm" />
                <MetricRow label="PM2.5" value="18 µg/m³" />
                <MetricRow label="VOC" value="Normal" />
                <MetricRow label="Air Quality" value="Good" />
              </SystemConsolePanel>

              <SystemConsolePanel title="UPS" icon={Cpu}>
                <MetricRow label="Status" value="Online" />
                <MetricRow label="Backup" value="42 min" />
                <MetricRow label="Battery" value="94%" />
                <MetricRow label="Load" value="61%" />
              </SystemConsolePanel>

              <SystemConsolePanel title="Tenant Zones" icon={Activity}>
                <MetricRow label="Clients" value="40" />
                <MetricRow label="Occupied" value="36" />
                <MetricRow label="Vacant" value="4" />
                <MetricRow label="Alerts" value="0" />
              </SystemConsolePanel>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 border-t border-slate-200 py-5 px-5 text-slate-500 text-xs">
        <div className="mx-auto max-w-[1500px] flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>

          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Telemetry Online</span>
          </div>
        </div>
      </footer>
    </main>
  );
}