import { useEffect, useState } from "react";
import { MtaLogo } from "./MtaLogo";

interface SubwayHeaderProps {
  stationName: string;
}

export const SubwayHeader = ({ stationName }: SubwayHeaderProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Hydration fix: only start timer on client
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date
      .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      .toLowerCase();
  };

  return (
    <>
      {/* HEADER: Black Background */}
      <header className="bg-black px-10 py-6 pb-4 flex justify-between items-end shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          {/* The Specific MTA Logo SVG */}
          <div className="w-12 h-12 flex items-center justify-center">
            <MtaLogo />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white/90">
            Welcome to {stationName}
          </h1>
        </div>
        <div className="text-4xl font-bold text-[#56a0d3]">
          {formatTime(time)}
        </div>
      </header>

      {/* SUBHEADER: Blue Bar */}
      <div className="bg-[#1a428a] px-10 py-3 flex justify-between text-xl font-semibold border-t border-white/10 shrink-0">
        <span>Next train</span>
        <span>Status</span>
      </div>
    </>
  );
};
