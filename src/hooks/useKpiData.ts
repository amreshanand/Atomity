import { useQuery } from '@tanstack/react-query';

type Kpi = {
  id: number;
  title: string;
  value: number;
};

async function fetchKpis(): Promise<Kpi[]> {
  // Simulating an API call to the Atomity orchestration backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Carbon Offset (tons CO2e)', value: 436 },
        { id: 2, title: 'Idle Compute Nodes Reclaimed', value: 286 },
        { id: 3, title: 'Avg Latency Savings (ms)', value: 124 },
        { id: 4, title: 'Active Cloud Regions', value: 24 },
      ]);
    }, 600);
  });
}

export function useKpiData() {
  return useQuery(['kpis'], fetchKpis, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30,
  });
}
