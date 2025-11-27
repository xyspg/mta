import { LineBullet } from "./LineBullet";

export const ArrivalInfo = () => {
  return (
    <div className="p-10 pt-12 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-8">
        <LineBullet line="R" size="xl" />
        <div>
          <div className="text-6xl font-bold mb-3 tracking-tight">
            to Bay Ridge-95 St
          </div>
          <div className="text-3xl text-zinc-400 font-medium">
            Bay Ridge - 95 St
          </div>
        </div>
      </div>
      <div className="text-6xl font-bold text-[#56a0d3]">15 min</div>
    </div>
  );
};
