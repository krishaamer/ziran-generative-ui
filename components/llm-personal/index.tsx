"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Personal() {
  const [clientData, setClientData] = useState("");

  useEffect(() => {
    fetch("/api/personal")
      .then((response) => response.json())
      .then((data) => {
        // Directly use 'clientData' instead of nested 'data.value'
        setClientData(
          typeof data.clientData === "string" ? data.clientData : ""
        );
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await fetch("/api/personal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientData }),
    });
  };

  return (
    <>
      <h2 className="text-sm font-medium">Personal Data and Financial Goals</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
          value={clientData}
          onChange={(e) => setClientData(e.target.value)}
          placeholder="Enter client data here"
          required
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 ${
                clientData.trim()
                  ? "hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
                  : "cursor-not-allowed opacity-50"
              }`}
              disabled={!clientData.trim()}
            >
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save me!</TooltipContent>
        </Tooltip>
      </form>
    </>
  );
}
