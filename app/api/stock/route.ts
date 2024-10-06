import "server-only";
import { NextRequest, NextResponse } from "next/server";

// Interface for the daily stock data
interface DailyData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

// Interface for the metadata
interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

// Interface for the entire API response including a possible error message
interface ApiResponse {
  "Meta Data"?: MetaData;
  "Time Series (Daily)"?: { [key: string]: DailyData };
  "Error Message"?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const api_key = "NOQ41DSYXDIUNRN0";

  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${api_key}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log("API response not OK:", response.statusText);
      return new NextResponse(
        JSON.stringify({ error: "Error fetching data from API" }),
        { status: 500 }
      );
    }
    const jsonData = await response.json();
    const data = jsonData as ApiResponse; // Type assertion here

    if (data["Error Message"]) {
      return new NextResponse(
        JSON.stringify({ error: data["Error Message"] }),
        { status: 500 }
      );
    }

    if (!data["Time Series (Daily)"]) {
      return new NextResponse(JSON.stringify({ error: "No data available" }), {
        status: 404,
      });
    }

    const dailyTimeSeries = data["Time Series (Daily)"];
    const dataArray = Object.entries(dailyTimeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }));

    return new NextResponse(JSON.stringify(dataArray), { status: 200 });
  } catch (error) {
    console.log("Error fetching data from Alpha Vantage API:", error);
    return new NextResponse(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];