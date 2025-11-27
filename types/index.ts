export interface Stop {
  id: number;
  name: string;
  transfers: string[];
  status: "past" | "current" | "future";
  isLirr?: boolean;
  accessible?: boolean;
  sbs?: boolean;
  terminus?: boolean;
}

export interface TrainStatus {
  line: string;
  destination: string;
  minutes: number;
}
