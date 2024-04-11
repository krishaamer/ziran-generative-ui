import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function High() {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Apple Stock Price",
    },
    series: [
      {
        name: "AAPL",
        data: [],
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
      const now = new Date();
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
      const toDate = Math.floor(now.getTime() / 1000);
      const fromDate = Math.floor(sixMonthsAgo.getTime() / 1000);

      const response = await fetch(
        `/api/stock?from=${fromDate}&to=${toDate}`
      );
      const data = await response.json();

      if (data && data.c && Array.isArray(data.c)) {
        // Assuming data.c is an array of numbers and data.t is an array of timestamps
        const chartData = data.c.map((closePrice: number, index: number) => {
          return [
            data.t[index] * 1000, // convert Unix timestamp to JavaScript timestamp
            closePrice,
          ];
        });

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
