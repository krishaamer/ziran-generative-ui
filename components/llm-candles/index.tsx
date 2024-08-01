import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function Candles({
  submitMessage,
  tickers,
}: {
  submitMessage: (message: string) => void;
  tickers: string[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Calculate 3 months back date from today
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const fromDate = threeMonthsAgo.toISOString().split("T")[0];
  const toDate = new Date().toISOString().split("T")[0]; // Today's date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = tickers.map((ticker) =>
          fetch(`/api/polygon?symbol=${ticker}&from=${fromDate}&to=${toDate}`)
            .then((response) => response.json())
            .then((json) => {
              if (
                (json.status === "OK" || json.status === "DELAYED") &&
                Array.isArray(json.results)
              ) {
                return json.results.map((item: { t: number; c: number }) => ({
                  x: new Date(item.t).toISOString().split("T")[0],
                  y: item.c,
                }));
              } else {
                console.error(`Error fetching stock data for ${ticker}:`, json);
                return [];
              }
            })
        );

        const results = await Promise.all(fetchPromises);

        const labels = Array.from(
          new Set(results.flat().map((item) => item.x))
        ).sort();
        const datasets = results.map((data, index) => ({
          label: `${tickers[index]} Stock Price`,
          data: labels.map(
            (label) => data.find((item) => item.x === label)?.y || 0
          ),
          backgroundColor: `rgba(${faker.datatype.number({ min: 0, max: 255 })}, ${faker.datatype.number({ min: 0, max: 255 })}, ${faker.datatype.number({ min: 0, max: 255 })}, 0.5)`,
        }));

        setChartData({ labels, datasets });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tickers, fromDate, toDate]);

  const getStockQuestions = (tickers: string[]) => {
    const tickerList = tickers.join(", ");
    return [
      {
        heading: `How do these stocks (${tickerList}) perform?`,
        message: `Please compare the performance of these stocks (${tickerList}). Create a table.`,
      },
      {
        heading: `What is the market trend for these stocks (${tickerList})?`,
        message: `Analyze the market trend of these stocks (${tickerList}).`,
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[100px] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Bar options={options} data={chartData} />
      <div className="flex flex-wrap gap-2 mt-4">
        {getStockQuestions(tickers).map((msg, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="h-auto p-1 pr-2 text-base shadow-sm border border-slate-100 grow md:grow-0 text-left justify-start"
            onClick={async () => {
              submitMessage(msg.message);
            }}
          >
            <Badge variant="outline" className="m-1 mr-2 bg-amber-200">
              {idx + 1}
            </Badge>
            {msg.heading}
          </Button>
        ))}
      </div>
    </div>
  );
}
