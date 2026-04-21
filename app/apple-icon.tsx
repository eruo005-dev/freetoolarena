import { ImageResponse } from "next/og";

// 180x180 Apple touch icon — pinned tabs, home-screen shortcuts, etc.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
          color: "white",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        FT
      </div>
    ),
    { ...size },
  );
}
