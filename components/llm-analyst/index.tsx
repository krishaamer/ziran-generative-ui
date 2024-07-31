"use client";

import React, { useRef } from "react";
import { useActions, useUIState } from "ai/rsc";
import { Button } from "@/components/ui/button";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { AI } from "../../app/action";

type ChartPoint = [number, number]; // Define the type for a data point in Highcharts

type StockData = {
  t: number; // timestamp
  c: number; // closing price
};

export default function Analyst({
  stockData,
  ticker,
}: {
  stockData: any;
  ticker: string;
}) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

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
        onClick={async () => {
          const response = await submitUserMessage( 
            `Please analyze the following stock data, think carefully and explain what it could mean for this particular company. Explain your thinking. Format the date in a human-readable format %Y-%m-%d and focus on the last 3 months in 2024 if available. Extrapolate how the stock is related to the environmental sustainabiltity of the company. Use your own data about the historical ESG performance of the company and how it could relate to the stock data. This is the stock data: ${content}`
          );
          setMessages((currentMessages) => [...currentMessages, response]);
        }}
      >
        解釋數據
      </Button>
    </>
  );
}
