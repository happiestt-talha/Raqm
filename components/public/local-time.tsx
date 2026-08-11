"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Karachi"
      }).format(new Date());
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-sm tabular-nums" suppressHydrationWarning>
      {time ?? "--:-- --"}
    </span>
  );
}