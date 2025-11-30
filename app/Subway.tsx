"use client";
import { useState } from "react";
import { ArrivalInfo } from "@/components/ArrivalInfo";
import { LineSelector } from "@/components/LineSelector";
import { RouteMap } from "@/components/RouteMap";
import { StationSelector } from "@/components/StationSelector";
import { SubwayFooter } from "@/components/SubwayFooter";
import { SubwayHeader } from "@/components/SubwayHeader";
import { useMtaData } from "@/hooks/useMtaData";
import { useMtaStops } from "@/hooks/useMtaStops";

export default function Subway() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { arrivals, loading } = useMtaData(selectedStation?.id);
  const { stops, loading: stopsLoading } = useMtaStops(selectedLine);

  // Filter out trains that are terminating at the current station
  const filteredArrivals = arrivals.filter(
    (arrival) => arrival.headsign !== selectedStation?.name,
  );

  // Get the next arrival
  const nextArrival = filteredArrivals.length > 0 ? filteredArrivals[0] : null;

  if (!selectedLine) {
    return <LineSelector onSelect={setSelectedLine} />;
  }

  if (!selectedStation) {
    return (
      <StationSelector
        lineId={selectedLine}
        onSelect={setSelectedStation}
        onBack={() => setSelectedLine(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <SubwayHeader stationName={selectedStation.name} />

      {nextArrival ? (
        <ArrivalInfo
          line={nextArrival.routeId}
          headsign={nextArrival.headsign}
          arrivalTime={nextArrival.arrivalTime}
          loading={loading}
        />
      ) : (
        <ArrivalInfo
          line={selectedLine}
          headsign="Loading..."
          arrivalTime={Date.now()}
          loading={loading}
        />
      )}
      <RouteMap
        stops={stops}
        currentStopId={selectedStation.id}
        lineId={selectedLine}
        loading={stopsLoading}
      />
      <SubwayFooter arrivals={filteredArrivals} loading={loading} />
    </div>
  );
}
