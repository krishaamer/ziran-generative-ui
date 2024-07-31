"use client";

import Image from "next/image";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { BotMessage } from "@/components/shared/message";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

export default function Factories() {
  const position = { lat: 23.0124433, lng: 120.312851 };
  const marker1 = { lat: 23.0124433, lng: 120.312851 };
  const marker2 = { lat: 23.0185, lng: 120.312751 };
  const marker3 = { lat: 23.0124222, lng: 120.318951 };

  return (
    <>
      <BotMessage>
        這邊有一些工廠範例圖片 創用CC授權的圖片，拍攝於尼加拉瓜的一家台灣公司擁有的紡織廠。這些照片是在台灣總統正式訪問期間拍攝的。原始圖片可以在下載：*[下載連結](https://www.flickr.com/photos/presidentialoffice/albums/72157678740079556)*。
      </BotMessage>
      <Swiper
        spaceBetween={0}
        autoHeight={true}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="mb-6"
      >
        <SwiperSlide>
          <Image
            src="/factories/1.jpg"
            width={600}
            height={500}
            alt="Factory"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/factories/2.jpg"
            width={600}
            height={500}
            alt="Factory"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/factories/3.jpg"
            width={600}
            height={500}
            alt="Factory"
          />
        </SwiperSlide>
      </Swiper>

      <BotMessage>這裡附近有一些紡織廠 這些都是工廠範例地圖</BotMessage>
      <div
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg ring overflow-hidden mb-4"
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
    </>
  );
}
