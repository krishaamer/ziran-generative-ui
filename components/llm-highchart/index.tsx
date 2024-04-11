import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function High() {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "AAPL Stock Price",
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
      const response = await fetch(
        "https://demo-live-data.highcharts.com/aapl-c.json"
      );
      const data = await response.json();

      // Assuming data is sorted, get the last date from the data for the max value
      const lastDataPoint = data.length > 0 ? data[data.length - 1] : null;
      const sixMonthsAgo = lastDataPoint
        ? lastDataPoint[0] - 6 * 30 * 24 * 60 * 60 * 1000
        : null;

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xAxis: {
          min: sixMonthsAgo,
          max: lastDataPoint ? lastDataPoint[0] : null, // Set the max to the last data point's date
        },
        series: [{ ...prevOptions.series[0], data }],
      }));
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
