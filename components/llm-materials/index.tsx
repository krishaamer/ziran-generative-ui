"use client";

import { Button } from "@/components/ui/button";

export default function Materials({
  onSubmit,
}: {
  onSubmit: (message: string) => void | Promise<void>;
}) {
  return (
    <>
      <div
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg ring overflow-hidden"
      >
        <h1 className="text-3xl">Product Materials</h1>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="p-2 rounded-lg flex flex-row gap-2 cursor-pointer mt-2 r-0"
        onClick={() => onSubmit("請解釋這項產品使用的材質及其永續影響。")}
      >
        Explain
      </Button>
    </>
  );
}
