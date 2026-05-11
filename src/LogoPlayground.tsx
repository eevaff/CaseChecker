var V_PATH = "M16 17.3335L53.3333 89.3335L90.6667 17.3335H70.6667L53.3333 56.0002L36 17.3335H16Z";
var BRASS = "#D4A574";
var INK = "#0f172a";
var MUTED = "#94a3b8";
var BORDER = "#e2e8f0";

// Inline V mark (no box) — used when pairing SVG V with a font
function VMarkInline({ size }: { size: number }) {
  var vw = Math.round(size * 75 / 73);
  return (
    <svg width={vw} height={size} viewBox="16 17 75 73" fill="none">
      <path d={V_PATH} fill={BRASS} />
    </svg>
  );
}

var options = [
  {
    id: "a",
    label: "Instrument Serif — colored V, no icon",
    note: "Editorial. Closest to Harvey / Abridge.",
    render: (size: number) => (
      <span style={{ fontFamily: "Instrument Serif, serif", fontSize: size, color: INK, letterSpacing: "-0.01em", lineHeight: 1 }}>
        <span style={{ color: BRASS }}>V</span>erlo
      </span>
    ),
  },
  {
    id: "b",
    label: "Instrument Serif italic — colored V",
    note: "Adds warmth and distinction. Still authoritative.",
    render: (size: number) => (
      <span style={{ fontFamily: "Instrument Serif, serif", fontSize: size, color: INK, letterSpacing: "-0.01em", lineHeight: 1, fontStyle: "italic" }}>
        <span style={{ color: BRASS }}>V</span>erlo
      </span>
    ),
  },
  {
    id: "c",
    label: "Fraunces — colored V, no icon",
    note: "Optical serif. Distinctive, premium, used by Ambrook.",
    render: (size: number) => (
      <span style={{ fontFamily: "Fraunces, serif", fontSize: size, fontWeight: 400, color: INK, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ color: BRASS }}>V</span>erlo
      </span>
    ),
  },
  {
    id: "d",
    label: "SVG V mark + Instrument Serif erlo",
    note: "Keeps the geometric mark, serif brings elegance.",
    render: (size: number) => (
      <div style={{ display: "flex", alignItems: "center", gap: 4, lineHeight: 1 }}>
        <VMarkInline size={Math.round(size * 1.05)} />
        <span style={{ fontFamily: "Instrument Serif, serif", fontSize: size, color: INK, letterSpacing: "-0.01em", lineHeight: 1 }}>erlo</span>
      </div>
    ),
  },
  {
    id: "e",
    label: "Syne — colored V, no icon",
    note: "Geometric sans. More technical / product-forward.",
    render: (size: number) => (
      <span style={{ fontFamily: "Syne, sans-serif", fontSize: size, fontWeight: 600, color: INK, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ color: BRASS }}>V</span>erlo
      </span>
    ),
  },
  {
    id: "f",
    label: "Plus Jakarta Sans — colored V, no icon",
    note: "Clean modern sans. More startup / product feel.",
    render: (size: number) => (
      <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: size, fontWeight: 600, color: INK, letterSpacing: "-0.02em", lineHeight: 1 }}>
        <span style={{ color: BRASS }}>V</span>erlo
      </span>
    ),
  },
  {
    id: "g",
    label: "Current — DM Sans 800 + SVG V",
    note: "For reference.",
    render: (size: number) => (
      <div style={{ display: "flex", alignItems: "center", gap: 2, lineHeight: 1 }}>
        <VMarkInline size={Math.round(size * 1.15)} />
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: size, fontWeight: 800, color: INK, letterSpacing: "-0.01em", lineHeight: 1 }}>erlo</span>
      </div>
    ),
  },
];

export default function LogoPlayground() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "DM Sans, sans-serif", padding: "48px 40px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Logo Playground</p>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: INK, marginBottom: 4 }}>Verlo wordmark options</h1>
      <p style={{ fontSize: 14, color: MUTED, marginBottom: 48 }}>Each option shown at nav size (20px), medium (32px), and large (48px).</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {options.map((opt) => (
          <div key={opt.id} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: INK, margin: "0 0 3px" }}>{opt.label}</p>
                <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>{opt.note}</p>
              </div>
              <span style={{ fontSize: 11, color: MUTED, background: "#f1f5f9", borderRadius: 4, padding: "3px 8px" }}>{opt.id.toUpperCase()}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
              {/* Nav size */}
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 10 }}>{opt.render(20)}</div>
                <p style={{ fontSize: 10, color: MUTED }}>Nav — 20px</p>
              </div>

              {/* Medium */}
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 10 }}>{opt.render(32)}</div>
                <p style={{ fontSize: 10, color: MUTED }}>Medium — 32px</p>
              </div>

              {/* Large */}
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 10 }}>{opt.render(48)}</div>
                <p style={{ fontSize: 10, color: MUTED }}>Large — 48px</p>
              </div>

              {/* On dark */}
              <div style={{ background: INK, borderRadius: 8, padding: "14px 20px", textAlign: "center" }}>
                <div style={{ marginBottom: 10 }}>
                  {/* re-render with light text where needed */}
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {opt.id === "d" || opt.id === "g" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: opt.id === "g" ? 2 : 4 }}>
                        <VMarkInline size={Math.round(20 * (opt.id === "g" ? 1.15 : 1.05))} />
                        <span style={{
                          fontFamily: opt.id === "g" ? "DM Sans, sans-serif" : "Instrument Serif, serif",
                          fontSize: 20,
                          fontWeight: opt.id === "g" ? 800 : 400,
                          color: "#fff",
                          letterSpacing: "-0.01em",
                          lineHeight: 1
                        }}>erlo</span>
                      </div>
                    ) : (
                      <span style={{
                        fontFamily: opt.id === "e" ? "Syne, sans-serif" : opt.id === "f" ? "Plus Jakarta Sans, sans-serif" : opt.id === "c" ? "Fraunces, serif" : "Instrument Serif, serif",
                        fontSize: 20,
                        fontWeight: opt.id === "e" ? 600 : opt.id === "f" ? 600 : opt.id === "c" ? 400 : 400,
                        fontStyle: opt.id === "b" ? "italic" : "normal",
                        color: "#fff",
                        letterSpacing: opt.id === "c" || opt.id === "e" || opt.id === "f" ? "-0.02em" : "-0.01em",
                        lineHeight: 1
                      }}>
                        <span style={{ color: BRASS }}>V</span>erlo
                      </span>
                    )}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: "#64748b" }}>On dark</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
