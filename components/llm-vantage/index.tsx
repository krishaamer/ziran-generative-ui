import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

// Define the type for a data point in Highcharts
type ChartPoint = [number, number];

export default function High() {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "NVDA Stock Price",
    },
    rangeSelector: {
      enabled: false, // Disable the range selector to hide zoom level controls
    },
    series: [
      {
        name: "NVDA",
        data: [] as ChartPoint[], // Define the type for data points
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/stock?symbol=NVDA");
      const rawData = await response.json();

      if (rawData && Array.isArray(rawData)) {
        const chartData: ChartPoint[] = rawData.map(({ date, close }) => [
          new Date(date).getTime(), // Convert date to JavaScript timestamp
          close,
        ]);

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [{ ...prevOptions.series[0], data: chartData }],
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={chartOptions}
    />
  );
}
