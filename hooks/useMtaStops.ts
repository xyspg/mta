import { useEffect, useState } from "react";

const API_KEY = "qeqy84JE7hUKfaI0Lxm2Ttcm6ZA0bYrP";

export interface MtaStop {
  stopId: string;
  stopName: string;
  borough: string;
  ada: string;
}

export const useMtaStops = (routeId: string | null) => {
  const [stops, setStops] = useState<MtaStop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!routeId) {
      setStops([]);
      return;
    }

    const fetchStops = async () => {
      setLoading(true);
      setError(null);
      try {
        const fullRouteId = `MTASBWY:${routeId}`;
        const url = `https://collector-otp-prod.camsys-apps.com/schedule/MTASBWY/stopsForRoute?apikey=${API_KEY}&routeId=${fullRouteId}`;

        const response = await fetch(url, {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStops(data);
      } catch (err) {
        console.error("Error fetching MTA stops:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
  }, [routeId]);

  return { stops, loading, error };
};
