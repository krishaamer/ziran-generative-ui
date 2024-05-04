"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDomainFromURL } from "@/lib/utils";

export default function Origin() {
  const [origin, setOrigin] = useState({ url: ""});
  const searchParams = useSearchParams();

  useEffect(() => {
    const reportID = searchParams.get("id");

    if (reportID) {
      fetch(`/api/origin?id=${reportID}`)
        .then((response) => response.json())
        .then((data) => {
          setOrigin({url: data?.origin});
        })
        .catch((error) => {
          console.error("Failed to origin data", error);
        });
    }
  }, [searchParams]);

  return (
    <div>
      {origin ? (
        <span>
          資料來源：
          <a href={origin?.url} target="_blank" className="link font-bold">{getDomainFromURL(origin?.url)}</a>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
