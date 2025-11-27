interface TrackSegmentProps {
  type: "past" | "future" | "none";
  color: string;
}

export const TrackSegment = ({ type, color }: TrackSegmentProps) => {
  if (type === "none") return <div className="w-2 h-full"></div>;

  if (type === "past") {
    return (
      <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden py-1 gap-1 opacity-30">
        {/* Grey V arrows for past stops */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-zinc-400"
          ></div>
        ))}
      </div>
    );
  }

  if (type === "future") {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {/* Solid Line in Line Color */}
        <div
          className="h-full w-[10px]"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  }
  return null;
};
