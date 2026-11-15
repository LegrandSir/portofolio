import { useState } from 'react';
import {
  Play,
  Monitor,
  GitBranch,
  CheckCircle2,
  Database,
  Server,
  Lock,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { PROJECTS } from '../../data/projects';

const CATEGORIES = ['All Systems', 'Full-Stack', 'Workflow & SaaS'];

function ProjectMockupCard({ project }) {
  return (
    <div className="relative rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-5 sm:p-6 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
      {/* Desktop Window */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-3.5 py-2 bg-[#09090B] text-white flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {project.id}.app / workspace
          </span>
          <span className="text-[10px] font-mono text-blue-400">v1.0</span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-mono uppercase text-[#2563EB] font-semibold">
                {project.category}
              </p>
              <h4 className="text-sm font-bold text-[#09090B]">{project.title} Console</h4>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-mono text-[10px] font-medium">
              {project.stack[0]} + {project.stack[1]}
            </span>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70"
              >
                <p className="text-[10px] font-mono text-slate-400">{metric.label}</p>
                <p className="text-xs font-bold text-[#09090B] mt-0.5">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Simulated Data Rows */}
          <div className="mt-3 space-y-1.5">
            {project.highlights.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-100 text-[11px] text-slate-600"
              >
                <span className="truncate pr-2">{item}</span>
                <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                  ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Status Pill */}
      <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 rounded-xl bg-[#09090B] text-white px-3.5 py-2.5 shadow-lg border border-slate-800 flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
        <div className="text-[11px] font-mono">
          <p className="text-slate-400">Auth & Persistence</p>
          <p className="text-white font-semibold">{project.stack.slice(2, 4).join(' • ')}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectArchitectureCard({ project }) {
  const layers = [
    { label: 'Client Layer', value: project.architecture.client, icon: Monitor },
    { label: 'API & Logic', value: project.architecture.api, icon: Server },
    { label: 'Data Store', value: project.architecture.database, icon: Database },
    { label: 'Security Boundary', value: project.architecture.security, icon: Lock },
  ];

  return (
    <div className="rounded-2xl bg-[#09090B] text-white border border-slate-800 p-5 sm:p-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
          System Architecture Blueprint
        </span>
        <span className="text-[11px] font-mono text-slate-400">{project.title}</span>
      </div>

      <div className="space-y-2.5">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.label}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="p-2 rounded-lg bg-[#2563EB]/20 text-blue-400 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-400">{layer.label}</p>
                <p className="text-xs sm:text-sm font-medium text-white mt-0.5">{layer.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectsStack({ onOpenDemo }) {
  const [selectedCategory, setSelectedCategory] = useState('All Systems');
  const [viewModes, setViewModes] = useState({});

  const filteredProjects =
    selectedCategory === 'All Systems'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const toggleViewMode = (id, mode) => {
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  // Staggered top offsets create the smooth sticky card stacking effect on scroll
  const stickyOffsets = ['lg:top-24', 'lg:top-28', 'lg:top-32', 'lg:top-36'];

  return (
    <section id="work" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        {/* Section Header + Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold">
              Selected Engineering Work
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#09090B]">
              Systems built from schema to interface
              <span className="text-[#2563EB]">.</span>
            </h2>
          </div>

          <div className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-full bg-slate-100 border border-slate-200/80 self-start">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#09090B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#09090B]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="space-y-10">
          {filteredProjects.map((project, index) => {
            const currentView = viewModes[project.id] || 'preview';
            const topClass = stickyOffsets[index % stickyOffsets.length];

            return (
              <article
                key={project.id}
                className={`group lg:sticky ${topClass} rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_40px_rgb(15,23,42,0.06)] p-6 sm:p-8 lg:p-10 transition-all`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Case Study Narrative */}
                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#09090B] text-white font-mono text-xs font-bold">
                        {project.number}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] font-mono text-xs font-medium border border-blue-200/70">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#09090B]">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-[#2563EB] mt-1">{project.subtitle}</p>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {project.solution}
                    </p>

                    {/* Engineering Bullet Highlights */}
                    <ul className="mt-5 space-y-2">
                      {project.highlights.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenDemo(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Demo Walkthrough</span>
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#09090B] border border-slate-300 text-xs sm:text-sm font-semibold transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Interactive UI / Architecture Switcher */}
                  <div className="lg:col-span-6">
                    <div className="flex items-center justify-end gap-1.5 mb-3">
                      <button
                        type="button"
                        onClick={() => toggleViewMode(project.id, 'preview')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                          currentView === 'preview'
                            ? 'bg-[#09090B] text-white'
                            : 'bg-slate-100 text-slate-600 hover:text-[#09090B]'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>UI Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleViewMode(project.id, 'architecture')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                          currentView === 'architecture'
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-slate-100 text-slate-600 hover:text-[#09090B]'
                        }`}
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Architecture</span>
                      </button>
                    </div>

                    {currentView === 'preview' ? (
                      <ProjectMockupCard project={project} />
                    ) : (
                      <ProjectArchitectureCard project={project} />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}