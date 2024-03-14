"use client";
import React from "react";
import GoogleMapReact from 'google-map-react';

interface AnyReactComponentProps {
  text: string;
  lat: number;
  lng: number;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => <div>{text}</div>;

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
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
            "AIzaSyB6uP_GJFF4Ngfxdp3aftquS7cYp_tgw18",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={23.123411} lng={120.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}