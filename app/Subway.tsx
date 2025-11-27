"use client";
import { ArrivalInfo } from "@/components/ArrivalInfo";
import { RouteMap } from "@/components/RouteMap";
import { SubwayFooter } from "@/components/SubwayFooter";
import { SubwayHeader } from "@/components/SubwayHeader";

export default function Subway() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      <SubwayHeader />
      <ArrivalInfo />
      <RouteMap />
      <SubwayFooter />
    </div>
  );
}
