"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Factories() {
  const position = { lat: 23.0124433, lng: 120.212851 };
  const marker1 = { lat: 23.0124433, lng: 120.312851 };
  const marker2 = { lat: 23.0185, lng: 120.312751 };
  const marker3 = { lat: 23.0124222, lng: 120.318951 };

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      <div
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg ring overflow-hidden"
      >
        <APIProvider
          apiKey={
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
            "AIzaSyB6uP_GJFF4Ngfxdp3aftquS7cYp_tgw18"
          }
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
    </div>
  );
}
