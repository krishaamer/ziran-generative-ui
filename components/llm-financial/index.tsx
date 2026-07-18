"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FinancialProps {
  submitMessage: (message: string) => void;
  tickers: string[];
}

interface PolygonResult {
  t: number;
  c: number;
}

interface ApiResponse {
  status?: string;
  results?: PolygonResult[];
}

type ChartPoint = {
  date: string;
  [ticker: string]: string | number;
};

const COLORS = ["#16a34a", "#2563eb", "#f97316", "#9333ea"];

export default function Financial({
  submitMessage,
  tickers,
}: FinancialProps) {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tickerKey = tickers.join(",");
  const stableTickers = useMemo(
    () => tickerKey.split(",").filter(Boolean),
    [tickerKey],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);

      const fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 3);
      const from = fromDate.toISOString().split("T")[0];
      const to = new Date().toISOString().split("T")[0];

      try {
        const results = await Promise.all(
          stableTickers.map(async (ticker) => {
            const response = await fetch(
              `/api/polygon?symbol=${encodeURIComponent(ticker)}&from=${from}&to=${to}`,
              { signal: controller.signal },
            );
            const payload = (await response.json()) as ApiResponse;
            return {
              ticker,
              points: Array.isArray(payload.results) ? payload.results : [],
            };
          }),
        );

        const pointsByDate = new Map<string, ChartPoint>();
        for (const result of results) {
          for (const point of result.points) {
            const date = new Date(point.t).toISOString().split("T")[0];
            const existing = pointsByDate.get(date) ?? { date };
            existing[result.ticker] = point.c;
            pointsByDate.set(date, existing);
          }
        }

        setData(
          [...pointsByDate.values()].sort((a, b) =>
            a.date.localeCompare(b.date),
          ),
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setData([]);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void fetchData();
    return () => controller.abort();
  }, [stableTickers]);

  const analysisPrompt = useMemo(
    () =>
      `請比較 ${stableTickers.join(", ")} 最近三個月的股價趨勢，並說明這些市場資料本身無法證明哪些 ESG 結論。資料：${JSON.stringify(data)}`,
    [data, stableTickers],
  );

  if (isLoading) {
    return (
      <div className="space-y-3 py-6">
        <Skeleton className="h-72 w-full rounded-lg" />
        <Skeleton className="h-10 w-72" />
      </div>
    );
  }

  if (!data.length) {
    return <div className="py-6 text-sm text-muted-foreground">暫時沒有可用的股票資料。</div>;
  }

  return (
    <div className="space-y-4">
      <div className="h-96 w-full" aria-label={`${stableTickers.join(", ")} stock-price chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 4, right: 12, top: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              minTickGap={32}
              tickFormatter={(value: string) => value.slice(5)}
            />
            <YAxis domain={["auto", "auto"]} width={56} />
            <Tooltip />
            <Legend />
            {stableTickers.map((ticker, index) => (
              <Line
                key={ticker}
                type="monotone"
                dataKey={ticker}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Button
        variant="outline"
        className="h-auto justify-start text-left"
        onClick={() => submitMessage(analysisPrompt)}
      >
        <Badge variant="outline" className="mr-2 bg-amber-200">
          1
        </Badge>
        比較 {stableTickers.join(", ")} 的股價與 ESG 解讀限制
      </Button>
    </div>
  );
}
