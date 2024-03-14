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
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}