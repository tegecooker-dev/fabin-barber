import { useEffect, useState } from "react";

type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string | null };

function getBrasiliaDate(date: Date = new Date()): { day: number; h: number; m: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);

  const daysMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: daysMap[weekday] ?? 0,
    h: hour,
    m: minute,
  };
}

/**
 * Returns real-time open/closed status based on Fabin's business hours.
 * Automatically synchronizes with Brasília timezone (America/Sao_Paulo).
 *
 * Schedule:
 *  Monday          → Closed
 *  Tue–Fri         → 09:00–20:00
 *  Saturday        → 08:00–19:00
 *  Sunday          → 08:00–13:00
 */
function computeStatus(now: Date = new Date()): OpenStatus {
  const { day, h, m } = getBrasiliaDate(now);
  const minutes = h * 60 + m;

  // Monday — always closed
  if (day === 1) {
    return { open: false, opensAt: "Terça às 09:00" };
  }

  let open = 0;
  let close = 0;
  let nextDay = "";

  if (day >= 2 && day <= 5) {
    // Tue–Fri
    open = 9 * 60;
    close = 20 * 60;
    nextDay = day === 5 ? "Sábado às 08:00" : "amanhã às 09:00";
  } else if (day === 6) {
    // Saturday
    open = 8 * 60;
    close = 19 * 60;
    nextDay = "Domingo às 08:00";
  } else {
    // Sunday
    open = 8 * 60;
    close = 13 * 60;
    nextDay = "Terça às 09:00";
  }

  if (minutes >= open && minutes < close) {
    const closeH = Math.floor(close / 60);
    const closeM = close % 60;
    return {
      open: true,
      closesAt: `${String(closeH).padStart(2, "0")}:${String(closeM).padStart(2, "0")}`,
    };
  }

  // Before opening today
  if (minutes < open) {
    const openH = Math.floor(open / 60);
    const openM = open % 60;
    return {
      open: false,
      opensAt: `hoje às ${String(openH).padStart(2, "0")}:${String(openM).padStart(2, "0")}`,
    };
  }

  // After closing today
  return { open: false, opensAt: nextDay };
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() =>
    computeStatus(new Date()),
  );

  useEffect(() => {
    // Re-compute every 30 seconds
    const id = setInterval(() => setStatus(computeStatus(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
