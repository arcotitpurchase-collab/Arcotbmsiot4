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






// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Fan, Lightbulb, Gauge, Cpu, Activity } from "lucide-react";
// import { buildings, systemSummary } from "../data/bmsData";
// import prestigeLogo from "../assets/ser-removebg.png";
// function MetricRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-blue-900/20 py-1.5 text-[11px]">
//       <span className="font-medium text-blue-200 truncate">{label}</span>
//       <strong className="font-bold text-white text-[12px] whitespace-nowrap">
//         {value}
//       </strong>
//     </div>
//   );
// }

// function SystemConsolePanel({ title, icon: Icon, children }) {
//   return (
//     <div className="bg-[#081F5C] border border-[#004AAD]/80 p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[190px]">
//       <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00E5FF]/70" />

//       <div>
//         <div className="flex items-center gap-2 mb-2.5 border-b border-blue-900/40 pb-2">
//           <div className="bg-[#05143C] p-1.5 border border-[#004AAD]/70 text-[#00E5FF] shrink-0">
//             <Icon className="h-3.5 w-3.5" />
//           </div>

//           <h3 className="text-[11px] font-black tracking-[0.12em] uppercase truncate">
//             {title}
//           </h3>
//         </div>

//         <div>{children}</div>
//       </div>

//       <div className="mt-3 border-t border-blue-900/30 pt-2 flex items-center justify-between">
//         <span className="text-[7px] font-bold text-blue-300 uppercase">
//           Telem
//         </span>

//         <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-400">
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
//           <h2 className="text-2xl font-black mb-2">
//             Building Console Offline
//           </h2>

//           <p className="text-xs text-blue-200 mb-6">
//             Requested building identifier is not registered in the SCADA
//             configuration.
//           </p>

