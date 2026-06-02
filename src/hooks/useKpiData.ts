import { useQuery } from '@tanstack/react-query';

type Kpi = {
  id: number;
  title: string;
  value: number;
};

async function fetchKpis(): Promise<Kpi[]> {
  const res = await fetch('https://dummyjson.com/products?limit=4');
  if (!res.ok) throw new Error('Failed to fetch');
  const json = await res.json();
  // Map products to KPI-like items
  return json.products.map((p: any, i: number) => ({
    id: p.id,
    title: p.title,
    value: Math.max(1, Math.floor(p.rating * 100)),
  }));
}

export function useKpiData() {
  return useQuery(['kpis'], fetchKpis, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30,
  });
}
