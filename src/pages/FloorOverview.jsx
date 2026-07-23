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






import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  Download,
  Fan,
  FileJson,
  Gauge,
  Lightbulb,
  RefreshCw,
  TrendingUp,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { clients } from "../data/bmsData";
import prestigeLogo from "../assets/ser-removebg.png";

const FLOOR_RATE_PER_KWH = 8.5;

const FLOOR_PERIODS = {
  hourly: { label: "Hourly", multiplier: 0.045 },
  daily: { label: "Daily", multiplier: 1 },
  weekly: { label: "Weekly", multiplier: 7 },
  monthly: { label: "Monthly", multiplier: 30 },
};

const SYSTEM_STYLES = {
  healthy: {
    dot: "bg-emerald-400",
    text: "text-emerald-200",
    border: "border-emerald-400/30",
    background: "bg-emerald-400/10",
    progress: "bg-emerald-400",
  },
  warning: {
    dot: "bg-amber-400",
    text: "text-amber-200",
    border: "border-amber-400/30",
    background: "bg-amber-400/10",
    progress: "bg-amber-400",
  },
  standby: {
    dot: "bg-cyan-300",
    text: "text-cyan-200",
    border: "border-cyan-300/30",
    background: "bg-cyan-300/10",
    progress: "bg-cyan-300",
  },
};