//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 bg-[#004AAD] border border-blue-400 text-white font-black text-sm px-6 py-2.5 hover:bg-[#003b8a] transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             BACK TO COMMAND CENTER
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const floors = Array.from(
//     { length: building.floors },
//     (_, i) => building.floors - i
//   );

//   return (
//     <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
//       {/* Header */}
//       {/* <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-5 py-3 text-white shadow-md">
//         <div className="mx-auto max-w-[1500px] flex flex-col sm:flex-row items-center gap-4 justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2 text-xs font-black transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               BACK
//             </Link>

//             <div>
//               <p className="text-[8px] font-black tracking-[0.3em] text-blue-300 uppercase">
//                 SCADA Digital Twin Consoles
//               </p>

//               <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
//                 {building.name} Overview
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-white">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//               BUILDING HEALTHY
//             </span>
//           </div>
//         </div>
//       </header> */}

//       {/* Header */}
// <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//   <div className="h-full mx-auto max-w-7xl flex justify-between items-center">

//     {/* LEFT */}
//     <Link
//       to="/"
//       className="ml-1 flex items-center cursor-pointer no-underline"
//     >
//       <div className="flex flex-col justify-center">
//         <h1 className="text-[26px] font-semibold tracking-[0.18em] text-white leading-none uppercase">
//           ARCOT
//           <span className="text-[#67E8F9] ml-2">
//             IIoT 1.0
//           </span>
//         </h1>

//         <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-blue-300 font-medium">
//           Industrial Internet of Things
//         </span>
//       </div>

//       <div className="h-[58px] border-l border-[#004AAD] ml-5"></div>

//       <img
//         src={prestigeLogo}
//         alt="Prestige Group"
//         className="h-[60px] w-[110px] object-cover"
//       />
//     </Link>

//     {/* RIGHT */}
//     <div className="flex items-center gap-3">

//       <Link
//         to="/"
//         replace
//         className="h-[32px] px-4 flex items-center justify-center bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-[#0058d6]"
//       >
//         Back
//       </Link>

//       <div className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3 py-1.5 rounded-sm">
//         <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
//         <span className="text-[10px] font-bold tracking-[0.15em]">
//           BLE CONNECTED
//         </span>
//       </div>

//       <button
//         onClick={() => {
//           localStorage.removeItem("bmsLoggedIn");
//           window.location.href = "/auth";
//         }}
//         className="h-[32px] px-4 bg-red-600 border border-red-400 text-white text-[10px] font-black tracking-[0.15em] uppercase hover:bg-red-700"
//       >
//         Logout
//       </button>

//     </div>

//   </div>
// </header>

//       {/* Main Layout */}
//       <section className="flex-1 w-full max-w-[1500px] mx-auto px-4 py-5">
//         <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
//           {/* Left Floors Console */}
//           <div className="flex flex-col">
//             <div className="bg-[#081F5C] border border-[#004AAD] p-4 text-white shadow-md flex flex-col h-[720px] overflow-hidden">
//               <div className="text-center pb-3 border-b border-blue-900/50 shrink-0">
//                 <span className="text-[8px] font-black tracking-[0.22em] text-blue-300 uppercase">
//                   Physical Stack Console
//                 </span>

//                 <h2 className="text-base font-black tracking-wider mt-1">
//                   {building.floors} LEVELS REGISTERED
//                 </h2>
//               </div>

//              <div className="flex-1 overflow-y-auto mt-3 space-y-1.5 pr-0 scrollbar-hide">
//   {floors.map((floor) => (
//     <Link
//       key={floor}
//       to={`/building/${building.id}/floor/${floor}`}
//       className="flex items-center justify-between bg-[#05143C] border border-blue-900/70 px-3 py-2 text-white group hover:bg-[#0A276E] transition-colors"
//     >
//       <div className="flex items-center gap-2.5">
//         <div className="w-7 h-7 bg-[#004AAD] flex items-center justify-center font-black text-[11px] text-white border border-blue-400 shrink-0">
//           {floor}F
//         </div>

//         <strong className="text-xs font-bold tracking-wide">
//           Floor {floor}
//         </strong>
//       </div>

//       <div className="flex items-center gap-1.5">
//         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

//         <span className="text-[8px] font-bold text-emerald-400 uppercase">
//           Healthy
//         </span>
//       </div>
//     </Link>
//   ))}
// </div>

//               <div className="mt-3 pt-3 border-t border-blue-900/50 shrink-0 text-center text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
//                 Ground Terminal Base
//               </div>
//             </div>
//           </div>

//           {/* Right Monitoring Console */}
//           <div className="flex flex-col space-y-4">
//             <div className="bg-white border border-slate-200 px-5 py-4 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between gap-4">
//                 <div>
//                   <span className="text-[9px] font-black text-[#004AAD] tracking-[0.22em] uppercase">
//                     Live Telemetry
//                   </span>

//                   <h2 className="text-lg font-black tracking-wide text-[#081F5C] uppercase mt-1">
//                     {building.name} Real-time Monitoring
//                   </h2>
//                 </div>

//                 <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase shrink-0">
//                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//                   Online
//                 </div>
//               </div>
//             </div>

//             <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
//               <SystemConsolePanel title={systemSummary.ahu.title} icon={Fan}>
//                 <MetricRow
//                   label="Running AHUs"
//                   value={`${systemSummary.ahu.running} Units`}
//                 />
//                 <MetricRow
//                   label="Stopped AHUs"
//                   value={`${systemSummary.ahu.stopped} Units`}
//                 />
//                 <MetricRow
//                   label="Avg Temp"
//                   value={systemSummary.ahu.temperature}
//                 />
//                 <MetricRow label="Humidity" value={systemSummary.ahu.humidity} />
//               </SystemConsolePanel>

//               <SystemConsolePanel title={systemSummary.ldb.title} icon={Lightbulb}>
//                 <MetricRow
//                   label="Lights Active"
//                   value={`${systemSummary.ldb.on} zones`}
//                 />
//                 <MetricRow
//                   label="Lights Inactive"
//                   value={`${systemSummary.ldb.off} zones`}
//                 />
//                 <MetricRow label="Load Factor" value={systemSummary.ldb.load} />
//               </SystemConsolePanel>

//               <SystemConsolePanel title={systemSummary.ems.title} icon={Gauge}>
//                 <MetricRow label="Energy Used" value={systemSummary.ems.kwh} />
//                 <MetricRow
//                   label="Demand"
//                   value={`${systemSummary.ems.kw} kW`}
//                 />
//                 <MetricRow label="PF" value={systemSummary.ems.pf} />
//                 <MetricRow label="Voltage" value={systemSummary.ems.voltage} />
//                 <MetricRow label="Current" value={systemSummary.ems.amps} />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Electrical" icon={Activity}>
//                 <MetricRow label="PCC" value="Online" />
//                 <MetricRow label="Busduct" value="Healthy" />
//                 <MetricRow label="Raising Mains" value="4 Active" />
//                 <MetricRow label="Breakers" value="98% Closed" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Transformers" icon={Cpu}>
//                 <MetricRow label="Running" value="6 Units" />
//                 <MetricRow label="Oil Temp" value="62°C" />
//                 <MetricRow label="Winding Temp" value="68°C" />
//                 <MetricRow label="Load" value="74%" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="DG" icon={Gauge}>
//                 <MetricRow label="Running" value="2 Units" />
//                 <MetricRow label="Fuel" value="78%" />
//                 <MetricRow label="Engine Temp" value="84°C" />
//                 <MetricRow label="Battery" value="24V" />
//                 <MetricRow label="Load" value="58%" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Water" icon={Activity}>
//                 <MetricRow label="UG Tank" value="82%" />
//                 <MetricRow label="OH Tank" value="76%" />
//                 <MetricRow label="Pumps" value="3 Running" />
//                 <MetricRow label="Usage" value="18 KL" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Lifts" icon={Activity}>
//                 <MetricRow label="Online" value="6 Units" />
//                 <MetricRow label="Running" value="4 Units" />
//                 <MetricRow label="Faulted" value="0" />
//                 <MetricRow label="Energy" value="320 kWh" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Fire Safety" icon={Activity}>
//                 <MetricRow label="Panel" value="Online" />
//                 <MetricRow label="Alarms" value="0" />
//                 <MetricRow label="Fire Pump" value="Standby" />
//                 <MetricRow label="Pressure" value="7.2 bar" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Air Quality" icon={Fan}>
//                 <MetricRow label="CO₂" value="620 ppm" />
//                 <MetricRow label="PM2.5" value="18 µg/m³" />
//                 <MetricRow label="VOC" value="Normal" />
//                 <MetricRow label="Air Quality" value="Good" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="UPS" icon={Cpu}>
//                 <MetricRow label="Status" value="Online" />
//                 <MetricRow label="Backup" value="42 min" />
//                 <MetricRow label="Battery" value="94%" />
//                 <MetricRow label="Load" value="61%" />
//               </SystemConsolePanel>

//               <SystemConsolePanel title="Tenant Zones" icon={Activity}>
//                 <MetricRow label="Clients" value="40" />
//                 <MetricRow label="Occupied" value="36" />
//                 <MetricRow label="Vacant" value="4" />
//                 <MetricRow label="Alerts" value="0" />
//               </SystemConsolePanel>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-slate-100 border-t border-slate-200 py-5 px-5 text-slate-500 text-xs">
//         <div className="mx-auto max-w-[1500px] flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
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





import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  Cpu,
  Download,
  Fan,
  FileJson,
  Gauge,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { buildings, systemSummary } from "../data/bmsData";
import prestigeLogo from "../assets/ser-removebg.png";
import { tempApi } from "../tempAdminApi";

const RATE_PER_KWH = 8.5;

const PERIOD_MULTIPLIERS = {
  hourly: 0.045,
  daily: 1,
  weekly: 7,
  monthly: 30,
};

const PERIOD_LABELS = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  custom: "Custom",
};

