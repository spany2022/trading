import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Trading Mentorship — Learn a Structured Trading Process";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const candles = [52, 44, 48, 38, 42, 34, 40, 46, 42, 50, 56, 52, 60, 66];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B1020",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(32,201,151,0.28), transparent 45%)",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#20C997", textTransform: "uppercase" }}>
          Trading Mentorship Program
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>
          <span>Stop Guessing the Markets.</span>
          <span style={{ color: "#20C997" }}>Start Learning a Trading Process.</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#A7B1C2" }}>Free syllabus PDF · Upcoming batches · Book on WhatsApp</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
            {candles.map((h, i) => (
              <div
                key={i}
                style={{ width: 14, height: h + 10, borderRadius: 3, background: i > 0 && h < candles[i - 1] ? "#3A4660" : "#20C997" }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
