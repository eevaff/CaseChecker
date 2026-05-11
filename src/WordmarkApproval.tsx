var V_PATH = "M16 17.3335L53.3333 89.3335L90.6667 17.3335H70.6667L53.3333 56.0002L36 17.3335H16Z";
var BRASS = "#D4A574";
var INK = "#0f172a";
var CHARCOAL = "#1C1917";
var LINEN = "#F0EBE3";
var WHITE = "#ffffff";
var MUTED = "#94a3b8";
var BORDER = "#e2e8f0";

function VerloV({ height, color = BRASS }: { height: number; color?: string }) {
  var w = Math.round(height * 75 / 72);
  return (
    <svg width={w} height={height} viewBox="16 17 75 73" fill="none">
      <path d={V_PATH} fill={color} />
    </svg>
  );
}

/* ── Recommended Wordmark ─────────────────────────────────────────── */
/* Geometric slab V (from brand mark) + Instrument Serif "erlo"       */
/* The V is distinctive through angular geometry; reads as one word    */

function Wordmark({
  size = 48,
  light = false,
  mono = false,
  showAi = false,
}: {
  size?: number;
  light?: boolean;
  mono?: boolean;
  showAi?: boolean;
}) {
  var textColor = light ? WHITE : INK;
  var vColor = mono ? textColor : BRASS;
  var vH = Math.round(size * 0.86);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.max(1, Math.round(size * 0.03)),
        lineHeight: 1,
      }}
    >
      <VerloV height={vH} color={vColor} />
      <span
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: size,
          color: textColor,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        erlo{showAi ? ".ai" : ""}
      </span>
    </div>
  );
}

/* ── Presentation Page ────────────────────────────────────────────── */

