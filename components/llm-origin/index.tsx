"use client";

import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { BotMessage } from "@/components/shared/message";
import { Button } from "@/components/ui/button";
import { Polyline } from "@/components/polyline";

export default function Origin({
  onSubmit,
}: {
  onSubmit: (message: string) => void | Promise<void>;
}) {
  const position = { lat: 41, lng: 73 };
  const flightPlanCoordinates = [
    { lat: 23.6978, lng: 120.9605 }, // Taiwan
    { lat: 58.5953, lng: 25.0136 }, // Estonia
  ];

  return (
    <>
      <BotMessage>產品來源</BotMessage>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <div
          style={{ height: "500px", width: "100%" }}
          className="rounded-lg shadow-lg ring overflow-hidden"
        >
          <Map
            zoom={3}
            center={position}
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
          >
            <Polyline
              path={flightPlanCoordinates}
              strokeColor="#FF0000"
              strokeOpacity={1.0}
              strokeWeight={2}
            />
          </Map>
        </div>
      </APIProvider>
      <Button
        variant="outline"
        size="lg"
        className="p-2 rounded-lg flex flex-row gap-2 cursor-pointer mt-2 r-0"
        onClick={() => onSubmit("請解釋剛才顯示的產品來源與運輸路線。")}
      >
        Explain
      </Button>
    </>
  );
}
