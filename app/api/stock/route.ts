import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

interface DailyTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const api_key = "NOQ41DSYXDIUNRN0"; // Replace with your Alpha Vantage API key

  // Construct the API URL
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${api_key}`;

  try {
    // Fetch data from the Alpha Vantage API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if data contains error message
    if (data["Error Message"]) {
      return NextResponse.json(
        { error: data["Error Message"] },
        { status: 500 }
      );
    }

    // Extract daily time series data
    const dailyTimeSeries = data["Time Series (Daily)"];
    const dataArray = Object.entries<DailyTimeSeries>(dailyTimeSeries).map(
      ([date, values]) => ({
        date,
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
        volume: parseInt(values["5. volume"]),
      })
    );

    return NextResponse.json(dataArray);
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage API:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
