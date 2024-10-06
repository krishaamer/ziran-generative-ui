import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ChartPoint = [number, number];

type StockData = {
  t: number; // timestamp
  c: number; // closing price
};

export default function Polygon({
  submitMessage,
  tickers,
}: {
  submitMessage: (message: string) => void;
  tickers: string[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "股票價格",
    },
    rangeSelector: {
      enabled: true,
    },
    series: [] as Highcharts.SeriesOptionsType[],
    credits: {
      enabled: false,
    },
  });

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
                const chartData: ChartPoint[] = json.results.map(
                  (item: StockData) => [new Date(item.t).getTime(), item.c]
                );
                return { ticker, data: chartData };
              } else {
                console.log(`Error fetching stock data for ${ticker}:`, json);
                return { ticker, data: [] };
              }
            })
        );

        const results = await Promise.all(fetchPromises);

        const series = results.map(({ ticker, data }) => ({
          name: `${ticker} 股票價格`,
          data,
          tooltip: {
            valueDecimals: 2,
          },
        })) as Highcharts.SeriesOptionsType[];

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series,
        }));
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching stock data:", error);
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [tickers, fromDate, toDate]);

  const getStockQuestions = (tickers: string[]) => {
    const tickerList = tickers.join(", ");
    return [
      {
        heading: `你如何比較這些股票 (${tickerList}) 的表現？`,
        message: `請比較這些股票 (${tickerList}) 的表現。請製作一個表格`,
      },
      {
        heading: `這些股票 (${tickerList}) 的市場趨勢是什麼？`,
        message: `分析這些股票 (${tickerList}) 的市場趨勢`,
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
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {getStockQuestions(tickers)?.map((msg, idx) => (
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
