import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ChartPoint = [number, number]; // Define the type for a data point in Highcharts

type StockData = {
  t: number; // timestamp
  c: number; // closing price
};

export default function Polygon({
  submitMessage,
  ticker,
}: {
  submitMessage: (message: string) => void;
  ticker: string;
}) {

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: `${ticker} 股票價格`,
    },
    rangeSelector: {
      enabled: true,
    },
    series: [
      {
        name: `${ticker} 股票價格`,
        data: [] as ChartPoint[],
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  });

  // Calculate 3 months back date from today
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Convert date to YYYY-MM-DD format
  const fromDate = threeMonthsAgo.toISOString().split("T")[0];
  const toDate = new Date().toISOString().split("T")[0]; // Today's date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/polygon?symbol=${ticker}&from=${fromDate}&to=${toDate}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (
          (json.status === "OK" || json.status === "DELAYED") &&
          Array.isArray(json.results)
        ) {
          const chartData: ChartPoint[] = json.results.map(
            (item: StockData) => [new Date(item.t).getTime(), item.c]
          );
          setChartOptions((prevOptions) => ({
            ...prevOptions,
            series: [{ ...prevOptions.series[0], data: chartData }],
          }));
        } else {
          console.error("Error fetching stock data:", json);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchData();
  }, [fromDate, toDate]); // Make sure useEffect reacts to changes in fromDate and toDate

  const getStockQuestions = (ticker: string) => {
    return [
      {
        heading: `你之前買過哪些品牌，以及它們在${ticker}的可持續性方面如何比較？`,
        message: `你之前買過哪些品牌，以及它們在${ticker}的可持續性方面如何比較？請製作一個表格`,
      },
      {
        heading: `${ticker} 股票的歷史是什麼？`,
        message: `${ticker} 股票的歷史是什麼？`,
      },
    ];
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {getStockQuestions(ticker)?.map((msg, idx) => (
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
