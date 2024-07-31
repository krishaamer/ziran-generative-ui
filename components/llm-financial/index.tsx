import React, { useEffect, useState } from "react";
import { format, timeFormat } from "d3";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from "react-financial-charts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FinancialProps {
  submitMessage: (message: string) => void;
  tickers: string[];
}

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema12?: number; // Optional properties for EMA values
  ema26?: number; // Optional properties for EMA values
  bullPower?: number; // Optional properties for Elder Ray values
  bearPower?: number; // Optional properties for Elder Ray values
}

interface ApiResponse {
  status: string;
  results: Array<{
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  }>;
}

const Financial: React.FC<FinancialProps> = ({ submitMessage, tickers }) => {
  const [data, setData] = useState<StockData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3);
        const fromDateString = fromDate.toISOString().split("T")[0];
        const toDateString = new Date().toISOString().split("T")[0];

        const fetchPromises = tickers.map((ticker) =>
          fetch(
            `/api/polygon?symbol=${ticker}&from=${fromDateString}&to=${toDateString}`
          )
            .then((response) => response.json())
            .then((json: ApiResponse) => {
              if (
                (json.status === "OK" || json.status === "DELAYED") &&
                Array.isArray(json.results)
              ) {
                return json.results.map((item) => ({
                  date: new Date(item.t).toISOString().split("T")[0],
                  open: item.o,
                  high: item.h,
                  low: item.l,
                  close: item.c,
                  volume: item.v,
                }));
              } else {
                console.error(`Error fetching stock data for ${ticker}:`, json);
                return [];
              }
            })
        );

        const results = await Promise.all(fetchPromises);
        setData(results.flat());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tickers]);

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

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder<StockData>().inputDateAccessor(
      (d: StockData) => new Date(d.date)
    );
  const height = 600;
  const width = 600;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const ema12 = ema<StockData>()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: StockData, c: number) => {
      d.ema12 = c;
    })
    .accessor((d: StockData) => d.ema12);

  const ema26 = ema<StockData>()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: StockData, c: number) => {
      d.ema26 = c;
    })
    .accessor((d: StockData) => d.ema26);

  const elder = elderRay<StockData>();

  const calculatedData = elder(ema26(ema12(data)));
  const {
    data: finalData,
    xScale,
    xAccessor,
    displayXAccessor,
  } = ScaleProvider(calculatedData);
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(finalData[finalData.length - 1]);
  const min = xAccessor(finalData[Math.max(0, finalData.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: number, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ];
  const chartHeight = gridHeight - elderRayHeight;

  const yExtents = (data: StockData) => [data.high, data.low];
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const barChartExtents = (data: StockData) => data.volume;
  const candleChartExtents = (data: StockData) => [data.high, data.low];
  const yEdgeIndicator = (data: StockData) => data.close;
  const volumeColor = (data: StockData) =>
    data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  const volumeSeries = (data: StockData) => data.volume;
  const openCloseColor = (data: StockData) =>
    data.close > data.open ? "#26a69a" : "#ef5350";

  return (
    <div>
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={finalData}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries />
          <LineSeries
            yAccessor={ema26.accessor()}
            strokeStyle={ema26.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema26.accessor()}
            fillStyle={ema26.stroke()}
          />
          <LineSeries
            yAccessor={ema12.accessor()}
            strokeStyle={ema12.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema12.accessor()}
            fillStyle={ema12.stroke()}
          />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: "EMA",
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: "EMA",
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />
          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <ElderRaySeries yAccessor={elder.accessor()} />
          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d: { bullPower: number; bearPower: number }) =>
              `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`
            }
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
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
};

export default Financial;
