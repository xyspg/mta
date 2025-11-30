import { useMtaStops } from "@/hooks/useMtaStops";
import { LineBullet } from "./LineBullet";

interface StationSelectorProps {
  lineId: string;
  onSelect: (station: { id: string; name: string }) => void;
  onBack: () => void;
}

export const StationSelector = ({
  lineId,
  onSelect,
  onBack,
}: StationSelectorProps) => {
  const { stops, loading, error } = useMtaStops(lineId);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-4 sticky top-0 bg-black z-10">
        <button
          type="button"
          onClick={onBack}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <LineBullet line={lineId} size="md" />
          <h1 className="text-2xl font-bold">Select Station</h1>
        </div>
      </div>

      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        {loading && (
          <div className="text-center py-12 text-zinc-500 animate-pulse">
            Loading stations...
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">Error: {error}</div>
        )}

        {!loading && !error && (
          <div className="grid gap-2">
            {stops.map((stop) => (
              <button
                type="button"
                key={stop.stopId}
                onClick={() =>
                  onSelect({ id: stop.stopId, name: stop.stopName })
                }
                className="text-left p-4 rounded-lg hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800 group"
              >
                <div className="font-bold text-lg group-hover:text-[#56a0d3] transition-colors">
                  {stop.stopName}
                </div>
                <div className="text-sm text-zinc-500 mt-1">
                  {stop.borough} {stop.ada === "1" && "♿"}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
