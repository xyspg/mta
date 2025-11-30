import type { Stop } from "@/types";

export const COLORS = {
  blue: "#0039A6",
  orange: "#FF6319",
  yellow: "#FCCC0A",
  grey: "#A7A9AC",
  darkBg: "#000000",
  green: "#6CBE45",
};

export const API_CONFIG = {
  url: "https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=MTASBWY%3AR09&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE",
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua":
      '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  },
};

export const STATION_CONFIG = {
  id: "MTASBWY:R09",
  name: "Queensboro Plaza",
  line: "N",
};

export const ALL_LINES = [
  { id: "1", color: "#EE352E" },
  { id: "2", color: "#EE352E" },
  { id: "3", color: "#EE352E" },
  { id: "4", color: "#00933C" },
  { id: "5", color: "#00933C" },
  { id: "6", color: "#00933C" },
  { id: "7", color: "#B933AD" },
  { id: "A", color: "#0039A6" },
  { id: "C", color: "#0039A6" },
  { id: "E", color: "#0039A6" },
  { id: "B", color: "#FF6319" },
  { id: "D", color: "#FF6319" },
  { id: "F", color: "#FF6319" },
  { id: "M", color: "#FF6319" },
  { id: "G", color: "#6CBE45" },
  { id: "J", color: "#996633" },
  { id: "Z", color: "#996633" },
  { id: "L", color: "#A7A9AC" },
  { id: "N", color: "#FCCC0A" },
  { id: "Q", color: "#FCCC0A" },
  { id: "R", color: "#FCCC0A" },
  { id: "W", color: "#FCCC0A" },
  { id: "S", color: "#808183" },
  { id: "SF", color: "#808183" },
  { id: "SR", color: "#808183" },
];

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
