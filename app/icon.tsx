import { ImageResponse } from "next/og";

// 32x32 favicon — Next auto-routes this to /icon.png and injects a <link>.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f766e",
          color: "white",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 6,
        }}
      >
        FT
      </div>
    ),
    { ...size },
  );
}
