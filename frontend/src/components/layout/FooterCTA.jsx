import { useState } from 'react';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

export default function FooterCTA({ email, onCopyEmail, onOpenContact }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <footer id="contact" className="px-4 sm:px-6 lg:px-8 pb-10 pt-8">
      <div
        onMouseMove={handleMouseMove}
        className="group mx-auto max-w-6xl rounded-3xl bg-[#09090B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800"
      >
        {/* Subtle Ambient Fallback Glow (visible when not hovering / on mobile) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -right-28 w-80 h-80 rounded-full bg-[#2563EB]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Interactive Mouse-Tracking Cobalt Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(550px circle at var(--mouse-x, 80%) var(--mouse-y, 20%), rgba(37, 99, 235, 0.26), transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-blue-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              Open to Software Engineering Internships • May 2027
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Let&apos;s build reliable, well-architected software together
              <span className="text-[#2563EB]">.</span>
            </h2>

            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Looking for a full-stack engineering intern or collaborator who cares about clean
              REST APIs, database integrity, and responsive UI? Reach out directly or inspect my
              repositories.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Send a Message</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied: {email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-blue-400" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social & Quick Links */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="https://github.com/LegrandSir"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors backdrop-blur-xs"
            >
              <span className="inline-flex items-center gap-2.5">
                <GithubIcon className="w-4 h-4 text-blue-400" />
                GitHub (@LegrandSir)
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors backdrop-blur-xs"
            >
              <span className="inline-flex items-center gap-2.5">
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                LinkedIn Profile
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="relative z-10 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Paul Wafula • Nairobi, Kenya</p>
          <p>Built with React, Tailwind CSS, Motion & Flask</p>
        </div>
      </div>
    </footer>
  );
}