const SYSTEMS = [
  {
    id: "ahu",
    title: "AHU / Chillers",
    icon: Fan,
    status: "Healthy",
    tone: "green",
    baseConsumption: 4860,
    currentLoad: 428,
    energyShare: 31,
    efficiency: 92,
    readings: [
      { label: "Running", value: `${systemSummary.ahu.running} Units` },
      { label: "Avg Temp", value: systemSummary.ahu.temperature },
      { label: "Humidity", value: systemSummary.ahu.humidity },
    ],
  },
  {
    id: "lighting",
    title: "LDB / Lighting",
    icon: Lightbulb,
    status: "Healthy",
    tone: "green",
    baseConsumption: 2940,
    currentLoad: 236,
    energyShare: 19,
    efficiency: 89,
    readings: [
      { label: "Active Zones", value: `${systemSummary.ldb.on}` },
      { label: "Inactive Zones", value: `${systemSummary.ldb.off}` },
      { label: "Load Factor", value: systemSummary.ldb.load },
    ],
  },
  {
    id: "ems",
    title: "EMS / Energy",
    icon: Gauge,
    status: "Healthy",
    tone: "green",
    baseConsumption: 2480,
    currentLoad: 198,
    energyShare: 16,
    efficiency: 98,
    readings: [
      { label: "Energy Used", value: systemSummary.ems.kwh },
      { label: "Demand", value: `${systemSummary.ems.kw ?? 1284} kW` },
      { label: "Power Factor", value: systemSummary.ems.pf },
    ],
  },
  {
    id: "electrical",
    title: "Electrical Distribution",
    icon: Activity,
    status: "Attention",
    tone: "amber",
    baseConsumption: 1710,
    currentLoad: 136,
    energyShare: 11,
    efficiency: 94,
    readings: [
      { label: "PCC Panels", value: "4 Online" },
      { label: "Busduct", value: "Healthy" },
      { label: "Breakers", value: "98% Closed" },
    ],
  },
  {
    id: "transformers",
    title: "Transformers",
    icon: Cpu,
    status: "Healthy",
    tone: "green",
    baseConsumption: 1240,
    currentLoad: 102,
    energyShare: 8,
    efficiency: 96,
    readings: [
      { label: "Running", value: "6 Units" },
      { label: "Oil Temp", value: "62°C" },
      { label: "Load", value: "74%" },
    ],
  },
  {
    id: "dg",
    title: "Diesel Generators",
    icon: Zap,
    status: "Standby",
    tone: "blue",
    baseConsumption: 760,
    currentLoad: 58,
    energyShare: 5,
    efficiency: 85,
    readings: [
      { label: "Running", value: "2 Units" },
      { label: "Fuel", value: "78%" },
      { label: "Load", value: "58%" },
    ],
  },
  {
    id: "water",
    title: "Water Management",
    icon: Activity,
    status: "Healthy",
    tone: "green",
    baseConsumption: 520,
    currentLoad: 42,
    energyShare: 3,
    efficiency: 91,
    readings: [
      { label: "UG Tank", value: "82%" },
      { label: "OH Tank", value: "76%" },
      { label: "Pumps", value: "3 Running" },
    ],
  },
  {
    id: "lifts",
    title: "Lifts",
    icon: Activity,
    status: "Healthy",
    tone: "green",
    baseConsumption: 470,
    currentLoad: 38,
    energyShare: 3,
    efficiency: 93,
    readings: [
      { label: "Online", value: "6 Units" },
      { label: "Running", value: "4 Units" },
      { label: "Faulted", value: "0" },
    ],
  },
  {
    id: "fire",
    title: "Fire Safety",
    icon: AlertTriangle,
    status: "Healthy",
    tone: "green",
    baseConsumption: 210,
    currentLoad: 18,
    energyShare: 1,
    efficiency: 99,
    readings: [
      { label: "Panel", value: "Online" },
      { label: "Alarms", value: "0" },
      { label: "Pressure", value: "7.2 bar" },
    ],
  },
  {
    id: "air",
    title: "Air Quality",
    icon: Fan,
    status: "Healthy",
    tone: "green",
    baseConsumption: 185,
    currentLoad: 14,
    energyShare: 1,
    efficiency: 95,
    readings: [
      { label: "CO₂", value: "620 ppm" },
      { label: "PM2.5", value: "18 µg/m³" },
      { label: "Quality", value: "Good" },
    ],
  },
  {
    id: "ups",
    title: "UPS",
    icon: Cpu,
    status: "Healthy",
    tone: "green",
    baseConsumption: 330,
    currentLoad: 26,
    energyShare: 2,
    efficiency: 97,
    readings: [
      { label: "Status", value: "Online" },
      { label: "Backup", value: "42 min" },
      { label: "Battery", value: "94%" },
    ],
  },
  {
    id: "tenant",
    title: "Tenant Zones",
    icon: Building2,
    status: "Healthy",
    tone: "green",
    baseConsumption: 295,
    currentLoad: 24,
    energyShare: 2,
    efficiency: 94,
    readings: [
      { label: "Clients", value: "40" },
      { label: "Occupied", value: "36" },
      { label: "Alerts", value: "0" },
    ],
  },
];

const HOURLY_PATTERN = [
  0.34, 0.31, 0.29, 0.28, 0.27, 0.31, 0.39, 0.51,
  0.63, 0.72, 0.78, 0.83, 0.88, 0.85, 0.81, 0.84,
  0.91, 0.98, 0.94, 0.86, 0.75, 0.62, 0.49, 0.39,
];

function StatusBadge({ tone, children }) {
  const toneClass = {
    green: "border-emerald-300 bg-emerald-50 text-emerald-700",
    amber: "border-amber-300 bg-amber-50 text-amber-700",
    blue: "border-blue-300 bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-1 text-[7px] font-black uppercase tracking-[0.1em] ${toneClass[tone]}`}
    >
      <span
        className={`h-1.5 w-1.5 ${
          tone === "amber"
            ? "bg-amber-500"
            : tone === "blue"
              ? "bg-blue-500"
              : "bg-emerald-500"
        }`}
      />
      {children}
    </span>
  );
}

