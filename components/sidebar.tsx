import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import easy from "../public/easy.json";
import dragon from "../public/dragon.json";
import carrot from "../public/carrot.json";
import TabBar from "./tab-bar";

export function Sidebar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="relative mx-auto max-w-2xl px-4 mt-10">
      <h2 className="text-xl font-bold text-center">相關問題</h2>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
    </div>
  );
}
