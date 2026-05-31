"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Database, FileText, Blocks, LayoutDashboard, BrainCircuit, Network, Users, Zap, Webhook, Settings2, FileSpreadsheet, GitBranch, Bot, Mail, FilePlus, GitMerge, Code2, Clock, Globe, Bell, CheckCircle, User, Server, AppWindow, Shield, Lock, Eye, Activity, Target, BarChart2, ChevronDown, MessageSquare, Braces } from "lucide-react";
import { FaGoogleDrive, FaSlack, FaGithub, FaSyncAlt } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { SiSalesforce, SiZapier, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiGraphql, SiPostgresql, SiMongodb, SiRedis, SiSupabase, SiStripe } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";
import { BsMicrosoftTeams, BsDiagram3 } from "react-icons/bs";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { LiaToolsSolid } from "react-icons/lia";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

interface ServiceGraphicProps {
  id: string;
}

// used for Case "03" (Full-Stack Web Apps)
interface TechColumnProps {
  title: string;
  themeColor: 'accent' | 'emerald' | 'purple';
  technologies: { label: string; color: string; icon: React.ElementType }[];
  features: string[];
}
// used for Case "03" (Full-Stack Web Apps)
const TechColumn: React.FC<TechColumnProps> = ({ title, themeColor, technologies, features }) => {
  const themes = {
    accent: {
      text: "text-accent",
      bg: "bg-accent",
      shadow: "shadow-[0_0_8px_var(--accent)]",
      featureBorder: "border-accent/50",
      featureBg: "bg-accent/20"
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-400",
      shadow: "shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      featureBorder: "border-emerald-400/50",
      featureBg: "bg-emerald-400/20"
    },
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-400",
      shadow: "shadow-[0_0_8px_rgba(167,139,250,0.8)]",
      featureBorder: "border-purple-400/50",
      featureBg: "bg-purple-400/20"
    }
  };
  const theme = themes[themeColor];

  return (
    <div className="flex-1 flex flex-col gap-2 min-w-0">
      <div className="flex items-center gap-1.5 px-1">
        <div className={`w-2 h-2 rounded-full ${theme.bg} ${theme.shadow}`} />
        <span className={`text-[9px] md:text-[11px] ${theme.text} font-bold uppercase tracking-widest`}>{title}</span>
      </div>
      <div className="flex-1 rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-3 md:p-4 flex flex-col gap-3 relative group overflow-hidden">
        <div className="flex justify-center gap-1.5 md:gap-2 w-full">
          {technologies.map((tech) => (
            <div key={tech.label} className="flex items-center justify-center flex-1 aspect-square max-w-[48px] rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-colors group" title={tech.label}>
              <tech.icon className="w-5 h-5 md:w-7 md:h-7 opacity-90" style={{ color: tech.color }} />
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2 md:my-3" />
        <div className="flex flex-col gap-1.5">
          {features.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full border ${theme.featureBorder} ${theme.featureBg}`} />
              <span className="text-[8px] md:text-[10px] text-white/60 font-medium tracking-wide">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServiceGraphic: React.FC<ServiceGraphicProps> = ({ id }) => {
  // Common background grid
  const bgGrid = (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.15]"
      style={{
        backgroundImage: "radial-gradient(circle at center, var(--accent) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // We can leave useEffect empty or use it just for the center hub pulse
  useEffect(() => {
    if (id !== "01" || !containerRef.current) return;

    const ctx = gsap.context((self) => {
      const pulseRing = self.selector?.('.ai-pulse-ring')[0] as HTMLDivElement;
      if (pulseRing) {
        gsap.to(pulseRing, {
          scale: 1.05,
          borderColor: 'rgba(0, 217, 217, 0.2)',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  const renderGraphic = () => {
    switch (id) {
      case "01": // AI Integrations
        const nodes = [
          { id: "slack", label: "Slack", icon: FaSlack, x: 400, y: 70, color: "#4A154B" },
          { id: "openai", label: "OpenAI", icon: AiOutlineOpenAI, x: 650, y: 120, color: "#FFFFFF" },
          { id: "teams", label: "Microsoft Teams", icon: BsMicrosoftTeams, x: 720, y: 250, color: "#6264A7" },
          { id: "zapier", label: "Zapier", icon: SiZapier, x: 650, y: 380, color: "#FF4A00" },
          { id: "db", label: "Your Database", icon: Database, x: 400, y: 430, color: "#3b82f6" },
          { id: "notion", label: "Notion", icon: RiNotionFill, x: 150, y: 380, color: "#FFFFFF" },
          { id: "drive", label: "Google Drive", icon: FaGoogleDrive, x: 80, y: 250, color: "#4285F4" },
          { id: "salesforce", label: "Salesforce", icon: SiSalesforce, x: 150, y: 120, color: "#00A1E0" },
        ];

        // Curved path from center (400,250) to each node
        const getPath = (n: typeof nodes[0]) => {
          const cx = 400, cy = 250;
          // Straight lines for nodes on same axis as center
          if (n.x === cx) return `M ${cx} ${cy} L ${n.x} ${n.y}`;
          if (n.y === cy) return `M ${cx} ${cy} L ${n.x} ${n.y}`;
          // Cubic bezier for diagonal connections — creates smooth S-curves
          const mx = (cx + n.x) / 2;
          return `M ${cx} ${cy} C ${mx} ${cy}, ${mx} ${n.y}, ${n.x} ${n.y}`;
        };

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {bgGrid}

            <style>{`
              @keyframes reactFlowDash {
                from { stroke-dashoffset: 12; }
                to { stroke-dashoffset: 0; }
              }
              .ai-animated-path {
                stroke-dasharray: 6 6;
                stroke-linecap: round;
                animation: reactFlowDash 1s linear infinite;
              }
            `}</style>

            <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {nodes.map((n) => {
                const pathStr = getPath(n);

                return (
                  <g key={`path-${n.id}`}>
                    {/* Background faint path (optional) */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="var(--foreground)"
                      strokeWidth="1.5"
                      strokeOpacity="0.05"
                    />

                    {/* Animated Dashes */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                      className="ai-animated-path"
                    />

                    {/* Connector dot at node end */}
                    <circle cx={n.x} cy={n.y} r="3" fill="#fff" stroke="var(--accent)" strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>

            {/* Integration nodes */}
            {nodes.map(n => (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${(n.x / 800) * 100}%`, top: `${(n.y / 500) * 100}%` }}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center relative">
                  <n.icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: n.color || 'var(--accent)' }} />

                  {/* Label positioned absolutely below so it doesn't affect the centering of the icon box */}
                  <span className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-[9px] md:text-[11px] text-white/50 font-medium tracking-wide whitespace-nowrap">
                    {n.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Center AI Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border border-accent/10 bg-background flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,217,217,0.05)] z-30">
              {/* Ambient glow */}
              <div className="ai-hub-glow absolute inset-[-20px] md:inset-[-28px] rounded-full bg-accent/[0.03] blur-[20px] pointer-events-none" />

              <BrainCircuit className="w-8 h-8 md:w-12 md:h-12 text-accent/80 mb-1" />
              <span className="text-base md:text-xl font-bold text-white/90 tracking-wider">AI</span>

              {/* Gentle ambient pulse */}
              <div className="ai-pulse-ring absolute inset-[-10px] md:inset-[-12px] rounded-full border border-accent/[0.06]" />
            </div>
          </div>
        );

      case "02": { // n8n Workflow System
        const wfNodes = [
          // Column 1: Setup (Shifted Down to Utilize Space)
          { id: "trigger", label: "Webhook", sub: "POST", color: "#a78bfa", Icon: Webhook, x: 150, y: 420, status: "success" },
          { id: "set", label: "Set", sub: "Extract Fields", color: "#38bdf8", Icon: Settings2, x: 150, y: 250, status: "success" },
          { id: "sheets", label: "Sheets", sub: "Lookup Lead", color: "#34d399", Icon: FileSpreadsheet, x: 150, y: 90, status: "success" },

          // Column 3: Central Decision & Merge
          { id: "if", label: "IF", sub: "Exists?", color: "#facc15", Icon: GitBranch, x: 600, y: 70, status: "success" },
          { id: "merge", label: "Merge", sub: "Combine", color: "#38bdf8", Icon: GitMerge, x: 600, y: 420, status: "waiting" },
          { id: "respond", label: "Respond", sub: "200 OK", color: "#34d399", Icon: CheckCircle, x: 600, y: 520, status: "waiting" },

          // Column 2: False Branch (Left)
          { id: "create", label: "Create", sub: "New Lead", color: "#34d399", Icon: FilePlus, x: 450, y: 200, status: "processing" },
          { id: "airtable", label: "Airtable", sub: "Save Record", color: "#facc15", Icon: Database, x: 450, y: 310, status: "waiting" },

          // Column 4: True Branch (Right)
          { id: "openai", label: "OpenAI", sub: "Generate Intel", color: "#FFFFFF", Icon: AiOutlineOpenAI, x: 750, y: 200, status: "processing" },
          { id: "gmail", label: "Gmail", sub: "Send Email", color: "#ef4444", Icon: Mail, x: 750, y: 310, status: "waiting" },
        ];

        const edges = [
          { source: "trigger", target: "set", status: "success" },
          { source: "set", target: "sheets", status: "success" },
          { source: "sheets", target: "if", status: "success" },

          { source: "if", target: "openai", label: "TRUE ROUTE", labelColor: "#34d399", status: "processing", flowColor: "#34d399" },
          { source: "openai", target: "gmail", status: "waiting", flowColor: "#34d399" },
          { source: "gmail", target: "merge", status: "waiting", flowColor: "#34d399" },

          { source: "if", target: "create", label: "FALSE ROUTE", labelColor: "#ef4444", status: "processing", flowColor: "#ef4444" },
          { source: "create", target: "airtable", status: "waiting", flowColor: "#ef4444" },
          { source: "airtable", target: "merge", status: "waiting", flowColor: "#ef4444" },

          { source: "merge", target: "respond", status: "waiting", flowColor: "var(--accent)" },
        ];

        const getBezier = (x1: number, y1: number, x2: number, y2: number) => {
          if (x1 === 150 && x2 === 600) {
            // Sweeping arch over the top of the workflow
            return `M ${x1} ${y1} C ${x1 + 200} ${y1 - 40}, ${x2 - 200} ${y2 - 40}, ${x2} ${y2}`;
          }
          if (x1 === x2 || y1 === y2) {
            return `M ${x1} ${y1} L ${x2} ${y2}`;
          }
          const mx = (x1 + x2) / 2;
          return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
        };

        return (
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {bgGrid}

            <style>{`
              @keyframes wfSignal {
                0% { offset-distance: 0%; opacity: 0; transform: scale(1); }
                10% { opacity: 1; transform: scale(1.5); }
                90% { opacity: 1; transform: scale(1.5); }
                100% { offset-distance: 100%; opacity: 0; transform: scale(1); }
              }
              .wf-signal-dot {
                offset-rotate: auto;
                animation: wfSignal 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
              .wf-signal-dot-delay {
                animation-delay: 1s;
              }
              @keyframes wfDashFlow {
                to { stroke-dashoffset: -28; }
              }
              .wf-animated-dash {
                animation: wfDashFlow 1.5s linear infinite;
              }
            `}</style>

            {/* Container mapping */}
            <div className="relative w-full h-full min-h-[500px]">
              {/* Fluid SVG Canvas overlaying the container exactly like Case 1 */}
              <svg viewBox="0 0 900 650" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">

                {/* Draw Edges */}
                {edges.map((e, i) => {
                  const src = wfNodes.find(n => n.id === e.source);
                  const tgt = wfNodes.find(n => n.id === e.target);
                  if (!src || !tgt) return null;

                  const pathData = getBezier(src.x, src.y, tgt.x, tgt.y);
                  const isProcessing = e.status === "processing";
                  const isSuccess = e.status === "success";
                  const baseColor = e.flowColor || "var(--accent)";

                  return (
                    <g key={`edge-${i}`}>
                      {/* Unified Dashed Flow Line Matching Case 1 */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth="3"
                        strokeOpacity={isSuccess ? "0.6" : "0.2"}
                        strokeDasharray="6 8"
                        strokeLinecap="round"
                        className="wf-animated-dash"
                      />

                      {/* Traveling Signal Dots for Active Processing */}
                      {isProcessing && (
                        <>
                          <path id={`path-${i}`} d={pathData} fill="none" stroke="transparent" />
                          <circle r="5" fill="#fff" className="wf-signal-dot" style={{ offsetPath: `path('${pathData}')` } as React.CSSProperties} />
                          <circle r="5" fill="#fff" className="wf-signal-dot wf-signal-dot-delay" style={{ offsetPath: `path('${pathData}')` } as React.CSSProperties} />
                        </>
                      )}

                      {e.label && (
                        <g transform={`translate(${(src.x + tgt.x) / 2}, ${(src.y + tgt.y) / 2})`}>
                          <text x="0" y="4" fill={e.labelColor} fontSize="10" letterSpacing="1" fontWeight="800" fontFamily="monospace" textAnchor="middle">{e.label}</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Absolute DOM Nodes mapped to percentages exactly like Case 1 */}
              {wfNodes.map((n) => {
                const isTrigger = n.id === "trigger";

                return (
                  <div
                    key={n.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${(n.x / 900) * 100}%`, top: `${(n.y / 650) * 100}%` }}
                  >
                    <div className="flex items-center w-[120px] md:w-[160px] h-[46px] md:h-[58px] rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group">

                      {isTrigger && (
                        <div className="absolute -top-2 left-2 px-1.5 py-0.5 bg-accent/20 border border-accent/30 rounded-full text-[7px] font-bold text-accent tracking-wider">
                          TRIGGER
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 md:gap-2 w-full px-2 md:px-3 z-10">
                        <div className="flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-[8px] flex items-center justify-center bg-white/5 border border-white/10" style={{ color: n.color }}>
                          <n.Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: n.color }} />
                        </div>

                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-[11px] md:text-[13px] font-bold text-white/90 truncate tracking-wide">{n.label}</span>
                          <span className="text-[9px] md:text-[10px] text-white/40 truncate font-medium">{n.sub}</span>
                        </div>

                        <div className="flex-shrink-0">
                          {n.status === 'success' && <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#34d399]" />}
                          {n.status === 'processing' && <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#38bdf8]" />}
                          {n.status === 'waiting' && <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/10" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case "03": // Full-Stack Web Apps
        return (
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {bgGrid}

            <style>{`
              @keyframes fsDashFlow {
                from { stroke-dashoffset: 16; }
                to { stroke-dashoffset: 0; }
              }
              .fs-dash-path {
                stroke-dasharray: 6 6;
                stroke-linecap: round;
                animation: fsDashFlow 1.2s linear infinite;
              }
              @keyframes fsPulseGlow {
                0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px var(--accent)); }
                50% { opacity: 1; filter: drop-shadow(0 0 6px var(--accent)); }
              }
              .fs-glow-pulse {
                animation: fsPulseGlow 3s ease-in-out infinite;
              }
            `}</style>

            {/* Decorative background blurs */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/3 rounded-full blur-[60px] pointer-events-none" />

            {/* ═══ TOP ROW: Architecture Flow ═══ */}
            <div className="relative w-full flex-shrink-0 pt-4 pb-2 md:pt-5 md:pb-1 px-4 z-10">
              <svg viewBox="0 0 800 110" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                {/* Connecting dashed arrows */}
                {[[140, 40, 260, 40], [340, 40, 460, 40], [540, 40, 660, 40]].map(([x1, y1, x2, y2], i) => (
                  <g key={`flow-${i}`}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.15" />
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1.5" className="fs-dash-path" strokeOpacity="0.6" />
                    {/* Arrow head */}
                    <polygon points={`${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`} fill="var(--accent)" fillOpacity="0.8" />
                  </g>
                ))}

                {/* USER node */}
                <g>
                  <rect x="75" y="15" width="50" height="50" rx="12" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" filter="drop-shadow(0px 0px 8px rgba(0, 217, 217, 0.1))" />
                  <g transform="translate(88, 28)">
                    <User width="24" height="24" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.9" />
                  </g>
                  <text x="100" y="85" fill="white" fillOpacity="0.8" fontSize="10" fontFamily="var(--font-inter)" fontWeight="600" textAnchor="middle" letterSpacing="1">USER</text>
                </g>

                {/* BROWSER node */}
                <g>
                  <rect x="275" y="15" width="50" height="50" rx="12" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" filter="drop-shadow(0px 0px 8px rgba(0, 217, 217, 0.1))" />
                  <g transform="translate(288, 28)">
                    <AppWindow width="24" height="24" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.9" />
                  </g>
                  <text x="300" y="85" fill="white" fillOpacity="0.8" fontSize="10" fontFamily="var(--font-inter)" fontWeight="600" textAnchor="middle" letterSpacing="1">BROWSER</text>
                </g>

                {/* INTERNET node */}
                <g>
                  <rect x="475" y="15" width="50" height="50" rx="12" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" filter="drop-shadow(0px 0px 8px rgba(0, 217, 217, 0.1))" />
                  <g transform="translate(488, 28)">
                    <Globe width="24" height="24" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.9" />
                  </g>
                  <text x="500" y="85" fill="white" fillOpacity="0.8" fontSize="10" fontFamily="var(--font-inter)" fontWeight="600" textAnchor="middle" letterSpacing="1">INTERNET</text>
                </g>

                {/* SERVER node */}
                <g>
                  <rect x="675" y="15" width="50" height="50" rx="12" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" filter="drop-shadow(0px 0px 8px rgba(0, 217, 217, 0.1))" />
                  <g transform="translate(688, 28)">
                    <Server width="24" height="24" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.9" />
                  </g>
                  <text x="700" y="85" fill="white" fillOpacity="0.8" fontSize="10" fontFamily="var(--font-inter)" fontWeight="600" textAnchor="middle" letterSpacing="1">SERVER</text>
                </g>
              </svg>
            </div>

            {/* ═══ MIDDLE: Three Column Architecture ═══ */}
            <div className="flex-1 px-3 md:px-4 pb-2 z-10 flex gap-2 md:gap-3 min-h-0">
              <TechColumn
                title="Frontend"
                themeColor="accent"
                technologies={[
                  { label: "React", color: "#61DAFB", icon: SiReact },
                  { label: "Next.js", color: "#ffffff", icon: SiNextdotjs },
                  { label: "TypeScript", color: "#3178C6", icon: SiTypescript },
                  { label: "Tailwind", color: "#06B6D4", icon: SiTailwindcss },
                ]}
                features={["Responsive Design", "SSR / SSG", "State Mgmt", "Component UI"]}
              />

              {/* API Bridge */}
              <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-6 md:w-10">
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-[10px] border border-accent/40 bg-accent/10 shadow-[0_0_10px_var(--accent)] flex items-center justify-center backdrop-blur-sm z-20">
                  <span className="text-[6px] md:text-[8px] text-accent font-bold">API</span>
                </div>
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
              </div>

              <TechColumn
                title="Backend"
                themeColor="emerald"
                technologies={[
                  { label: "Node.js", color: "#68A063", icon: SiNodedotjs },
                  { label: "Express", color: "#ffffff", icon: SiExpress },
                  { label: "TypeScript", color: "#3178C6", icon: SiTypescript },
                  { label: "GraphQL", color: "#E10098", icon: SiGraphql },
                ]}
                features={["REST / GraphQL", "Auth & Security", "Business Logic", "Error Handling"]}
              />

              {/* Arrow bridge to DB */}
              <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-6 md:w-10">
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-purple-400/50 to-transparent" />
                <div className="z-20 text-purple-400/80 drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]">
                  <FaArrowRightArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <div className="flex-1 w-px bg-gradient-to-b from-transparent via-purple-400/50 to-transparent" />
              </div>

              <TechColumn
                title="Database"
                themeColor="purple"
                technologies={[
                  { label: "PostgreSQL", color: "#336791", icon: SiPostgresql },
                  { label: "MongoDB", color: "#47A248", icon: SiMongodb },
                  { label: "Redis", color: "#DC382D", icon: SiRedis },
                  { label: "Supabase", color: "#3FCF8E", icon: SiSupabase },
                ]}
                features={["Data Modeling", "Indexes & Perf", "Backups & DR", "Row Level Sec"]}
              />
            </div>

            {/* ═══ BOTTOM: Key Principles Strip ═══ */}
            <div className="flex-shrink-0 px-3 md:px-4 pb-3 md:pb-4 pt-1 z-10">
              <div className="flex gap-1.5 md:gap-2 overflow-hidden">
                {[
                  { icon: Zap, label: "Fast", sub: "Optimized for speed", color: "text-amber-400" },
                  { icon: Network, label: "Scalable", sub: "Grows with you", color: "text-sky-400" },
                  { icon: CheckCircle, label: "Secure", sub: "Best practices", color: "text-emerald-400" },
                  { icon: Code2, label: "Clean", sub: "Maintainable code", color: "text-purple-400" },
                  { icon: Users, label: "UX First", sub: "User-centric", color: "text-pink-400" },
                ].map((p) => (
                  <div key={p.label} className="flex-1 min-w-0 rounded-xl border border-white/10 bg-background shadow-[0_0_10px_rgba(0,0,0,0.3)] p-1.5 md:p-2 flex flex-col items-center justify-center gap-1 text-center group transition-colors hover:border-white/20">
                    <p.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${p.color}`} />
                    <span className="text-[7px] md:text-[9px] text-white/90 font-bold uppercase tracking-wide leading-tight mt-0.5">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "04": // RAG & Knowledge Systems


        return (
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {bgGrid}

            <style>{`
              @keyframes ragDashFlow {
                from { stroke-dashoffset: 12; }
                to { stroke-dashoffset: 0; }
              }
              .rag-dash-path {
                stroke-dasharray: 4 4;
                stroke-linecap: round;
                animation: ragDashFlow 1s linear infinite;
              }
              @keyframes ragDbPulse {
                0%, 100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.15); }
                50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.3); }
              }
              .rag-db-glow {
                animation: ragDbPulse 3s ease-in-out infinite;
              }
            `}</style>

            {/* ═══ MAIN PIPELINE ═══ */}
            <div className="flex-1 flex items-stretch px-2 md:px-4 pt-2 md:pt-4 pb-2 z-10 min-h-0 relative gap-1 md:gap-2 justify-center">

              {/* ── COL 1 (LEFT): SOURCES & INGESTION ── */}
              <div className="flex flex-col h-full w-[32%] md:w-[34%] z-10">
                {/* Box 1: Sources */}
                <div className="rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-3 md:p-4 flex flex-col relative overflow-hidden h-fit">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-xs md:text-sm text-blue-400 font-bold uppercase tracking-widest drop-shadow-[0_0_2px_rgba(96,165,250,0.5)]">Sources</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 md:gap-2 content-center mt-1 w-full">
                    {[
                      { label: "PDFs", color: "#ef4444", Icon: FileText },
                      { label: "Notion", color: "#ffffff", Icon: RiNotionFill },
                      { label: "GitHub", color: "#8b5cf6", Icon: FaGithub },
                      { label: "Slack", color: "#38bdf8", Icon: FaSlack },
                      { label: "DBs", color: "#22c55e", Icon: Database },
                      { label: "APIs", color: "#f59e0b", Icon: Webhook },
                    ].map((s) => (
                      <div key={s.label} title={s.label} className="flex items-center justify-center py-1.5 md:py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors w-full">
                        <s.Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: s.color }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Arrow */}
                <div className="flex-1 min-h-[16px] relative z-20 text-emerald-400 my-1">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="0" y1="0" x2="0" y2="100%" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="rag-dash-path" />
                    </svg>
                    <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 text-emerald-400">
                      <svg width="8" height="6" viewBox="0 0 8 6"><polygon points="0,0 8,0 4,6" fill="currentColor" /></svg>
                    </div>
                  </div>
                </div>

                {/* Box 2: Ingestion */}
                <div className="rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-3 md:p-4 flex flex-col relative overflow-hidden h-fit">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-xs md:text-sm text-emerald-400 font-bold uppercase tracking-widest drop-shadow-[0_0_2px_rgba(52,211,153,0.5)]">Ingestion</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:gap-y-3 flex-1 content-center px-1">
                    {[
                      { label: "Connectors" },
                      { label: "Processing" },
                      { label: "Chunking" },
                      { label: "Embeddings" },
                    ].map((step) => (
                      <div key={step.label} className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="text-[10px] md:text-xs text-white/90 font-semibold truncate">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer to push Ingestion up slightly */}
                <div className="h-2 flex-shrink-0" />
              </div>

              <div className="w-4 md:w-8 relative z-20 flex-shrink-0 text-purple-400">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <path d="M 0 85 C 50 85, 50 50, 100 50" vectorEffect="non-scaling-stroke" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="rag-dash-path" />
                </svg>
                <div className="absolute right-[-4px] top-[50%] -translate-y-1/2">
                  <svg width="6" height="8" viewBox="0 0 6 8"><polygon points="0,0 6,4 0,8" fill="currentColor" /></svg>
                </div>
              </div>

              {/* ── COL 2 (CENTER): VECTOR DATABASE ── */}
              <div className="flex flex-col flex-1 z-20 mx-1 md:mx-2 min-w-0 items-center justify-center relative py-4">
                <div className="flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1 rounded-full border border-purple-400/20 bg-purple-400/10 z-10 mb-3 md:mb-4 whitespace-nowrap">
                  <span className="text-[10px] md:text-xs text-purple-400 font-bold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]">Vector DB</span>
                </div>

                {/* Cylinder SVG (Scaled Up) */}
                <svg viewBox="0 0 60 50" className="w-24 h-20 md:w-36 md:h-32 flex-shrink-0 drop-shadow-[0_0_20px_rgba(167,139,250,0.6)] relative z-10">
                  <ellipse cx="30" cy="12" rx="22" ry="8" fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.9" />
                  <line x1="8" y1="12" x2="8" y2="38" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.9" />
                  <line x1="52" y1="12" x2="52" y2="38" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.9" />
                  <ellipse cx="30" cy="38" rx="22" ry="8" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.9" />

                  {/* Inner lines */}
                  <ellipse cx="30" cy="22" rx="16" ry="4" fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.5" />
                  <ellipse cx="30" cy="30" rx="16" ry="4" fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.5" />

                  {/* Pulsing Dot */}
                  <circle cx="30" cy="25" r="3.5" fill="#d8b4fe" fillOpacity="0.9" filter="drop-shadow(0 0 8px #d8b4fe)">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <span className="text-[10px] md:text-xs text-purple-300/80 font-bold tracking-widest uppercase mt-4 md:mt-6 z-10 whitespace-nowrap text-center">Store & Index</span>
              </div>

              <div className="w-4 md:w-8 relative z-20 flex-shrink-0 text-accent">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <path d="M 0 50 C 50 50, 50 15, 100 15" vectorEffect="non-scaling-stroke" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="rag-dash-path" />
                </svg>
                <div className="absolute right-[-4px] top-[15%] -translate-y-1/2">
                  <svg width="6" height="8" viewBox="0 0 6 8"><polygon points="0,0 6,4 0,8" fill="currentColor" /></svg>
                </div>
              </div>

              {/* ── COL 3 (RIGHT): RETRIEVAL & GENERATION ── */}
              <div className="flex flex-col h-full w-[32%] md:w-[34%] z-10">
                {/* Box 1: Retrieval */}
                <div className="rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-3 md:p-4 flex flex-col relative overflow-hidden h-fit">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-xs md:text-sm text-accent font-bold uppercase tracking-widest drop-shadow-[0_0_2px_rgba(0,217,217,0.5)]">Retrieval</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:gap-y-3 flex-1 content-center px-1">
                    {[
                      { label: "User Query" },
                      { label: "Embed Query" },
                      { label: "Similarity" },
                      { label: "Top-K" },
                    ].map((step) => (
                      <div key={step.label} className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <div className="w-1 h-1 rounded-full bg-accent/80" />
                        </div>
                        <span className="text-[10px] md:text-xs text-white/90 font-semibold truncate">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Arrow */}
                <div className="flex-1 min-h-[16px] relative z-20 text-amber-400 my-1">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="0" y1="0" x2="0" y2="100%" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="rag-dash-path" />
                    </svg>
                    <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 text-amber-400">
                      <svg width="8" height="6" viewBox="0 0 8 6"><polygon points="0,0 8,0 4,6" fill="currentColor" /></svg>
                    </div>
                  </div>
                </div>

                {/* Box 2: Generation */}
                <div className="rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-3 md:p-4 flex flex-col relative overflow-hidden h-fit">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-xs md:text-sm text-amber-400 font-bold uppercase tracking-widest drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]">Generation</span>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-2.5 flex-1 justify-center px-1">
                    {[
                      { label: "Context Inject" },
                      { label: "LLM Synthesize" },
                      { label: "Final Output" },
                    ].map((step) => (
                      <div key={step.label} className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm border border-amber-400/30 bg-amber-400/10 flex items-center justify-center flex-shrink-0 z-10">
                          <div className="w-1 h-1 rounded-full bg-amber-400/80" />
                        </div>
                        <span className="text-[10px] md:text-xs text-white/90 font-semibold truncate">{step.label}</span>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer to push Generation up slightly */}
                <div className="h-2 flex-shrink-0" />
              </div>
            </div>

            {/* ═══ FOUNDATION: GOVERNANCE & OBSERVABILITY ═══ */}
            <div className="mx-2 md:mx-3 mb-1 md:mb-2 flex flex-row gap-2 md:gap-4 z-10 relative flex-shrink-0">

              {/* Box 1: Governance & Security */}
              <div className="flex-1 rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 md:p-3 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
                <div className="flex items-center gap-2 mb-2 md:mb-4 z-10">
                  <div className="flex-1 h-px bg-purple-500/20" />
                  <span className="text-[8px] md:text-[10px] text-purple-300/80 font-bold uppercase tracking-widest text-center whitespace-nowrap">Governance & Security</span>
                  <div className="flex-1 h-px bg-purple-500/20" />
                </div>
                <div className="grid grid-cols-4 gap-1 w-full flex-1 items-center z-10">
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-400" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Access Control</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-purple-400" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Data Privacy</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Eye className="w-5 h-5 md:w-6 md:h-6 text-purple-400" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">PII Detection</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-400" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Audit Logs</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Observability */}
              <div className="flex-1 rounded-xl border border-white/10 bg-background shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 md:p-3 flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <div className="flex items-center gap-2 mb-2 md:mb-4 z-10">
                  <div className="flex-1 h-px bg-accent/20" />
                  <span className="text-[8px] md:text-[10px] text-accent/80 font-bold uppercase tracking-widest text-center whitespace-nowrap">Observability</span>
                  <div className="flex-1 h-px bg-accent/20" />
                </div>
                <div className="grid grid-cols-4 gap-1 w-full flex-1 items-center z-10">
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Pipeline Monitoring</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Quality Evaluation</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <BarChart2 className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Usage Analytics</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                    <Bell className="w-5 h-5 md:w-6 md:h-6 text-accent" strokeWidth={1.5} />
                    <span className="text-[7px] md:text-[8px] text-white/90 text-center leading-tight">Alerting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "05": // Client Portals & Dashboards
        return (
          <div className="relative w-full h-full flex flex-col overflow-hidden">
            {bgGrid}

            <style>{`
              @keyframes dashPulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }
              .kpi-pulse {
                animation: dashPulse 4s ease-in-out infinite;
              }
              @keyframes slideRight {
                from { stroke-dashoffset: 100; }
                to { stroke-dashoffset: 0; }
              }
              .chart-line-anim {
                stroke-dasharray: 100;
                animation: slideRight 3s linear infinite;
              }
              @keyframes softPulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
              }
              .data-point-pulse {
                animation: softPulse 2s ease-in-out infinite;
              }
              @keyframes chartGradientFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .chart-gradient-flow {
                background-size: 200% 200%;
                animation: chartGradientFlow 8s ease infinite;
              }
            `}</style>

            {/* ═══ PLATFORM APP WINDOW ═══ */}
            <div className="flex-1 px-2 md:px-4 pt-3 md:pt-4 pb-2 z-10 flex flex-col min-h-0">
              <div className="flex-1 rounded-xl border border-white/10 bg-background/60 flex flex-col overflow-hidden relative">

                {/* Top App Bar */}
                <div className="h-8 md:h-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between px-3 md:px-4 flex-shrink-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-md border border-accent/10 flex items-center justify-center">
                      <Blocks className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                    </div>
                    <span className="text-[10px] md:text-xs text-white/90 font-bold tracking-wide"> Platform</span>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-white/5 bg-white/[0.03] w-32 md:w-56 pointer-events-none select-none">
                      <Search className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/40" />
                      <span className="text-[8px] md:text-[10px] text-white/30 flex-1">Search resources...</span>
                      <div className="flex items-center gap-0.5 opacity-50">
                        <kbd className="text-[7px] bg-white/10 px-1 rounded border border-white/10">⌘</kbd>
                        <kbd className="text-[7px] bg-white/10 px-1 rounded border border-white/10">K</kbd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 border-l border-white/10 pl-2 md:pl-3">
                      <div className="relative">
                        <Bell className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/50" />
                      </div>
                      <Settings2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/50" />
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/10 flex items-center justify-center p-[1px] ml-1 bg-white/[0.02]">
                        <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                          <User className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/70" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex min-h-0 overflow-hidden relative z-10">

                  {/* ── LEFT NAVIGATION ── */}
                  <div className="w-[15%] min-w-[60px] max-w-[100px] border-r border-white/5 bg-transparent flex flex-col p-1.5 gap-0.5 relative z-20">
                    <span className="text-[5px] md:text-[7px] text-white/30 font-semibold uppercase tracking-wider px-2 pt-1 pb-2 hidden md:block">Main Menu</span>
                    {[
                      { label: "Overview", icon: LayoutDashboard, active: true },
                      { label: "Analytics", icon: BarChart2, active: false },
                      { label: "Workflows", icon: GitBranch, active: false },
                      { label: "Integrations", icon: Webhook, active: false },
                      { label: "Customers", icon: Users, active: false },
                      { label: "Settings", icon: Settings2, active: false },
                    ].map((nav) => (
                      <div key={nav.label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md ${nav.active ? 'bg-accent/10 border border-accent/20 relative' : 'border border-transparent'}`}>
                        {nav.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1/2 bg-accent rounded-r-full" />}
                        <nav.icon className={`w-3 h-3 md:w-3.5 md:h-3.5 ${nav.active ? 'text-accent' : 'text-white/40'}`} strokeWidth={nav.active ? 2 : 1.5} />
                        <span className={`text-[6px] md:text-[8px] font-medium hidden md:block truncate ${nav.active ? 'text-accent' : 'text-white/50'}`}>{nav.label}</span>
                      </div>
                    ))}

                  </div>

                  {/* ── MAIN ANALYTICS DASHBOARD ── */}
                  <div className="flex-1 flex flex-col min-w-0 p-3 md:p-5 gap-4 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">

                    {/* Welcome & Controls */}
                    <div className="flex justify-between items-start flex-shrink-0">
                      <div>
                        <h2 className="text-[14px] md:text-base text-white/95 font-bold mb-1 tracking-wide uppercase">Platform Intelligence</h2>

                      </div>
                      <div className="flex gap-1.5 md:gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-white/10 bg-white/5">
                          <Clock className="w-3 h-3 text-white/50" />
                          <span className="text-[8px] md:text-[10px] text-white/70">Last 30 Days</span>
                          <ChevronDown className="w-2.5 h-2.5 text-white/40 ml-0.5" />
                        </div>

                      </div>
                    </div>

                    {/* Integrated Analytics Flow */}
                    <div className="flex flex-col gap-2.5 md:gap-3 flex-shrink-0">

                      {/* KPI Cards (Header for charts) */}
                      <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                        {[
                          { label: "Monthly Recurring", value: "$124.5k", color: "var(--accent)", chart: "M 0 15 C 10 15, 10 10, 20 10 C 30 10, 30 5, 40 5 C 50 5, 50 12, 60 12 C 70 12, 70 2, 80 2 L 80 20 L 0 20 Z", line: "M 0 15 C 10 15, 10 10, 20 10 C 30 10, 30 5, 40 5 C 50 5, 50 12, 60 12 C 70 12, 70 2, 80 2" },
                          { label: "Active Sessions", value: "3,492", color: "#a78bfa", chart: "M 0 20 L 10 12 L 20 16 L 30 8 L 40 14 L 50 6 L 60 10 L 70 2 L 80 5 L 80 20 Z", line: "M 0 20 L 10 12 L 20 16 L 30 8 L 40 14 L 50 6 L 60 10 L 70 2 L 80 5" },
                          { label: "Avg. Latency", value: "124ms", color: "#34d399", chart: "M 0 5 C 15 5, 15 10, 30 10 C 45 10, 45 15, 60 15 C 70 15, 70 18, 80 18 L 80 20 L 0 20 Z", line: "M 0 5 C 15 5, 15 10, 30 10 C 45 10, 45 15, 60 15 C 70 15, 70 18, 80 18" },
                        ].map((kpi) => (
                          <div key={kpi.label} className="rounded-lg border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-2.5 md:p-3 flex flex-col relative overflow-hidden min-w-0">

                            <span className="text-[7px] md:text-[8.5px] text-white/50 uppercase tracking-widest font-semibold truncate mb-1 z-10 relative">{kpi.label}</span>

                            <div className="flex justify-between items-end mb-2.5 z-10 relative">
                              <span className="text-base md:text-xl font-bold text-white/95 leading-none tracking-tight">{kpi.value}</span>
                            </div>

                            {/* Mini Sparkline */}
                            <div className="absolute bottom-0 left-0 w-full h-8 opacity-60">
                              <svg viewBox="0 0 80 20" className="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id={`grad-${kpi.label}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={kpi.color} stopOpacity="0.3" />
                                    <stop offset="100%" stopColor={kpi.color} stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <path d={kpi.chart} fill={`url(#grad-${kpi.label})`} />
                                <path d={kpi.line} fill="none" stroke={kpi.color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.8" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Main Charts Area */}
                      <div className="flex flex-col lg:flex-row gap-2.5 md:gap-3 lg:h-[220px]">
                        {/* Primary Chart: Core Metrics - The Focal Point */}
                        <div className="flex-[3.5] rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-4 md:p-5 flex flex-col relative overflow-hidden min-w-0">
                          {/* Subtle grid background */}
                          <div className="absolute inset-0 z-0 opacity-30">
                            <div className="absolute inset-0 flex flex-col justify-between pt-12 pb-6 px-4">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-white/5" />
                              ))}
                            </div>
                            <div className="absolute inset-0 flex flex-row justify-between pt-0 pb-0 px-4">
                              {[...Array(7)].map((_, i) => (
                                <div key={i} className="h-full w-px bg-white/3" />
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-start mb-4 flex-shrink-0 z-10 relative">
                            <div className="flex flex-col gap-1">
                              <span className="text-[12px] md:text-sm text-white/95 font-bold tracking-tight">System Performance & Traffic</span>
                              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                                  <span className="text-[7px] md:text-[9px] text-white/60 font-medium">Requests/s</span>
                                </div>
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]" />
                                  <span className="text-[7px] md:text-[9px] text-white/60 font-medium">Compute (CPU %)</span>
                                </div>
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                                  <span className="text-[7px] md:text-[9px] text-white/60 font-medium">P95 Latency</span>
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Area Line Chart - Enhanced */}
                          <div className="flex-1 w-full relative z-10 min-h-[90px]">
                            <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                                  <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.1" />
                                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                                </linearGradient>
                                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.25" />
                                  <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.05" />
                                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.0" />
                                </linearGradient>
                                <linearGradient id="chartGrad3" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                                  <stop offset="60%" stopColor="#34d399" stopOpacity="0.05" />
                                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>

                              {/* Series 3 (Latency - Green) */}
                              <path d="M 0 65 C 20 65, 20 58, 40 58 C 60 58, 60 50, 80 50 C 100 50, 100 52, 120 52 C 140 52, 140 48, 160 48 C 180 48, 180 51, 200 51 C 220 51, 220 47, 240 47 C 260 47, 260 49, 280 49 C 290 49, 290 46, 300 46 L 300 80 L 0 80 Z" fill="url(#chartGrad3)" />
                              <path d="M 0 65 C 20 65, 20 58, 40 58 C 60 58, 60 50, 80 50 C 100 50, 100 52, 120 52 C 140 52, 140 48, 160 48 C 180 48, 180 51, 200 51 C 220 51, 220 47, 240 47 C 260 47, 260 49, 280 49 C 290 49, 290 46, 300 46" fill="none" stroke="#34d399" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.6" />

                              {/* Series 2 (CPU - Purple) */}
                              <path d="M 0 58 C 20 58, 20 52, 40 52 C 60 52, 60 42, 80 42 C 100 42, 100 46, 120 46 C 140 46, 140 38, 160 38 C 180 38, 180 42, 200 42 C 220 42, 220 35, 240 35 C 260 35, 260 38, 280 38 C 290 38, 290 32, 300 32 L 300 80 L 0 80 Z" fill="url(#chartGrad2)" />
                              <path d="M 0 58 C 20 58, 20 52, 40 52 C 60 52, 60 42, 80 42 C 100 42, 100 46, 120 46 C 140 46, 140 38, 160 38 C 180 38, 180 42, 200 42 C 220 42, 220 35, 240 35 C 260 35, 260 38, 280 38 C 290 38, 290 32, 300 32" fill="none" stroke="#a78bfa" strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.8" />

                              {/* Series 1 (Requests - Accent - Primary) */}
                              <path d="M 0 72 C 20 72, 20 35, 40 35 C 60 35, 60 40, 80 40 C 100 40, 100 30, 120 30 C 140 30, 140 22, 160 22 C 180 22, 180 26, 200 26 C 220 26, 220 18, 240 18 C 260 18, 260 24, 280 24 C 290 24, 290 12, 300 12 L 300 80 L 0 80 Z" fill="url(#chartGrad1)" />
                              <path d="M 0 72 C 20 72, 20 35, 40 35 C 60 35, 60 40, 80 40 C 100 40, 100 30, 120 30 C 140 30, 140 22, 160 22 C 180 22, 180 26, 200 26 C 220 26, 220 18, 240 18 C 260 18, 260 24, 280 24 C 290 24, 290 12, 300 12" fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.9" />

                              {/* Data Points */}
                              <circle cx="40" cy="35" r="3" fill="#000" stroke="var(--accent)" strokeWidth="1.5" opacity="0.9" />
                              <circle cx="120" cy="30" r="3" fill="#000" stroke="var(--accent)" strokeWidth="1.5" opacity="0.9" />
                              <circle cx="200" cy="26" r="3" fill="#000" stroke="var(--accent)" strokeWidth="1.5" opacity="0.9" />
                              <circle cx="280" cy="24" r="3" fill="#000" stroke="var(--accent)" strokeWidth="1.5" opacity="0.9" />
                              <circle cx="300" cy="12" r="3" fill="#000" stroke="var(--accent)" strokeWidth="1.5" opacity="0.9" />
                            </svg>
                          </div>

                          {/* X-axis labels */}
                          <div className="flex justify-between mt-3 pt-3 border-t border-white/10 flex-shrink-0 z-10">
                            {["12:00 AM", "2:00", "4:00", "6:00", "8:00", "10:00 AM", "12:00 PM"].map((time, i) => (
                              <span key={i} className="text-[7px] md:text-[9px] text-white/50 font-medium">{time}</span>
                            ))}
                          </div>
                        </div>

                        {/* Secondary Chart: Resource Allocation */}
                        <div className="flex-[1] rounded-lg border border-white/8 bg-white/[0.02] p-4 flex flex-col min-w-[140px] relative overflow-hidden">
                          <div className="flex flex-col gap-1 z-10">
                            <span className="text-[10px] md:text-[11px] text-white/90 font-bold">Allocation</span>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[90px] z-10 mt-2">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-sm">
                                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                                {/* Database Segment (45%) */}
                                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" strokeWidth="5" strokeDasharray="42.41 94.25" strokeDashoffset="0" strokeLinecap="round" />
                                {/* Workers Segment (20%) */}
                                <circle cx="18" cy="18" r="15" fill="none" stroke="#a78bfa" strokeWidth="5" strokeDasharray="18.85 94.25" strokeDashoffset="-42.41" strokeLinecap="round" />
                                {/* API Edge Segment (17%) */}
                                <circle cx="18" cy="18" r="15" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="16.02 94.25" strokeDashoffset="-61.26" strokeLinecap="round" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent rounded-full">
                                <span className="text-[16px] md:text-[20px] font-bold text-white tracking-tighter leading-none mt-1">82%</span>
                                <span className="text-[5px] md:text-[6px] font-medium text-white/40 uppercase tracking-widest mt-1">Utilized</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-white/5 z-10">
                            {[
                              { label: "Database", value: "45%", color: "bg-accent" },
                              { label: "Workers", value: "20%", color: "bg-[#a78bfa]" },
                              { label: "API Edge", value: "17%", color: "bg-[#38bdf8]" },
                            ].map((item) => (
                              <div key={item.label} className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                  <span className="text-[7px] md:text-[9px] text-white/60 font-medium">{item.label}</span>
                                </div>
                                <span className="text-[7px] md:text-[9px] text-white/90 font-bold">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Data Table/Activity */}
                    <div className="flex-shrink-0 min-h-[90px] rounded-lg border border-white/5 bg-white/[0.01] p-3 md:p-4 flex flex-col overflow-hidden relative mt-1">
                      <div className="flex justify-between items-center mb-3 z-10">
                        <span className="text-[10px] md:text-[12px] text-white/80 font-bold tracking-tight">Recent Operations</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[6px] md:text-[8px] text-emerald-300 font-semibold uppercase tracking-wider">System Healthy</span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-0 overflow-hidden z-10">
                        {/* Header Row */}
                        <div className="flex items-center px-2 py-1.5 text-[6px] md:text-[7px] text-white/40 uppercase font-semibold tracking-wider gap-2 border-b border-white/5">
                          <span className="w-5 md:w-6">Type</span>
                          <span className="flex-[1.5]">Event / Process</span>
                          <span className="flex-1 hidden sm:block">Source</span>
                          <span className="w-16 md:w-20 text-center">Status</span>
                          <span className="w-10 md:w-12 text-right">Time</span>
                        </div>

                        {/* Activity Rows */}
                        {[
                          { icon: Webhook, event: "Webhook: Stripe Payment Success", source: "Payment", status: "Completed", statusColor: "text-emerald-400", time: "Now" },
                          { icon: Database, event: "Database Auto-scaling Triggered", source: "DevOps", status: "In Progress", statusColor: "text-amber-400", time: "1m" },
                          { icon: User, event: "New Enterprise Workspace Created", source: "admin@", status: "Completed", statusColor: "text-emerald-400", time: "12m" },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center px-2 py-1.5 border-b border-white/4 last:border-0 gap-2 rounded">
                            <div className="w-5 md:w-6 flex-shrink-0">
                              <row.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/40" />
                            </div>
                            <span className="flex-[1.5] text-[7px] md:text-[9px] text-white/70 font-medium truncate">{row.event}</span>
                            <span className="flex-1 hidden sm:block text-[7px] md:text-[8px] text-white/40 truncate">{row.source}</span>
                            <div className="w-16 md:w-20 flex justify-center">
                              <span className={`text-[6px] md:text-[8px] ${row.statusColor} font-medium flex items-center gap-1`}>
                                {row.status === 'In Progress' && <Activity className="w-2 h-2" />}
                                {row.status}
                              </span>
                            </div>
                            <span className="w-10 md:w-12 text-right text-[7px] md:text-[8px] text-white/40 font-mono">{row.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT PLATFORM CAPABILITIES RAIL (Supporting Role) ── */}
                  <div className="w-[15%] min-w-[70px] max-w-[120px] border-l border-white/5 bg-transparent p-2 flex flex-col gap-2.5 relative z-20">

                    <div className="flex items-center gap-1.5 px-1 pt-1 opacity-50">

                      <span className="text-[6px] md:text-[7px] text-white/60 font-semibold uppercase tracking-wider truncate">Modules</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 md:gap-1.5 min-h-0 overflow-y-auto custom-scrollbar opacity-70">
                      {[
                        { label: "Auth", icon: Lock },
                        { label: "Sync", icon: Activity },
                        { label: "Data API", icon: Webhook },
                        { label: "Reports", icon: Target },
                      ].map((feat) => (
                        <div key={feat.label} className="p-1.5 md:p-2 rounded-md border border-white/5 bg-white/[0.01] relative flex items-center gap-1.5">
                          <feat.icon className="w-2.5 h-2.5 text-white/50 flex-shrink-0" strokeWidth={1.5} />
                          <span className="text-[6px] md:text-[8px] font-medium text-white/60 truncate">{feat.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "06": // AI Agents & Workflows
        return (
          <div className="relative w-full h-full flex flex-col px-2 md:px-4 py-8 md:py-4 overflow-hidden">
            {bgGrid}



            <style>{`
              @keyframes c6DashFlow {
                from { stroke-dashoffset: 12; }
                to { stroke-dashoffset: 0; }
              }
              .c6-dash {
                stroke-dasharray: 4 4;
                stroke-linecap: round;
                animation: c6DashFlow 1s linear infinite;
              }
            `}</style>



            {/* Main Layout Area */}
            <div className="flex-1 flex items-stretch gap-1.5 md:gap-2 relative z-10 min-w-0 min-h-0">

              {/* 1. TRIGGERS */}
              <div className="w-[15%] min-w-[70px] max-w-[100px] max-h-[400px] flex flex-col rounded-xl border border-purple-500/40 bg-background/30 p-2 md:p-3 relative flex-shrink-0">
                <span className="text-[7px] md:text-[9px] text-purple-300 font-bold uppercase tracking-widest text-center mb-2 md:mb-3">Triggers</span>
                <div className="flex flex-col gap-1.5 md:gap-2 mt-auto mb-auto overflow-hidden">
                  {[
                    { label: "User Request", icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Schedule", icon: <Clock className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Webhook", icon: <Webhook className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Email", icon: <Mail className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "API / Event", icon: <Code2 className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> }
                  ].map((t) => (
                    <div key={t.label} className="flex flex-col items-center justify-center gap-1 md:gap-1.5 p-1 md:p-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors w-full">
                      {t.icon}
                      <span className="text-[6px] md:text-[8px] text-white/80 font-medium text-center w-full truncate">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow 1: Trigger -> Orch */}
              <div className="w-4 md:w-6 flex flex-col flex-shrink-0">
                <div className="flex-1 flex items-center justify-center">
                  <svg viewBox="0 0 30 10" className="w-full h-2 md:h-3 overflow-visible">
                    <path d="M 0 5 L 25 5" stroke="#3b82f6" strokeWidth="3" fill="none" className="c6-dash" />
                    <polygon points="22,1 30,5 22,9" fill="#3b82f6" />
                  </svg>
                </div>
                <div className="h-6 md:h-8 flex-shrink-0" />
                <div className="h-[20%] md:h-[24%] flex-shrink-0" />
              </div>

              {/* MIDDLE SECTION (Orch, Agent, Tools, Memory) */}
              <div className="flex-1 flex flex-col min-w-0 h-full">

                {/* Top Row */}
                <div className="flex-1 flex items-stretch gap-1.5 md:gap-2 min-w-0 mb-6 md:mb-8">

                  {/* MANAGER COLUMN */}
                  <div className="flex-1 flex flex-col items-center min-w-0">
                    <div className="flex-1 w-full" />
                    <div className="w-full flex flex-col rounded-xl border border-blue-500/40 bg-background/30 p-2 md:p-3 items-center relative z-10 h-[200px] md:h-[160px] flex-shrink-0">
                      <span className="text-[7px] md:text-[9px] text-blue-300 font-bold uppercase tracking-widest text-center mb-auto">manager</span>
                      <BsDiagram3 className="w-8 h-8 md:w-10 md:h-10 text-blue-400 opacity-90 my-auto flex-shrink-0" />
                      <span className="text-[6px] md:text-[8px] text-white/70 text-center mt-auto leading-tight">Plan & Decompose<br />Tasks</span>
                    </div>
                    <div className="flex-1 w-full relative">
                      <div className="absolute top-0 bottom-[-1.5rem] md:bottom-[-2rem] left-1/2 -translate-x-1/2 w-2 md:w-2.5">
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.6" className="c6-dash" />
                        </svg>
                        <svg className="absolute top-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,6 5,0 9,6" fill="#3b82f6" opacity="0.8" /></svg>
                        <svg className="absolute bottom-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,0 9,0 5,6" fill="#3b82f6" opacity="0.8" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Arrow 2: Orch -> Agent */}
                  <div className="w-4 md:w-6 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 30 10" className="w-full h-2 md:h-3 overflow-visible">
                      <path d="M 0 5 L 25 5" stroke="var(--accent)" strokeWidth="3" fill="none" className="c6-dash" />
                      <polygon points="22,1 30,5 22,9" fill="var(--accent)" />
                    </svg>
                  </div>

                  {/* AI AGENT COLUMN */}
                  <div className="flex-[1.5] flex flex-col items-center min-w-0">
                    <div className="flex-1 w-full" />
                    <div className="w-full flex flex-col rounded-xl border border-accent/40 bg-background/30 p-2 md:p-3 items-center relative z-10 h-[200px] md:h-[250px] flex-shrink-0">
                      <Bot className="w-10 h-10 md:w-12 md:h-12 text-accent mt-1 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-[8px] md:text-[10px] text-accent font-bold uppercase tracking-widest text-center mt-2 mb-2 md:mb-3">AI Agent</span>

                      <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full mt-auto">
                        {[
                          { label: "Reason & Decide", icon: <BrainCircuit className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> },
                          { label: "Use Tools", icon: <Settings2 className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> },
                          { label: "Learn & Adapt", icon: <Activity className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> },
                          { label: "Provide Output", icon: <FileText className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" /> }
                        ].map((item) => (
                          <div key={item.label} className="flex flex-col items-center justify-center text-center gap-1 p-1 md:p-1.5 rounded border border-accent/10 bg-accent/[0.02]">
                            {item.icon}
                            <span className="text-[5px] md:text-[7px] text-white/90 font-medium leading-tight">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 w-full relative">
                      <div className="absolute top-0 bottom-[-1.5rem] md:bottom-[-2rem] left-1/2 -translate-x-1/2 w-2 md:w-2.5">
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--accent)" strokeWidth="3" fill="none" opacity="0.6" className="c6-dash" />
                        </svg>
                        <svg className="absolute top-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,6 5,0 9,6" fill="var(--accent)" opacity="0.8" /></svg>
                        <svg className="absolute bottom-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,0 9,0 5,6" fill="var(--accent)" opacity="0.8" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Arrow 3: Agent -> Tools */}
                  <div className="w-4 md:w-6 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 30 10" className="w-full h-2 md:h-3 overflow-visible">
                      <path d="M 0 5 L 25 5" stroke="#a855f7" strokeWidth="3" fill="none" className="c6-dash" />
                      <polygon points="22,1 30,5 22,9" fill="#a855f7" />
                    </svg>
                  </div>

                  {/* EXECUTE & TOOLS COLUMN */}
                  <div className="flex-1 flex flex-col items-center min-w-0">
                    <div className="flex-1 w-full" />
                    <div className="w-full flex flex-col rounded-xl border border-purple-500/40 bg-background/30 p-2 md:p-3 items-center relative z-10 h-[200px] md:h-[160px] flex-shrink-0">
                      <span className="text-[7px] md:text-[9px] text-purple-300 font-bold uppercase tracking-widest text-center mb-auto">Execute & Tools</span>
                      <LiaToolsSolid className="w-8 h-8 md:w-10 md:h-10 text-purple-400 opacity-90 my-auto flex-shrink-0" />
                      <span className="text-[6px] md:text-[8px] text-white/70 text-center mt-auto leading-tight">Use External Tools<br />& Integrations</span>
                    </div>
                    <div className="flex-1 w-full relative">
                      <div className="absolute top-0 bottom-[-1.5rem] md:bottom-[-2rem] left-1/2 -translate-x-1/2 w-2 md:w-2.5">
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#a855f7" strokeWidth="3" fill="none" opacity="0.6" className="c6-dash" />
                        </svg>
                        <svg className="absolute top-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,6 5,0 9,6" fill="#a855f7" opacity="0.8" /></svg>
                        <svg className="absolute bottom-0 left-0 w-full overflow-visible" viewBox="0 0 10 6"><polygon points="1,0 9,0 5,6" fill="#a855f7" opacity="0.8" /></svg>
                      </div>
                    </div>
                  </div>

                </div>

                {/* MEMORY & KNOWLEDGE */}
                <div className="h-[20%] md:h-[24%] rounded-xl border border-accent/40 bg-background/30 p-1.5 md:p-2 flex flex-col relative z-10 flex-shrink-0 overflow-hidden">
                  <span className="text-[6px] md:text-[9px] text-accent font-bold uppercase tracking-widest text-center mb-1 mt-0.5">Memory & Knowledge</span>
                  <div className="flex-1 flex justify-around items-center px-0 md:px-2">

                    <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-2">
                      <Database className="w-5 h-5 md:w-7 md:h-7 text-accent flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col items-center min-w-0">
                        <span className="text-[7px] md:text-[9px] text-white/90 font-bold truncate">Vector Database</span>
                      </div>
                    </div>

                    <div className="w-px h-6 md:h-8 bg-white/10 flex-shrink-0 mx-1 md:mx-2" />

                    <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-2">
                      <MessageSquare className="w-5 h-5 md:w-7 md:h-7 text-accent flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col items-center min-w-0">
                        <span className="text-[7px] md:text-[9px] text-white/90 font-bold truncate">Conversation Memory</span>
                      </div>
                    </div>

                    <div className="w-px h-6 md:h-8 bg-white/10 flex-shrink-0 mx-1 md:mx-2" />

                    <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-2">
                      <User className="w-5 h-5 md:w-7 md:h-7 text-accent flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex flex-col items-center min-w-0">
                        <span className="text-[7px] md:text-[9px] text-white/90 font-bold truncate">User & Preferences</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Arrow 4: Tools -> Outputs */}
              <div className="w-4 md:w-6 flex flex-col flex-shrink-0">
                <div className="flex-1 flex items-center justify-center">
                  <svg viewBox="0 0 30 10" className="w-full h-2 md:h-3 overflow-visible">
                    <path d="M 0 5 L 25 5" stroke="#a855f7" strokeWidth="3" fill="none" className="c6-dash" />
                    <polygon points="22,1 30,5 22,9" fill="#a855f7" />
                  </svg>
                </div>
                <div className="h-6 md:h-8 flex-shrink-0" />
                <div className="h-[20%] md:h-[24%] flex-shrink-0" />
              </div>

              {/* 5. OUTPUTS */}
              <div className="w-[15%] min-w-[70px] max-w-[100px] max-h-[400px] flex flex-col rounded-xl border border-purple-500/40 bg-background/30 p-2 md:p-3 relative flex-shrink-0">
                <span className="text-[7px] md:text-[9px] text-purple-300 font-bold uppercase tracking-widest text-center mb-2 md:mb-3">Outputs</span>
                <div className="flex flex-col gap-1.5 md:gap-2 mt-auto mb-auto overflow-hidden">
                  {[
                    { label: "Response", icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Action Taken", icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Data / Result", icon: <Database className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> },
                    { label: "Notification", icon: <Bell className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0" /> }
                  ].map((o) => (
                    <div key={o.label} className="flex flex-col items-center justify-center gap-1 md:gap-1.5 p-1 md:p-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors w-full">
                      {o.icon}
                      <span className="text-[6px] md:text-[8px] text-white/80 font-medium text-center w-full truncate">{o.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );

      case "07": // API & SaaS Integrations
        return (
          <div className="relative w-full h-full flex flex-col px-2 md:px-4 py-8 md:py-4 overflow-hidden">
            {bgGrid}

            <style>{`
              .integration-block {
                background-color: rgba(10,10,12,0.6);
                backdrop-filter: blur(8px);
                transition: all 0.3s ease;
              }
              .dash-flow {
                stroke-dasharray: 4;
                animation: dash 1s linear infinite;
              }
              .dash-flow-reverse {
                stroke-dasharray: 4;
                animation: dash-reverse 1s linear infinite;
              }
              @keyframes dash {
                to { stroke-dashoffset: -8; }
              }
              @keyframes dash-reverse {
                to { stroke-dashoffset: 8; }
              }
            `}</style>

            {/* Decorative blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none" />

            {/* MAIN SNAKE ARCHITECTURE GRID */}
            <div className="flex-1 w-full max-w-[900px] max-h-[220px] md:max-h-[300px] mx-auto mb-auto z-10 grid grid-cols-[1fr_24px_1fr_24px_1fr] md:grid-cols-[1fr_40px_1fr_40px_1fr] grid-rows-[minmax(0,1fr)_24px_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_40px_minmax(0,1fr)] relative min-h-0">

              {/* 1. APPLICATION (Row 1, Col 1) */}
              <div className="col-start-1 row-start-1 w-full h-full min-h-0 rounded-xl border border-[#a855f7]/40 integration-block flex flex-col items-center p-3 md:p-4 pt-1.5 md:pt-2 justify-between">
                <span className="text-[10px] md:text-xs font-bold text-[#a855f7] tracking-wider uppercase text-center w-full">Application</span>
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative my-auto">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-[#a855f7]" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 8h20" />
                    <circle cx="5" cy="6" r="0.5" fill="currentColor" />
                    <circle cx="7" cy="6" r="0.5" fill="currentColor" />
                    <circle cx="9" cy="6" r="0.5" fill="currentColor" />
                    <rect x="4" y="11" width="6" height="6" rx="1" />
                    <rect x="12" y="11" width="8" height="2" rx="0.5" />
                    <rect x="12" y="15" width="8" height="2" rx="0.5" />
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-1 w-full mt-2">
                  <span className="text-[8px] md:text-[10px] text-white/70 text-center w-full truncate">Web / Mobile App / SaaS Platform</span>
                </div>
              </div>

              {/* Arrow 1 -> 2 (Row 1, Col 2) */}
              <div className="col-start-2 row-start-1 w-full h-full flex items-center justify-center text-[#a855f7]">
                <svg viewBox="0 0 24 24" preserveAspectRatio="none" className="w-full h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L22 12" className="dash-flow" />
                  <path d="M16 6 L22 12 L16 18" />
                </svg>
              </div>

              {/* 2. API LAYER (Row 1, Col 3) */}
              <div className="col-start-3 row-start-1 w-full h-full min-h-0 rounded-xl border border-[#3b82f6]/40 integration-block flex flex-col items-center p-3 md:p-4 pt-1.5 md:pt-2 justify-between">
                <span className="text-[10px] md:text-xs font-bold text-[#3b82f6] tracking-wider uppercase text-center w-full">API Layer</span>
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative my-auto">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.4 9A6 6 0 0 1 18 10.7 4.5 4.5 0 0 1 18.5 19H6.5A5.5 5.5 0 0 1 7.4 9z" />
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" className="text-[6px] font-bold">API</text>
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-1 w-full mt-2">
                  <span className="text-[8px] md:text-[10px] text-white/70 text-center w-full truncate">REST / GraphQL API <br /> Authentication / Rate Limiting</span>
                </div>
              </div>

              {/* Arrow 2 -> 3 (Row 1, Col 4) */}
              <div className="col-start-4 row-start-1 w-full h-full flex items-center justify-center text-[#3b82f6]">
                <svg viewBox="0 0 24 24" preserveAspectRatio="none" className="w-full h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L22 12" className="dash-flow" />
                  <path d="M16 6 L22 12 L16 18" />
                </svg>
              </div>

              {/* 3. INTEGRATION LAYER (Row 1, Col 5) */}
              <div className="col-start-5 row-start-1 w-full h-full min-h-0 rounded-xl border border-[#10b981]/40 integration-block flex flex-col items-center p-3 md:p-4 pt-1.5 md:pt-2 justify-between">
                <span className="text-[10px] md:text-xs font-bold text-[#10b981] tracking-wider uppercase text-center w-full">Integration Layer</span>
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative my-auto">
                  <MdOutlineIntegrationInstructions className="w-full h-full text-[#10b981]" />
                </div>
                <div className="flex flex-col items-center gap-1 w-full mt-2">
                  <span className="text-[8px] md:text-[10px] text-white/70 text-center w-full truncate">Connectors / Mapping</span>
                </div>
              </div>

              {/* Arrow 3 -> 4 (Elbow Down-Left, Row 2 to Row 3, Col 5) */}
              <div className="col-start-5 row-start-2 row-span-2 w-full h-full text-[#10b981] pointer-events-none z-0">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 75 0 L 75 45 Q 75 55 65 55 L 42 55" className="dash-flow" vectorEffect="non-scaling-stroke" />
                  <path d="M 46 51 L 42 55 L 46 59" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* BOTTOM ROW WRAPPER (Centers Data & Response and External Services) */}
              <div className="col-start-1 col-span-5 row-start-3 w-full h-full flex items-center justify-center gap-0">
                
                {/* 5. DATA & RESPONSE (Left side of center) */}
                <div className="w-[calc((100%-48px)/3)] md:w-[calc((100%-80px)/3)] h-full min-h-0 rounded-xl border border-[#a855f7]/40 integration-block flex flex-col items-center p-3 md:p-4 pt-1.5 md:pt-2 justify-between shrink-0">
                  <span className="text-[10px] md:text-xs font-bold text-[#a855f7] tracking-wider uppercase text-center w-full">Data & Response</span>
                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative my-auto">
                    <FaSyncAlt className="w-[80%] h-[80%] text-[#a855f7]" />
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full mt-2">
                    <span className="text-[8px] md:text-[10px] text-white/70 text-center w-full truncate">Sync / Process / Return</span>
                  </div>
                </div>

                {/* Arrow 4 -> 5 (Horizontal Left) */}
                <div className="w-6 md:w-[40px] h-4 flex items-center justify-center text-[#f59e0b] shrink-0">
                  <svg viewBox="0 0 24 24" preserveAspectRatio="none" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 12 L2 12" className="dash-flow-reverse" />
                    <path d="M8 6 L2 12 L8 18" />
                  </svg>
                </div>

                {/* 4. EXTERNAL SERVICES (Right side of center) */}
                <div className="w-[calc((100%-48px)/3)] md:w-[calc((100%-80px)/3)] h-full min-h-0 rounded-xl border border-[#f59e0b]/40 integration-block flex flex-col items-center p-3 md:p-4 pt-1.5 md:pt-2 justify-between shrink-0">
                  <span className="text-[10px] md:text-xs font-bold text-[#f59e0b] tracking-wider uppercase text-center w-full">External Services</span>
                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative my-auto">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      <path d="M21 8.5c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full mt-2">
                    <span className="text-[8px] md:text-[10px] text-white/70 text-center w-full truncate">SaaS Apps / 3rd-party</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Support Section: POPULAR INTEGRATIONS */}
            <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2  w-auto z-10 mx-auto max-w-[900px]">
              <div className="w-full rounded-xl border border-white/10 integration-block flex flex-col items-center justify-center py-2.5 md:py-2 gap-3">
                <span className="text-[9px] md:text-[11px] text-white/50 tracking-[0.2em] font-semibold uppercase">Popular Integrations</span>
                <div className="flex items-center justify-center gap-4 md:gap-8 px-4 w-full whitespace-nowrap">
                  {[
                    { name: "Slack", icon: <FaSlack className="w-5 h-5 md:w-6 md:h-6 text-[#E01E5A]" /> },
                    { name: "Google Drive", icon: <FaGoogleDrive className="w-5 h-5 md:w-6 md:h-6 text-[#00A1F1]" /> },
                    { name: "Stripe", icon: <SiStripe className="w-5 h-5 md:w-6 md:h-6 text-[#635BFF]" /> },
                    { name: "Salesforce", icon: <SiSalesforce className="w-5 h-5 md:w-6 md:h-6 text-[#00A1E0]" /> },
                    { name: "Notion", icon: <RiNotionFill className="w-5 h-5 md:w-6 md:h-6 text-white" /> },
                    { name: "GitHub", icon: <FaGithub className="w-5 h-5 md:w-6 md:h-6 text-white" /> },
                    { name: "REST API", icon: <Braces className="w-5 h-5 md:w-6 md:h-6 text-[#10b981]" /> }
                  ].map(item => (
                    <div key={item.name} className="flex flex-col items-center justify-center gap-1.5 md:gap-2">
                      <div className="flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[9px] md:text-[11px] text-white/80 tracking-wide">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-white/[0.04] border border-white/[0.08] rounded-[12px] flex items-center justify-center overflow-hidden relative">
            {bgGrid}
            <span className="text-white/20 text-[13px] font-medium tracking-wide z-10">
              Visual generating...
            </span>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full rounded-[12px] bg-background-secondary/30 border border-white/[0.08] relative overflow-hidden group">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Inner Content Wrapper */}
      <div className="absolute inset-[1px] rounded-[11px] overflow-hidden bg-background/50 backdrop-blur-sm">
        {renderGraphic()}
      </div>
    </div>
  );
};
