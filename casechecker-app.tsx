import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// COLOR CONSTANTS — derived from verlo-style-guide-v2.html
// ═══════════════════════════════════════════════════════════════════
var C = {
  bg: "#fff", bgSub: "#f8fafc", bgDark: "#0f172a",
  border: "#e2e8f0", borderLight: "#f1f5f9",
  text: "#0f172a", textSec: "#64748b", textMuted: "#94a3b8",
  green: "#16a34a", red: "#dc2626", amber: "#d97706", grey: "#94a3b8",
  accent: "#16a34a", brand: "#0f172a",
  // CaseChecker product accent (oxblood)
  cc: "#7A2E3B",
  ccLight: "rgba(122,46,59,0.08)",
  // Severity backgrounds
  highBg: "#fef2f2", highBorder: "#fecaca",
  medBg: "#fffbeb", medBorder: "#fde68a",
  confirmBg: "#ecfdf5",
};

var screens = [
  "Session Setup",
  "Live Analysis",
  "Post-Session Summary",
  "PDF Export",
];

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function Logo({ size }: { size?: number }) {
  var s = size || 22;
  var fs = Math.round(s * 0.8);
  var sw = (fs * 0.8 / 56).toFixed(2);
  var r = Math.round(s * 0.15);
  return (
    <svg width={s} height={s} viewBox={"0 0 " + s + " " + s} xmlns="http://www.w3.org/2000/svg">
      <rect width={s} height={s} rx={r} fill="#1C1917" />
      <text x="50%" y="56%" dominantBaseline="central" textAnchor="middle"
        fontFamily="'Instrument Serif', Georgia, serif" fontSize={fs}
        fill="#D4A574" stroke="#D4A574" strokeWidth={sw} paintOrder="stroke fill">V</text>
    </svg>
  );
}

function VerloWordmark({ fontSize, light }: { fontSize?: number; light?: boolean }) {
  var fs = fontSize || 20;
  var tc = light ? "#fff" : "#D4A574";
  var sw = (fs * 0.8 / 56).toFixed(2) + "px";
  return (
    <span style={{
      fontFamily: "'Instrument Serif', Georgia, serif", fontSize: fs, color: tc,
      letterSpacing: "0.03em", WebkitTextStroke: sw + " " + tc, lineHeight: 1,
    }}>Verlo</span>
  );
}

