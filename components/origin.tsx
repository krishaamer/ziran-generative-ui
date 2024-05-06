import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDomainFromURL } from "@/lib/utils";

export default function Origin() {
  const [origin, setOrigin] = useState({ url: "" });
  const [reportID, setReportID] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    setReportID(id);

    if (id) {
      fetch(`/api/origin?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setOrigin({ url: data?.origin });
        })
        .catch((error) => {
          console.error("Failed to fetch origin data", error);
        });
    }
  }, [searchParams]);

  return (
    <div>
      {reportID &&
        origin.url && (
          <span>
            資料來源：
            <a
              href={origin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-bold"
            >
              {getDomainFromURL(origin.url)}
            </a>
          </span>
        )}
    </div>
  );
}
