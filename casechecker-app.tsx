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
  // Flag colors (single color for all contradictions)
  flag: "#dc2626",
  flagLight: "rgba(220,38,38,0.06)",
  flagBorder: "rgba(220,38,38,0.18)",
  flagBorderActive: "rgba(220,38,38,0.50)",
  flagBg: "rgba(220,38,38,0.03)",
  flagActiveChip: "rgba(220,38,38,0.12)",
  flagHighlight: "rgba(220,38,38,0.10)",
  flagHighlightBorder: "rgba(220,38,38,0.45)",
  // Two-tone quote blocks (sidebar)
  saidBg: "rgba(220,38,38,0.05)",
  saidBorder: "rgba(220,38,38,0.15)",
  docBg: "rgba(37,99,235,0.05)",
  docBorder: "rgba(37,99,235,0.15)",
  docText: "#1e40af",
  // Legacy (PostSession/PDFExport)
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

// Renders text with keyword highlighting for flagged statements
function HighlightedText({ text, keywords }: { text: string; keywords?: string[] }) {
  if (!keywords || keywords.length === 0) return <>{text}</>;
  // Build regex from keywords
  var escaped = keywords.map(function (kw) { return kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
  var regex = new RegExp("(" + escaped.join("|") + ")", "gi");
  var parts = text.split(regex);
  return (
    <>
      {parts.map(function (part, i) {
        var isMatch = keywords.some(function (kw) { return part.toLowerCase() === kw.toLowerCase(); });
        if (isMatch) {
          return <span key={i} style={{ background: "rgba(220,38,38,0.10)", borderBottom: "1.5px solid rgba(220,38,38,0.45)", fontWeight: 500, padding: "0 1px" }}>{part}</span>;
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
  id: string;
  insight: string;
  doc: string;
  page: number;
  quote: string;
  keywords: string[];
  suggestedFollowUp: string;
};

type TranscriptLine = {
  time: string;
  speaker: string;
  role: string;
  text: string;
  type: "q" | "s";
  flags?: TranscriptFlag[];
};

var LINES: TranscriptLine[] = [
  { time: "10:02:14", speaker: "Katherine Lin", role: "Counsel", text: "Mr. Torres, can you walk us through what happened on the evening of March 14th?", type: "q" },
  { time: "10:02:31", speaker: "Michael Torres", role: "Witness", text: "Sure. I was driving home from work, heading east on Coral Way. It was around 6:30 PM, still light out. Traffic was moderate.", type: "s" },
  { time: "10:02:48", speaker: "Katherine Lin", role: "Counsel", text: "And approximately how fast were you driving at the time of the collision?", type: "q" },
  {
    time: "10:03:02", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "I was going about 25 miles per hour. The speed limit there is 35, so I was well under it.",
    flags: [{
      id: "f1",
      insight: "Police report estimates 45–55 mph",
      doc: "Police_Report_4821.pdf",
      page: 3,
      quote: "Based on skid mark analysis, Vehicle 1 was estimated to be traveling between 45–55 mph at the point of initial braking.",
      keywords: ["25 miles per hour"],
      suggestedFollowUp: "Can you describe the road conditions and whether you applied brakes before the collision?",
    }],
  },
  { time: "10:03:28", speaker: "Katherine Lin", role: "Counsel", text: "Did you notice the stop sign at the intersection of Coral Way and 42nd Avenue?", type: "q" },
  {
    time: "10:03:41", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "No, I did not see any stop sign. I don't believe there was one at that intersection.",
    flags: [{
      id: "f2",
      insight: "Prior depo: acknowledged stop sign existed",
      doc: "Prior_Deposition_Torres_Jan2024.pdf",
      page: 12,
      quote: "I noticed the stop sign but it was partially obscured by foliage. I slowed down but did not come to a complete stop.",
      keywords: ["did not see any stop sign", "I don't believe there was one"],
      suggestedFollowUp: "In your January deposition, you mentioned the stop sign was partially obscured. Can you clarify what you recall seeing?",
    }],
  },
  { time: "10:04:05", speaker: "Katherine Lin", role: "Counsel", text: "Had you consumed any alcohol before driving that evening?", type: "q" },
  {
    time: "10:04:18", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "Absolutely not. I had not consumed any alcohol that day whatsoever.",
    flags: [{
      id: "f3",
      insight: "Hospital records: BAC 0.04%, admitted 2 beers",
      doc: "Medical_Records_Regional_Hospital.pdf",
      page: 7,
      quote: "Patient BAC upon admission: 0.04%. Patient stated he had 'two beers with lunch' approximately four hours prior.",
      keywords: ["had not consumed any alcohol"],
      suggestedFollowUp: "The hospital records note you mentioned having two beers at lunch. Can you walk us through your afternoon before driving?",
    }],
  },
  { time: "10:04:42", speaker: "Katherine Lin", role: "Counsel", text: "Were the brakes on your vehicle functioning properly that day? And were you the only person driving the vehicle that week?", type: "q" },
  {
    time: "10:04:55", speaker: "Michael Torres", role: "Witness", type: "s",
    text: "Yes, the brakes were working fine. I had no issues with the vehicle. And yes, I was the only driver — no one else had access to the car.",
    flags: [{
      id: "f4",
      insight: "Filed brake repair claim 2 weeks prior",
      doc: "Slide_Policy_GRB-2024-0891.pdf",
      page: 4,
      quote: "Claim filed 02/28/2024: Brake system inspection and repair requested. Claimant reported 'grinding noise when braking' and 'increased stopping distance.'",
      keywords: ["brakes were working fine", "no issues with the"],
      suggestedFollowUp: "You filed an insurance claim citing brake issues two weeks prior. Were those repairs completed before March 14th?",
    }, {
      id: "f5",
      insight: "Wife listed as co-driver on insurance",
      doc: "Slide_Policy_GRB-2024-0891.pdf",
      page: 2,
      quote: "Named drivers: Michael Torres (primary), Sandra Torres (secondary). Both drivers confirmed active use of insured vehicle.",
      keywords: ["only driver", "no one else had access"],
      suggestedFollowUp: "Your insurance policy lists Sandra Torres as a secondary driver. Did she drive the vehicle in the days before the accident?",
    }],
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
@keyframes cc-chip-enter{0%{opacity:0.5;transform:scale(0.95)}60%{opacity:1;transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
@keyframes cc-pill-bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-3px)}}
@keyframes cc-pill-enter{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes cc-bracket-draw{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}
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
// HIGHLIGHTED TEXT WITH DATA ATTRIBUTES (for bracket anchoring)
// ═══════════════════════════════════════════════════════════════════

function FlagHighlightedText({ text, flags }: { text: string; flags: TranscriptFlag[] }) {
  if (!flags || flags.length === 0) return <>{text}</>;

  var kwToFlag: Record<string, string> = {};
  flags.forEach(function (flag) {
    flag.keywords.forEach(function (kw) {
      var key = kw.toLowerCase();
      if (!kwToFlag[key]) kwToFlag[key] = flag.id;
    });
  });

  var allKws: string[] = [];
  flags.forEach(function (f) { allKws = allKws.concat(f.keywords); });
  var escaped = allKws.map(function (kw) { return kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
  var regex = new RegExp("(" + escaped.join("|") + ")", "gi");
  var parts = text.split(regex);

  var seenFirst: Record<string, boolean> = {};

  return (
    <>
      {parts.map(function (part, i) {
        var flagId = kwToFlag[part.toLowerCase()];
        if (flagId) {
          var isFirst = !seenFirst[flagId];
          if (isFirst) seenFirst[flagId] = true;
          return (
            <span key={i}
              data-kw-flag={flagId}
              data-kw-first={isFirst ? flagId : undefined}
              style={{
                background: "rgba(220,38,38,0.10)",
                borderBottom: "1.5px solid rgba(220,38,38,0.50)",
                fontWeight: 500, padding: "0 1px",
              }}>
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}


// ═══════════════════════════════════════════════════════════════════
// TRANSCRIPT LINE — per-line component with connector bracket measurement
// ═══════════════════════════════════════════════════════════════════

function TranscriptLineRow({ line, index, visCount, wordCounts, locked, activeFlagId, onChipClick }: {
  line: TranscriptLine; index: number; visCount: number;
  wordCounts: Record<number, number>; locked: Record<number, boolean>;
  activeFlagId: string | null; onChipClick: (flagId: string) => void;
}) {
  var containerRef = useRef<HTMLDivElement>(null);
  var [chipLayout, setChipLayout] = useState<{ positions: Record<string, { top: number; left: number }>; minHeight: number } | null>(null);
  var [brackets, setBrackets] = useState<{ path: string; id: string }[]>([]);
  var [resizeTick, setResizeTick] = useState(0);

  var isVisible = index < visCount;
  var isLocked = !!locked[index];
  var isStreaming = isVisible && !isLocked;
  var hasFlags = isLocked && line.flags !== undefined && line.flags.length > 0;
  var isQuestion = line.type === "q";

  // Recalculate on resize
  useEffect(function () {
    var onResize = function () { setResizeTick(function (t) { return t + 1; }); };
    window.addEventListener("resize", onResize);
    return function () { window.removeEventListener("resize", onResize); };
  }, []);

  /* Measure keyword positions → compute bracket paths + chip positions.
     Each bracket endpoint Y = phraseBottom + 22, not derived from the chip
     or the paragraph bottom. Chips are absolutely positioned at the endpoint.
     Same-line collisions: place chips side-by-side when horizontal space allows,
     otherwise stack vertically with a stepped bracket. */
  useEffect(function () {
    if (!hasFlags || !containerRef.current) {
      if (chipLayout) setChipLayout(null);
      if (brackets.length > 0) setBrackets([]);
      return;
    }
    var timer = setTimeout(function () {
      var container = containerRef.current;
      if (!container) return;
      var cRect = container.getBoundingClientRect();
      var CHIP_H = 32;
      var CHIP_GAP = 8;
      var DROP = 22;
      var R = 6;
      var containerW = cRect.width;
      var positions: Record<string, { top: number; left: number }> = {};
      var newBrackets: { path: string; id: string }[] = [];
      var placed: { bracketEndY: number; left: number; right: number; id: string }[] = [];

      var estChipWidth = function (text: string) { return text.length * 9.5 + 42; };

      line.flags!.forEach(function (flag) {
        var kwEl = container.querySelector('[data-kw-first="' + flag.id + '"]');
        if (!kwEl) return;
        var kwRect = (kwEl as HTMLElement).getBoundingClientRect();
        var phraseLeft = kwRect.left - cRect.left;
        var phraseBottom = kwRect.bottom - cRect.top;

        var bracketEndY = phraseBottom + DROP;
        var chipLeft = phraseLeft + 20;
        var chipW = estChipWidth(flag.insight);
        var stacked = false;

        // Check for same-row collision
        var sameRow: typeof placed = [];
        for (var ci = 0; ci < placed.length; ci++) {
          if (Math.abs(bracketEndY - placed[ci].bracketEndY) < CHIP_H) {
            sameRow.push(placed[ci]);
          }
        }

        if (sameRow.length > 0) {
          var rightmost = sameRow[0];
          for (var ri = 1; ri < sameRow.length; ri++) {
            if (sameRow[ri].right > rightmost.right) rightmost = sameRow[ri];
          }
          var sideLeft = Math.max(chipLeft, rightmost.right + CHIP_GAP);
          if (sideLeft + chipW < containerW - 20) {
            chipLeft = sideLeft;
            bracketEndY = rightmost.bracketEndY;
          } else {
            bracketEndY = rightmost.bracketEndY + CHIP_H + 6;
            stacked = true;
          }
        }

        placed.push({ bracketEndY: bracketEndY, left: chipLeft, right: chipLeft + chipW, id: flag.id });

        positions[flag.id] = {
          top: bracketEndY - CHIP_H / 2,
          left: chipLeft,
        };

        // Bracket path
        if (stacked) {
          var stubY = phraseBottom + DROP;
          var path = "M " + phraseLeft + " " + (phraseBottom + 2)
            + " L " + phraseLeft + " " + (stubY - R)
            + " Q " + phraseLeft + " " + stubY + " " + (phraseLeft + R) + " " + stubY
            + " L " + (chipLeft - R) + " " + stubY
            + " Q " + chipLeft + " " + stubY + " " + chipLeft + " " + (stubY + R)
            + " L " + chipLeft + " " + bracketEndY;
          newBrackets.push({ path: path, id: flag.id });
        } else {
          var path = "M " + phraseLeft + " " + (phraseBottom + 2)
            + " L " + phraseLeft + " " + (bracketEndY - R)
            + " Q " + phraseLeft + " " + bracketEndY + " " + (phraseLeft + R) + " " + bracketEndY
            + " L " + chipLeft + " " + bracketEndY;
          newBrackets.push({ path: path, id: flag.id });
        }
      });

      var maxBottom = 0;
      Object.keys(positions).forEach(function (id) {
        var b = positions[id].top + CHIP_H;
        if (b > maxBottom) maxBottom = b;
      });

      setChipLayout({ positions: positions, minHeight: maxBottom + 12 });
      setBrackets(newBrackets);
    }, 60);
    return function () { clearTimeout(timer); };
  }, [isLocked, hasFlags, resizeTick]);

  if (!isVisible) return null;

  var words = line.text.split(" ");
  var revealedCount = isLocked ? words.length : (wordCounts[index] || 0);
  var visibleText = words.slice(0, revealedCount).join(" ");
  var allWordsShown = revealedCount >= words.length;
  var chipsReady = chipLayout !== null;

  return (
    <div style={{ animation: "cc-fade-in 0.3s ease" }}>
      <div ref={containerRef} style={{ padding: "12px 20px", position: "relative", minHeight: chipsReady ? chipLayout.minHeight : undefined }}>
        {/* Speaker info */}
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

        {/* Text */}
        <p style={{
          fontSize: 19, lineHeight: 1.6, margin: 0,
          color: isStreaming ? C.textMuted : C.text,
          fontWeight: isQuestion ? 500 : 400,
          opacity: isStreaming ? 0.55 : 1,
          transition: "opacity 0.3s, color 0.3s",
        }}>
          {isLocked && hasFlags
            ? <FlagHighlightedText text={line.text} flags={line.flags!} />
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

        {/* Inline chips — absolutely positioned at bracket endpoints */}
        {hasFlags && chipsReady && line.flags!.map(function (flag) {
          var pos = chipLayout.positions[flag.id];
          if (!pos) return null;
          var isActive = activeFlagId === flag.id;
          return (
            <div key={flag.id} data-chip={flag.id}
              onClick={function () { onChipClick(flag.id); }}
              onMouseEnter={function (e) { e.currentTarget.style.boxShadow = "0 1px 6px rgba(220,38,38,0.15)"; e.currentTarget.style.background = isActive ? "rgba(220,38,38,0.18)" : "rgba(220,38,38,0.10)"; }}
              onMouseLeave={function (e) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = isActive ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.06)"; }}
              style={{
                position: "absolute", top: pos.top, left: pos.left, zIndex: 2,
                display: "inline-flex", alignItems: "center", gap: 6,
                background: isActive ? "rgba(220,38,38,0.14)" : "rgba(220,38,38,0.06)",
                border: isActive ? "1.5px solid rgba(220,38,38,0.5)" : "1px solid rgba(220,38,38,0.18)",
                borderRadius: 24, padding: "4px 14px 4px 12px",
                cursor: "pointer", whiteSpace: "nowrap",
                animation: "cc-chip-enter 0.6s ease-out forwards",
                transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
              }}>
              <span style={{ fontSize: 17.5, fontWeight: 600, color: "#dc2626" }}>{flag.insight}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          );
        })}

        {/* Connector brackets (SVG overlay) */}
        {brackets.length > 0 && (
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible", zIndex: 1 }}>
            {brackets.map(function (b) {
              return (
                <path key={b.id} d={b.path}
                  fill="none"
                  stroke="rgba(220,38,38,0.40)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="400"
                  strokeDashoffset="400"
                  style={{ animation: "cc-bracket-draw 0.5s ease-out 0.35s forwards" }}
                />
              );
            })}
          </svg>
        )}
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
  var [activeFlagId, setActiveFlagId] = useState<string | null>(null);
  var [autoScrollFrozen, setAutoScrollFrozen] = useState(false);
  var [showResumePill, setShowResumePill] = useState(false);
  var transcriptRef = useRef<HTMLDivElement>(null);
  var previewScrollRef = useRef<HTMLDivElement>(null);
  var isAutoScrolling = useRef(false);

  // Word-by-word streaming with dynamic timing
  useEffect(function () {
    var timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach(function (line, i) {
      var sched = SCHEDULE[i];
      timers.push(setTimeout(function () { setVisCount(i + 1); }, sched.start));
      var words = line.text.split(" ");
      words.forEach(function (_, w) {
        timers.push(setTimeout(function () {
          setWordCounts(function (prev) { var n: Record<number, number> = {}; for (var k in prev) n[k] = prev[k]; n[i] = w + 1; return n; });
        }, sched.start + 100 * (w + 1)));
      });
      timers.push(setTimeout(function () {
        setLocked(function (prev) { var n: Record<number, boolean> = {}; for (var k in prev) n[k] = prev[k]; n[i] = true; return n; });
      }, sched.lockTime));
    });
    return function () { timers.forEach(clearTimeout); };
  }, []);

  // Auto-scroll (only when not frozen)
  useEffect(function () {
    if (!autoScrollFrozen && transcriptRef.current) {
      isAutoScrolling.current = true;
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
      setTimeout(function () { isAutoScrolling.current = false; }, 50);
    }
  }, [visCount, wordCounts, locked, autoScrollFrozen]);

  // Detect scroll position
  var handleTranscriptScroll = function () {
    if (isAutoScrolling.current) return;
    var el = transcriptRef.current;
    if (!el) return;
    var dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (dist > 100) {
      if (!autoScrollFrozen) setAutoScrollFrozen(true);
      if (!showResumePill) setShowResumePill(true);
    } else if (dist < 60) {
      if (autoScrollFrozen) setAutoScrollFrozen(false);
      if (showResumePill) setShowResumePill(false);
    }
  };

  var handleTranscriptWheel = function (e: React.WheelEvent) {
    if (e.deltaY < 0) {
      if (!autoScrollFrozen) setAutoScrollFrozen(true);
      if (!showResumePill) setShowResumePill(true);
    }
  };

  // Build flat flag list for counter
  var allFlags: { flag: TranscriptFlag; line: TranscriptLine; lineIdx: number }[] = [];
  LINES.forEach(function (line, i) {
    if (line.flags && line.flags.length > 0 && locked[i]) {
      line.flags.forEach(function (flag) {
        allFlags.push({ flag: flag, line: line, lineIdx: i });
      });
    }
  });

  // Active flag data for preview pane
  var activeItem: { flag: TranscriptFlag; line: TranscriptLine; lineIdx: number } | null = null;
  if (activeFlagId) {
    for (var ai = 0; ai < allFlags.length; ai++) {
      if (allFlags[ai].flag.id === activeFlagId) { activeItem = allFlags[ai]; break; }
    }
  }
  var previewOpen = activeFlagId !== null && activeItem !== null;

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

  // Chip click
  var handleChipClick = function (flagId: string) {
    if (activeFlagId === flagId) {
      setActiveFlagId(null);
      setAutoScrollFrozen(false);
      setShowResumePill(false);
      setTimeout(function () {
        if (transcriptRef.current) {
          isAutoScrolling.current = true;
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
          setTimeout(function () { isAutoScrolling.current = false; }, 50);
        }
      }, 20);
    } else {
      setActiveFlagId(flagId);
      setAutoScrollFrozen(true);
      setShowResumePill(true);
    }
  };

  var closePreview = function () {
    setActiveFlagId(null);
    setAutoScrollFrozen(false);
    setShowResumePill(false);
    setTimeout(function () {
      if (transcriptRef.current) {
        isAutoScrolling.current = true;
        transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        setTimeout(function () { isAutoScrolling.current = false; }, 50);
      }
    }, 20);
  };

  var resumeLive = function () {
    setAutoScrollFrozen(false);
    setShowResumePill(false);
    if (transcriptRef.current) {
      isAutoScrolling.current = true;
      transcriptRef.current.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
      setTimeout(function () { isAutoScrolling.current = false; }, 500);
    }
  };

  // Reset preview scroll on flag switch
  useEffect(function () {
    if (!activeFlagId) return;
    requestAnimationFrame(function () {
      if (previewScrollRef.current) previewScrollRef.current.scrollTop = 0;
    });
  }, [activeFlagId]);

  return (
    <div style={{ height: "100%", background: C.bgSub, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AppNav />

      {/* ── Sub-header bar ── */}
      <div style={{
        background: C.bg, borderBottom: "1px solid " + C.border,
        padding: "0 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 48, flexShrink: 0,
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

        {/* Transcript */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
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

          {/* Transcript lines */}
          <div ref={transcriptRef} onScroll={handleTranscriptScroll} onWheel={handleTranscriptWheel} style={{ flex: 1, overflow: "auto" }}>
            {LINES.map(function (line, i) {
              return (
                <TranscriptLineRow key={i} line={line} index={i}
                  visCount={visCount} wordCounts={wordCounts} locked={locked}
                  activeFlagId={activeFlagId} onChipClick={handleChipClick} />
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

          {/* Resume pill */}
          {showResumePill && (
            <div onClick={resumeLive}
              onMouseEnter={function (e) { e.currentTarget.style.background = "rgba(15,23,42,1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)"; }}
              onMouseLeave={function (e) { e.currentTarget.style.background = "rgba(15,23,42,0.92)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)"; }}
              style={{
                position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
                background: "rgba(15,23,42,0.92)", backdropFilter: "blur(8px)", color: "#fff",
                borderRadius: 24, padding: "10px 22px", minHeight: 44,
                boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                cursor: "pointer", zIndex: 10,
                animation: "cc-pill-enter 0.3s ease-out forwards, cc-pill-bob 2s ease-in-out 0.3s infinite",
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Resume live</span>
            </div>
          )}
        </div>

        {/* ── Preview pane ── */}
        <div style={{
          width: previewOpen ? 380 : 0, flexShrink: 0, overflow: "hidden",
          transition: "width 150ms ease",
          borderLeft: previewOpen ? "1px solid " + C.border : "none",
          background: C.bg, display: "flex", flexDirection: "column" as const,
        }}>
          {activeItem && (
            <div key={activeFlagId} ref={previewScrollRef} style={{ width: 380, padding: "20px 24px", flex: 1, minHeight: 0, overflow: "auto" }}>
              {/* Close button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                <div onClick={closePreview} style={{
                  width: 28, height: 28, borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", background: "transparent",
                }}
                onMouseEnter={function (e) { e.currentTarget.style.background = C.bgSub; }}
                onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>

              {/* Section header + counter */}
              <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>Evidence</span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400, display: "block", marginTop: 2, marginBottom: 16 }}>
                {(function () {
                  var idx = -1;
                  for (var ci = 0; ci < allFlags.length; ci++) {
                    if (allFlags[ci].flag.id === activeFlagId) { idx = ci; break; }
                  }
                  return (idx + 1) + " of " + allFlags.length;
                })()}
              </span>

              {/* Testimony quote */}
              <p style={{ fontSize: 16, fontWeight: 500, color: "#0f172a", lineHeight: 1.6, margin: "0 0 0" }}>
                &ldquo;{activeItem.line.text}&rdquo;
              </p>

              {/* Source citation */}
              <div style={{ marginTop: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1e40af", cursor: "pointer" }}>
                  {activeItem.flag.doc}, p.&nbsp;{activeItem.flag.page}:
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 3, verticalAlign: "middle" }}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
                <p style={{ fontSize: 16, fontStyle: "italic", color: "#64748b", lineHeight: 1.6, margin: "5px 0 0" }}>
                  &ldquo;{activeItem.flag.quote}&rdquo;
                </p>
              </div>

              {/* Follow-up */}
              <FollowUpSection text={activeItem.flag.suggestedFollowUp} />
            </div>
          )}
        </div>
      </div>
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

  var allFlagItems: { line: TranscriptLine; flag: TranscriptFlag }[] = [];
  LINES.forEach(function (l) {
    if (l.flags) l.flags.forEach(function (f) { allFlagItems.push({ line: l, flag: f }); });
  });
  var totalFlagCount = allFlagItems.length;

  var citedDocs: Record<string, boolean> = {};
  allFlagItems.forEach(function (item) { citedDocs[item.flag.doc] = true; });

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
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.red }}>{totalFlagCount}</div>
                  <div style={{ fontSize: 11, color: C.red, fontWeight: 600 }}>Contradictions</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "14px 8px", background: C.bgSub, borderRadius: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{MOCK_DOCS.length}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>Documents</div>
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
                { key: "contradictions", label: "Contradictions", count: totalFlagCount },
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
                allFlagItems.map(function (item, idx) {
                  var flag = item.flag;
                  var line = item.line;
                  return (
                    <div key={idx} style={{
                      background: C.bg,
                      borderLeft: "3px solid " + C.flag,
                      borderTop: "1px solid " + C.border,
                      borderRight: "1px solid " + C.border,
                      borderBottom: "1px solid " + C.border,
                      borderRadius: 10, padding: "16px 18px", marginBottom: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{flag.insight}</span>
                        <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>
                          {line.time.split(":").slice(1).join(":")}
                        </span>
                      </div>

                      {/* Citation table */}
                      <CitationTable flag={flag} onFileClick={showToast} />

                      {/* Per-contradiction follow-up */}
                      <FollowUpSection text={flag.suggestedFollowUp} />
                    </div>
                  );
                })
              ) : (
                LINES.map(function (line, i) {
                  var isQuestion = line.type === "q";
                  var hasFlags = line.flags && line.flags.length > 0;
                  var isExpanded = expandedTranscript[i];
                  var allKw: string[] = [];
                  if (hasFlags) line.flags!.forEach(function (f) { allKw = allKw.concat(f.keywords); });

                  return (
                    <div key={i} style={{
                      padding: "10px 16px", borderBottom: "1px solid " + C.borderLight,
                      borderLeft: hasFlags ? "3px solid " + C.flag : "3px solid transparent",
                      background: "transparent",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{line.time.split(":").slice(1).join(":")}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: isQuestion ? C.textMuted : C.text }}>{line.speaker}</span>
                        <span style={{ fontSize: 9, color: C.textMuted, background: C.bgSub, padding: "1px 6px", borderRadius: 3, fontWeight: 500 }}>{line.role}</span>
                      </div>
                      <p style={{ fontSize: 16, color: C.text, lineHeight: 1.5, margin: 0 }}>
                        {hasFlags
                          ? <HighlightedText text={line.text} keywords={allKw} />
                          : line.text
                        }
                      </p>

                      {hasFlags && line.flags!.map(function (flag, fi) {
                        var flagKey = i + "-" + fi;
                        var isFlagExpanded = expandedTranscript[i * 100 + fi];
                        return (
                          <div key={flagKey} style={{ marginTop: 6 }}>
                            <div onClick={function () { toggleExpand(i * 100 + fi); }} style={{
                              display: "inline-flex", alignItems: "center", gap: 6,
                              cursor: "pointer", padding: "3px 8px", borderRadius: 4,
                              background: C.bgSub,
                            }}>
                              <span style={{ fontSize: 11, fontWeight: 600, color: C.flag }}>{flag.insight}</span>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" style={{ transform: isFlagExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>
                            {isFlagExpanded && (
                              <div style={{
                                marginTop: 8, padding: "10px 14px",
                                animation: "cc-fade-in 0.2s ease",
                              }}>
                                <CitationTable flag={flag} onFileClick={showToast} />
                                <FollowUpSection text={flag.suggestedFollowUp} />
                              </div>
                            )}
                          </div>
                        );
                      })}
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
  var pdfFlagItems: { line: TranscriptLine; flag: TranscriptFlag }[] = [];
  LINES.forEach(function (l) {
    if (l.flags) l.flags.forEach(function (f) { pdfFlagItems.push({ line: l, flag: f }); });
  });
  var pdfTotalFlags = pdfFlagItems.length;
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
                { n: pdfTotalFlags, label: "Contradictions", bg: C.highBg, bdr: C.highBorder, col: C.red },
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
          {pdfFlagItems.map(function (item, idx) {
            var flag = item.flag;
            var line = item.line;
            return (
              <div key={idx} style={{ padding: "16px 0", borderBottom: idx < pdfFlagItems.length - 1 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{flag.insight}</span>
                  <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "'DM Mono', monospace", marginLeft: "auto" }}>{line.time}</span>
                </div>

                {/* Citation table */}
                <CitationTable flag={flag} onFileClick={showToast} />
              </div>
            );
          })}

          {/* Full transcript */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid " + C.border }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textSec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>Full Transcript</span>
            {LINES.map(function (line, i) {
              var isQ = line.type === "q";
              var hasFlags = line.flags && line.flags.length > 0;
              var pdfKw: string[] = [];
              if (hasFlags) line.flags!.forEach(function (f) { pdfKw = pdfKw.concat(f.keywords); });
              return (
                <div key={i} style={{
                  padding: "8px 0",
                  borderBottom: i < LINES.length - 1 ? "1px solid " + C.borderLight : "none",
                  borderLeft: hasFlags ? "3px solid " + C.flag : "3px solid transparent",
                  paddingLeft: hasFlags ? 12 : 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "'DM Mono', monospace" }}>{line.time}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isQ ? C.textMuted : C.text }}>{line.speaker}</span>
                    <span style={{ fontSize: 9, color: C.textMuted, background: C.bgSub, padding: "1px 5px", borderRadius: 3 }}>{line.role}</span>
                    {hasFlags && line.flags!.map(function (f) {
                      return <span key={f.id} style={{ fontSize: 9, fontWeight: 600, color: C.flag }}>{f.insight}</span>;
                    })}
                  </div>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5, margin: 0 }}>
                    {hasFlags
                      ? <HighlightedText text={line.text} keywords={pdfKw} />
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
