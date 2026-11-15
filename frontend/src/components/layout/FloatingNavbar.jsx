import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Download, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatingNavbar({ onOpenCommand, onNotify }) {
  const [activeSection, setActiveSection] = useState('work');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = (e) => {
    // Graceful feedback if PDF hasn't been dropped into public/resume/ yet
    fetch('/resume/Paul_Wafula_CV.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          e.preventDefault();
          onNotify?.('Add Paul_Wafula_CV.pdf inside frontend/public/resume/ to enable direct download.');
        }
      })
      .catch(() => {
        e.preventDefault();
        onNotify?.('Add Paul_Wafula_CV.pdf inside frontend/public/resume/ to enable direct download.');
      });
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav
        aria-label="Primary Navigation"
        className="mx-auto max-w-5xl rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_30px_rgb(15,23,42,0.06)] px-4 sm:px-6 py-2.5 flex items-center justify-between"
      >
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-2 font-bold text-lg tracking-tight text-[#09090B]"
        >
          <span>
            PW<span className="text-[#2563EB]">.</span>
          </span>
          <span className="hidden md:inline-block text-xs font-mono font-medium text-slate-500 border-l border-slate-200 pl-2">
            SWE
          </span>
        </a>

        {/* Center Pill Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveSection(link.id)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'text-[#09090B]' : 'text-slate-600 hover:text-[#09090B]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-slate-200/70 -z-10"
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            title="Quick Navigation (Ctrl+K / Cmd+K)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-slate-200 text-slate-500">
              ⌘K
            </kbd>
          </button>

          <a
            href="/resume/Paul_Wafula_CV.pdf"
            download="Paul_Wafula_CV.pdf"
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#09090B] text-white hover:bg-[#2563EB] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mx-auto max-w-5xl mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg p-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#2563EB]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}