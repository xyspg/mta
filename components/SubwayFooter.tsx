import { LineBullet } from "./LineBullet";

export const SubwayFooter = () => {
  return (
    <div className=" shrink-0 pb-10 pt-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="bg-[#0039A6] grid grid-cols-[1fr_200px_100px] gap-8 px-12 py-4 text-blue-200 font-bold uppercase tracking-widest text-sm border-b border-white/10">
        <span>Later trains</span>
        <span>Towards</span>
        <span className="text-right">Status</span>
      </div>

      <div className="bg-black flex flex-col">
        <div className="grid grid-cols-[1fr_200px_100px] gap-8 px-12 py-5 items-center border-b border-white/10">
          <div className="flex items-center gap-4">
            <LineBullet line="R" size="md" />
            <span className="text-2xl font-bold">to Bay Ridge-95 St</span>
          </div>
          <div className="text-xl text-blue-100 font-medium">Bay Ridge...</div>
          <div className="text-2xl font-bold text-right">21 min</div>
        </div>

        <div className="grid grid-cols-[1fr_200px_100px] gap-8 px-12 py-5 items-center">
          <div className="flex items-center gap-4">
            <LineBullet line="R" size="md" />
            <span className="text-2xl font-bold">to Bay Ridge-95 St</span>
          </div>
          <div className="text-xl text-blue-100 font-medium">Bay Ridge...</div>
          <div className="text-2xl font-bold text-right">23 min</div>
        </div>
      </div>
    </div>
  );
};
