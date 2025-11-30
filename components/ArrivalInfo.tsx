import { LineBullet } from "./LineBullet";

interface ArrivalInfoProps {
  line: string;
  headsign: string;
  arrivalTime: number; // timestamp
  loading?: boolean;
}

export const ArrivalInfo = ({
  line,
  headsign,
  arrivalTime,
  loading,
}: ArrivalInfoProps) => {
  if (loading) {
    return (
      <div className="p-10 pt-12 flex items-center justify-between shrink-0 animate-pulse">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-zinc-800" />
          <div>
            <div className="h-16 w-96 bg-zinc-800 rounded mb-3" />
            <div className="h-8 w-64 bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="h-16 w-32 bg-zinc-800 rounded" />
      </div>
    );
  }

  const minutes = Math.max(
    0,
    Math.floor((arrivalTime - Date.now()) / 1000 / 60),
  );

  return (
    <div className="p-10 pt-12 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-8">
        <LineBullet line={line} size="xl" />
        <div>
          <div className="text-6xl font-bold mb-3 tracking-tight">
            to {headsign}
          </div>
          <div className="text-3xl text-zinc-400 font-medium">{headsign}</div>
        </div>
      </div>
      <div className="text-6xl font-bold text-[#56a0d3]">
        {minutes === 0 ? "Arriving" : `${minutes} min`}
      </div>
    </div>
  );
};
