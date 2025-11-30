import { Accessibility } from "lucide-react";
import React, { useMemo } from "react";
import type { MtaStop } from "@/hooks/useMtaStops";
import { ALL_LINES, COLORS } from "@/lib/constants";
import { TrackSegment } from "./TrackSegment";

interface RouteMapProps {
  stops: MtaStop[];
  currentStopId?: string;
  lineId: string;
  loading?: boolean;
}

type StopStatus = "past" | "current" | "future";

const getLineColor = (lineId: string) =>
  ALL_LINES.find((l) => l.id === lineId)?.color ?? COLORS.yellow;

export const RouteMap = ({
  stops,
  currentStopId,
  lineId,
  loading,
}: RouteMapProps) => {
  const color = getLineColor(lineId);

  const stopsWithStatus = useMemo(() => {
    if (!stops.length) return [];
    const currentIndex = stops.findIndex(
      (stop) => stop.stopId === currentStopId,
    );
    const activeIndex = currentIndex >= 0 ? currentIndex : 0;

    return stops.map((stop, index) => {
      let status: StopStatus = "future";
      if (index < activeIndex) status = "past";
      else if (index === activeIndex) status = "current";
      return { ...stop, status };
    });
  }, [stops, currentStopId]);

  const renderBody = () => {
    if (loading) {
      return (
        <div className="text-center text-zinc-500 py-12">Loading route…</div>
      );
    }

    if (!stopsWithStatus.length) {
      return (
        <div className="text-center text-zinc-500 py-12">
          No stops available for this line.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-[1fr_60px_1fr] w-full max-w-6xl mx-auto h-full gap-x-6">
        {stopsWithStatus.map((stop, index) => {
          const isPast = stop.status === "past";
          const isCurrent = stop.status === "current";

          let lineAbove: StopStatus | "none" = "none";
          if (index > 0) {
            lineAbove =
              stopsWithStatus[index - 1].status === "past" ? "past" : "future";
            if (isCurrent) lineAbove = "past";
          }

          let lineBelow: StopStatus | "none" = "none";
          if (index < stopsWithStatus.length - 1) {
            lineBelow = isPast ? "past" : "future";
            if (isCurrent) lineBelow = "future";
          }

          return (
            <React.Fragment key={stop.stopId}>
              <div
                className={`flex items-center justify-end gap-2 py-5 pr-4 ${isPast ? "opacity-40 grayscale" : ""}`}
              >
                {/* No transfer data wired yet */}
              </div>

              <div className="flex flex-col items-center relative h-full min-h-[90px]">
                <div className="flex-1 w-full flex justify-center">
                  <TrackSegment type={lineAbove} color={color} />
                </div>

                <div className="z-10 py-1">
                  {isCurrent ? (
                    <div className="relative">
                      <div className="w-8 h-8 bg-white rotate-45 border-4 border-black ring-2 ring-white z-20 relative"></div>
                    </div>
                  ) : (
                    <div
                      className={`w-6 h-6 rounded-full border-[3px] z-10 relative
                                    ${isPast ? "border-zinc-500 bg-black" : "border-black bg-white ring-0"}
                                 `}
                    ></div>
                  )}
                </div>

                <div className="flex-1 w-full flex justify-center">
                  <TrackSegment type={lineBelow} color={color} />
                </div>
              </div>

              <div
                className={`flex items-center pl-4 py-5 ${isPast ? "opacity-40" : ""}`}
              >
                {isCurrent ? (
                  <div className="bg-white text-black pl-4 pr-6 py-2 rounded-lg font-bold text-3xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center transform -translate-x-2">
                    {stop.stopName}
                    {stop.ada === "1" && (
                      <div className="ml-3 bg-[#0039A6] p-1 rounded-sm">
                        <Accessibility size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold tracking-wide text-white/90">
                      {stop.stopName}
                    </span>
                    {stop.ada === "1" && (
                      <div className="ml-3 bg-[#0039A6] p-1 rounded-sm">
                        <Accessibility size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}

        <div className="col-start-2 flex justify-center h-10">
          <div
            className="w-[12px] h-[4px]"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 relative mt-2 overflow-hidden">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 text-zinc-400 text-lg font-medium bg-black px-4 z-20 pb-2">
        Stopping at
      </div>

      <div className="h-full px-10 overflow-y-auto pb-8 custom-scrollbar pt-6">
        {renderBody()}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};
