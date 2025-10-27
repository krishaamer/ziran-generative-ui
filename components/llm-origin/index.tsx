"use client";

import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { BotMessage } from "@/components/shared/message";
import { useActions, useUIState } from "ai/rsc";
import { Button } from "@/components/ui/button";
import { Polyline } from "@/components/polyline";
import type { AI } from "../../app/action";

export default function Origin() {
  const position = { lat: 41, lng: 73 };
  const [flightPlanCoordinates, setFlightPlanCoordinates] = useState([
    { lat: 23.6978, lng: 120.9605 }, // Taiwan
    { lat: 58.5953, lng: 25.0136 }, // Estonia
  ]);
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

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
        onClick={async () => {
          const response = await submitUserMessage(
            `Explain previous conversation`
          );
          setMessages((currentMessages) => [...currentMessages, response]);
        }}
      >
        Explain
      </Button>
    </>
  );
}