export default function WordmarkApproval() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Hero ───────────────────────────────────── */}
      <div style={{ padding: "64px 48px 56px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Wordmark — For Approval
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: INK, marginBottom: 6 }}>
          Verlo Wordmark
        </h1>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 48, maxWidth: 540, lineHeight: 1.5 }}>
          Geometric slab V from the brand mark, paired with Instrument Serif
          "erlo." The V is distinctive through its angular form — bold,
          geometric, unmistakable — while reading as the natural first letter of
          the word. Brass accent on the V anchors brand recognition.
        </p>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 64 }}>
          <div>
            <Wordmark size={72} />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 16 }}>Primary — 72px</p>
          </div>
          <div>
            <Wordmark size={72} showAi />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 16 }}>With .ai suffix</p>
          </div>
        </div>
      </div>

      {/* ── Size Scale ─────────────────────────────── */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Size Scale
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          {[
            { s: 18, label: "Nav — 18px" },
            { s: 24, label: "Small — 24px" },
            { s: 36, label: "Medium — 36px" },
            { s: 48, label: "Large — 48px" },
            { s: 72, label: "Hero — 72px" },
          ].map(function (d) {
            return (
              <div key={d.s}>
                <Wordmark size={d.s} />
                <p style={{ fontSize: 10, color: MUTED, marginTop: 10 }}>{d.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Backgrounds ────────────────────────────── */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          On Backgrounds
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "36px 40px",
              flex: 1,
            }}
          >
            <Wordmark size={36} />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 14 }}>White</p>
          </div>
          <div
            style={{
              background: LINEN,
              borderRadius: 12,
              padding: "36px 40px",
              flex: 1,
            }}
          >
            <Wordmark size={36} />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 14 }}>Linen</p>
          </div>
          <div
            style={{
              background: INK,
              borderRadius: 12,
              padding: "36px 40px",
              flex: 1,
            }}
          >
            <Wordmark size={36} light />
            <p style={{ fontSize: 10, color: "#64748b", marginTop: 14 }}>Slate 900</p>
          </div>
          <div
            style={{
              background: CHARCOAL,
              borderRadius: 12,
              padding: "36px 40px",
              flex: 1,
            }}
          >
            <Wordmark size={36} light />
            <p style={{ fontSize: 10, color: "#64748b", marginTop: 14 }}>Charcoal</p>
          </div>
        </div>
      </div>

      {/* ── Variants ───────────────────────────────── */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Color Variants
        </p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          <div
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <Wordmark size={40} />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 10 }}>Brand — brass V + ink</p>
          </div>
          <div
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <Wordmark size={40} mono />
            <p style={{ fontSize: 10, color: MUTED, marginTop: 10 }}>Mono — all ink</p>
          </div>
          <div
            style={{
              background: INK,
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <Wordmark size={40} light />
            <p style={{ fontSize: 10, color: "#64748b", marginTop: 10 }}>
              Reversed — brass V + white
            </p>
          </div>
          <div
            style={{
              background: INK,
              borderRadius: 12,
              padding: "28px 32px",
            }}
          >
            <Wordmark size={40} light mono />
            <p style={{ fontSize: 10, color: "#64748b", marginTop: 10 }}>
              Reversed mono — all white
            </p>
          </div>
        </div>
      </div>

      {/* ── Nav Bar Mockup ─────────────────────────── */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Nav Bar Mockup
        </p>

        {/* Light nav */}
        <div
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
              height: 64,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <Wordmark size={20} />
              <div style={{ display: "flex", gap: 28 }}>
                {["How It Works", "Solutions", "Pricing"].map(function (t) {
                  return (
                    <span
                      key={t}
                      style={{ fontSize: 14, color: INK, fontWeight: 500 }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 14, color: MUTED }}>Sign In</span>
              <button
                style={{
                  background: INK,
                  color: WHITE,
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </div>

        {/* Dark nav */}
        <div
          style={{
            background: INK,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
              height: 64,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <Wordmark size={20} light />
              <div style={{ display: "flex", gap: 28 }}>
                {["How It Works", "Solutions", "Pricing"].map(function (t) {
                  return (
                    <span
                      key={t}
                      style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 14, color: "#64748b" }}>Sign In</span>
              <button
                style={{
                  background: "#16a34a",
                  color: WHITE,
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── With Tagline ───────────────────────────── */}
      <div style={{ padding: "40px 48px", borderBottom: `1px solid ${BORDER}` }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          With Tagline
        </p>
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          <div
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "36px 40px",
            }}
          >
            <Wordmark size={48} />
            <p
              style={{
                fontSize: 15,
                color: MUTED,
                marginTop: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              AI for depositions
            </p>
          </div>
          <div
            style={{
              background: INK,
              borderRadius: 12,
              padding: "36px 40px",
            }}
          >
            <Wordmark size={48} light />
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                marginTop: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              AI for depositions
            </p>
          </div>
          <div
            style={{
              background: LINEN,
              borderRadius: 12,
              padding: "36px 40px",
            }}
          >
            <Wordmark size={48} />
            <p
              style={{
                fontSize: 15,
                color: MUTED,
                marginTop: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              AI for depositions
            </p>
          </div>
        </div>
      </div>

      {/* ── Hero Section Mockup ────────────────────── */}
      <div style={{ padding: "40px 48px 64px" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Landing Page Hero Preview
        </p>
        <div
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 40px",
              height: 64,
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <Wordmark size={20} />
              <div style={{ display: "flex", gap: 28 }}>
                {["How It Works", "Solutions", "Pricing"].map(function (t) {
                  return (
                    <span
                      key={t}
                      style={{ fontSize: 14, color: INK, fontWeight: 500 }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 14, color: MUTED }}>Sign In</span>
              <button
                style={{
                  background: INK,
                  color: WHITE,
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Get started
              </button>
            </div>
          </div>

          {/* Hero content */}
          <div style={{ padding: "72px 40px 80px" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#16a34a",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              AI-Powered Deposition Analysis
            </p>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: INK,
                lineHeight: 1.1,
                marginBottom: 20,
                maxWidth: 520,
              }}
            >
              Every statement.
              <br />
              Verified.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: MUTED,
                lineHeight: 1.6,
                maxWidth: 440,
                marginBottom: 32,
              }}
            >
              Upload a deposition, recorded interview, or claims statement. Get
              line-by-line credibility analysis powered by AI.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={{
                  background: INK,
                  color: WHITE,
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Analyze Your First Interview
              </button>
              <button
                style={{
                  background: "transparent",
                  color: INK,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "12px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Spec ───────────────────────────────────── */}
      <div
        style={{
          padding: "40px 48px 80px",
          background: "#fff",
          borderTop: `1px solid ${BORDER}`,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#16a34a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Specification
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: "12px 24px",
            fontSize: 13,
            color: INK,
            lineHeight: 1.6,
          }}
        >
          <span style={{ fontWeight: 600 }}>Typeface</span>
          <span>Instrument Serif (regular) for "erlo" / "erlo.ai"</span>

          <span style={{ fontWeight: 600 }}>V glyph</span>
          <span>Geometric slab V from Group 352.svg — scaled to 86% of font-size</span>

          <span style={{ fontWeight: 600 }}>V color (brand)</span>
          <span>
            Brass <code style={{ fontFamily: "DM Mono, monospace", fontSize: 12, background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>#D4A574</code>
          </span>

          <span style={{ fontWeight: 600 }}>Text color</span>
          <span>
            Slate 900 <code style={{ fontFamily: "DM Mono, monospace", fontSize: 12, background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>#0f172a</code>
          </span>

          <span style={{ fontWeight: 600 }}>Gap</span>
          <span>3% of font-size (min 1px)</span>

          <span style={{ fontWeight: 600 }}>Letter spacing</span>
          <span>-0.01em on "erlo"</span>

          <span style={{ fontWeight: 600 }}>Mono variant</span>
          <span>V and text same color — for single-color contexts</span>

          <span style={{ fontWeight: 600 }}>Tagline</span>
          <span>
            "AI for depositions" — DM Sans 500, 15px, positioned below wordmark
          </span>
        </div>
      </div>
    </div>
  );
}
