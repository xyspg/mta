import { useEffect, useState } from "react";
import { API_CONFIG } from "@/lib/constants";

export interface MtaArrival {
  tripId: string;
  routeId: string;
  headsign: string;
  arrivalTime: number; // timestamp
  departureTime: number; // timestamp
  realtime: boolean;
}

interface MtaTime {
  tripId: string;
  tripHeadsign: string;
  realtimeArrival: number;
  realtimeDeparture: number;
  serviceDay: number;
  realtime: boolean;
}

interface MtaGroup {
  route: {
    shortName: string;
  };
  times: MtaTime[];
}

interface MtaStopGroup {
  groups: MtaGroup[];
}

export const useMtaData = (stationId?: string) => {
  const [arrivals, setArrivals] = useState<MtaArrival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationId) {
      setArrivals([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Construct URL with dynamic station ID
        // Original URL: ...nearby?stops=MTASBWY%3AR09&apikey=...
        // We need to replace MTASBWY:R09 with the provided stationId (which might already include MTASBWY: prefix or not)
        // The station selector returns IDs like "MTASBWY:G22", so we can use it directly.
        // We need to encode it properly.

        const encodedStationId = encodeURIComponent(stationId);
        const url = `https://otp-mta-prod.camsys-apps.com/otp/routers/default/nearby?stops=${encodedStationId}&apikey=Z276E3rCeTzOQEoBPPN4JCEc6GfvdnYE`;

        const response = await fetch(url, {
          headers: API_CONFIG.headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Parse the response to extract relevant arrival info
        // The structure based on the user request example is:
        // [{ stop: {...}, groups: [{ route: {...}, times: [...] }] }]

        const parsedArrivals: MtaArrival[] = [];

        if (data && Array.isArray(data)) {
          data.forEach((stopGroup: MtaStopGroup) => {
            if (stopGroup.groups) {
              stopGroup.groups.forEach((group: MtaGroup) => {
                if (group.times) {
                  group.times.forEach((time: MtaTime) => {
                    const arrivalTimestamp =
                      (time.serviceDay + time.realtimeArrival) * 1000;
                    const departureTimestamp =
                      (time.serviceDay + time.realtimeDeparture) * 1000;

                    parsedArrivals.push({
                      tripId: time.tripId,
                      routeId: group.route.shortName,
                      headsign: time.tripHeadsign,
                      arrivalTime: arrivalTimestamp,
                      departureTime: departureTimestamp,
                      realtime: time.realtime,
                    });
                  });
                }
              });
            }
          });
        }

        // Sort by arrival time
        parsedArrivals.sort((a, b) => a.arrivalTime - b.arrivalTime);

        setArrivals(parsedArrivals);
        setError(null);
      } catch (err) {
        console.error("Error fetching MTA data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [stationId]);

  return { arrivals, loading, error };
};
