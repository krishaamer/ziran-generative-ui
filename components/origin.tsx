"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDomainFromURL } from "@/lib/utils";

export default function Origin() {
  const [reportID, setReportID] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const reportIDParam = searchParams.get("id");

    if (reportIDParam) {
      setReportID(reportIDParam);
    }
  }, [searchParams]);

  return <div>{reportID}</div>;
}
