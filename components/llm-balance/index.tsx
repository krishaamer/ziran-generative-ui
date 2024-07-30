"use client";

import { Balance as MyBalance } from "../balance";
import { BotMessage } from "@/components/shared/message";

export default function Balance() {
  
  return (
    <>
      <BotMessage>Your account balance</BotMessage>
      <div className="rounded-lg shadow-lg ring overflow-hidden">
        <MyBalance />
      </div>
    </>
  );
}