function SystemCard({ system }) {
  const Icon = system.icon;

  const statusStyles = {
    green: {
      dot: "bg-emerald-400",
      text: "text-emerald-200",
      border: "border-emerald-400/30",
      background: "bg-emerald-400/10",
      line: "bg-emerald-400",
    },
    amber: {
      dot: "bg-amber-400",
      text: "text-amber-200",
      border: "border-amber-400/30",
      background: "bg-amber-400/10",
      line: "bg-amber-400",
    },
    blue: {
      dot: "bg-cyan-300",
      text: "text-cyan-200",
      border: "border-cyan-300/30",
      background: "bg-cyan-300/10",
      line: "bg-cyan-300",
    },
  };

  const status = statusStyles[system.tone] ?? statusStyles.green;

  const primaryMetrics = [
    {
      label: "Current Load",
      value: system.currentLoad.toLocaleString("en-IN"),
      unit: "kW",
      valueClass: "text-cyan-300",
    },
    {
      label: "Consumption",
      value: system.baseConsumption.toLocaleString("en-IN"),
      unit: "kWh",
      valueClass: "text-white",
    },
  ];

  return (
    <article className="group relative flex h-full min-h-[255px] flex-col overflow-hidden border border-[#1A5A9B] bg-[linear-gradient(155deg,#0B3778_0%,#08295F_48%,#061D47_100%)] text-white shadow-[0_12px_26px_rgba(3,35,90,0.18),inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3AA7FF] hover:shadow-[0_18px_34px_rgba(3,45,105,0.26)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(34,211,238,0.13),transparent_31%)]" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#1BB8E6]" />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 px-5 pb-3.5 pt-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-cyan-300/25 bg-white/[0.08] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Icon size={28} strokeWidth={2.1} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-black uppercase tracking-[0.065em] text-white">
                {system.title}
              </h3>

              <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-blue-200/60">
                Live Operational Data
              </p>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.08em] ${status.border} ${status.background} ${status.text}`}
          >
            <span className={`h-1.5 w-1.5 ${status.dot}`} />
            {system.status}
          </span>
        </header>

        <div className="mx-5 grid grid-cols-2 gap-x-5 py-2">
          {primaryMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[8px] font-black uppercase tracking-[0.1em] text-blue-100/60">
                  {metric.label}
                </span>

                <span className="shrink-0 text-[8px] font-bold uppercase text-blue-200/50">
                  {metric.unit}
                </span>
              </div>

              <p
                className={`mt-1.5 truncate text-[21px] font-black leading-none tracking-tight ${metric.valueClass}`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-5 my-2 h-px bg-white/8" />

        <div className="flex flex-1 flex-col justify-center px-5 py-2">
          {system.readings.slice(0, 3).map((reading) => (
            <div
              key={reading.label}
              className="flex min-h-[32px] items-center justify-between gap-4 py-1.5"
            >
              <span className="min-w-0 truncate text-[9px] font-bold uppercase tracking-[0.065em] text-blue-100/65">
                {reading.label}
              </span>

              <span className="shrink-0 text-right text-[11px] font-black text-white">
                {reading.value}
              </span>
            </div>
          ))}
        </div>

        <footer className="px-5 pb-4 pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-black uppercase tracking-[0.11em] text-blue-200/55">
              Operational Efficiency
            </span>

            <span className="text-[10px] font-black text-cyan-300">
              {system.efficiency}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden bg-white/10">
            <div
              className={`h-full ${status.line}`}
              style={{ width: `${system.efficiency}%` }}
            />
          </div>
        </footer>
      </div>
    </article>
  );
}

function ViewSelector({
  activeView,
  onChange,
  canViewAnalytics = false,
}) {
  return (
    <div className="flex border border-[#004AAD] bg-white">
      <button
        type="button"
        onClick={() => onChange("monitoring")}
        className={`flex h-[36px] items-center gap-2 px-4 text-[9px] font-black uppercase tracking-[0.12em] transition ${
          activeView === "monitoring"
            ? "bg-[#081F5C] text-white"
            : "text-[#081F5C] hover:bg-blue-50"
        }`}
      >
        <Building2 size={13} />
        Floors & Systems
      </button>

      <button
        type="button"
        onClick={() => {
          if (canViewAnalytics) {
            onChange("analytics");
          }
        }}
        disabled={!canViewAnalytics}
        title={
          canViewAnalytics
            ? "Open analytical view"
            : "Your account does not have report access"
        }
        className={`flex h-[36px] items-center gap-2 border-l border-[#004AAD] px-4 text-[9px] font-black uppercase tracking-[0.12em] transition ${
          !canViewAnalytics
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : activeView === "analytics"
              ? "bg-[#004AAD] text-white"
              : "text-[#004AAD] hover:bg-blue-50"
        }`}
      >
        <BarChart3 size={13} />
        Analytic View
      </button>
    </div>
  );
}

function FloorMatrix({ building, floors }) {
  return (
    <aside className="grid grid-rows-[auto_auto_auto] overflow-hidden border border-[#174B89] bg-[#071B47] text-white shadow-[0_14px_34px_rgba(8,31,92,0.16)]">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#0A2A68] px-4 py-3.5">
        <div>
          <p className="text-[7px] font-black uppercase tracking-[0.2em] text-cyan-300">
            Floor Directory
          </p>

          <h3 className="mt-1 text-[14px] font-black uppercase tracking-wide">
            {building.floors} Building Levels
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center border border-cyan-400/40 bg-[#004AAD] text-cyan-200">
          <Building2 size={17} />
        </div>
      </header>

      <div className="px-3 py-3">
        <div className="space-y-2">
          {floors.map((floor, index) => {
            const hasAlert = index === 2;

            return (
              <Link
                key={floor}
                to={`/building/${building.id}/floor/${floor}`}
                className="group flex h-[52px] items-center justify-between border border-white/10 bg-[#0A255C] px-3 text-white transition duration-200 hover:border-cyan-300 hover:bg-[#0D347D]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-10 shrink-0 items-center justify-center border border-cyan-400/30 bg-[#004AAD] text-[10px] font-black">
                    {floor}F
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-black uppercase tracking-[0.06em]">
                      Floor {floor}
                    </p>

                    <p className="mt-0.5 truncate text-[7px] text-blue-200">
                      {720 + index * 28} kWh
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 ${
                      hasAlert ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />

                  <span
                    className={`text-[7px] font-black uppercase tracking-[0.06em] ${
                      hasAlert ? "text-amber-300" : "text-emerald-300"
                    }`}
                  >
                    {hasAlert ? "Alert" : "Online"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="grid grid-cols-2 border-t border-white/10 bg-[#06163A]">
        <div className="border-r border-white/10 px-4 py-2.5">
          <p className="text-[7px] font-black uppercase tracking-[0.1em] text-blue-300">
            Online Floors
          </p>
          <p className="mt-1 text-[13px] font-black text-white">
            {Math.max(building.floors - 1, 0)}
          </p>
        </div>

        <div className="px-4 py-2.5">
          <p className="text-[7px] font-black uppercase tracking-[0.1em] text-blue-300">
            Active Alerts
          </p>
          <p className="mt-1 text-[13px] font-black text-amber-300">
            1
          </p>
        </div>
      </footer>
    </aside>
  );
}

function PeriodSelector({ period, onPeriodChange }) {
  return (
    <div className="flex flex-wrap border border-[#004AAD] bg-white">
      {["hourly", "daily", "weekly", "monthly", "custom"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPeriodChange(item)}
          className={`h-[34px] border-r border-[#004AAD] px-4 text-[8px] font-black uppercase tracking-[0.1em] last:border-r-0 ${
            period === item
              ? "bg-[#004AAD] text-white"
              : "bg-white text-[#004AAD] hover:bg-blue-50"
          }`}
        >
          {PERIOD_LABELS[item]}
        </button>
      ))}
    </div>
  );
}

function SummaryCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="border border-[#CCD8E5] bg-white px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-[23px] font-black tracking-tight text-[#081F5C]">
            {value}
          </p>
          <p className="mt-1 text-[9px] text-slate-500">{helper}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center border border-blue-200 bg-[#F2F7FC] text-[#004AAD]">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

function TrendChart({ values, labels }) {
  const width = 1200;
  const height = 420;
  const left = 62;
  const right = 1170;
  const top = 28;
  const bottom = 350;
  const max = Math.max(...values, 1);

  const points = values.map((value, index) => {
    const x =
      left +
      (index / Math.max(values.length - 1, 1)) *
        (right - left);
    const y = bottom - (value / max) * (bottom - top);
    return { x, y, value, index };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {[0, 1, 2, 3, 4].map((line) => {
        const y = top + line * ((bottom - top) / 4);

        return (
          <line
            key={line}
            x1={left}
            x2={right}
            y1={y}
            y2={y}
            stroke="rgba(8,31,92,0.12)"
            strokeDasharray="4 4"
          />
        );
      })}

      <polyline
        points={points.map((point) => `${point.x},${point.y}`).join(" ")}
        fill="none"
        stroke="#004AAD"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((point) => (
        <g key={point.index}>
          <circle cx={point.x} cy={point.y} r="3.5" fill="#00B8E6">
            <title>{`${labels[point.index]} — ${point.value.toLocaleString(
              "en-IN"
            )} kWh`}</title>
          </circle>

          {(values.length <= 12 || point.index % 3 === 0) && (
            <text
              x={point.x}
              y="392"
              textAnchor="middle"
              fontSize="9"
              fill="#64748B"
            >
              {labels[point.index]}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function getCustomDayCount(startDate, endDate) {
  if (!startDate || !endDate) return 1;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 1;
  }

  const difference = end.getTime() - start.getTime();

  if (difference < 0) return 1;

  return Math.floor(difference / 86400000) + 1;
}

function AnalyticsView({ building }) {
  const [period, setPeriod] = useState("daily");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");
  const [appliedStartDate, setAppliedStartDate] = useState("2026-07-01");
  const [appliedEndDate, setAppliedEndDate] = useState("2026-07-31");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const customDays = useMemo(
    () => getCustomDayCount(appliedStartDate, appliedEndDate),
    [appliedStartDate, appliedEndDate]
  );

  const multiplier =
    period === "custom"
      ? customDays
      : PERIOD_MULTIPLIERS[period];

  const rows = useMemo(() => {
    const sourceSystems =
      selectedSystem === "all"
        ? SYSTEMS
        : SYSTEMS.filter((system) => system.id === selectedSystem);

    return sourceSystems.map((system) => {
      const consumedEnergy = Number(
        (system.baseConsumption * multiplier).toFixed(2)
      );

      const charge = Number(
        (consumedEnergy * RATE_PER_KWH).toFixed(2)
      );

      return {
        ...system,
        consumedEnergy,
        charge,
      };
    });
  }, [multiplier, selectedSystem]);

  const summary = useMemo(() => {
    const totalConsumption = rows.reduce(
      (total, system) => total + system.consumedEnergy,
      0
    );

    const totalCharges = rows.reduce(
      (total, system) => total + system.charge,
      0
    );

    return {
      totalConsumption,
      totalCharges,
    };
  }, [rows]);

  const maxConsumption = Math.max(
    ...rows.map((system) => system.consumedEnergy),
    1
  );

  const chartData = useMemo(() => {
    const activeSystems =
      selectedSystem === "all"
        ? SYSTEMS
        : SYSTEMS.filter((system) => system.id === selectedSystem);

    const totalDaily = activeSystems.reduce(
      (sum, system) => sum + system.baseConsumption,
      0
    );

    if (period === "hourly") {

      return {
        labels: HOURLY_PATTERN.map((_, index) =>
          `${String(index).padStart(2, "0")}h`
        ),
        values: HOURLY_PATTERN.map((weight) =>
          Number((totalDaily * weight * 0.055).toFixed(2))
        ),
      };
    }

    if (period === "daily") {
      const factors = [0.96, 1, 1.018, 0.995, 1.042, 0.943, 0.909];
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: factors.map((factor) =>
          Number((totalDaily * factor).toFixed(2))
        ),
      };
    }

    if (period === "weekly") {
      const factors = [6.94, 7.11, 7.35, 7.52];
      return {
        labels: ["W1", "W2", "W3", "W4"],
        values: factors.map((factor) =>
          Number((totalDaily * factor).toFixed(2))
        ),
      };
    }

    if (period === "monthly") {
      const factors = [
        27.7, 26.65, 28.31, 28.59, 29.61, 30.04,
        30.53, 30.29, 29.18, 28.78, 28.43, 27.95,
      ];

      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        values: factors.map((factor) =>
          Number((totalDaily * factor).toFixed(2))
        ),
      };
    }

    const days = Math.min(customDays, 12);

    return {
      labels: Array.from({ length: days }, (_, index) => `D${index + 1}`),
      values: Array.from(
        { length: days },
        (_, index) =>
          Number(
            (
              totalDaily *
              (0.95 + index * 0.018 + (index % 3) * 0.021)
            ).toFixed(2)
          )
      ),
    };
  }, [period, customDays, selectedSystem]);

  const trendInsights = useMemo(() => {
    const values = chartData.values;
    const total = values.reduce((sum, value) => sum + value, 0);
    const peakValue = Math.max(...values);
    const lowestValue = Math.min(...values);
    const peakIndex = values.indexOf(peakValue);
    const lowestIndex = values.indexOf(lowestValue);
    const averageValue = values.length ? total / values.length : 0;

    return {
      peakValue,
      peakLabel: chartData.labels[peakIndex] ?? "-",
      lowestValue,
      lowestLabel: chartData.labels[lowestIndex] ?? "-",
      averageValue,
      estimatedCharge: summary.totalCharges,
    };
  }, [chartData, summary.totalCharges]);

  const selectedSystemLabel =
    selectedSystem === "all"
      ? "All Systems"
      : SYSTEMS.find((system) => system.id === selectedSystem)?.title ??
        "All Systems";

  const periodDescription =
    period === "custom"
      ? `${appliedStartDate} to ${appliedEndDate}`
      : PERIOD_LABELS[period];

  const downloadFile = (content, type, filename) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    const rowsForCsv = [
      [
        "System Name",
        "Period",
        "Consumed Energy (kWh)",
        "Rate per kWh (INR)",
        "Total Charge (INR)",
      ],
      ...rows.map((system) => [
        system.title,
        periodDescription,
        system.consumedEnergy,
        RATE_PER_KWH,
        system.charge,
      ]),
      [
        "TOTAL",
        periodDescription,
        summary.totalConsumption,
        "",
        summary.totalCharges,
      ],
    ];

    const csv = rowsForCsv
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    downloadFile(
      csv,
      "text/csv;charset=utf-8;",
      `${building.id}-${selectedSystem}-${period}-consumption-charges.csv`
    );
  };

  const downloadJson = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      period: periodDescription,
      selectedSystem: selectedSystemLabel,
      electricityRatePerKwhInr: RATE_PER_KWH,
      totals: {
        consumedEnergyKwh: summary.totalConsumption,
        totalChargesInr: summary.totalCharges,
      },
      systems: rows.map((system) => ({
        systemName: system.title,
        consumedEnergyKwh: system.consumedEnergy,
        ratePerKwhInr: RATE_PER_KWH,
        totalChargeInr: system.charge,
      })),
    };

    downloadFile(
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8;",
      `${building.id}-${selectedSystem}-${period}-consumption-charges.json`
    );
  };

  const applyCustomRange = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setPeriod("custom");
    setLastUpdated(new Date());
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-3 overflow-hidden">
      <div className="border border-[#C9D6E4] bg-white px-3 py-2.5 shadow-[0_8px_22px_rgba(8,31,92,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="border-r border-slate-200 pr-3">
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#004AAD]">
                System Analysis
              </p>
              <h2 className="mt-0.5 text-[13px] font-black uppercase tracking-wide text-[#081F5C]">
                Consumption & Charges
              </h2>
            </div>

            <PeriodSelector period={period} onPeriodChange={setPeriod} />

            <div className="border-l border-slate-200 pl-3">
              <label className="block">
                <span className="mb-1 block text-[7px] font-black uppercase tracking-[0.1em] text-slate-500">
                  System
                </span>
                <select
                  value={selectedSystem}
                  onChange={(event) => setSelectedSystem(event.target.value)}
                  className="h-[32px] min-w-[180px] border border-[#004AAD] bg-white px-2 text-[9px] font-black text-[#081F5C] outline-none"
                >
                  <option value="all">All Systems</option>
                  {SYSTEMS.map((system) => (
                    <option key={system.id} value={system.id}>
                      {system.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {period === "custom" && (
              <div className="flex items-end gap-2 border-l border-slate-200 pl-3">
                <label>
                  <span className="mb-1 block text-[7px] font-black uppercase text-slate-500">From</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="h-[32px] border border-slate-300 px-2 text-[9px] text-[#081F5C]"
                  />
                </label>
                <label>
                  <span className="mb-1 block text-[7px] font-black uppercase text-slate-500">To</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="h-[32px] border border-slate-300 px-2 text-[9px] text-[#081F5C]"
                  />
                </label>
                <button
                  type="button"
                  onClick={applyCustomRange}
                  className="inline-flex h-[32px] items-center gap-2 bg-[#081F5C] px-3 text-[8px] font-black uppercase text-white"
                >
                  <CalendarDays size={12} />
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={downloadCsv} className="inline-flex h-[32px] items-center gap-2 bg-[#004AAD] px-3 text-[8px] font-black uppercase text-white">
              <Download size={12} /> CSV
            </button>
            <button type="button" onClick={downloadJson} className="inline-flex h-[32px] items-center gap-2 border border-[#004AAD] px-3 text-[8px] font-black uppercase text-[#004AAD]">
              <FileJson size={12} /> JSON
            </button>
            <button type="button" onClick={() => setLastUpdated(new Date())} className="flex h-[32px] w-[32px] items-center justify-center border border-slate-300 text-slate-600">
              <RefreshCw size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          ["Selected Period", PERIOD_LABELS[period], selectedSystemLabel, CalendarDays],
          ["Total Consumption", `${summary.totalConsumption.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh`, "Selected-period usage", Zap],
          ["Rate per kWh", `₹${RATE_PER_KWH.toFixed(2)}`, "Electricity tariff", Gauge],
          ["Total Charges", `₹${summary.totalCharges.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`, "Final amount", TrendingUp],
        ].map(([label, value, helper, Icon]) => (
          <div key={label} className="flex min-h-[74px] items-center justify-between border border-[#C9D6E4] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(8,31,92,0.04)]">
            <div className="min-w-0">
              <p className="text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">{label}</p>
              <p className="mt-1 truncate text-[17px] font-black text-[#081F5C]">{value}</p>
              <p className="mt-0.5 truncate text-[7px] text-slate-400">{helper}</p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-blue-200 bg-blue-50 text-[#004AAD]">
              <Icon size={14} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.85fr)]">
        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border border-[#C9D6E4] bg-white shadow-[0_10px_24px_rgba(8,31,92,0.05)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">Usage Trend</h3>
              <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-slate-400">
                {selectedSystemLabel} · {periodDescription}
              </p>
            </div>
            <span className="border border-blue-200 bg-blue-50 px-2.5 py-1 text-[7px] font-black uppercase text-[#004AAD]">
              Total {summary.totalConsumption.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh
            </span>
          </div>

          <div className="min-h-0 bg-[#F7F9FC] p-2">
            <TrendChart values={chartData.values} labels={chartData.labels} />
          </div>

          <div className="grid grid-cols-4 border-t border-slate-200 bg-white">
            {[
              ["Peak", `${trendInsights.peakValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh`, trendInsights.peakLabel],
              ["Average", `${trendInsights.averageValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh`, "Period Avg"],
              ["Lowest", `${trendInsights.lowestValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh`, trendInsights.lowestLabel],
              ["Charge", `₹${trendInsights.estimatedCharge.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`, "Estimated"],
            ].map(([label, value, note], index) => (
              <div key={label} className={`px-3 py-2.5 ${index < 3 ? "border-r border-slate-200" : ""}`}>
                <p className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-400">{label}</p>
                <p className="mt-1 truncate text-[12px] font-black text-[#081F5C]">{value}</p>
                <p className="mt-0.5 text-[7px] font-bold uppercase text-[#004AAD]">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid min-h-0 grid-rows-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3">
          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[#C9D6E4] bg-white shadow-[0_10px_24px_rgba(8,31,92,0.05)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">System Usage</h3>
              <span className="max-w-[180px] truncate text-[7px] font-black uppercase text-slate-400">
                {selectedSystemLabel}
              </span>
            </div>
            <div className="min-h-0 overflow-y-auto p-3">
              <div className="space-y-2.5">
                {rows.map((system) => (
                  <div key={system.id}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-[8px]">
                      <span className="truncate font-bold text-[#081F5C]">{system.title}</span>
                      <span className="shrink-0 font-black text-[#004AAD]">
                        {system.consumedEnergy.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100">
                      <div className="h-full bg-[#004AAD]" style={{ width: `${Math.max(3, (system.consumedEnergy / maxConsumption) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border border-[#C9D6E4] bg-white shadow-[0_10px_24px_rgba(8,31,92,0.05)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">System Charges</h3>
              <span className="text-[7px] font-black uppercase text-[#004AAD]">{periodDescription}</span>
            </div>

            <div className="min-h-0 overflow-auto">
              <table className="w-full min-w-[520px] border-collapse">
                <thead className="sticky top-0 z-10 bg-[#F7F9FC]">
                  <tr>
                    {["System", "Energy", "Rate", "Charge"].map((heading) => (
                      <th key={heading} className="border-b border-slate-200 px-3 py-2 text-left text-[7px] font-black uppercase tracking-[0.08em] text-slate-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((system) => (
                    <tr key={system.id} className="border-b border-slate-100">
                      <td className="px-3 py-1.5 text-[8px] font-bold text-[#081F5C]">{system.title}</td>
                      <td className="px-3 py-1.5 text-[8px] font-black text-[#004AAD]">{system.consumedEnergy.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                      <td className="px-3 py-1.5 text-[8px] text-slate-500">₹{RATE_PER_KWH.toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-[8px] font-black text-[#081F5C]">₹{system.charge.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 bg-[#081F5C] text-white">
              <div className="border-r border-white/10 px-3 py-2">
                <p className="text-[7px] font-black uppercase text-blue-200">Total Energy</p>
                <p className="mt-0.5 text-[11px] font-black">{summary.totalConsumption.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kWh</p>
              </div>
              <div className="px-3 py-2">
                <p className="text-[7px] font-black uppercase text-blue-200">Total Charge</p>
                <p className="mt-0.5 text-[11px] font-black text-cyan-300">₹{summary.totalCharges.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function BuildingOverview() {
  const { buildingId } = useParams();
  const [activeView, setActiveView] = useState("monitoring");

  const currentUser = tempApi.getCurrentUser();
  const userPermissions = currentUser?.permissions || [];
  const canViewAnalytics = userPermissions.includes("view_reports");

  const building = buildings.find(
    (item) => String(item.id) === String(buildingId)
  );

  if (!currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEF3F8] px-6 py-10">
        <div className="max-w-md border-2 border-red-400 bg-[#081F5C] p-8 text-center text-white">
          <h2 className="text-2xl font-black">
            User Session Required
          </h2>

          <p className="mt-2 text-xs text-blue-200">
            Please sign in with an active User account to open the building dashboard.
          </p>

          <button
            type="button"
            onClick={() => {
              tempApi.logout();
              window.location.href = "/auth";
            }}
            className="mt-6 inline-flex items-center gap-2 border border-cyan-400 bg-[#004AAD] px-6 py-2.5 text-sm font-black text-white hover:bg-[#003B8A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  if (!building) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEF3F8] px-6 py-10">
        <div className="max-w-md border-2 border-[#004AAD] bg-[#081F5C] p-8 text-center text-white">
          <h2 className="text-2xl font-black">
            Building Console Offline
          </h2>

          <p className="mt-2 text-xs text-blue-200">
            Requested building identifier is not registered.
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 border border-blue-400 bg-[#004AAD] px-6 py-2.5 text-sm font-black text-white hover:bg-[#003B8A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Command Center
          </Link>
        </div>
      </main>
    );
  }

  const floors = Array.from(
    { length: building.floors },
    (_, index) => building.floors - index
  );

  return (
    <main
      className={`flex flex-col bg-[#EEF3F8] font-sans text-[#081F5C] ${
        activeView === "analytics"
          ? "h-screen min-h-0 overflow-hidden"
          : "min-h-screen overflow-x-hidden"
      }`}
    >
      <header className="sticky top-0 z-[1000] h-[72px] shrink-0 border-b-4 border-[#004AAD] bg-[#081F5C] px-4 text-white">
        <div className="flex h-full w-full items-center justify-between">
          <Link to="/dashboard" className="flex items-center no-underline">
            <div>
              <h1 className="text-[26px] font-semibold uppercase leading-none tracking-[0.18em] text-white">
                ARCOT
                <span className="ml-2 text-[#67E8F9]">IIoT 1.0</span>
              </h1>

              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.35em] text-blue-300">
                Industrial Internet of Things
              </span>
            </div>

            <div className="ml-5 hidden h-[54px] border-l border-[#004AAD] sm:block" />

            <img
              src={prestigeLogo}
              alt="Prestige Group"
              className="ml-5 hidden h-[52px] w-[100px] object-contain sm:block"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              replace
              className="flex h-[32px] items-center justify-center border border-cyan-400 bg-[#004AAD] px-4 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:bg-[#0058D6]"
            >
              Back
            </Link>

            <div className="hidden border border-[#004AAD] bg-[#05143C] px-3 py-1.5 lg:block">
              <p className="max-w-[190px] truncate text-[9px] font-bold text-cyan-200">
                {currentUser.name}
              </p>
              <p className="max-w-[190px] truncate text-[7px] uppercase tracking-[0.08em] text-blue-300">
                {currentUser.designation || "USER"} ·{" "}
                {currentUser.companyName || building.name}
              </p>
            </div>

            <div className="hidden items-center gap-2 border border-[#004AAD] bg-[#05143C] px-3 py-1.5 md:flex">
              <span className="h-2 w-2 bg-emerald-400" />

              <span className="text-[10px] font-bold tracking-[0.15em]">
                BLE Connected
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                tempApi.logout();
                window.location.href = "/auth";
              }}
              className="h-[32px] border border-red-400 bg-red-600 px-4 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section
        className={`flex w-full flex-col px-4 py-3 ${
          activeView === "analytics"
            ? "min-h-0 flex-1 overflow-hidden"
            : "flex-none"
        }`}
      >
        <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border border-[#CCD8E5] bg-white px-4 py-2 shadow-[0_8px_20px_rgba(8,31,92,0.04)]">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#004AAD]">
              {activeView === "monitoring"
                ? "Live Building Telemetry"
                : "Consumption Analytics"}
            </p>

            <h2 className="mt-0.5 text-[15px] font-black uppercase tracking-wide text-[#081F5C]">
              {building.name}{" "}
              {activeView === "monitoring"
                ? "Monitoring"
                : "System Charges"}
            </h2>

            <p className="mt-0.5 text-[8px] font-semibold text-slate-500">
              {currentUser.companyName || "Assigned Company"} ·{" "}
              {currentUser.accessType || "BUILDING"}:{" "}
              {currentUser.accessName || building.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ViewSelector
              activeView={activeView}
              onChange={setActiveView}
              canViewAnalytics={canViewAnalytics}
            />

            <span className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-600">
              <span className="h-2 w-2 bg-emerald-500" />
              Online
            </span>
          </div>
        </div>

        <div
          className={
            activeView === "analytics"
              ? "min-h-0 flex-1 overflow-hidden"
              : "w-full"
          }
        >
          {activeView === "monitoring" ? (
            <div className="grid items-start gap-3 xl:grid-cols-[320px_minmax(0,1fr)]">
              <FloorMatrix building={building} floors={floors} />

              <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {SYSTEMS.map((system) => (
                  <SystemCard key={system.id} system={system} />
                ))}
              </section>
            </div>
          ) : (
            <AnalyticsView building={building} />
          )}
        </div>
      </section>

      <footer
        className={`border-t border-slate-300 bg-white px-5 py-2 text-[9px] text-slate-500 ${
          activeView === "analytics" ? "shrink-0" : ""
        }`}
      >
        <div className="flex items-center justify-between font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>

          <span className="flex items-center gap-2 text-emerald-600">
            <span className="h-2 w-2 bg-emerald-500" />
            Telemetry Online
          </span>
        </div>
      </footer>
    </main>
  );
}
