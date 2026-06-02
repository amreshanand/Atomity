import { useQuery } from '@tanstack/react-query';

type Provider = 'aws' | 'azure' | 'gcp' | 'onprem';

export interface Metric {
  provider: Provider;
  utilization: number; // percentage 0-100
}

export interface CloudMetrics {
  metrics: Metric[];
  savings: number; // dollars saved today
}

export const optimizeCloudMetrics = (current: CloudMetrics): CloudMetrics => {
  const optimizedMetrics = current.metrics.map((metric) => {
    const isOnPrem = metric.provider === 'onprem';
    const nextUtilization = isOnPrem
      ? Math.min(100, Math.round(metric.utilization * 1.08) + 3)
      : Math.max(12, Math.round(metric.utilization * 0.82) - 4);

    return {
      ...metric,
      utilization: nextUtilization,
    };
  });

  const publicCloudReduction = current.metrics
    .filter((metric) => metric.provider !== 'onprem')
    .reduce((acc, metric) => acc + (metric.utilization - Math.max(12, Math.round(metric.utilization * 0.82) - 4)), 0);

  return {
    metrics: optimizedMetrics,
    savings: Math.max(current.savings, Math.round(current.savings + publicCloudReduction * 28)),
  };
};

// Mock fetch function – replace with real API later
const fetchMetrics = async (): Promise<CloudMetrics> => {
  // Simulate 300 ms latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    metrics: [
      { provider: 'aws', utilization: Math.round(Math.random() * 100) },
      { provider: 'azure', utilization: Math.round(Math.random() * 100) },
      { provider: 'gcp', utilization: Math.round(Math.random() * 100) },
      { provider: 'onprem', utilization: Math.round(Math.random() * 100) },
    ],
    savings: Math.round(8000 + Math.random() * 5000),
  };
};

export const useCloudMetrics = () => {
  return useQuery<CloudMetrics>(['cloudMetrics'], fetchMetrics, {
    staleTime: 5 * 60 * 1000, // 5 min
    refetchInterval: 30 * 1000, // update ticker every 30 s
  });
};
