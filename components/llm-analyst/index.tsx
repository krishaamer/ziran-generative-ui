"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type ChartPoint = [number, number]; // Define the type for a data point in Highcharts

type StockData = {
  t: number; // timestamp
  c: number; // closing price
};

export default function Analyst({
  stockData,
  ticker,
  onSubmit,
}: {
  stockData: StockData[];
  ticker: string;
  onSubmit: (message: string) => void | Promise<void>;
}) {
  const chartData: ChartPoint[] = stockData?.map((item: StockData) => [
    new Date(item.t).getTime(),
    item.c,
  ]);
  const content = JSON.stringify(chartData);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const options = {
    title: {
      text: `${ticker} 股票價格`,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%Y-%m-%d}",
        style: {
          color: "#000000",
        },
      },
    },
    rangeSelector: {
      enabled: true,
    },
    series: [
      {
        name: `${ticker} 股票價格`,
        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
      <Button
        variant="outline"
        size="lg"
        className="mt-2 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white hover:text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
        onClick={() =>
          onSubmit(
            `請分析 ${ticker} 最近三個月的股票資料，並說明它可能如何反映公司的永續與 ESG 表現。若 ESG 資訊是推測或虛構，請清楚標示。資料：${content}`,
          )
        }
      >
        解釋數據
      </Button>
    </>
  );
}
