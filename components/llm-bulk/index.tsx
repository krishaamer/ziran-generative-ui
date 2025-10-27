"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function SimpleMap() {
  const position = { lat: 23.0124433, lng: 120.212851 };
  const marker1 = { lat: 23.0124433, lng: 120.212851 };
  const marker2 = { lat: 23.018500, lng: 120.212751 };
  const marker3 = { lat: 23.0124222, lng: 120.218951 };

  return (
    <div
      style={{ height: "500px", width: "100%" }}
      className="rounded-lg shadow-lg ring overflow-hidden"
    >
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <Map
          defaultCenter={position}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker position={marker1} />
          <Marker position={marker2} />
          <Marker position={marker3} />
        </Map>
      </APIProvider>
    </div>
  );
}
