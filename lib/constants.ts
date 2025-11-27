import type { Stop } from "@/types";

export const COLORS = {
  blue: "#0039A6",
  orange: "#FF6319",
  yellow: "#FCCC0A",
  grey: "#A7A9AC",
  darkBg: "#000000",
  green: "#6CBE45",
};

export const ROUTE_STOPS: Stop[] = [
  {
    id: 0,
    name: "Forest Hills-71 Av",
    transfers: ["E", "F", "M"],
    status: "past",
    isLirr: true,
  },
  {
    id: 1,
    name: "Atlantic Av-Barclays Ctr",
    transfers: ["B", "D", "N", "Q", "2", "3", "4", "5"],
    status: "past",
    isLirr: true,
  },
  { id: 2, name: "Union St", transfers: ["D", "N"], status: "past" },
  {
    id: 3,
    name: "4 Av-9 St",
    transfers: ["F", "G"],
    status: "current",
    accessible: true,
  },
  { id: 4, name: "Prospect Av", transfers: [], status: "future" },
  { id: 5, name: "25 St", transfers: [], status: "future" },
  { id: 6, name: "36 St", transfers: ["D", "N"], status: "future" },
  { id: 7, name: "45 St", transfers: [], status: "future" },
  { id: 8, name: "53 St", transfers: [], status: "future" },
  { id: 9, name: "59 St", transfers: ["N"], status: "future" },
  { id: 10, name: "Bay Ridge Av", transfers: [], status: "future" },
  { id: 11, name: "77 St", transfers: [], status: "future" },
  { id: 12, name: "86 St", transfers: [], status: "future", sbs: true },
  {
    id: 13,
    name: "Bay Ridge-95 St",
    transfers: [],
    status: "future",
    terminus: true,
  },
];
