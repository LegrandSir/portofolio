import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, ArrowRight, MoveHorizontal } from 'lucide-react';
import { STACK_NODES, STACK_PILLARS } from '../../data/stackNodes';

const FILTER_TABS = ['All Layers', 'Frontend', 'Backend & APIs', 'Data & Security'];

const CONNECTIONS = [
  ['frontend', 'api'],
  ['frontend', 'security'],
  ['api', 'security'],
  ['api', 'database'],
  ['api', 'devops'],
  ['security', 'database'],
  ['database', 'devops'],
];

// Normalize angle difference to [-PI, PI] for shortest orbital rotation path
function shortestAngleDelta(current, target) {
  let diff = (target - current) % (Math.PI * 2);
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

export default function ArchitectureExplorer() {
  const [selectedId, setSelectedId] = useState('frontend');
  const [activeFilter, setActiveFilter] = useState('All Layers');
  const [orbitAngle, setOrbitAngle] = useState(0);

  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragMovedRef = useRef(false);

  const selectedIndex = useMemo(
    () => Math.max(0, STACK_NODES.findIndex((n) => n.id === selectedId)),
    [selectedId]
  );

  const selectedNode = STACK_NODES[selectedIndex] || STACK_NODES[0];

  // Rotate constellation smoothly whenever a node is selected
  useEffect(() => {
    const step = (Math.PI * 2) / STACK_NODES.length;
    // Place active node at bottom-front focal point (PI / 2)
    const desired = Math.PI / 2 - selectedIndex * step;
    const delta = shortestAngleDelta(currentAngleRef.current, desired);
    targetAngleRef.current = currentAngleRef.current + delta;
  }, [selectedIndex]);

  // Smooth 60fps spring interpolation loop for the orbital rotation
  useEffect(() => {
    let frameId;
    const animate = () => {
      if (!isDraggingRef.current) {
        const diff = targetAngleRef.current - currentAngleRef.current;
        if (Math.abs(diff) > 0.0005) {
          currentAngleRef.current += diff * 0.1;
          setOrbitAngle(currentAngleRef.current);
        }
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Project 5 nodes onto a tilted 3D ellipse so front nodes scale up and rear nodes recede
  const projectedNodes = useMemo(() => {
    const cx = 270;
    const cy = 195;
    const rx = 175;
    const ry = 92;
    const step = (Math.PI * 2) / STACK_NODES.length;

    return STACK_NODES.map((node, idx) => {
      const theta = orbitAngle + idx * step;
      const x = cx + rx * Math.cos(theta);
      const y = cy + ry * Math.sin(theta);
      const depth = (Math.sin(theta) + 1) / 2;
      const scale = 0.84 + depth * 0.24;

      return {
        ...node,
        x,
        y,
        depth,
        scale,
      };
    });
  }, [orbitAngle]);

  // Sort back-to-front so foreground nodes always render above background nodes
  const sortedNodes = useMemo(
    () => [...projectedNodes].sort((a, b) => a.depth - b.depth),
    [projectedNodes]
  );

  const handleFilterChange = (tab) => {
    setActiveFilter(tab);
    if (tab !== 'All Layers') {
      const firstMatch = STACK_NODES.find((n) => n.category === tab);
      if (firstMatch) setSelectedId(firstMatch.id);
    }
  };

  // Pointer drag handlers to spin the orbital map manually
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) dragMovedRef.current = true;
    dragStartXRef.current = e.clientX;
    currentAngleRef.current += dx * 0.008;
    targetAngleRef.current = currentAngleRef.current;
    setOrbitAngle(currentAngleRef.current);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="architecture"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-y border-slate-200/80"
    >
      <div className="mx-auto max-w-6xl">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-medium">
              System Architecture • Interactive Map
            </p>
            <h2 className="mt-2.5 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#09090B] leading-tight">
              Follow the <span className="text-slate-400">connections.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
            <span>Select a node to explore the decisions behind the interface</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex flex-wrap items-center gap-1.5">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleFilterChange(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#09090B] text-white shadow-2xs'
                      : 'text-slate-500 hover:text-[#09090B] hover:bg-slate-200/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
            Drag canvas to rotate orbit
          </span>
        </div>

        {/* Split Interactive Canvas + Carbon Black Spec Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* Left Panel: 3D-Projected Orbital Constellation */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgb(15,23,42,0.03)] relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{
              backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Top Subtle Telemetry Strip */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
              <span className="px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/80">
                TOPOLOGY • 5 LAYERS
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50/90 text-[#2563EB] border border-blue-200/60">
                Active: {selectedNode.label}
              </span>
            </div>

            {/* Orbital SVG Map */}
            <div className="relative w-full aspect-[540/390] my-auto">
              <svg
                viewBox="0 0 540 390"
                className="w-full h-full overflow-visible"
                role="img"
                aria-label="Interactive Software Architecture Orbital Map"
              >
                {/* Outer & Inner Dashed Orbital Ellipses */}
                <ellipse
                  cx="270"
                  cy="195"
                  rx="175"
                  ry="92"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                />
                <ellipse
                  cx="270"
                  cy="195"
                  rx="115"
                  ry="58"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />

                {/* Central Hub Anchor */}
                <circle cx="270" cy="195" r="3" fill="#CBD5E1" />

                {/* Node-to-Node Connections */}
                {CONNECTIONS.map(([fromId, toId]) => {
                  const from = projectedNodes.find((n) => n.id === fromId);
                  const to = projectedNodes.find((n) => n.id === toId);
                  if (!from || !to) return null;
                  const isHighlighted =
                    selectedId === fromId || selectedId === toId;

                  return (
                    <g key={`${fromId}-${toId}`}>
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isHighlighted ? '#2563EB' : '#E2E8F0'}
                        strokeOpacity={isHighlighted ? 0.55 : 0.9}
                        strokeWidth={isHighlighted ? 1.75 : 1.1}
                      />
                      {isHighlighted && (
                        <circle
                          cx={(from.x + to.x) / 2}
                          cy={(from.y + to.y) / 2}
                          r="2.5"
                          fill="#2563EB"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Projected Interactive Nodes (Sorted Back-to-Front) */}
                {sortedNodes.map((node) => {
                  const isSelected = node.id === selectedId;
                  const isDimmed =
                    activeFilter !== 'All Layers' && node.category !== activeFilter;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y}) scale(${node.scale})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!dragMovedRef.current) setSelectedId(node.id);
                      }}
                      className="cursor-pointer"
                      style={{
                        opacity: isDimmed ? 0.3 : 0.65 + node.depth * 0.35,
                      }}
                    >
                      {/* Concentric Halo Rings for Active Node */}
                      {isSelected && (
                        <>
                          <circle r="26" fill="#2563EB" fillOpacity="0.08" />
                          <circle
                            r="16"
                            fill="none"
                            stroke="#2563EB"
                            strokeOpacity="0.35"
                            strokeWidth="1.25"
                          />
                        </>
                      )}

                      {/* Core Node Dot */}
                      <circle
                        r={isSelected ? 7.5 : 5.5}
                        fill={isSelected ? '#2563EB' : '#94A3B8'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />

                      {/* Floating Pill Badge for Active Node vs Clean Label for Inactive */}
                      {isSelected ? (
                        <g transform="translate(0, 26)">
                          <rect
                            x="-68"
                            y="-12"
                            width="136"
                            height="24"
                            rx="12"
                            fill="#FFFFFF"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[11px] font-mono font-semibold fill-[#09090B]"
                          >
                            {node.label}
                          </text>
                        </g>
                      ) : (
                        <text
                          y="22"
                          textAnchor="middle"
                          className="text-[11px] font-mono font-medium fill-slate-500 hover:fill-[#09090B]"
                        >
                          {node.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Quick-Jump Node Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/70 bg-white/85 backdrop-blur-xs rounded-b-2xl">
              <div className="flex flex-wrap gap-1.5">
                {STACK_NODES.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                      node.id === selectedId
                        ? 'bg-[#2563EB] text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Carbon Black Specification Card */}
          <div className="lg:col-span-6 rounded-3xl bg-[#09090B] text-white p-7 sm:p-9 border border-slate-800/90 flex flex-col justify-between shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {/* Top Metadata Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="inline-flex items-center gap-2 uppercase tracking-wider text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    {selectedNode.category} • {selectedNode.role}
                  </span>
                  <span className="text-slate-500">
                    {selectedNode.index} / 0{STACK_NODES.length}
                  </span>
                </div>

                {/* Node Title & Summary */}
                <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {selectedNode.label}
                </h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {selectedNode.summary}
                </p>

                {/* Primary Stack Pills */}
                <div className="mt-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 mb-2.5">
                    Primary Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono text-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2x2 Architectural Decisions Grid */}
                <div className="mt-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 mb-2.5">
                    Architectural Patterns
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedNode.patterns.map((pattern) => (
                      <div
                        key={pattern.title}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                      >
                        <p className="text-xs font-semibold text-white">
                          {pattern.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {pattern.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hardening Note */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedNode.securityNote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer: Shipped In */}
            <div className="mt-7 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Shipped in
              </span>
              <div className="flex flex-wrap gap-3">
                {selectedNode.usedIn.map((proj) => (
                  <span
                    key={proj}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Editorial 4-Column Stack Overview ("Build the whole picture.") */}
        <div className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 font-medium">
                Tools I Reach For In Practice
              </p>
              <h3 className="mt-2.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#09090B]">
                Build the whole <span className="text-slate-400">picture.</span>
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              From the first user interaction to the relational schema and Linux runtime
              beneath it, I enjoy connecting every layer across the stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STACK_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="pt-5 border-t border-slate-300/90"
              >
                <p className="text-[11px] font-mono text-[#2563EB] font-semibold">
                  {pillar.number} /
                </p>
                <h4 className="mt-1.5 text-base font-bold text-[#09090B]">
                  {pillar.title}
                </h4>
                <ul className="mt-3.5 space-y-2">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}