function AppNav() {
  return (
    <div style={{
      background: C.bgDark, padding: "0 32px", display: "flex",
      alignItems: "center", justifyContent: "space-between", height: 56,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <VerloWordmark fontSize={16} light />
          <span style={{
            fontSize: 11, fontWeight: 600, color: C.cc,
            background: "rgba(122,46,59,0.2)", padding: "2px 8px",
            borderRadius: 4, marginLeft: 4,
          }}>CaseChecker</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Sessions", "Account"].map(function (t) {
            var act = t === "Sessions";
            return (
              <span key={t} style={{
                fontSize: 13, fontWeight: act ? 600 : 500,
                color: act ? "#fff" : "#94a3b8",
                background: act ? "rgba(255,255,255,0.1)" : "transparent",
                padding: "6px 14px", borderRadius: 6,
              }}>{t}</span>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 12, color: C.textMuted }}>Help</span>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: "#1e293b",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>KL</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function DocIcon({ type, size }: { type?: string; size?: number }) {
  var s = size || 16;
  var colors: Record<string, string> = { pdf: "#dc2626", docx: "#2563eb", img: "#d97706" };
  var col = colors[type || ""] || C.textSec;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={col}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

// Severity indicator: dot + text (no bordered box)
function SeverityBadge({ level }: { level: string }) {
  var isHigh = level === "HIGH";
  var col = isHigh ? C.red : C.amber;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
      <div style={{ width: 6, height: 6, borderRadius: 3, background: col, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: col, textTransform: "uppercase", letterSpacing: "0.04em" }}>{level}</span>
    </div>
  );
}

// Renders text with keyword highlighting for flagged statements
function HighlightedText({ text, keywords, severity }: { text: string; keywords?: string[]; severity?: string }) {
  if (!keywords || keywords.length === 0) return <>{text}</>;
  var isHigh = severity === "HIGH";
  var bgCol = isHigh ? "rgba(220,38,38,0.08)" : "rgba(217,119,6,0.08)";
  var borderCol = isHigh ? "rgba(220,38,38,0.4)" : "rgba(217,119,6,0.4)";
  // Build regex from keywords
  var escaped = keywords.map(function (kw) { return kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
  var regex = new RegExp("(" + escaped.join("|") + ")", "gi");
  var parts = text.split(regex);
  return (
    <>
      {parts.map(function (part, i) {
        var isMatch = keywords.some(function (kw) { return part.toLowerCase() === kw.toLowerCase(); });
        if (isMatch) {
          return <span key={i} style={{ background: bgCol, borderBottom: "1.5px solid " + borderCol, fontWeight: 500, padding: "0 1px" }}>{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// Toast notification — auto-dismiss after 3s
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(function () {
    var t = setTimeout(onDone, 3000);
    return function () { clearTimeout(t); };
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: C.bgDark, color: "#fff", fontSize: 13, fontWeight: 500,
      padding: "10px 20px", borderRadius: 8, zIndex: 9999,
      animation: "cc-fade-in 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    }}>
      {message}
    </div>
  );
}

// Clickable filename link with external-link icon
function FileLink({ doc, page, onClick }: { doc: string; page: number; onClick?: () => void }) {
  return (
    <span onClick={onClick} style={{ color: "#1e40af", cursor: "pointer", fontWeight: 500 }}>
      {doc}, p.&nbsp;{page}
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 3, verticalAlign: "middle" }}>
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </span>
  );
}

// 2-column citation table (inline cards, post-session, PDF)
function CitationTable({ flag, onFileClick }: { flag: TranscriptFlag; onFileClick?: () => void }) {
  return (
    <div style={{ border: "1px solid " + C.border, borderRadius: 8, overflow: "hidden", marginBottom: 10, background: C.bg }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid " + C.border, background: C.bgSub, width: "30%" }}>File</th>
            <th style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 12px", textAlign: "left", borderBottom: "1px solid " + C.border, background: C.bgSub, borderLeft: "1px solid " + C.border, width: "70%" }}>From case file</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: 15, color: C.text, padding: "10px 12px", lineHeight: 1.5, verticalAlign: "top" }}>
              <FileLink doc={flag.doc} page={flag.page} onClick={onFileClick} />
            </td>
            <td style={{ fontSize: 15, color: C.text, padding: "10px 12px", lineHeight: 1.5, verticalAlign: "top", fontStyle: "italic", borderLeft: "1px solid " + C.border }}>&ldquo;{flag.quote}&rdquo;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Vertical citation stack for sidebar (300px — no room for table)
function CitationStack({ flag, onFileClick }: { flag: TranscriptFlag; onFileClick?: () => void }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ fontSize: 13, color: C.text, margin: "0 0 4px", lineHeight: 1.5 }}>
        <FileLink doc={flag.doc} page={flag.page} onClick={onFileClick} />
      </p>
      <p style={{ fontSize: 13, color: C.text, fontStyle: "italic", margin: "0 0 0", lineHeight: 1.5 }}>&ldquo;{flag.quote}&rdquo;</p>
    </div>
  );
}

// Per-contradiction follow-up (collapsible)
function FollowUpSection({ text }: { text: string }) {
  var [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 10, borderTop: "1px solid " + C.borderLight, paddingTop: 8 }}>
      <div onClick={function () { setOpen(!open); }} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.cc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.textSec }}>Suggested follow-up</span>
        <span style={{ fontSize: 10, color: C.textMuted, background: C.bgSub, padding: "2px 6px", borderRadius: 4 }}>Beta</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <p style={{ fontSize: 13, color: C.textSec, fontStyle: "italic", margin: "6px 0 0", lineHeight: 1.5, paddingLeft: 22, animation: "cc-fade-in 0.2s ease" }}>
          &ldquo;{text}&rdquo;
        </p>
      )}
    </div>
  );
}

function ZoomIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="1" y="4" width="16" height="14" rx="2" fill="#2D8CFF" /><path d="M22 7.5l-5 3.5 5 3.5V7.5z" fill="#2D8CFF" /></svg>;
}
function TeamsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="13" height="13" rx="2" fill="#5B5FC7" /><circle cx="19" cy="8" r="3" fill="#5B5FC7" opacity="0.7" /></svg>;
}
function MeetIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="13" height="12" rx="2" fill="#00897B" /><path d="M22 7l-6 4 6 4V7z" fill="#00897B" opacity="0.7" /></svg>;
}

// ═══════════════════════════════════════════════════════════════════
// MOCK DATA — Insurance litigation: Garber v. Slide Insurance
// ═══════════════════════════════════════════════════════════════════

var MOCK_DOCS = [
  { name: "Police_Report_4821.pdf", type: "pdf", pages: 12, size: "2.4 MB", indexed: true },
  { name: "Prior_Deposition_Torres_Jan2024.pdf", type: "pdf", pages: 47, size: "8.1 MB", indexed: true },
  { name: "Medical_Records_Regional_Hospital.pdf", type: "pdf", pages: 23, size: "5.7 MB", indexed: true },
  { name: "Slide_Policy_GRB-2024-0891.pdf", type: "pdf", pages: 18, size: "1.9 MB", indexed: true },
  { name: "Accident_Scene_Photos_03142024.pdf", type: "img", pages: 8, size: "12.3 MB", indexed: true },
];

var SESSION = {
  title: "Garber v. Slide Insurance — Deposition of Michael Torres",
  caseNumber: "2024-CV-04821",
  date: "May 9, 2026",
  startTime: "10:02 AM",
  subject: "Michael Torres",
  subjectRole: "Witness / Claimant",
  interviewer: "Katherine Lin",
  interviewerRole: "Counsel for Defendant",
};

type TranscriptFlag = {
  severity: string;
  title: string;
  doc: string;
  page: number;
  quote: string;
  analysis: string;
  keywords: string[];
  suggestedFollowUp: string;
};

type TranscriptLine = {
  time: string;
  speaker: string;
  role: string;
  text: string;
  type: "q" | "s";
  flag?: TranscriptFlag;
};

var LINES: TranscriptLine[] = [
  { time: "10:02:14", speaker: "Katherine Lin", role: "Counsel", text: "Mr. Torres, can you walk us through what happened on the evening of March 14th?", type: "q" },
  { time: "10:02:31", speaker: "Michael Torres", role: "Witness", text: "Sure. I was driving home from work, heading east on Coral Way. It was around 6:30 PM, still light out. Traffic was moderate.", type: "s" },
  { time: "10:02:48", speaker: "Katherine Lin", role: "Counsel", text: "And approximately how fast were you driving at the time of the collision?", type: "q" },
  {
    time: "10:03:02", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "I was going about 25 miles per hour. The speed limit there is 35, so I was well under it.",
    flag: {
      severity: "HIGH",
      title: "Contradicts police report",
      doc: "Police_Report_4821.pdf",
      page: 3,
      quote: "Based on skid mark analysis, Vehicle 1 was estimated to be traveling between 45–55 mph at the point of initial braking.",
      analysis: "The officer's skid mark analysis indicates a speed nearly double what the witness claims. Material discrepancy relevant to liability.",
      keywords: ["25 miles per hour"],
      suggestedFollowUp: "Can you describe the road conditions and whether you applied brakes before the collision?",
    },
  },
  { time: "10:03:28", speaker: "Katherine Lin", role: "Counsel", text: "Did you notice the stop sign at the intersection of Coral Way and 42nd Avenue?", type: "q" },
  {
    time: "10:03:41", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "No, I did not see any stop sign. I don't believe there was one at that intersection.",
    flag: {
      severity: "MEDIUM",
      title: "Contradicts prior deposition",
      doc: "Prior_Deposition_Torres_Jan2024.pdf",
      page: 12,
      quote: "I noticed the stop sign but it was partially obscured by foliage. I slowed down but did not come to a complete stop.",
      analysis: "In his January 2024 deposition, the witness acknowledged the stop sign existed. He now denies any awareness of it.",
      keywords: ["did not see any stop sign", "I don't believe there was one"],
      suggestedFollowUp: "In your January deposition, you mentioned the stop sign was partially obscured. Can you clarify what you recall seeing?",
    },
  },
  { time: "10:04:05", speaker: "Katherine Lin", role: "Counsel", text: "Had you consumed any alcohol before driving that evening?", type: "q" },
  {
    time: "10:04:18", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "Absolutely not. I had not consumed any alcohol that day whatsoever.",
    flag: {
      severity: "HIGH",
      title: "Contradicts medical records",
      doc: "Medical_Records_Regional_Hospital.pdf",
      page: 7,
      quote: "Patient BAC upon admission: 0.04%. Patient stated he had 'two beers with lunch' approximately four hours prior.",
      analysis: "Hospital records show a measurable BAC and the witness's own admission of alcohol consumption to medical staff, directly contradicting today's testimony.",
      keywords: ["had not consumed any alcohol"],
      suggestedFollowUp: "The hospital records note you mentioned having two beers at lunch. Can you walk us through your afternoon before driving?",
    },
  },
  { time: "10:04:42", speaker: "Katherine Lin", role: "Counsel", text: "Were the brakes on your vehicle functioning properly that day?", type: "q" },
  {
    time: "10:04:55", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "Yes, the brakes were working fine. I had no issues with the vehicle that day.",
    flag: {
      severity: "MEDIUM",
      title: "Contradicts insurance claim",
      doc: "Slide_Policy_GRB-2024-0891.pdf",
      page: 4,
      quote: "Claim filed 02/28/2024: Brake system inspection and repair requested. Claimant reported 'grinding noise when braking' and 'increased stopping distance.'",
      analysis: "Two weeks before the accident, the witness filed an insurance claim specifically citing brake problems — grinding and increased stopping distance.",
      keywords: ["brakes were working fine", "no issues with the vehicle"],
      suggestedFollowUp: "You filed an insurance claim citing brake issues two weeks prior. Were those repairs completed before March 14th?",
    },
  },
  { time: "10:05:18", speaker: "Katherine Lin", role: "Counsel", text: "After the collision, did you exit your vehicle immediately?", type: "q" },
  { time: "10:05:30", speaker: "Michael Torres", role: "Witness", text: "Yes, I got out right away to check on the other driver. I called 911 from the scene.", type: "s" },
  { time: "10:05:52", speaker: "Katherine Lin", role: "Counsel", text: "Were there any passengers in your vehicle at the time?", type: "q" },
  { time: "10:06:04", speaker: "Michael Torres", role: "Witness", text: "No, I was alone in the vehicle.", type: "s" },
  { time: "10:06:22", speaker: "Katherine Lin", role: "Counsel", text: "Did you make any phone calls in the minutes before the collision?", type: "q" },
  { time: "10:06:35", speaker: "Michael Torres", role: "Witness", text: "No, I was not on the phone. I don't use my phone while driving.", type: "s" },
];

// Pre-compute streaming schedule: dynamic timing based on word count
var SCHEDULE = (function () {
  var result: { start: number; wordCount: number; lockTime: number }[] = [];
  var cursor = 800;
  LINES.forEach(function (line) {
    var wc = line.text.split(" ").length;
    var start = cursor;
    var lockTime = start + wc * 100 + 400;
    result.push({ start: start, wordCount: wc, lockTime: lockTime });
    cursor = lockTime + 500;
  });
  return result;
})();

// ═══════════════════════════════════════════════════════════════════
// GLOBAL STYLES (keyframes)
// ═══════════════════════════════════════════════════════════════════

function GlobalStyles() {
  return (
    <style>{`
@keyframes cc-pulse-dot{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes cc-slide-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes cc-slide-down{from{opacity:0;max-height:0;padding-top:0;padding-bottom:0}to{opacity:1;max-height:500px}}
@keyframes cc-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes cc-typing{0%,80%,100%{opacity:0.3}40%{opacity:1}}
@keyframes cc-fade-in{from{opacity:0}to{opacity:1}}
@keyframes cc-border-pulse{0%,100%{border-color:rgba(220,38,38,0.3)}50%{border-color:rgba(220,38,38,0.7)}}
.cc-mark-reviewed{text-decoration:none;transition:color 0.15s,text-decoration 0.15s}
.cc-mark-reviewed:hover{text-decoration:underline;color:#0f172a !important}
`}</style>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FLOW 1 + 2: SESSION SETUP  (Meeting details + document upload)
// ═══════════════════════════════════════════════════════════════════

function SessionSetup({ onStart }: { onStart: () => void }) {
  var [dragging, setDragging] = useState(false);

  var totalPages = MOCK_DOCS.reduce(function (s, d) { return s + d.pages; }, 0);

  return (
    <div style={{ minHeight: "100%", background: C.bgSub }}>
      <AppNav />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            <span style={{ fontSize: 13, color: C.textMuted }}>Back to Sessions</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>New Session</h1>
          <p style={{ fontSize: 14, color: C.textSec, margin: 0 }}>Connect a live deposition and upload your case documents.</p>
        </div>

        {/* ── Meeting Details ── */}
        <div style={{ background: C.bg, borderRadius: 14, border: "1px solid " + C.border, padding: "28px 28px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: "0 0 20px" }}>Meeting Details</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Meeting URL</label>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: "1.5px solid " + C.border, fontSize: 14, color: C.textMuted }}>
                https://zoom.us/j/...
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <ZoomIcon /><TeamsIcon /><MeetIcon />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Session title</label>
            <div style={{ padding: "11px 14px", borderRadius: 10, border: "1.5px solid " + C.border, fontSize: 14, color: C.textMuted }}>
              e.g. Garber v. Slide Insurance — Deposition of Torres
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>
              Case number <span style={{ color: C.textMuted, fontWeight: 400 }}>(optional)</span>
            </label>
            <div style={{ padding: "11px 14px", borderRadius: 10, border: "1.5px solid " + C.border, fontSize: 14, color: C.textMuted }}>
              e.g. 2024-CV-04821
            </div>
          </div>
        </div>

        {/* ── Case Documents ── */}
        <div style={{ background: C.bg, borderRadius: 14, border: "1px solid " + C.border, padding: "28px 28px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0 }}>Case Documents</h2>
            <span style={{ fontSize: 12, color: C.textMuted }}>{totalPages} pages indexed</span>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={function (e) { e.preventDefault(); setDragging(true); }}
            onDragLeave={function () { setDragging(false); }}
            onDrop={function (e) { e.preventDefault(); setDragging(false); }}
            style={{
              border: "2px dashed " + (dragging ? C.cc : C.border),
              borderRadius: 12, padding: "32px 24px", textAlign: "center", marginBottom: 20,
              background: dragging ? "rgba(122,46,59,0.03)" : C.bgSub, transition: "all 0.2s",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8, display: "block", margin: "0 auto 8px" }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>
              Drop files here, or <span style={{ color: C.cc, cursor: "pointer" }}>browse</span>
            </p>
            <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>PDF, DOCX, images (OCR'd) — police reports, medical records, prior depositions, exhibits</p>
          </div>

          {/* Doc list */}
          {MOCK_DOCS.map(function (doc, i) {
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10,
                border: "1px solid " + C.borderLight, marginBottom: 6, background: C.bg,
                animation: "cc-slide-up 0.3s ease " + (i * 0.06) + "s both",
              }}>
                <DocIcon type={doc.type} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.text, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{doc.pages} pages · {doc.size}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {doc.indexed
                    ? <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>Indexed</span>
                    </div>
                    : <div style={{ width: 14, height: 14, border: "2px solid " + C.border, borderTopColor: C.cc, borderRadius: "50%", animation: "cc-spin 1s linear infinite" }} />
                  }
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer", marginLeft: 6 }}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            );
          })}

          {/* Future: case management */}
          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: C.bgSub, border: "1px dashed " + C.borderLight, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <span style={{ fontSize: 12, color: C.textMuted }}>Connect case management</span>
            <span style={{ fontSize: 10, color: C.textMuted, background: C.borderLight, padding: "2px 6px", borderRadius: 4, marginLeft: 4 }}>Coming soon</span>
            <span style={{ fontSize: 10, color: C.textMuted, marginLeft: "auto" }}>CS Disco · Relativity · NetDocuments</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={{ padding: "12px 24px", borderRadius: 10, border: "1.5px solid " + C.border, background: C.bg, fontSize: 14, fontWeight: 600, color: C.textSec, cursor: "pointer" }}>Save Draft</button>
          <button onClick={onStart} style={{ padding: "12px 32px", borderRadius: 10, border: "none", background: C.brand, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Start Session</button>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// FLOW 3: LIVE ANALYSIS SESSION
// ═══════════════════════════════════════════════════════════════════

function LiveAnalysis() {
  var [visCount, setVisCount] = useState(0);
  var [wordCounts, setWordCounts] = useState<Record<number, number>>({});
  var [locked, setLocked] = useState<Record<number, boolean>>({});
  var [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  var [reviewed, setReviewed] = useState<Record<number, boolean>>({});
  var [toast, setToast] = useState("");
  var transcriptRef = useRef<HTMLDivElement>(null);

  // Word-by-word streaming with dynamic timing
  useEffect(function () {
    var timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach(function (line, i) {
      var sched = SCHEDULE[i];
      // Line appears
      timers.push(setTimeout(function () { setVisCount(i + 1); }, sched.start));
      // Words reveal one at a time (100ms each)
      var words = line.text.split(" ");
      words.forEach(function (_, w) {
        timers.push(setTimeout(function () {
          setWordCounts(function (prev) { var n: Record<number, number> = {}; for (var k in prev) n[k] = prev[k]; n[i] = w + 1; return n; });
        }, sched.start + 100 * (w + 1)));
      });
      // Lock after all words + 400ms
      timers.push(setTimeout(function () {
        setLocked(function (prev) { var n: Record<number, boolean> = {}; for (var k in prev) n[k] = prev[k]; n[i] = true; return n; });
      }, sched.lockTime));
    });
    return function () { timers.forEach(clearTimeout); };
  }, []);

  // Auto-scroll
  useEffect(function () {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visCount, wordCounts, locked]);

  // Flags with original LINES index
  var flagItems = LINES.map(function (l, i) { return { line: l, idx: i }; })
    .filter(function (item) { return item.line.flag && locked[item.idx]; });
  var unreviewedCount = flagItems.filter(function (f) { return !reviewed[f.idx]; }).length;
  var unreviewedItems = flagItems.slice().reverse().filter(function (f) { return !reviewed[f.idx]; });
  var reviewedItems = flagItems.slice().reverse().filter(function (f) { return reviewed[f.idx]; });
  var sortedItems = unreviewedItems.concat(reviewedItems);

  var isLive = visCount < LINES.length;

  // Elapsed time
  var elapsedIdx = Math.min(visCount, LINES.length) - 1;
  var elapsedStr = visCount === 0 ? "00:00" : (function () {
    var t = LINES[Math.max(0, elapsedIdx)].time;
    var parts = t.split(":");
    var totalSec = (parseInt(parts[0]) - 10) * 3600 + (parseInt(parts[1]) - 2) * 60 + parseInt(parts[2]);
    var mm = Math.floor(totalSec / 60);
    var ss = totalSec % 60;
    return (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
  })();

  var toggleCollapse = function (idx: number) {
    setCollapsed(function (prev) {
      var n: Record<number, boolean> = {};
      for (var k in prev) n[k] = prev[k];
      if (n[idx]) delete n[idx]; else n[idx] = true;
      return n;
    });
  };

  var showToast = function () { setToast("Document viewer coming soon"); };

  return (
    <div style={{ minHeight: "100vh", background: C.bgSub, display: "flex", flexDirection: "column" }}>
      <AppNav />

      {/* ── Sub-header bar ── */}
      <div style={{
        background: C.bg, borderBottom: "1px solid " + C.border,
        padding: "0 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 48,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            <span style={{ fontSize: 13, color: C.textMuted }}>Library</span>
          </div>
          <div style={{ width: 1, height: 20, background: C.border }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text, maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {SESSION.title}
          </span>
          {flagItems.length > 0 && (
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: C.red, padding: "2px 8px", borderRadius: 10 }}>{flagItems.length}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isLive && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: C.red, animation: "cc-pulse-dot 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.red }}>LIVE</span>
              <span style={{ fontSize: 12, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{elapsedStr}</span>
            </div>
          )}
          <button style={{
            padding: "6px 16px", borderRadius: 8, border: "1.5px solid " + C.red,
            background: "transparent", color: C.red, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>End Session</button>
        </div>
      </div>

      {/* ── Two-panel layout ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — Live Transcript */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1px solid " + C.border }}>
          {/* Subject bar */}
          <div style={{
            padding: "10px 24px", borderBottom: "1px solid " + C.border,
            background: C.bg, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Live Transcript</span>
              <div style={{ width: 1, height: 16, background: C.border }} />
              <span style={{ fontSize: 12, color: C.textSec }}>{SESSION.subject}</span>
              <span style={{ fontSize: 10, color: C.textMuted, background: C.bgSub, padding: "2px 8px", borderRadius: 4 }}>{SESSION.subjectRole}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>{MOCK_DOCS.length} docs</span>
              {isLive && (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: C.green }} />
                  <span style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>Listening</span>
                </div>
              )}
            </div>
          </div>

          {/* Transcript content */}
          <div ref={transcriptRef} style={{ flex: 1, overflow: "auto" }}>
            {LINES.map(function (line, i) {
              if (i >= visCount) return null;
              var isQuestion = line.type === "q";
              var isLocked = locked[i];
              var isStreaming = !isLocked;
              var hasFlag = line.flag && isLocked;
              var isCardCollapsed = collapsed[i];

              // Word-by-word: show only revealed words while streaming
              var words = line.text.split(" ");
              var revealedCount = isLocked ? words.length : (wordCounts[i] || 0);
              var visibleText = words.slice(0, revealedCount).join(" ");
              var allWordsShown = revealedCount >= words.length;

              var borderColor = hasFlag ? (line.flag!.severity === "HIGH" ? C.red : C.amber) : "transparent";

              return (
                <div key={i} style={{
                  borderLeft: "3px solid " + borderColor,
                  background: "transparent",
                  animation: "cc-fade-in 0.3s ease",
                }}>
                  {/* Statement row */}
                  <div style={{ padding: "12px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                        {line.time.split(":").slice(1).join(":")}
                      </span>
                      {isLocked && (
                        <>
                          <span style={{ fontSize: 14, fontWeight: 600, color: isQuestion ? C.textMuted : C.text }}>{line.speaker}</span>
                          <span style={{ fontSize: 9, color: C.textMuted, background: C.bgSub, padding: "1px 6px", borderRadius: 3, fontWeight: 500 }}>{line.role}</span>
                        </>
                      )}
                      {isStreaming && (
                        <span style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>transcribing…</span>
                      )}
                    </div>
                    <p style={{
                      fontSize: 16, lineHeight: 1.55, margin: 0,
                      color: isStreaming ? C.textMuted : C.text,
                      fontWeight: isQuestion ? 500 : 400,
                      opacity: isStreaming ? 0.55 : 1,
                      transition: "opacity 0.3s, color 0.3s",
                    }}>
                      {isLocked && hasFlag
                        ? <HighlightedText text={line.text} keywords={line.flag!.keywords} severity={line.flag!.severity} />
                        : visibleText
                      }
                      {isStreaming && !allWordsShown && (
                        <span style={{ display: "inline-flex", gap: 2, marginLeft: 6, verticalAlign: "middle" }}>
                          {[0, 1, 2].map(function (d) {
                            return <span key={d} style={{ width: 3, height: 3, borderRadius: 2, background: C.textMuted, animation: "cc-typing 1.2s ease-in-out " + (d * 0.2) + "s infinite" }} />;
                          })}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Inline contradiction card */}
                  {hasFlag && (
                    <div style={{ padding: "0 20px 12px" }}>
                      {isCardCollapsed ? (
                        <div onClick={function () { toggleCollapse(i); }} style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          cursor: "pointer", padding: "4px 10px", borderRadius: 6,
                          background: C.bgSub,
                        }}>
                          <SeverityBadge level={line.flag!.severity} />
                          <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{line.flag!.title}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                      ) : (
                        <div style={{
                          background: C.bg,
                          borderLeft: "3px solid " + (line.flag!.severity === "HIGH" ? C.red : C.amber),
                          border: "1px solid " + C.border,
                          borderRadius: 10, padding: "14px 16px",
                          animation: "cc-slide-up 0.3s ease",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <SeverityBadge level={line.flag!.severity} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{line.flag!.title}</span>
                            </div>
                            <svg onClick={function () { toggleCollapse(i); }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer", flexShrink: 0 }}>
                              <polyline points="18 15 12 9 6 15" />
                            </svg>
                          </div>

                          {/* Citation table */}
                          <CitationTable flag={line.flag!} onFileClick={showToast} />

                          {/* Analysis */}
                          <p style={{ fontSize: 16, color: C.text, lineHeight: 1.55, margin: 0 }}>{line.flag!.analysis}</p>

                          {/* Per-contradiction follow-up */}
                          <FollowUpSection text={line.flag!.suggestedFollowUp} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Listening indicator */}
            {isLive && visCount > 0 && (
              <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2].map(function (d) {
                    return <div key={d} style={{ width: 3, height: 3, borderRadius: 2, background: C.textMuted, animation: "cc-typing 1.2s ease-in-out " + (d * 0.15) + "s infinite" }} />;
                  })}
                </div>
                <span style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>listening…</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Contradictions Sidebar */}
        <div style={{ width: 300, display: "flex", flexDirection: "column", background: C.bg }}>
          <div style={{ padding: "10px 18px", borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Contradictions</span>
              {unreviewedCount > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: C.red, padding: "1px 7px", borderRadius: 8, minWidth: 18, textAlign: "center" }}>{unreviewedCount}</span>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "10px 12px" }}>
            {flagItems.length === 0 ? (
              <div style={{ padding: "48px 16px", textAlign: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px", display: "block" }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5, margin: 0 }}>
                  Contradictions appear here when testimony conflicts with your case documents.
                </p>
              </div>
            ) : (
              sortedItems.map(function (item, idx) {
                var line = item.line;
                var flag = line.flag!;
                var isRev = reviewed[item.idx];
                var sevCol = flag.severity === "HIGH" ? C.red : C.amber;
                return (
                  <div key={idx} style={{
                    background: C.bg,
                    borderLeft: "3px solid " + sevCol,
                    border: "1px solid " + C.border,
                    borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer",
                    animation: "cc-slide-up 0.3s ease",
                    opacity: isRev ? 0.4 : 1,
                    transition: "opacity 0.3s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <SeverityBadge level={flag.severity} />
                      <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>
                        {line.time.split(":").slice(1).join(":")}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 8px" }}>{flag.title}</p>

                    {/* Citation stack (vertical for sidebar) */}
                    <CitationStack flag={flag} onFileClick={showToast} />

                    {/* Per-contradiction follow-up */}
                    <FollowUpSection text={flag.suggestedFollowUp} />

                    {/* Reviewed toggle */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                      {isRev ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>Reviewed ✓</span>
                          <span onClick={function (e) { e.stopPropagation(); setReviewed(function (prev) { var n: Record<number, boolean> = {}; for (var k in prev) n[k] = prev[k]; delete n[item.idx]; return n; }); }} style={{ fontSize: 11, color: C.textSec, cursor: "pointer", textDecoration: "underline" }}>Undo</span>
                        </div>
                      ) : (
                        <span className="cc-mark-reviewed" onClick={function (e) { e.stopPropagation(); setReviewed(function (prev) { var n: Record<number, boolean> = {}; for (var k in prev) n[k] = prev[k]; n[item.idx] = true; return n; }); }} style={{ fontSize: 11, color: C.textSec, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          Mark reviewed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={function () { setToast(""); }} />}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// FLOW 4: POST-SESSION SUMMARY
// ═══════════════════════════════════════════════════════════════════

function PostSession({ onExport }: { onExport: () => void }) {
  var [tab, setTab] = useState("contradictions");
  var [expandedTranscript, setExpandedTranscript] = useState<Record<number, boolean>>({});
  var [toast, setToast] = useState("");

  var allFlags = LINES.filter(function (l) { return l.flag; });
  var highCount = allFlags.filter(function (l) { return l.flag!.severity === "HIGH"; }).length;
  var medCount = allFlags.filter(function (l) { return l.flag!.severity === "MEDIUM"; }).length;

  var citedDocs: Record<string, boolean> = {};
  allFlags.forEach(function (l) { citedDocs[l.flag!.doc] = true; });

  var toggleExpand = function (idx: number) {
    setExpandedTranscript(function (prev) {
      var n: Record<number, boolean> = {};
      for (var k in prev) n[k] = prev[k];
      n[idx] = !prev[idx];
      return n;
    });
  };

  var showToast = function () { setToast("Document viewer coming soon"); };

  return (
    <div style={{ minHeight: "100%", background: C.bgSub }}>
      <AppNav />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 40px" }}>
        {/* Back */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          <span style={{ fontSize: 13, color: C.textMuted }}>Back to Sessions</span>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>{SESSION.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: C.textMuted }}>{SESSION.date}</span>
              <span style={{ color: C.border }}>·</span>
              <span style={{ fontSize: 13, color: C.textMuted }}>{SESSION.startTime}</span>
              <span style={{ color: C.border }}>·</span>
              <span style={{ fontSize: 13, color: C.textMuted }}>Zoom</span>
              <span style={{ color: C.border }}>·</span>
              <span style={{ fontSize: 13, color: C.textMuted }}>Case #{SESSION.caseNumber}</span>
            </div>
          </div>
          <button onClick={onExport} style={{
            padding: "10px 20px", borderRadius: 8, border: "1.5px solid " + C.border,
            background: C.bg, fontSize: 13, fontWeight: 600, color: C.text, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export PDF
          </button>
        </div>

        {/* Two-column */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Left column — 320px */}
          <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Summary */}
            <div style={{ background: C.bg, borderRadius: 12, border: "1px solid " + C.border, padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 14 }}>Contradiction Summary</span>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 8px", background: C.highBg, borderRadius: 10, border: "1px solid " + C.highBorder }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.red }}>{highCount}</div>
                  <div style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>HIGH</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 8px", background: C.medBg, borderRadius: 10, border: "1px solid " + C.medBorder }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.amber }}>{medCount}</div>
                  <div style={{ fontSize: 11, color: C.amber, fontWeight: 600 }}>MEDIUM</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 8px", background: C.bgSub, borderRadius: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{allFlags.length}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>Total</div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div style={{ background: C.bg, borderRadius: 12, border: "1px solid " + C.border, padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 14 }}>Case Documents</span>
              {MOCK_DOCS.map(function (doc, i) {
                var cited = citedDocs[doc.name];
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 0", borderBottom: i < MOCK_DOCS.length - 1 ? "1px solid " + C.borderLight : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <DocIcon type={doc.type} size={14} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>
                        {doc.name.replace(/_/g, " ").replace(/\.(pdf|docx|jpg|png)$/i, "")}
                      </span>
                    </div>
                    {cited && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: C.cc, background: C.ccLight, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Cited</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Session details */}
            <div style={{ background: C.bg, borderRadius: 12, border: "1px solid " + C.border, padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 14 }}>Session Details</span>
              {[
                { label: "Subject", value: SESSION.subject },
                { label: "Interviewer", value: SESSION.interviewer },
                { label: "Platform", value: "Zoom" },
                { label: "Duration", value: "34 min 12 sec" },
                { label: "Case Number", value: SESSION.caseNumber },
                { label: "Statements", value: String(LINES.filter(function (l) { return l.type === "s"; }).length) },
              ].map(function (d, i) {
                return (
                  <div key={d.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "7px 0", borderBottom: i < 5 ? "1px solid " + C.borderLight : "none",
                  }}>
                    <span style={{ fontSize: 12, color: C.textMuted }}>{d.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{d.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — flex 1 */}
          <div style={{ flex: 1, background: C.bg, borderRadius: 12, border: "1px solid " + C.border, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "2px solid " + C.border }}>
              {[
                { key: "contradictions", label: "Contradictions", count: allFlags.length },
                { key: "transcript", label: "Full Transcript", count: null },
              ].map(function (t) {
                var active = tab === t.key;
                return (
                  <div key={t.key} onClick={function () { setTab(t.key); }} style={{
                    padding: "12px 20px", fontSize: 13, fontWeight: 600,
                    color: active ? C.text : C.textMuted,
                    borderBottom: active ? "2px solid " + C.text : "2px solid transparent",
                    marginBottom: -2, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    {t.label}
                    {t.count !== null && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: C.red, padding: "1px 6px", borderRadius: 8 }}>{t.count}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
              {tab === "contradictions" ? (
                allFlags.map(function (line, idx) {
                  var flag = line.flag!;
                  var sevCol = flag.severity === "HIGH" ? C.red : C.amber;
                  return (
                    <div key={idx} style={{
                      background: C.bg,
                      borderLeft: "3px solid " + sevCol,
                      border: "1px solid " + C.border,
                      borderRadius: 10, padding: "16px 18px", marginBottom: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <SeverityBadge level={flag.severity} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{flag.title}</span>
                        </div>
                        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>
                          {line.time.split(":").slice(1).join(":")}
                        </span>
                      </div>

                      {/* Citation table */}
                      <CitationTable flag={flag} onFileClick={showToast} />

                      <p style={{ fontSize: 16, color: C.text, lineHeight: 1.55, margin: 0 }}>{flag.analysis}</p>

                      {/* Per-contradiction follow-up */}
                      <FollowUpSection text={flag.suggestedFollowUp} />
                    </div>
                  );
                })
              ) : (
                LINES.map(function (line, i) {
                  var isQuestion = line.type === "q";
                  var hasFlag = !!line.flag;
                  var isExpanded = expandedTranscript[i];

                  return (
                    <div key={i} style={{
                      padding: "10px 16px", borderBottom: "1px solid " + C.borderLight,
                      borderLeft: hasFlag ? "3px solid " + (line.flag!.severity === "HIGH" ? C.red : C.amber) : "3px solid transparent",
                      background: "transparent",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{line.time.split(":").slice(1).join(":")}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: isQuestion ? C.textMuted : C.text }}>{line.speaker}</span>
                        <span style={{ fontSize: 9, color: C.textMuted, background: C.bgSub, padding: "1px 6px", borderRadius: 3, fontWeight: 500 }}>{line.role}</span>
                      </div>
                      <p style={{ fontSize: 16, color: C.text, lineHeight: 1.5, margin: 0 }}>
                        {hasFlag
                          ? <HighlightedText text={line.text} keywords={line.flag!.keywords} severity={line.flag!.severity} />
                          : line.text
                        }
                      </p>

                      {hasFlag && (
                        <div style={{ marginTop: 6 }}>
                          <div onClick={function () { toggleExpand(i); }} style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            cursor: "pointer", padding: "3px 8px", borderRadius: 4,
                            background: C.bgSub,
                          }}>
                            <SeverityBadge level={line.flag!.severity} />
                            <span style={{ fontSize: 11, fontWeight: 500, color: C.text }}>{line.flag!.title}</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                          {isExpanded && (
                            <div style={{
                              marginTop: 8, padding: "10px 14px",
                              animation: "cc-fade-in 0.2s ease",
                            }}>
                              <CitationTable flag={line.flag!} onFileClick={showToast} />
                              <p style={{ fontSize: 16, color: C.text, lineHeight: 1.5, margin: 0 }}>{line.flag!.analysis}</p>
                              <FollowUpSection text={line.flag!.suggestedFollowUp} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={function () { setToast(""); }} />}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// FLOW 5: PDF EXPORT PREVIEW
// ═══════════════════════════════════════════════════════════════════

function PDFExport({ onClose }: { onClose: () => void }) {
  var allFlags = LINES.filter(function (l) { return l.flag; });
  var highCount = allFlags.filter(function (l) { return l.flag!.severity === "HIGH"; }).length;
  var medCount = allFlags.filter(function (l) { return l.flag!.severity === "MEDIUM"; }).length;
  var [toast, setToast] = useState("");

  var showToast = function () { setToast("Document viewer coming soon"); };

  return (
    <div style={{
      minHeight: "100%", background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "40px 40px",
    }}>
      <div style={{
        background: C.bg, borderRadius: 16, maxWidth: 820, width: "100%",
        overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Toolbar */}
        <div style={{
          padding: "14px 28px", borderBottom: "1px solid " + C.border,
          display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgSub,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSec} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Export Preview</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ padding: "7px 16px", borderRadius: 8, border: "1.5px solid " + C.border, background: C.bg, fontSize: 12, fontWeight: 600, color: C.textSec, cursor: "pointer" }}>Cancel</button>
            <button style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: C.brand, color: "#fff", fontSize: 12, fontWeight: 600 }}>Download PDF</button>
          </div>
        </div>

        {/* Report */}
        <div style={{ padding: "36px 40px" }}>
          {/* Report header */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid " + C.border }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Logo size={18} />
                <VerloWordmark fontSize={16} />
                <span style={{ fontSize: 10, fontWeight: 600, color: C.cc, background: C.ccLight, padding: "2px 6px", borderRadius: 4 }}>CaseChecker</span>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Contradiction Analysis Report</h1>
              <p style={{ fontSize: 13, color: C.textSec, margin: 0 }}>{SESSION.title}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 3px" }}>Date: {SESSION.date}</p>
              <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 3px" }}>Duration: 34 min 12 sec</p>
              <p style={{ fontSize: 11, color: C.textMuted, margin: "0 0 3px" }}>Case: #{SESSION.caseNumber}</p>
              <p style={{ fontSize: 11, color: C.textMuted, margin: 0 }}>Platform: Zoom</p>
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>Contradiction Summary</span>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { n: highCount, label: "HIGH", bg: C.highBg, bdr: C.highBorder, col: C.red },
                { n: medCount, label: "MEDIUM", bg: C.medBg, bdr: C.medBorder, col: C.amber },
                { n: allFlags.length, label: "Total", bg: C.bgSub, bdr: C.border, col: C.text },
                { n: MOCK_DOCS.length, label: "Documents", bg: C.bgSub, bdr: C.border, col: C.text },
              ].map(function (s) {
                return (
                  <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "14px", background: s.bg, borderRadius: 10, border: "1px solid " + s.bdr }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.col }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: s.col === C.text ? C.textMuted : s.col, fontWeight: 600 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contradictions */}
          <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>Contradictions</span>
          {allFlags.map(function (line, idx) {
            var flag = line.flag!;
            return (
              <div key={idx} style={{ padding: "16px 0", borderBottom: idx < allFlags.length - 1 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <SeverityBadge level={flag.severity} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{flag.title}</span>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace", marginLeft: "auto" }}>{line.time}</span>
                </div>

                {/* Citation table */}
                <CitationTable flag={flag} onFileClick={showToast} />

                <p style={{ fontSize: 16, color: C.text, lineHeight: 1.5, margin: 0 }}>{flag.analysis}</p>
              </div>
            );
          })}

          {/* Full transcript */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid " + C.border }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>Full Transcript</span>
            {LINES.map(function (line, i) {
              var isQ = line.type === "q";
              var hasFlag = !!line.flag;
              return (
                <div key={i} style={{
                  padding: "8px 0",
                  borderBottom: i < LINES.length - 1 ? "1px solid " + C.borderLight : "none",
                  borderLeft: hasFlag ? "3px solid " + (line.flag!.severity === "HIGH" ? C.red : C.amber) : "3px solid transparent",
                  paddingLeft: hasFlag ? 12 : 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{line.time}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isQ ? C.textMuted : C.text }}>{line.speaker}</span>
                    <span style={{ fontSize: 9, color: C.textMuted, background: C.bgSub, padding: "1px 5px", borderRadius: 3 }}>{line.role}</span>
                    {hasFlag && <SeverityBadge level={line.flag!.severity} />}
                  </div>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5, margin: 0 }}>
                    {hasFlag
                      ? <HighlightedText text={line.text} keywords={line.flag!.keywords} severity={line.flag!.severity} />
                      : line.text
                    }
                  </p>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid " + C.border }}>
            <p style={{ fontSize: 10, color: C.textMuted, margin: 0, lineHeight: 1.5 }}>
              Generated by Verlo.ai CaseChecker. This analysis is a supplementary tool and should not be considered a definitive legal determination.
              Document citations should be independently verified. 2022–2026 CourtScribes, Inc.
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={function () { setToast(""); }} />}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// APP — Screen Switcher
// ═══════════════════════════════════════════════════════════════════

export default function CaseCheckerApp() {
  var [screen, setScreen] = useState(0);

  var views = [
    <SessionSetup key="setup" onStart={function () { setScreen(1); }} />,
    <LiveAnalysis key="live" />,
    <PostSession key="post" onExport={function () { setScreen(3); }} />,
    <PDFExport key="pdf" onClose={function () { setScreen(2); }} />,
  ];

  return (
    <div style={{ fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", height: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalStyles />
      <div style={{ background: "#fff", borderBottom: "1px solid " + C.border, padding: "8px 12px", display: "flex", gap: 3, overflowX: "auto", flexShrink: 0 }}>
        {screens.map(function (s, i) {
          return (
            <button key={s} onClick={function () { setScreen(i); }} style={{
              padding: "5px 10px", borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap",
              background: screen === i ? C.brand : "transparent",
              color: screen === i ? "#fff" : C.textSec,
            }}>{s}</button>
          );
        })}
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>{views[screen]}</div>
    </div>
  );
}
