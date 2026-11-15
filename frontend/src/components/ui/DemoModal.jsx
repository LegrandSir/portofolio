import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, CheckCircle2, Database, Server, Monitor, ShieldCheck } from 'lucide-react';

export default function DemoModal({ project, onClose }) {
  const [videoMissing, setVideoMissing] = useState(false);

  useEffect(() => {
    setVideoMissing(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09090B]/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono uppercase text-[#2563EB] font-semibold">
                  System Walkthrough & Architecture Spec
                </span>
                <h3 className="text-2xl font-bold text-[#09090B] mt-1">
                  {project.title} — {project.subtitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Walkthrough Player (or Interactive Fallback if MP4 not added yet) */}
            <div className="mt-6 rounded-2xl bg-[#09090B] overflow-hidden border border-slate-800">
              {!videoMissing ? (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  onError={() => setVideoMissing(true)}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="p-8 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-[#2563EB]/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold">
                    60-Second Screen Recording Slot Ready
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Drop your recording at: frontend/public{project.videoUrl}
                  </p>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" /> Client Layer
                      </p>
                      <p className="text-xs text-slate-200 mt-1">
                        {project.architecture.client}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5" /> API Layer
                      </p>
                      <p className="text-xs text-slate-200 mt-1">{project.architecture.api}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5" /> Data Schema
                      </p>
                      <p className="text-xs text-slate-200 mt-1">
                        {project.architecture.database}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Auth & Security
                      </p>
                      <p className="text-xs text-slate-200 mt-1">
                        {project.architecture.security}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Engineering Breakdown */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Problem Context
                </h4>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Engineering Decisions
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}