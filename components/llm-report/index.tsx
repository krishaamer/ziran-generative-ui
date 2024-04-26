import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Report({
  submitMessage,
  reportID,
}: {
  submitMessage: (message: string) => void;
  reportID: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/report?id=${reportID}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (
          (json.status === "OK" || json.status === "DELAYED") &&
          Array.isArray(json.results)
        ) {
          // set data

          setIsLoading(false); // Stop loading after data is received
        } else {
          console.error("Error fetching stock data:", json);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false); // Stop loading on error
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[100px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
