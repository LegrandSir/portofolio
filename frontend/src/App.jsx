import { useState, useEffect, useCallback } from 'react';
import FloatingNavbar from './components/layout/FloatingNavbar';
import CommandPalette from './components/layout/CommandPalette';
import FooterCTA from './components/layout/FooterCTA';
import HeroSection from './components/sections/HeroSection';
import ProjectsStack from './components/sections/ProjectsStack';
import ArchitectureExplorer from './components/sections/ArchitectureExplorer';
import CredentialsGrid from './components/sections/CredentialsGrid';
import DemoModal from './components/ui/DemoModal';
import ContactModal from './components/ui/ContactModal';

// Replace with your preferred public contact email
const CONTACT_EMAIL = 'paulwafula.dev@gmail.com';

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText(CONTACT_EMAIL);
    showToast(`Copied ${CONTACT_EMAIL} to clipboard`);
  }, [showToast]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#09090B]">
      {/* Floating Translucent Pill Navbar */}
      <FloatingNavbar
        onOpenCommand={() => setCommandOpen(true)}
        onNotify={showToast}
      />

      {/* Main Content */}
      <main>
        <HeroSection onOpenDemo={(project) => setActiveDemoProject(project)} />
        <ProjectsStack onOpenDemo={(project) => setActiveDemoProject(project)} />
        <ArchitectureExplorer />
        <CredentialsGrid />
      </main>

      {/* High-Contrast Carbon Black Footer CTA */}
      <FooterCTA
        email={CONTACT_EMAIL}
        onCopyEmail={handleCopyEmail}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Interactive Modals */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenDemo={(project) => setActiveDemoProject(project)}
        onOpenContact={() => setContactOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      <DemoModal
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        fallbackEmail={CONTACT_EMAIL}
      />

      {/* Subtle Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#09090B] text-white text-xs font-mono shadow-xl border border-slate-800">
          {toastMessage}
        </div>
      )}
    </div>
  );
}