export default function FloorOverview() {
  const { buildingId, floorId } = useParams();
  const [activeView, setActiveView] = useState("monitoring");

  const floorNumber = Number(floorId);
  const startIndex = Math.max(0, (floorNumber - 1) * 4);
  const floorClients = clients.slice(startIndex, startIndex + 4);
  const floorData = getSampleFloorRealtimeData(floorNumber);

  const floorMonitoring = [
    {
      id: "ahu",
      title: "AHU / HVAC",
      icon: Fan,
      status: floorData.ahu.stopped > 0 ? "Attention" : "Healthy",
      tone: floorData.ahu.stopped > 0 ? "warning" : "healthy",
      currentLoad: Math.round((150 + floorNumber * 6) * 0.38),
      consumption: 940 + floorNumber * 34,
      efficiency: floorData.ahu.stopped > 0 ? 86 : 94,
      metrics: [
        ["Running AHUs", `${floorData.ahu.running} Units`],
        ["Stopped AHUs", `${floorData.ahu.stopped}`],
        ["Average Temperature", floorData.ahu.temperature],
        ["Humidity", floorData.ahu.humidity],
      ],
    },
    {
      id: "lighting",
      title: "LDB / Lighting",
      icon: Lightbulb,
      status: "Healthy",
      tone: "healthy",
      currentLoad: 18 + floorNumber,
      consumption: 610 + floorNumber * 26,
      efficiency: 91,
      metrics: [
        ["Active Zones", `${floorData.lighting.activeZones}`],
        ["Inactive Zones", `${floorData.lighting.inactiveZones}`],
        ["Connected Load", floorData.lighting.load],
        ["Operating Status", floorData.lighting.status],
      ],
    },
    {
      id: "energy",
      title: "EMS / Energy",
      icon: Gauge,
      status: "Healthy",
      tone: "healthy",
      currentLoad: 150 + floorNumber * 6,
      consumption: 2200 + floorNumber * 95,
      efficiency: 98,
      metrics: [
        ["Demand", floorData.energy.demand],
        ["Power Factor", floorData.energy.pf],
        ["Voltage", floorData.energy.voltage],
        ["Current", floorData.energy.current],
      ],
    },
    {
      id: "air",
      title: "Air Quality",
      icon: Wind,
      status: floorData.air.status,
      tone: floorData.air.status === "Healthy" ? "healthy" : "warning",
      currentLoad: 10 + (floorNumber % 5),
      consumption: 160 + floorNumber * 9,
      efficiency: floorData.air.status === "Healthy" ? 95 : 82,
      metrics: [
        ["CO₂ Level", floorData.air.co2],
        ["PM2.5", floorData.air.pm25],
        ["Temperature", floorData.ahu.temperature],
        ["Air Quality", floorData.air.status],
      ],
    },
    {
      id: "tenants",
      title: "Occupancy / Zones",
      icon: Users,
      status: floorData.tenants.status,
      tone: floorData.tenants.status === "Healthy" ? "healthy" : "warning",
      currentLoad: Math.round((150 + floorNumber * 6) * 0.44),
      consumption: 1120 + floorNumber * 41,
      efficiency: 93,
      metrics: [
        ["Configured Zones", `${floorData.tenants.occupied + floorData.tenants.available}`],
        ["Occupied Zones", `${floorData.tenants.occupied}`],
        ["Available Zones", `${floorData.tenants.available}`],
        ["Zone Status", floorData.tenants.status],
      ],
    },
    {
      id: "alerts",
      title: "Floor Alerts",
      icon: AlertTriangle,
      status: floorData.alerts.count > 0 ? "Attention" : "Healthy",
      tone: floorData.alerts.count > 0 ? "warning" : "healthy",
      currentLoad: floorData.alerts.count,
      consumption: 0,
      efficiency: floorData.alerts.count > 0 ? 88 : 100,
      metricLabels: {
        load: "Active Alerts",
        consumption: "Communication Loss",
        loadUnit: "",
        consumptionUnit: "",
      },
      metrics: [
        ["Active Alerts", `${floorData.alerts.count}`],
        ["Communication", floorData.alerts.communication],
        ["Floor Health", floorData.alerts.health],
        ["Last Update", floorData.alerts.lastUpdate],
      ],
    },
  ];

  const totalFloorConsumption = floorMonitoring
    .filter((system) => system.id !== "alerts")
    .reduce((total, system) => total + system.consumption, 0);

  const totalFloorLoad = floorMonitoring
    .filter((system) => system.id !== "alerts")
    .reduce((total, system) => total + system.currentLoad, 0);

  const operationalSystems = floorMonitoring.filter(
    (system) => system.id !== "alerts"
  );

  const activeSystems = operationalSystems.filter(
    (system) => system.status !== "Attention"
  ).length;

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
          <Link to="/" className="flex min-w-0 items-center no-underline">
            <div className="min-w-0">
              <h1 className="truncate text-[26px] font-semibold uppercase leading-none tracking-[0.18em] text-white">
                ARCOT
                <span className="ml-2 text-[#67E8F9]">IIoT 1.0</span>
              </h1>

              <span className="mt-1 block truncate text-[9px] font-medium uppercase tracking-[0.35em] text-blue-300">
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

          <div className="hidden flex-col items-center lg:flex">
            <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-cyan-300">
              Floor Monitoring Console
            </span>

            <h2 className="mt-1 text-[17px] font-black uppercase tracking-[0.08em] text-white">
              {buildingId?.toUpperCase()} • Floor {floorId}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/building/${buildingId}`}
              className="flex h-[32px] items-center justify-center border border-cyan-400 bg-[#004AAD] px-4 text-[10px] font-black uppercase tracking-[0.15em] text-white hover:bg-[#0058D6]"
            >
              Back
            </Link>

            <div className="hidden items-center gap-2 border border-[#004AAD] bg-[#05143C] px-3 py-1.5 md:flex">
              <span className="h-2 w-2 bg-emerald-400" />
              <span className="text-[10px] font-bold tracking-[0.15em]">
                Realtime Active
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("bmsLoggedIn");
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
            : "flex-1"
        }`}
      >
        <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border border-[#CCD8E5] bg-white px-4 py-2.5 shadow-[0_8px_20px_rgba(8,31,92,0.04)]">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#004AAD]">
              {activeView === "monitoring"
                ? "Floor Realtime Telemetry"
                : "Floor Consumption Analytics"}
            </p>

            <h2 className="mt-0.5 text-[15px] font-black uppercase tracking-wide text-[#081F5C]">
              Floor {floorId}{" "}
              {activeView === "monitoring"
                ? "Monitoring Overview"
                : "Analytic Overview"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <FloorViewSelector
              activeView={activeView}
              onChange={setActiveView}
            />

            <span className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-600">
              <span className="h-2 w-2 bg-emerald-500" />
              Online
            </span>
          </div>
        </div>

        {activeView === "monitoring" ? (
          <>
            <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <SummaryTile
                label="Floor Load"
                value={`${totalFloorLoad.toLocaleString("en-IN")} kW`}
                helper="Current connected demand"
                icon={Zap}
              />

              <SummaryTile
                label="Consumption"
                value={`${totalFloorConsumption.toLocaleString("en-IN")} kWh`}
                helper="Current monitoring period"
                icon={Gauge}
              />

              <SummaryTile
                label="Systems Online"
                value={`${activeSystems}/${operationalSystems.length}`}
                helper="Operational systems online"
                icon={Activity}
              />

              <SummaryTile
                label="Active Alerts"
                value={`${floorData.alerts.count}`}
                helper={
                  floorData.alerts.count > 0
                    ? "Requires operator attention"
                    : "No critical alarms"
                }
                icon={AlertTriangle}
                attention={floorData.alerts.count > 0}
              />
            </div>

            <section className="mb-3 overflow-hidden border border-[#174B89] bg-[#f3f3f3] text-white shadow-[0_10px_24px_rgba(8,31,92,0.12)]">
              <header className="flex flex-wrap items-center justify-between gap-3 bg-[#0A2A68] px-4 py-3">
                <div>
                 

                  <h3 className="mt-1 text-[13px] font-black uppercase tracking-wide">
                    Floor {floorId} Client Details
                  </h3>
                </div>

                <span className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-blue-100">
                  <Users size={14} className="text-cyan-300" />
                  {floorClients.length} Total Clients
                </span>
              </header>

              <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 xl:grid-cols-4">
                {floorClients.map((client, index) => {
                  const zone = floorData.zones[index] ?? floorData.zones[0];
                  const warning = zone.health === "Warning";

                  return (
                    <Link
                      key={`${client}-${index}`}
                      to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
                      className="group flex min-h-[148px] flex-col justify-between bg-[#0A255C] px-4 py-4 text-white transition hover:bg-[#112f6c]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-[16px] font-black uppercase leading-tight tracking-[0.045em] text-white">
                            {client}
                          </p>

                          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-200/75">
                            Zone {index + 1}
                          </p>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.06em] ${
                            warning
                              ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                              : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 ${
                              warning ? "bg-amber-400" : "bg-emerald-400"
                            }`}
                          />
                          {zone.health}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <ClientReading label="Power Load" value={zone.load} />
                        <ClientReading label="AHU Status" value={zone.ahu} />
                        <ClientReading label="Lighting" value={zone.lighting} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 xl:auto-rows-fr">
              {floorMonitoring.map((system) => (
                <FloorSystemCard key={system.id} system={system} />
              ))}
            </section>
          </>
        ) : (
          <FloorAnalyticsView
            floorId={floorId}
            buildingId={buildingId}
            systems={floorMonitoring}
            floorClients={floorClients}
            floorData={floorData}
          />
        )}
      </section>

      <footer className="border-t border-slate-300 bg-white px-5 py-2 text-[9px] text-slate-500">
        <div className="flex items-center justify-between font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>

          <span className="flex items-center gap-2 text-emerald-600">
            <span className="h-2 w-2 bg-emerald-500" />
            Floor {floorId} Feeders Connected
          </span>
        </div>
      </footer>
    </main>
  );
}


function FloorViewSelector({ activeView, onChange }) {
  return (
    <div className="flex border border-[#004AAD] bg-white">
      <button
        type="button"
        onClick={() => onChange("monitoring")}
        className={`flex h-[36px] items-center gap-2 px-4 text-[9px] font-black uppercase tracking-[0.1em] ${
          activeView === "monitoring"
            ? "bg-[#081F5C] text-white"
            : "text-[#081F5C] hover:bg-blue-50"
        }`}
      >
        <Building2 size={13} />
        Floor Systems
      </button>

      <button
        type="button"
        onClick={() => onChange("analytics")}
        className={`flex h-[36px] items-center gap-2 border-l border-[#004AAD] px-4 text-[9px] font-black uppercase tracking-[0.1em] ${
          activeView === "analytics"
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

function FloorAnalyticsView({
  floorId,
  buildingId,
  systems,
  floorClients,
  floorData,
}) {
  const [period, setPeriod] = useState("daily");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const multiplier = FLOOR_PERIODS[period].multiplier;

  const rows = useMemo(() => {
    const source =
      selectedSystem === "all"
        ? systems.filter((system) => system.id !== "alerts")
        : systems.filter((system) => system.id === selectedSystem);

    return source.map((system) => {
      const consumedEnergy = Number(
        (system.consumption * multiplier).toFixed(2)
      );
      const charge = Number(
        (consumedEnergy * FLOOR_RATE_PER_KWH).toFixed(2)
      );

      return { ...system, consumedEnergy, charge };
    });
  }, [multiplier, selectedSystem, systems]);

  const summary = useMemo(() => {
    const consumption = rows.reduce(
      (total, row) => total + row.consumedEnergy,
      0
    );
    const charges = rows.reduce(
      (total, row) => total + row.charge,
      0
    );
    const load = rows.reduce(
      (total, row) => total + row.currentLoad,
      0
    );

    return { consumption, charges, load };
  }, [rows]);

  const chartData = useMemo(() => {
    const totalDaily = rows.reduce(
      (total, row) => total + row.consumption,
      0
    );

    const configs = {
      hourly: {
        labels: ["00h", "03h", "06h", "09h", "12h", "15h", "18h", "21h"],
        factors: [0.22, 0.19, 0.28, 0.62, 0.84, 0.91, 0.76, 0.41],
      },
      daily: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        factors: [0.94, 0.98, 1.04, 1.01, 1.08, 0.84, 0.78],
      },
      weekly: {
        labels: ["W1", "W2", "W3", "W4"],
        factors: [6.8, 7.1, 7.35, 7.56],
      },
      monthly: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        factors: [27.4, 26.9, 28.5, 29.2, 30.1, 29.8, 30.4, 30.7],
      },
    };

    const config = configs[period];

    return {
      labels: config.labels,
      values: config.factors.map((factor) =>
        Number((totalDaily * factor).toFixed(2))
      ),
    };
  }, [period, rows]);

  const maxUsage = Math.max(
    ...rows.map((row) => row.consumedEnergy),
    1
  );

  const selectedLabel =
    selectedSystem === "all"
      ? "All Floor Systems"
      : systems.find((system) => system.id === selectedSystem)?.title ??
        "All Floor Systems";

  const downloadFile = (content, type, filename) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    const content = [
      ["System", "Period", "Energy (kWh)", "Rate (INR)", "Charge (INR)"],
      ...rows.map((row) => [
        row.title,
        FLOOR_PERIODS[period].label,
        row.consumedEnergy,
        FLOOR_RATE_PER_KWH,
        row.charge,
      ]),
    ]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    downloadFile(
      content,
      "text/csv;charset=utf-8;",
      `${buildingId}-floor-${floorId}-${selectedSystem}-${period}.csv`
    );
  };

  const downloadJson = () => {
    downloadFile(
      JSON.stringify(
        {
          buildingId,
          floorId,
          period: FLOOR_PERIODS[period].label,
          selectedSystem: selectedLabel,
          generatedAt: new Date().toISOString(),
          totalClients: floorClients.length,
          clientNames: floorClients,
          airQuality: floorData.air,
          alerts: floorData.alerts,
          totals: summary,
          systems: rows,
        },
        null,
        2
      ),
      "application/json;charset=utf-8;",
      `${buildingId}-floor-${floorId}-${selectedSystem}-${period}.json`
    );
  };

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-3 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border border-[#C9D6E4] bg-white px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#004AAD]">
              Floor Analysis
            </p>
            <h3 className="mt-0.5 text-[13px] font-black uppercase text-[#081F5C]">
              Usage, Load & Charges
            </h3>
          </div>

          <div className="flex border border-[#004AAD]">
            {Object.entries(FLOOR_PERIODS).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                className={`h-[32px] border-r border-[#004AAD] px-3 text-[8px] font-black uppercase last:border-r-0 ${
                  period === key
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-[#004AAD]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <select
            value={selectedSystem}
            onChange={(event) => setSelectedSystem(event.target.value)}
            className="h-[32px] min-w-[180px] border border-[#004AAD] bg-white px-2 text-[9px] font-black text-[#081F5C] outline-none"
          >
            <option value="all">All Floor Systems</option>
            {systems
              .filter((system) => system.id !== "alerts")
              .map((system) => (
                <option key={system.id} value={system.id}>
                  {system.title}
                </option>
              ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex h-[32px] items-center gap-2 bg-[#004AAD] px-3 text-[8px] font-black uppercase text-white"
          >
            <Download size={12} />
            CSV
          </button>

          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex h-[32px] items-center gap-2 border border-[#004AAD] px-3 text-[8px] font-black uppercase text-[#004AAD]"
          >
            <FileJson size={12} />
            JSON
          </button>

          <button
            type="button"
            onClick={() => setLastUpdated(new Date())}
            title={lastUpdated.toLocaleTimeString()}
            className="flex h-[32px] w-[32px] items-center justify-center border border-slate-300 text-slate-600"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        <AnalyticsTile
          label="Floor Load"
          value={`${summary.load.toLocaleString("en-IN")} kW`}
          helper={selectedLabel}
          icon={Zap}
        />

        <AnalyticsTile
          label="Consumption"
          value={`${summary.consumption.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })} kWh`}
          helper={FLOOR_PERIODS[period].label}
          icon={Gauge}
        />

        <AnalyticsTile
          label="Estimated Charge"
          value={`₹${summary.charges.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}`}
          helper={`₹${FLOOR_RATE_PER_KWH.toFixed(2)} per kWh`}
          icon={TrendingUp}
        />

        <AnalyticsTile
          label="Total Clients"
          value={`${floorClients.length}`}
          helper="Configured floor clients"
          icon={Users}
        />

        <AnalyticsTile
          label="Floor Environment"
          value={floorData.air.status}
          helper={`${floorData.air.co2} · ${floorData.air.pm25}`}
          icon={Wind}
          attention={floorData.air.status !== "Healthy"}
        />
      </div>

      <div className="grid min-h-0 gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.85fr)]">
        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[#C9D6E4] bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">
                Floor Usage Trend
              </h3>
              <p className="mt-0.5 text-[7px] font-bold uppercase text-slate-400">
                {selectedLabel} · {FLOOR_PERIODS[period].label}
              </p>
            </div>

            <span className="border border-blue-200 bg-blue-50 px-2 py-1 text-[7px] font-black uppercase text-[#004AAD]">
              Floor {floorId}
            </span>
          </div>

          <div className="min-h-0 bg-[#F7F9FC] p-2">
            <FloorTrendChart
              values={chartData.values}
              labels={chartData.labels}
            />
          </div>
        </section>

        <div className="grid min-h-0 grid-rows-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3">
          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[#C9D6E4] bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">
                System Consumption
              </h3>
              <span className="text-[7px] font-black uppercase text-slate-400">
                {selectedLabel}
              </span>
            </div>

            <div className="min-h-0 overflow-y-auto p-3">
              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row.id}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-[8px]">
                      <span className="truncate font-bold text-[#081F5C]">
                        {row.title}
                      </span>
                      <span className="shrink-0 font-black text-[#004AAD]">
                        {row.consumedEnergy.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        kWh
                      </span>
                    </div>

                    <div className="h-2 bg-slate-100">
                      <div
                        className="h-full bg-[#004AAD]"
                        style={{
                          width: `${Math.max(
                            4,
                            (row.consumedEnergy / maxUsage) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border border-[#C9D6E4] bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-[#081F5C]">
                System Charges
              </h3>
              <span className="text-[7px] font-black uppercase text-[#004AAD]">
                {FLOOR_PERIODS[period].label}
              </span>
            </div>

            <div className="min-h-0 overflow-auto">
              <table className="w-full min-w-[460px] border-collapse">
                <thead className="sticky top-0 bg-[#F7F9FC]">
                  <tr>
                    {["System", "Energy", "Rate", "Charge"].map((heading) => (
                      <th
                        key={heading}
                        className="border-b border-slate-200 px-3 py-2 text-left text-[7px] font-black uppercase text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100">
                      <td className="px-3 py-1.5 text-[8px] font-bold text-[#081F5C]">
                        {row.title}
                      </td>
                      <td className="px-3 py-1.5 text-[8px] font-black text-[#004AAD]">
                        {row.consumedEnergy.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-3 py-1.5 text-[8px] text-slate-500">
                        ₹{FLOOR_RATE_PER_KWH.toFixed(2)}
                      </td>
                      <td className="px-3 py-1.5 text-[8px] font-black text-[#081F5C]">
                        ₹{row.charge.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 bg-[#081F5C] text-white">
              <div className="px-3 py-2">
                <p className="text-[7px] font-black uppercase text-blue-200">
                  Total Energy
                </p>
                <p className="mt-0.5 text-[11px] font-black">
                  {summary.consumption.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  kWh
                </p>
              </div>

              <div className="px-3 py-2">
                <p className="text-[7px] font-black uppercase text-blue-200">
                  Total Charge
                </p>
                <p className="mt-0.5 text-[11px] font-black text-cyan-300">
                  ₹{summary.charges.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTile({
  label,
  value,
  helper,
  icon: Icon,
  attention = false,
}) {
  return (
    <div className="flex min-h-[74px] items-center justify-between border border-[#C9D6E4] bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>
        <p
          className={`mt-1 truncate text-[17px] font-black ${
            attention ? "text-amber-600" : "text-[#081F5C]"
          }`}
        >
          {value}
        </p>
        <p className="mt-0.5 truncate text-[7px] text-slate-400">
          {helper}
        </p>
      </div>

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center border ${
          attention
            ? "border-amber-200 bg-amber-50 text-amber-600"
            : "border-blue-200 bg-blue-50 text-[#004AAD]"
        }`}
      >
        <Icon size={14} />
      </div>
    </div>
  );
}

function FloorTrendChart({ values, labels }) {
  const width = 1100;
  const height = 420;
  const left = 55;
  const right = 1060;
  const top = 28;
  const bottom = 350;
  const max = Math.max(...values, 1);

  const points = values.map((value, index) => ({
    x:
      left +
      (index / Math.max(values.length - 1, 1)) *
        (right - left),
    y: bottom - (value / max) * (bottom - top),
    value,
    index,
  }));

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
          <circle cx={point.x} cy={point.y} r="4" fill="#00B8E6">
            <title>
              {`${labels[point.index]} — ${point.value.toLocaleString(
                "en-IN"
              )} kWh`}
            </title>
          </circle>

          <text
            x={point.x}
            y="392"
            textAnchor="middle"
            fontSize="9"
            fill="#64748B"
          >
            {labels[point.index]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ClientReading({ label, value }) {
  return (
    <div className="flex min-h-[24px] items-center justify-between gap-4">
      <span className="min-w-0 truncate text-[8px] font-bold uppercase tracking-[0.07em] text-blue-100/65">
        {label}
      </span>

      <span className="shrink-0 text-right text-[10px] font-black text-white">
        {value}
      </span>
    </div>
  );
}

function SummaryTile({ label, value, helper, icon: Icon, attention = false }) {
  return (
    <div className="flex min-h-[82px] items-center justify-between border border-[#C9D6E4] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(8,31,92,0.04)]">
      <div className="min-w-0">
        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-[18px] font-black ${
            attention ? "text-amber-600" : "text-[#081F5C]"
          }`}
        >
          {value}
        </p>

        <p className="mt-0.5 truncate text-[7px] text-slate-400">
          {helper}
        </p>
      </div>

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
          attention
            ? "border-amber-200 bg-amber-50 text-amber-600"
            : "border-blue-200 bg-blue-50 text-[#004AAD]"
        }`}
      >
        <Icon size={16} />
      </div>
    </div>
  );
}

function FloorSystemCard({ system }) {
  const Icon = system.icon;
  const style = SYSTEM_STYLES[system.tone] ?? SYSTEM_STYLES.healthy;

  const loadLabel = system.metricLabels?.load ?? "Current Load";
  const consumptionLabel =
    system.metricLabels?.consumption ?? "Consumption";
  const loadUnit = system.metricLabels?.loadUnit ?? "kW";
  const consumptionUnit =
    system.metricLabels?.consumptionUnit ?? "kWh";

  return (
    <article className="group relative flex h-full min-h-[285px] flex-col overflow-hidden border border-[#1A5A9B] bg-[linear-gradient(155deg,#0B3778_0%,#08295F_48%,#061D47_100%)] text-white shadow-[0_12px_26px_rgba(3,35,90,0.18),inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3AA7FF] hover:shadow-[0_18px_34px_rgba(3,45,105,0.26)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(34,211,238,0.13),transparent_31%)]" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#1BB8E6]" />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 px-5 pb-3.5 pt-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-cyan-300/25 bg-white/[0.08] text-cyan-300">
              <Icon size={28} strokeWidth={2.1} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-black uppercase tracking-[0.06em] text-white">
                {system.title}
              </h3>

              <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-blue-200/60">
                Floor Operational Data
              </p>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 border px-2.5 py-1.5 text-[7px] font-black uppercase tracking-[0.08em] ${style.border} ${style.background} ${style.text}`}
          >
            <span className={`h-1.5 w-1.5 ${style.dot}`} />
            {system.status}
          </span>
        </header>

        <div className="mx-5 grid grid-cols-2 gap-x-5 py-2">
          <PrimaryMetric
            label={loadLabel}
            value={system.currentLoad}
            unit={loadUnit}
            highlight
          />

          <PrimaryMetric
            label={consumptionLabel}
            value={system.consumption}
            unit={consumptionUnit}
          />
        </div>

        <div className="mx-5 my-2 h-px bg-white/10" />

        <div className="flex flex-1 flex-col justify-center px-5 py-2">
          {system.metrics.map(([label, value]) => (
            <CompactReading key={label} label={label} value={value} />
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
              className={`h-full ${style.progress}`}
              style={{ width: `${system.efficiency}%` }}
            />
          </div>
        </footer>
      </div>
    </article>
  );
}

function PrimaryMetric({ label, value, unit, highlight = false }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[8px] font-black uppercase tracking-[0.1em] text-blue-100/60">
          {label}
        </span>

        {unit ? (
          <span className="shrink-0 text-[8px] font-bold uppercase text-blue-200/50">
            {unit}
          </span>
        ) : null}
      </div>

      <p
        className={`mt-1.5 truncate text-[21px] font-black leading-none tracking-tight ${
          highlight ? "text-cyan-300" : "text-white"
        }`}
      >
        {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function CompactReading({ label, value }) {
  return (
    <div className="flex min-h-[31px] items-center justify-between gap-4 py-1.5">
      <span className="min-w-0 truncate text-[8px] font-bold uppercase tracking-[0.065em] text-blue-100/65">
        {label}
      </span>

      <span className="shrink-0 text-right text-[10px] font-black text-white">
        {value}
      </span>
    </div>
  );
}

function getSampleFloorRealtimeData(floorNumber) {
  const safeFloorNumber = Number.isFinite(floorNumber) ? floorNumber : 1;
  const baseLoad = 150 + safeFloorNumber * 6;
  const hasAlert = safeFloorNumber % 5 === 0;

  return {
    ahu: {
      running: 2 + (safeFloorNumber % 3),
      stopped: hasAlert ? 1 : 0,
      temperature: `${22 + (safeFloorNumber % 4)}°C`,
      humidity: `${45 + (safeFloorNumber % 8)}%`,
    },
    lighting: {
      activeZones: 14 + (safeFloorNumber % 5),
      inactiveZones: safeFloorNumber % 3,
      load: `${18 + safeFloorNumber} kW`,
      status: "ON",
    },
    energy: {
      kwh: `${2200 + safeFloorNumber * 95} kWh`,
      demand: `${baseLoad} kW`,
      pf: hasAlert ? "0.96" : "0.98",
      voltage: `${430 + (safeFloorNumber % 5)}V`,
      current: `${190 + safeFloorNumber * 4}A`,
    },
    air: {
      co2: `${540 + safeFloorNumber * 8} ppm`,
      pm25: `${10 + (safeFloorNumber % 10)} μg/m³`,
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
}
