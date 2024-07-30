"use client";

import { Passport as MyPassport } from "../passport";
import { BotMessage } from "@/components/shared/message";

export default function Passport() {
  return (
    <>
      <BotMessage>Check this product digital product passport</BotMessage>
      <div className="rounded-lg shadow-lg ring overflow-hidden">
        <MyPassport />
      </div>
    </>
  );
}
