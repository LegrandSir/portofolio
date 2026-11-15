import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  FolderKanban,
  Cpu,
  GraduationCap,
  Mail,
  Copy,
  Play,
  X,
  ArrowRight,
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenDemo,
  onOpenContact,
  onCopyEmail,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = useMemo(() => {
    const baseActions = [
      {
        id: 'nav-work',
        group: 'Navigation',
        label: 'Jump to Featured Systems',
        hint: '#work',
        icon: FolderKanban,
        run: () => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-arch',
        group: 'Navigation',
        label: 'Explore Interactive Architecture & Stack',
        hint: '#architecture',
        icon: Cpu,
        run: () => {
          document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'nav-cred',
        group: 'Navigation',
        label: 'View Education & Certifications',
        hint: '#credentials',
        icon: GraduationCap,
        run: () => {
          document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' });
          onClose();
        },
      },
      {
        id: 'act-contact',
        group: 'Actions',
        label: 'Send a Direct Message',
        hint: 'Contact Modal',
        icon: Mail,
        run: () => {
          onClose();
          onOpenContact();
        },
      },
      {
        id: 'act-copy-email',
        group: 'Actions',
        label: 'Copy Email Address to Clipboard',
        hint: 'Copy',
        icon: Copy,
        run: () => {
          onCopyEmail();
          onClose();
        },
      },
    ];

    const projectDemos = PROJECTS.map((project) => ({
      id: `demo-${project.id}`,
      group: 'System Walkthroughs',
      label: `Inspect ${project.title} — ${project.subtitle}`,
      hint: 'Demo & Schema',
      icon: Play,
      run: () => {
        onClose();
        onOpenDemo(project);
      },
    }));

    return [...baseActions, ...projectDemos];
  }, [onClose, onOpenContact, onCopyEmail, onOpenDemo]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev - 1 < 0 ? Math.max(filtered.length - 1, 0) : prev - 1
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].run();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09090B]/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.16 }}
            className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
          >
            {/* Input Row */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200">
              <Search className="w-5 h-5 text-[#2563EB]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a system, inspect architecture, or copy contact..."
                className="w-full text-sm text-[#09090B] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No matching commands for &ldquo;{query}&rdquo;
                </p>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const active = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={item.run}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#EFF6FF] text-[#2563EB]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            active ? 'text-[#2563EB]' : 'text-slate-400'
                          }`}
                        />
                        <div className="truncate">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          <p className="text-[11px] font-mono text-slate-400">{item.group}</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 shrink-0">
                        {item.hint}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>↑↓ Navigate • ↵ Select • ESC Close</span>
              <span className="text-[#2563EB]">Paul Wafula Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}