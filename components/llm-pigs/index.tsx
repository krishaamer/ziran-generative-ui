"use client";

import Image from "next/image";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { BotMessage } from "@/components/shared/message";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

export default function Pigs() {
  const position = { lat: 22.7157987, lng: 120.5514646 };
  const marker1 = { lat: 22.7157987, lng: 120.5514646 };

  return (
    <>
      <BotMessage>
        台灣糖業股份有限公司東海豐農業循環園區。這邊有一些工廠範例圖片。這些照片是在是台灣環境資訊中心的。孫文臨攝。原始圖片可以在下載：**[下載連結](https://e-info.org.tw/node/224789)**。
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
          <Image src="/pigs/1.jpg" width={600} height={500} alt="Pigs" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pigs/2.jpg" width={600} height={500} alt="Pigs" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pigs/3.jpg" width={600} height={500} alt="Pigs" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pigs/4.jpg" width={600} height={500} alt="Pigs" />
        </SwiperSlide>
      </Swiper>

      <BotMessage>這裡附近有一些紡織廠 這些都是工廠範例地圖</BotMessage>
      <div
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg ring overflow-hidden mb-4"
      >
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            defaultCenter={position}
            defaultZoom={13}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker position={marker1} />
          </Map>
        </APIProvider>
      </div>
    </>
  );
}
