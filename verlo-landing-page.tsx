/* ===== VERLO PARENT LANDING PAGE =====
 * Contains: LandingPage (default export) + SolutionsDropdown + VerloHeroVisual.
 * Shared helpers (C, VerloWordmark, TruthBars) are imported from truthorlie-app.tsx
 * so there is a single source of truth.
 */
import { useState, useEffect } from "react";
import { C, VerloWordmark, TruthBars } from "./truthorlie-app";

/* ===== HERO VISUAL — PARENT COMPANY ===== */
export function VerloHeroVisual(){
  return <div style={{position:"relative",padding:"10px 0"}}><style>{"\n@keyframes hero-dot-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.8);opacity:0.4}}\n@keyframes hero-rise{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}\n@keyframes hero-float-a{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}\n@keyframes hero-float-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}\n@keyframes hero-shimmer{0%{background-position:-180% 0}100%{background-position:280% 0}}\n@keyframes ambient-drift-a{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,40px) scale(1.1)}}\n@keyframes ambient-drift-b{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}\n@keyframes ambient-drift-c{0%,100%{transform:translate(0,0) scale(1);opacity:0.7}50%{transform:translate(-20px,-20px) scale(0.95);opacity:1}}\n@keyframes ambient-fade-in{from{opacity:0}to{opacity:1}}\n@keyframes scan-wave-a{0%,100%{transform:translateY(0);opacity:0.55}50%{transform:translateY(-10px);opacity:1}}\n@keyframes scan-wave-b{0%,100%{transform:translateY(0);opacity:0.45}50%{transform:translateY(8px);opacity:0.9}}\n@keyframes scan-wave-c{0%,100%{transform:translateY(0);opacity:0.4}50%{transform:translateY(-8px);opacity:0.85}}\n@keyframes scan-wave-d{0%,100%{transform:translateY(0);opacity:0.35}50%{transform:translateY(10px);opacity:0.75}}\nhtml{scroll-behavior:smooth}\n"}</style><div style={{background:C.bg,borderRadius:16,border:"1px solid "+C.border,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.08)"}}><div style={{padding:"12px 20px",borderBottom:"1px solid "+C.border,display:"flex",alignItems:"center",gap:8,background:C.bgSub}}><VerloWordmark fontSize={16} /><span style={{fontSize:11,color:C.textMuted,marginLeft:"auto"}}>AI Legal Intelligence Platform</span></div><div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}><div style={{borderRadius:12,border:"1px solid "+C.border,padding:"18px 20px",background:C.bg,animation:"hero-float-a 4.5s ease-in-out 0.6s infinite"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{width:36,height:36,borderRadius:9,background:"rgba(122,46,59,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A2E3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg></div><div><span style={{fontSize:14,fontWeight:700,color:C.text,display:"block"}}>CaseChecker</span><span style={{fontSize:11,color:C.textMuted}}>Live fact-checking</span></div><div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:3,background:"#7A2E3B",animation:"hero-dot-pulse 2s ease-in-out infinite"}}/><span style={{fontSize:9,color:"#7A2E3B",fontWeight:600}}>CHECKING</span></div></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{[{w:"80%",flag:false},{w:"65%",flag:true},{w:"75%",flag:false}].map(function(ln,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:6,borderRadius:3,background:ln.flag?"#fef3c7":C.borderLight}}><div style={{width:ln.w,height:"100%",borderRadius:3,background:ln.flag?"#f59e0b":"#d1d5db",opacity:ln.flag?0.6:0.3}}/></div>{ln.flag&&<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#f59e0b" strokeWidth="1.5"/><line x1="8" y1="5" x2="8" y2="9" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11.5" r="0.5" fill="#f59e0b"/></svg>}</div>;})}</div></div><div style={{borderRadius:12,border:"1px solid "+C.border,padding:"18px 20px",background:C.bg,animation:"hero-float-b 5.5s ease-in-out 1.4s infinite"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{width:36,height:36,borderRadius:9,background:"rgba(61,90,122,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D5A7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><span style={{fontSize:14,fontWeight:700,color:C.text,display:"block"}}>TruthOrLie</span><span style={{fontSize:11,color:C.textMuted}}>Deception detection</span></div><div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:3,background:"#3D5A7A",animation:"hero-dot-pulse 2s ease-in-out 0.7s infinite"}}/><span style={{fontSize:9,color:"#3D5A7A",fontWeight:600}}>ANALYZING</span></div></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{[{type:"truth",bars:3,w:"70%"},{type:"lie",bars:4,w:"55%"},{type:"truth",bars:2,w:"80%"}].map(function(ln,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8}}><TruthBars type={ln.type} size={8} bars={ln.bars}/><div style={{flex:1,height:6,borderRadius:3,background:C.borderLight}}><div style={{width:ln.w,height:"100%",borderRadius:3,background:ln.type==="truth"?"#bbf7d0":"#fecaca",opacity:0.5}}/></div></div>;})}</div></div></div><div style={{padding:"10px 20px",borderTop:"1px solid "+C.border,background:C.bgSub,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:10,color:C.textMuted}}>2 active analyses</span><span style={{fontSize:10,color:C.textMuted}}>256-bit encrypted</span></div></div></div>;
}

/* ===== SOLUTIONS DROPDOWN (navbar) ===== */
export function SolutionsDropdown(){
  var [open,setOpen]=useState(false);
  var items=[
    {name:"CaseChecker",desc:"Live deposition fact-checking against your case files",href:"/casechecker"},
    {name:"TruthOrLie",desc:"AI-powered deception detection for legal workflows",href:"/truthorlie"},
  ];
  return <div style={{position:"relative"}} onMouseEnter={function(){setOpen(true);}} onMouseLeave={function(){setOpen(false);}}>
    <a href="#" style={{fontSize:14,color:C.textSec,textDecoration:"none",fontWeight:500,display:"flex",alignItems:"center",gap:4}} onClick={function(e){e.preventDefault();setOpen(!open);}}>Solutions<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}><polyline points="6 9 12 15 18 9"/></svg></a>
    {open&&<div style={{position:"absolute",top:"100%",left:-16,paddingTop:8,zIndex:200}}>
      <div style={{background:"#fff",borderRadius:12,border:"1px solid "+C.border,boxShadow:"0 12px 40px rgba(0,0,0,0.1)",padding:8,minWidth:260}}>
        {items.map(function(it){return <a key={it.name} href={it.href} style={{display:"block",padding:"12px 16px",borderRadius:8,textDecoration:"none",transition:"background 0.15s"}} onMouseEnter={function(e){(e.currentTarget as HTMLElement).style.background=C.bgSub;}} onMouseLeave={function(e){(e.currentTarget as HTMLElement).style.background="transparent";}}>
          <span style={{fontSize:14,fontWeight:600,color:C.text,display:"block",marginBottom:2}}>{it.name}</span>
          <span style={{fontSize:12,color:C.textSec}}>{it.desc}</span>
        </a>;})}
      </div>
    </div>}
  </div>;
}

/* ===== LANDING PAGE ===== */
export default function LandingPage(){
  var [solTab,setSolTab]=useState(0);

  var heroWords = ["depositions","interviews","testimony","case files"];
  var [heroWordIdx, setHeroWordIdx] = useState(0);
  var [heroFading, setHeroFading] = useState(false);
  useEffect(function(){
    var iv = setInterval(function(){
      setHeroFading(true);
      setTimeout(function(){
        setHeroWordIdx(function(prev){ return (prev + 1) % heroWords.length; });
        setHeroFading(false);
      }, 400);
    }, 3000);
    return function(){ clearInterval(iv); };
  }, []);

  var solCases = [
    {
      tab:"Litigation & Trial Prep",
      headline:"From discovery through closing argument",
      desc:"Verlo surfaces the contradictions and credibility signals that shape how cases are tried — at the scale modern litigation demands.",
      useCases:[
        {title:"Deposition vs. discovery", desc:"Check deposition testimony against discovery documents and flag contradictions, with exact citations to the source page.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>},
        {title:"Video deposition analysis", desc:"Analyze witness demeanor across hours of video for credibility inflection points worth reviewing.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>},
        {title:"Impeachment material", desc:"Surface prior statements that contradict current testimony — no manual re-reading required.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>},
        {title:"Cross-examination prep", desc:"Build an examination outline with cited inconsistencies ready to deploy.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>},
      ]
    },
    {
      tab:"Insurance Defense",
      headline:"Screen before you escalate",
      desc:"Prioritize SIU resources and outside counsel where credibility signals warrant the spend — and settle faster where they don't.",
      useCases:[
        {title:"EUO credibility review", desc:"Cross-reference examinations under oath against claim filings to surface timeline inconsistencies.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>},
        {title:"Recorded statement analysis", desc:"Detect behavioral deception signals in recorded claimant statements before SIU commits resources.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>},
        {title:"Document reconciliation", desc:"Reconcile claimant statements against medical records, repair estimates, and prior filings.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>},
        {title:"Caseload triage", desc:"Rank open claims by credibility risk so investigators focus where the indicators are strongest.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>},
      ]
    },
    {
      tab:"Corporate Investigations",
      headline:"Rigor for internal inquiries",
      desc:"A defensible analytical layer for investigations where the record has to hold up to outside scrutiny — regulatory, board-level, or otherwise.",
      useCases:[
        {title:"Interview analysis", desc:"Analyze recorded interviews for behavioral credibility markers across multiple interviewees.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>},
        {title:"Document cross-check", desc:"Reconcile interview statements against internal emails, memos, and business records.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>},
        {title:"Multi-interview consistency", desc:"Identify where witness accounts align, diverge, and contradict across the full investigation.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><circle cx="17" cy="11" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>},
        {title:"Defensible audit trail", desc:"Immutable records of every review, export, and finding — built to withstand outside scrutiny.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>},
      ]
    },
    {
      tab:"Family Law",
      headline:"Objectivity in high-emotion cases",
      desc:"An analytical layer for custody, dissolution, and asset matters — where the record and the testimony frequently diverge.",
      useCases:[
        {title:"Declaration inconsistencies", desc:"Check testimony against amended filings, declarations, and financial disclosures to surface inconsistencies.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>},
        {title:"Video deposition credibility", desc:"Analyze deposition video for behavioral signals that inform custody and credibility rulings.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>},
        {title:"Financial reconciliation", desc:"Cross-reference testimony against account statements, tax filings, and asset documentation.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>},
      ]
    },
  ];
  var sc = solCases[solTab];

  var integrations = [
    {cat:"Case Management", tools:["Clio","Relativity","Litify"]},
    {cat:"E-Discovery", tools:["Everlaw","Logikcull","DISCO"]},
    {cat:"Cloud Storage", tools:["SharePoint","Google Drive","iManage"]},
    {cat:"Video Conferencing", tools:["Zoom","Teams","Google Meet"]},
  ];

  var security = [
    {title:"SOC 2 Type II", desc:"Security architecture built to SOC 2 standards from day one. Formal certification in progress.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>},
    {title:"256-bit AES encryption", desc:"Customer data encrypted at rest with AES-256 and in transit with TLS 1.3. Customer-managed keys on enterprise.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>},
    {title:"Data residency controls", desc:"US or EU region selection on enterprise. Data does not leave the elected region except to serve the request.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>},
    {title:"Privilege protections", desc:"Architected to preserve attorney-client privilege and work-product doctrine. No training on customer content.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="12" cy="15" r="2"/><path d="M12 12v1M12 17v1"/></svg>},
    {title:"Chain of custody", desc:"Immutable audit log of every access, export, edit, and permission change — exportable for defensible review.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>},
    {title:"Granular access controls", desc:"SSO integration (SAML, OIDC) with workspace-scoped permissions. Fine-grained role management in active development.", icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>},
  ];

  return <div style={{background:C.bg,minHeight:"100%"}}>
    <style>{"\n@keyframes marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}\n"}</style>

    {/* ===== BLOOMBERG BANNER ===== */}
    <div style={{background:"rgba(15,23,42,0.02)",borderBottom:"1px solid "+C.borderLight,overflow:"hidden"}}><div style={{display:"flex",animation:"marquee-scroll 35s linear infinite",width:"fit-content"}}>{[0,1].map(function(k){return <div key={k} style={{display:"flex",alignItems:"center",flexShrink:0}}>{[0,1,2].map(function(j){return <a key={j} href="https://news.bloomberglaw.com/legal-ops-and-tech/ai-can-tell-if-youre-lying-app-marketed-to-lawyers-contends" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none",whiteSpace:"nowrap",padding:"9px 40px"}}><span style={{fontSize:11,color:C.textMuted,fontWeight:500}}>As featured in</span><span style={{fontSize:11,color:C.text,fontWeight:700}}>Bloomberg Law</span><span style={{color:C.border}}>|</span><span style={{fontSize:11,color:C.textSec,fontStyle:"italic"}}>"AI Can Tell if You're Lying, App Marketed to Lawyers Contends"</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>;})}</div>;})}</div></div>

    {/* ===== NAV ===== */}
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+C.border,padding:"0 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center"}}><VerloWordmark fontSize={30}/></div>
        <div style={{display:"flex",alignItems:"center",gap:32}}>
          <SolutionsDropdown/>
          <a href="/resources" style={{fontSize:14,color:C.textSec,textDecoration:"none",fontWeight:500}}>Resources</a>
          <a href="/security" style={{fontSize:14,color:C.textSec,textDecoration:"none",fontWeight:500}}>Security</a>
          <a href="#pricing" style={{fontSize:14,color:C.textSec,textDecoration:"none",fontWeight:500}}>Pricing</a>
          <a href="#" style={{fontSize:14,color:C.textSec,textDecoration:"none",fontWeight:500}}>Sign In</a>
          <button style={{background:C.accent,color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Schedule a Demo</button>
        </div>
      </div>
    </nav>

    {/* ===== 1. HERO ===== */}
    <section style={{position:"relative",overflow:"hidden"}}>
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,opacity:0,animation:"ambient-fade-in 1.4s ease-out 0.3s forwards"}}>
        <div style={{position:"absolute",top:"-15%",right:"8%",width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle, rgba(212,165,116,0.18) 0%, rgba(212,165,116,0) 65%)",filter:"blur(60px)",animation:"ambient-drift-a 22s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-25%",left:"6%",width:620,height:620,borderRadius:"50%",background:"radial-gradient(circle, rgba(15,23,42,0.07) 0%, rgba(15,23,42,0) 65%)",filter:"blur(70px)",animation:"ambient-drift-b 28s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:"30%",left:"42%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle, rgba(28,25,23,0.06) 0%, rgba(28,25,23,0) 70%)",filter:"blur(80px)",animation:"ambient-drift-c 32s ease-in-out 4s infinite"}}/>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1600 700" style={{position:"absolute",top:0,left:0,WebkitMaskImage:"linear-gradient(to right, transparent 0%, transparent 50%, black 68%, black 100%)",maskImage:"linear-gradient(to right, transparent 0%, transparent 50%, black 68%, black 100%)"}}>
          <defs>
            <linearGradient id="verlo-scan-brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(212,165,116,0)"/><stop offset="25%" stopColor="rgba(212,165,116,0.32)"/><stop offset="50%" stopColor="rgba(212,165,116,0.55)"/><stop offset="75%" stopColor="rgba(212,165,116,0.32)"/><stop offset="100%" stopColor="rgba(212,165,116,0)"/></linearGradient>
            <linearGradient id="verlo-scan-ink" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(15,23,42,0)"/><stop offset="25%" stopColor="rgba(15,23,42,0.14)"/><stop offset="50%" stopColor="rgba(15,23,42,0.22)"/><stop offset="75%" stopColor="rgba(15,23,42,0.14)"/><stop offset="100%" stopColor="rgba(15,23,42,0)"/></linearGradient>
          </defs>
          <path d="M0,120 C200,90 400,150 800,120 C1200,90 1400,150 1600,120" stroke="url(#verlo-scan-brass)" strokeWidth="1" fill="none" style={{animation:"scan-wave-a 18s ease-in-out infinite"}}/>
          <path d="M0,260 C240,225 480,295 800,260 C1120,225 1360,295 1600,260" stroke="url(#verlo-scan-ink)" strokeWidth="1" fill="none" style={{animation:"scan-wave-b 22s ease-in-out 1.5s infinite"}}/>
          <path d="M0,420 C200,390 400,450 800,420 C1200,390 1400,450 1600,420" stroke="url(#verlo-scan-brass)" strokeWidth="1" fill="none" style={{animation:"scan-wave-c 26s ease-in-out 3s infinite"}}/>
          <path d="M0,580 C240,550 480,610 800,580 C1120,550 1360,610 1600,580" stroke="url(#verlo-scan-ink)" strokeWidth="1" fill="none" style={{animation:"scan-wave-d 30s ease-in-out 4.5s infinite"}}/>
        </svg>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"88px 40px 104px",display:"flex",alignItems:"center",gap:60,position:"relative",zIndex:1}}>
        <div style={{flex:1,position:"relative",zIndex:1,opacity:0,animation:"hero-rise 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s forwards"}}>
          <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>AI Case Intelligence Platform</p>
          <h1 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:60,fontWeight:400,color:C.text,lineHeight:1.08,letterSpacing:"-1px",margin:"0 0 24px"}}>Case intelligence for your{" "}<span style={{position:"relative",display:"inline-block"}}><span style={{display:"inline-block",opacity:heroFading?0:1,transform:heroFading?"translateY(8px)":"translateY(0)",transition:"opacity 0.4s ease, transform 0.4s ease"}}>{heroWords[heroWordIdx]}</span><svg style={{position:"absolute",bottom:-2,left:0,width:"100%",height:8,overflow:"visible"}} preserveAspectRatio="none" viewBox="0 0 200 8"><path d="M0 5 Q25 1, 50 5 T100 5 T150 5 T200 5" stroke="#D4A574" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/></svg></span>.</h1>
          <p style={{fontSize:18,color:C.textSec,lineHeight:1.65,maxWidth:520,margin:"0 0 40px"}}>Modern cases bury their deciding details in thousands of pages, hours of deposition video, and years of prior filings. Verlo reads everything, cross-references testimony against the record, and surfaces what matters — so nothing case-deciding slips through.</p>
          <div style={{display:"flex",gap:12,marginBottom:28,alignItems:"center",flexWrap:"wrap"}}>
            <button style={{background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"16px 32px",fontSize:16,fontWeight:600,cursor:"pointer"}}>Schedule a Demo</button>
            <a href="#how-it-works" style={{background:"transparent",color:C.text,border:"1.5px solid "+C.border,borderRadius:10,padding:"15px 26px",fontSize:16,fontWeight:600,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>See how it works<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {[{label:"Enterprise-grade encryption",sub:"AES-256 + TLS 1.3"},{label:"Granular access controls",sub:"SSO & audit logging"},{label:"Data residency controls",sub:"US / EU region selection"}].map(function(b){
              return <a key={b.label} href="/security" style={{display:"flex",alignItems:"center",gap:8,background:C.bgSub,border:"1px solid "+C.borderLight,borderRadius:8,padding:"6px 12px",textDecoration:"none"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textSec} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{display:"flex",flexDirection:"column",lineHeight:1.1}}>
                  <span style={{fontSize:12,fontWeight:600,color:C.text}}>{b.label}</span>
                  <span style={{fontFamily:"'DM Mono', monospace",fontSize:9,color:C.textMuted,letterSpacing:"0.04em",marginTop:2}}>{b.sub}</span>
                </span>
              </a>;
            })}
          </div>
        </div>
        <div style={{flex:1,position:"relative",zIndex:1,opacity:0,animation:"hero-rise 1.2s cubic-bezier(0.16,1,0.3,1) 0.45s forwards"}}>
          <VerloHeroVisual/>
        </div>
      </div>
    </section>

    {/* ===== 2. PROBLEM STATEMENT ===== */}
    <section style={{background:C.bgDark,padding:"128px 40px",position:"relative",overflow:"hidden"}}>
      <div style={{maxWidth:900,margin:"0 auto",position:"relative"}}>
        <p style={{fontFamily:"'DM Mono', monospace",fontSize:11,fontWeight:500,color:"rgba(212,165,116,0.7)",letterSpacing:"0.18em",textTransform:"uppercase",margin:"0 0 36px"}}>The reality</p>
        <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:52,fontWeight:400,color:"#fff",lineHeight:1.12,letterSpacing:"-0.8px",margin:"0 0 64px",maxWidth:780}}>Case-deciding details hide in the gap between what people say and what the record shows.</h2>

        <div style={{display:"flex",flexDirection:"column",gap:36,maxWidth:760,marginBottom:72}}>
          {[
            "A witness confidently states they were never at the property — but page 847 of exhibit 14 tells a different story.",
            "A deponent's answer contradicts their own filing from three years ago, and no one in the room catches it.",
            "A claimant's timeline holds up under questioning, but their voice shifts on the one detail that matters — and the transcript doesn't capture it.",
          ].map(function(scenario,i){
            return <div key={i} style={{borderLeft:"1px solid rgba(212,165,116,0.35)",paddingLeft:32}}>
              <p style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:24,fontWeight:400,color:"#e2e8f0",lineHeight:1.5,fontStyle:"italic",margin:0,letterSpacing:"-0.2px"}}>{scenario}</p>
            </div>;
          })}
        </div>

        <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:40,maxWidth:640}}>
          <p style={{fontSize:17,color:"#94a3b8",lineHeight:1.7,margin:0}}>Verlo was built for the details that decide cases.</p>
        </div>
      </div>
    </section>

    {/* ===== 3. HOW IT WORKS ===== */}
    <section id="how-it-works" style={{padding:"120px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>How it works</p>
        <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:44,fontWeight:400,color:C.text,textAlign:"center",letterSpacing:"-0.6px",margin:"0 0 80px"}}>From case file to actionable intelligence.</h2>

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto 1fr",alignItems:"flex-start",gap:0,maxWidth:1120,margin:"0 auto"}}>
          {/* STEP 1 */}
          <div style={{padding:"0 28px"}}>
            <p style={{fontFamily:"'DM Mono', monospace",fontSize:11,color:C.textMuted,letterSpacing:"0.14em",fontWeight:500,margin:"0 0 20px"}}>STEP 01</p>
            <h3 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:26,fontWeight:400,color:C.text,margin:"0 0 14px",letterSpacing:"-0.3px",lineHeight:1.2}}>Bring your case materials</h3>
            <p style={{fontSize:15,color:C.textSec,lineHeight:1.65,margin:0}}>Documents, transcripts, video depositions, discovery exhibits — everything in one place. Verlo accepts them as-is.</p>
          </div>
          {/* CONNECTOR 1 */}
          <div style={{width:72,height:1,background:C.border,marginTop:22}}/>
          {/* STEP 2 */}
          <div style={{padding:"0 28px"}}>
            <p style={{fontFamily:"'DM Mono', monospace",fontSize:11,color:C.textMuted,letterSpacing:"0.14em",fontWeight:500,margin:"0 0 20px"}}>STEP 02</p>
            <h3 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:26,fontWeight:400,color:C.text,margin:"0 0 14px",letterSpacing:"-0.3px",lineHeight:1.2}}>Verlo finds what matters</h3>
            <p style={{fontSize:15,color:C.textSec,lineHeight:1.65,margin:"0 0 22px"}}>Verlo works across two dimensions at once: surfacing contradictions between statements and the documentary record, and identifying behavioral credibility signals across hours of video.</p>
            <div style={{display:"flex",flexDirection:"column",gap:14,paddingTop:4,borderTop:"1px solid "+C.borderLight,marginTop:4}}>
              <a href="/casechecker" style={{display:"flex",flexDirection:"column",gap:4,fontSize:13,textDecoration:"none",paddingTop:12}}>
                <span style={{fontWeight:600,color:"#7A2E3B",letterSpacing:"0.02em"}}>CaseChecker →</span>
                <span style={{fontSize:12,color:C.textSec,fontWeight:400,lineHeight:1.5}}>Surfaces contradictions between what's said and what's in the record.</span>
              </a>
              <a href="/truthorlie" style={{display:"flex",flexDirection:"column",gap:4,fontSize:13,textDecoration:"none"}}>
                <span style={{fontWeight:600,color:"#3D5A7A",letterSpacing:"0.02em"}}>TruthOrLie →</span>
                <span style={{fontSize:12,color:C.textSec,fontWeight:400,lineHeight:1.5}}>Detects behavioral credibility signals across video testimony.</span>
              </a>
            </div>
          </div>
          {/* CONNECTOR 2 */}
          <div style={{width:72,height:1,background:C.border,marginTop:22}}/>
          {/* STEP 3 */}
          <div style={{padding:"0 28px"}}>
            <p style={{fontFamily:"'DM Mono', monospace",fontSize:11,color:C.textMuted,letterSpacing:"0.14em",fontWeight:500,margin:"0 0 20px"}}>STEP 03</p>
            <h3 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:26,fontWeight:400,color:C.text,margin:"0 0 14px",letterSpacing:"-0.3px",lineHeight:1.2}}>Actionable intelligence, not raw data</h3>
            <p style={{fontSize:15,color:C.textSec,lineHeight:1.65,margin:0}}>Prioritized findings, each with a citation back to the source page, segment, or timestamp — ready to fold into case strategy.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ===== 4. BUILT FOR LEGAL WORKFLOWS ===== */}
    <section style={{background:C.bgSub,padding:"112px 40px",borderTop:"1px solid "+C.border,borderBottom:"1px solid "+C.border}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>Built for legal workflows</p>
        <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:44,fontWeight:400,color:C.text,textAlign:"center",letterSpacing:"-0.6px",marginBottom:56}}>Practice-area intelligence, out of the box.</h2>

        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:56,flexWrap:"wrap"}}>
          {solCases.map(function(cs,i){
            return <button key={cs.tab} onClick={function(){setSolTab(i);}} style={{padding:"10px 22px",borderRadius:8,border:"1.5px solid "+(solTab===i?C.brand:C.border),fontSize:14,fontWeight:600,background:solTab===i?C.brand:C.bg,color:solTab===i?"#fff":C.textSec,cursor:"pointer"}}>{cs.tab}</button>;
          })}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1.35fr",gap:56,alignItems:"flex-start"}}>
          <div>
            <h3 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:32,fontWeight:400,color:C.text,letterSpacing:"-0.3px",margin:"0 0 18px",lineHeight:1.18}}>{sc.headline}</h3>
            <p style={{fontSize:16,color:C.textSec,lineHeight:1.7,margin:0,maxWidth:420}}>{sc.desc}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {sc.useCases.map(function(uc,ui){
              return <div key={ui} style={{background:C.bg,borderRadius:14,border:"1px solid "+C.border,padding:"26px 24px"}}>
                <div style={{width:40,height:40,borderRadius:10,background:C.bgSub,border:"1px solid "+C.borderLight,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{uc.icon}</div>
                <h4 style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 8px",letterSpacing:"-0.1px"}}>{uc.title}</h4>
                <p style={{fontSize:14,color:C.textSec,lineHeight:1.55,margin:0}}>{uc.desc}</p>
              </div>;
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ===== 5. INTEGRATION ECOSYSTEM ===== */}
    <section style={{padding:"88px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>Expanding ecosystem</p>
          <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:36,fontWeight:400,color:C.text,letterSpacing:"-0.4px",margin:"0 0 14px"}}>Planned integrations.</h2>
          <p style={{fontSize:15,color:C.textSec,maxWidth:540,margin:"0 auto",lineHeight:1.6}}>Integrations with the tools legal teams already use — coming soon.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:16,marginBottom:36}}>
          {integrations.map(function(ig){
            return <div key={ig.cat} style={{background:C.bg,border:"1px solid "+C.border,borderRadius:12,padding:"24px 22px"}}>
              <p style={{fontFamily:"'DM Mono', monospace",fontSize:10,fontWeight:500,color:C.textMuted,letterSpacing:"0.14em",textTransform:"uppercase",margin:"0 0 16px"}}>{ig.cat}</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {ig.tools.map(function(t){return <span key={t} style={{fontSize:14,color:C.text,fontWeight:500}}>{t}</span>;})}
              </div>
            </div>;
          })}
        </div>
        <p style={{textAlign:"center",fontSize:14,color:C.textMuted,marginTop:28}}>This list is always growing.</p>
      </div>
    </section>

    {/* ===== 6. SECURITY & COMPLIANCE ===== */}
    <section style={{background:C.bgSub,padding:"112px 40px",borderTop:"1px solid "+C.border,borderBottom:"1px solid "+C.border}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>Security &amp; compliance</p>
          <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:44,fontWeight:400,color:C.text,letterSpacing:"-0.6px",margin:"0 0 14px"}}>Security is a feature of how Verlo is built.</h2>
          <p style={{fontSize:16,color:C.textSec,maxWidth:560,margin:"0 auto",lineHeight:1.6}}>Legal teams entrust us with privileged materials. The architecture is designed for that — not patched for it.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:20}}>
          {security.map(function(s){
            return <div key={s.title} style={{background:C.bg,borderRadius:14,border:"1px solid "+C.border,padding:30}}>
              <div style={{width:52,height:52,borderRadius:12,background:"#ecfdf5",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>{s.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:C.text,margin:"0 0 8px",letterSpacing:"-0.1px"}}>{s.title}</h3>
              <p style={{fontSize:14,color:C.textSec,lineHeight:1.6,margin:0}}>{s.desc}</p>
            </div>;
          })}
        </div>
        <div style={{textAlign:"center",marginTop:40}}>
          <a href="/security" style={{fontSize:14,color:C.text,fontWeight:600,textDecoration:"none",borderBottom:"1px solid "+C.border,paddingBottom:2}}>Read our full security posture →</a>
        </div>
      </div>
    </section>

    {/* ===== 7. PRICING ===== */}
    <section id="pricing" style={{padding:"112px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <p style={{fontSize:13,fontWeight:600,color:C.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>Pricing</p>
        <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:44,fontWeight:400,color:C.text,textAlign:"center",letterSpacing:"-0.6px",marginBottom:56}}>Platform access built to scale with your practice.</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:20,maxWidth:1020,margin:"0 auto"}}>
          {[
            {name:"Individual",price:"$25",unit:"/hr",hl:false,desc:"Pay-as-you-go — first 2 hours free",btn:"Get Started",features:["Pay-as-you-go","Export to PDF","Priority support"]},
            {name:"Team",price:"Contact",unit:"",hl:true,desc:"For firms and practice groups",btn:"Contact Sales",features:["Multi-seat workspace","Shared case libraries","Workflow collaboration","Centralized billing"]},
            {name:"Enterprise",price:"Custom",unit:"",hl:false,desc:"For large firms, insurers, and agencies",btn:"Contact Sales",features:["Volume pricing","SSO & SCIM","Granular access controls","Dedicated success manager"]},
          ].map(function(p){
            return <div key={p.name} style={{borderRadius:16,padding:32,border:(p.hl?"2px solid "+C.accent:"1px solid "+C.border),position:"relative",background:C.bg}}>
              {p.hl&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 14px",borderRadius:20,letterSpacing:"0.04em"}}>Most Popular</div>}
              <h3 style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:4}}>{p.name}</h3>
              <p style={{fontSize:13,color:C.textMuted,marginBottom:20}}>{p.desc}</p>
              <div style={{marginBottom:24}}>
                <span style={{fontSize:36,fontWeight:800,color:C.text}}>{p.price}</span>
                <span style={{fontSize:15,color:C.textSec}}>{p.unit}</span>
              </div>
              <button style={{width:"100%",padding:"12px 0",borderRadius:10,border:"none",background:p.hl?C.accent:C.bgSub,color:p.hl?"#fff":C.text,fontSize:14,fontWeight:600,marginBottom:24,cursor:"pointer"}}>{p.btn}</button>
              {p.features.map(function(f){
                return <div key={f} style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#ecfdf5"/><path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{fontSize:13,color:C.textSec}}>{f}</span>
                </div>;
              })}
            </div>;
          })}
        </div>
      </div>
    </section>

    {/* ===== 8. DARK CTA ===== */}
    <section style={{background:C.bgDark,padding:"112px 40px",textAlign:"center"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Instrument Serif', Georgia, serif",fontSize:48,fontWeight:400,color:"#fff",letterSpacing:"-0.6px",margin:"0 0 20px",lineHeight:1.15}}>See what's hiding in your case files.</h2>
        <p style={{fontSize:17,color:"#94a3b8",margin:"0 auto 40px",lineHeight:1.6,maxWidth:520}}>A 30-minute walkthrough on your own case materials. No commitment.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <button style={{background:C.accent,color:"#fff",border:"none",borderRadius:10,padding:"16px 40px",fontSize:16,fontWeight:600,cursor:"pointer"}}>Schedule a Demo</button>
        </div>
      </div>
    </section>

    {/* ===== FOOTER ===== */}
    <footer style={{borderTop:"1px solid "+C.border,padding:"32px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <VerloWordmark fontSize={15}/>
          <span style={{fontSize:12,color:C.textMuted}}>2022-2025 CourtScribes, Inc.</span>
        </div>
        <div style={{display:"flex",gap:24}}>
          {["Privacy","Terms","Cookie Policy"].map(function(l){return <a key={l} href="#" style={{fontSize:13,color:C.textMuted,textDecoration:"none"}}>{l}</a>;})}
        </div>
      </div>
    </footer>

  </div>;
}
