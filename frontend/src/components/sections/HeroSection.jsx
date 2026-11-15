import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Play,
  CheckCircle2,
  Clock,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { PROJECTS } from '../../data/projects';

const ROLES = [
  'Full-Stack Software Engineer.',
  'Backend & REST API Architect.',
  'React & Python Developer.',
];

export default function HeroSection({ onOpenDemo }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Role Cycler
  useEffect(() => {
    const currentWord = ROLES[roleIndex];
    const speed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < currentWord.length) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const campusFix = PROJECTS[0];

  return (
    <section className="pt-32 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/70 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-200/80 text-xs font-mono font-medium text-[#2563EB] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
            <span>Available for SWE Internships • May 2027</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#09090B] leading-[1.12]">
            Hi, I&apos;m Paul Wafula —
            {/* Fixed-height container prevents vertical layout shift during typing */}
            <span className="block min-h-[2.4em] sm:min-h-[1.25em] text-[#2563EB] mt-1">
              {displayText}
              <span className="inline-block w-[3px] h-[0.9em] bg-[#2563EB] ml-1 align-middle animate-pulse" />
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Software Engineering undergraduate at <strong className="font-semibold text-[#09090B]">USIU-Africa</strong>,{' '}
            <strong className="font-semibold text-[#09090B]">Moringa School</strong> alum, and{' '}
            <strong className="font-semibold text-[#09090B]">Strathmore-trained</strong> cybersecurity
            practitioner. I architect end-to-end systems from normalized PostgreSQL schemas to
            responsive React interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <span>Explore Systems</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/LegrandSir"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#09090B] border border-[#09090B] font-semibold text-sm transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>

          {/* Core Tech Strip */}
          <div className="mt-10 pt-6 border-t border-slate-200/80">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Core Engineering Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'Python / Flask',
                'Java / Spring Boot',
                'PostgreSQL',
                'JWT & RBAC',
                'Tailwind CSS',
                'Docker & Linux',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live Interactive CampusFix Preview Window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-[#09090B] p-2 shadow-2xl border border-slate-800">
            {/* Browser Top Chrome */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                campusfix.internal / kanban
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                JWT Verified
              </span>
            </div>

            {/* Simulated Dashboard UI */}
            <div className="bg-white rounded-xl p-4 mt-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <p className="text-xs font-mono text-[#2563EB] font-semibold">
                    CAMPUSFIX OPS
                  </p>
                  <h2 className="text-sm font-bold text-[#09090B]">
                    Active Facility Work Orders
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-mono font-semibold text-slate-700">
                  Parts: KSh 14,500
                </span>
              </div>

              {/* Mini Kanban Columns */}
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-2">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" /> In Progress
                    </span>
                    <span className="font-mono text-slate-400">02</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-white border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-mono text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded">
                        #TK-104 • High
                      </span>
                      <p className="text-xs font-semibold text-[#09090B] mt-1">
                        Science Block HVAC Relay
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Wrench className="w-2.5 h-2.5" /> Tech: D. Kamau
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200/70">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-2">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolved
                    </span>
                    <span className="font-mono text-slate-400">08</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-white border border-slate-200/80 shadow-2xs">
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        #TK-099 • Verified
                      </span>
                      <p className="text-xs font-semibold text-[#09090B] mt-1">
                        Lab 3 Network Switch Rack
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5 text-[#2563EB]" /> Escalation Cleared
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Walkthrough Trigger Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Gated system? Inspect the full flow:
                </span>
                <button
                  type="button"
                  onClick={() => onOpenDemo(campusFix)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>60s Walkthrough</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}