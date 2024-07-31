"use client";

import Image from "next/image";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BotMessage, UserMessage } from "@/components/shared/message";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

export default function Factories() {
  const position = { lat: 23.0124433, lng: 120.212851 };
  const marker1 = { lat: 23.0124433, lng: 120.312851 };
  const marker2 = { lat: 23.0185, lng: 120.312751 };
  const marker3 = { lat: 23.0124222, lng: 120.318951 };

  return (
    <>
      <BotMessage>工廠範例圖片</BotMessage>
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
        className="mb-2"
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
      <BotMessage className="pb-2">
        創用CC授權的圖片，拍攝於尼加拉瓜的一家台灣公司擁有的紡織廠。這些照片是在台灣總統正式訪問期間拍攝的。原始圖片可以在下載：{" "}
        <strong>
          <a
            href="https://www.flickr.com/photos/presidentialoffice/albums/72157678740079556"
            target="_blank"
          >
            下載連結
          </a>
        </strong>
        。
      </BotMessage>

      <BotMessage>工廠範例地圖</BotMessage>
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
      <div className="group relative flex items-start md:-ml-12">
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border bg-primary text-primary-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="ring-1 ring-offset-2 ring-amber-950 cursor-pointer">
                <AvatarImage src="/images/avatar-2.jpg" alt="助手" />
                <AvatarFallback>助手</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>綠濾助手</TooltipContent>
          </Tooltip>
        </div>
        <Card className="py-2 ring-1 ring-offset-2 ring-orange-950 bg-amber-200	">
          <CardContent>這裡附近有一些紡織廠</CardContent>
        </Card>
      </div>
    </>
  );
}
