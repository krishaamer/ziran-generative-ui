"use client";
import React from "react";
import GoogleMapReact from 'google-map-react';
import { IconSparkles } from "@/components/ui/icons";

interface AnyReactComponentProps {
  text: string;
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
  <div className="text-lg bg-orange-200 rounded-md shadow-lg">
    {text}
    <IconSparkles />
  </div>
);

interface DefaultProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export default function SimpleMap() {
  const defaultProps: DefaultProps = {
    center: {
      lat: 23.0124433,
      lng: 120.212851
    },
    zoom: 13
  };

  return (
    <div
      style={{ height: "500px", width: "100%" }}
      className="rounded-md shadow-lg ring overflow-hidden"
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
            "AIzaSyB6uP_GJFF4Ngfxdp3aftquS7cYp_tgw18",
        }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={23.0124433}
          lng={120.212851}
          text="Repair Shop"
        />
        <AnyReactComponent
          lat={23.1124111}
          lng={120.312551}
          text="Another Repair Shop"
        />
        <AnyReactComponent
          lat={23.0121111}
          lng={120.111551}
          text="One More Repair Shop"
        />
      </GoogleMapReact>
    </div>
  );
}