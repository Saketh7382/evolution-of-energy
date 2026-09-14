import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { BOOK_SUBTITLE } from "@/lib/site";

export const alt = "Evolution of Energy by Sreedhar G.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const cover = await readFile(path.join(process.cwd(), "public/canonical/eoe-canonical-cover.png"));
  const coverDataUrl = `data:image/png;base64,${cover.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #071a2f 0%, #123653 100%)",
        color: "#fff9ef",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "62px 78px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(197, 140, 71, .62)",
          inset: "28px",
          position: "absolute",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "690px" }}>
        <div
          style={{
            color: "#d8a45f",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          First Canonical Edition
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 86,
            letterSpacing: "-.04em",
            lineHeight: .92,
            marginTop: 30,
          }}
        >
          Evolution of Energy
        </div>
        <div style={{ color: "#dbe3ea", fontSize: 25, lineHeight: 1.35, marginTop: 30 }}>
          {BOOK_SUBTITLE}
        </div>
        <div style={{ color: "#d8a45f", fontSize: 24, marginTop: 34 }}>Sreedhar G.</div>
      </div>
      <img
        alt=""
        height={474}
        src={coverDataUrl}
        style={{ objectFit: "contain" }}
        width={297}
      />
    </div>,
    size,
  );
}
