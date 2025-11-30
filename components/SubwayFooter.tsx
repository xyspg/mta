import type { MtaArrival } from "@/hooks/useMtaData";
import { LineBullet } from "./LineBullet";

interface SubwayFooterProps {
  arrivals: MtaArrival[];
  loading?: boolean;
}

const minutesUntil = (arrivalTime: number) =>
  Math.max(0, Math.floor((arrivalTime - Date.now()) / 1000 / 60));

export const SubwayFooter = ({ arrivals, loading }: SubwayFooterProps) => {
  const laterTrains = arrivals.slice(1); // exclude the next/first arrival

  return (
    <div className="shrink-0 pb-10 pt-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="bg-[#0039A6] grid grid-cols-[1fr_200px_100px] gap-8 px-12 py-4 text-blue-200 font-bold uppercase tracking-widest text-sm border-b border-white/10">
        <span>Later trains</span>
        <span>Towards</span>
        <span className="text-right">Status</span>
      </div>

      <div className="bg-black flex flex-col">
        {loading && (
          <div className="text-center py-6 text-zinc-500">Loading trains…</div>
        )}

        {!loading && laterTrains.length === 0 && (
          <div className="text-center py-6 text-zinc-500">
            No later trains available.
          </div>
        )}

        {!loading &&
          laterTrains.map((arrival) => (
            <div
              key={arrival.tripId}
              className="grid grid-cols-[1fr_200px_100px] gap-8 px-12 py-5 items-center border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <LineBullet line={arrival.routeId} size="md" />
                <span className="text-2xl font-bold">to {arrival.headsign}</span>
              </div>
              <div className="text-xl text-blue-100 font-medium truncate">
                {arrival.headsign}
              </div>
              <div className="text-2xl font-bold text-right">
                {minutesUntil(arrival.arrivalTime)} min
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
