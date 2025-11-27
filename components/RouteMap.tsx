import { Accessibility } from "lucide-react";
import React from "react";
import { COLORS, ROUTE_STOPS } from "@/lib/constants";
import { LineBullet } from "./LineBullet";
import { LirrBadge } from "./LirrBadge";
import { TrackSegment } from "./TrackSegment";

export const RouteMap = () => {
  return (
    <div className="flex-1 relative mt-2 overflow-hidden">
      {/* "Stopping at" label */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 text-zinc-400 text-lg font-medium bg-black px-4 z-20 pb-2">
        Stopping at
      </div>

      <div className="h-full px-10 overflow-y-auto pb-8 custom-scrollbar pt-6">
        <div className="grid grid-cols-[1fr_60px_1fr] w-full max-w-6xl mx-auto h-full gap-x-6">
          {ROUTE_STOPS.map((stop, index) => {
            const isPast = stop.status === "past";
            const isCurrent = stop.status === "current";

            // Line Logic
            let lineAbove: "past" | "future" | "none" = "none";
            if (index > 0) {
              lineAbove =
                ROUTE_STOPS[index - 1].status === "past" ? "past" : "future";
              if (isCurrent) lineAbove = "past";
            }

            let lineBelow: "past" | "future" | "none" = "none";
            if (index < ROUTE_STOPS.length - 1) {
              lineBelow = isPast ? "past" : "future";
              if (isCurrent) lineBelow = "future";
            }

            return (
              <React.Fragment key={stop.id}>
                {/* LEFT: Transfers */}
                <div
                  className={`flex items-center justify-end gap-2 py-5 pr-4 ${isPast ? "opacity-40 grayscale" : ""}`}
                >
                  {stop.isLirr && <LirrBadge />}
                  {stop.transfers.map((t) => (
                    <LineBullet key={t} line={t} size="sm" />
                  ))}
                </div>

                {/* CENTER: Track */}
                <div className="flex flex-col items-center relative h-full min-h-[90px]">
                  {/* Line Above Node */}
                  <div className="flex-1 w-full flex justify-center">
                    <TrackSegment type={lineAbove} color={COLORS.yellow} />
                  </div>

                  {/* The Node Itself */}
                  <div className="z-10 py-1">
                    {isCurrent ? (
                      // Current Station: White Box with arrow pointing down implicitly
                      <div className="relative">
                        <div className="w-8 h-8 bg-white rotate-45 border-4 border-black ring-2 ring-white z-20 relative"></div>
                      </div>
                    ) : (
                      // Regular Station: Circle
                      // Future stops are White circles on the Yellow line
                      <div
                        className={`w-6 h-6 rounded-full border-[3px] z-10 relative
                                    ${isPast ? "border-zinc-500 bg-black" : "border-black bg-white ring-0"}
                                 `}
                      ></div>
                    )}
                  </div>

                  {/* Line Below Node */}
                  <div className="flex-1 w-full flex justify-center">
                    <TrackSegment type={lineBelow} color={COLORS.yellow} />
                  </div>
                </div>

                {/* RIGHT: Station Name */}
                <div
                  className={`flex items-center pl-4 py-5 ${isPast ? "opacity-40" : ""}`}
                >
                  {isCurrent ? (
                    // Current Station Highlight (White Capsule)
                    <div className="bg-white text-black pl-4 pr-6 py-2 rounded-lg font-bold text-3xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center transform -translate-x-2">
                      {stop.name}
                      {/* <Accessibility size={24} className="ml-3 text-black" /> */}
                    </div>
                  ) : (
                    // Regular Name
                    <div className="flex items-center">
                      <span className="text-3xl font-bold tracking-wide text-white/90">
                        {stop.name}
                      </span>
                      {stop.accessible && !isCurrent && (
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

          {/* Footer of the line (Terminus logic) */}
          <div className="col-start-2 flex justify-center h-10">
            <div className="w-[12px] h-[4px] bg-[#FCCC0A] mt-0"></div>{" "}
            {/* Terminus bar */}
          </div>
        </div>
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
