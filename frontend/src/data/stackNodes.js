export const STACK_NODES = [
  {
    id: 'frontend',
    index: '01',
    label: 'React UI',
    category: 'Frontend',
    role: 'Component Architecture & Client State',
    summary:
      'A focused component system for responsive interfaces, accessible interactions, and predictable client-side state transitions.',
    tools: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS', 'Motion', 'Figma'],
    patterns: [
      { title: 'Protected Routes', detail: 'Role-gated views for Admin, Technician & Student' },
      { title: 'Optimistic Kanban', detail: 'Instant drag-and-drop state feedback' },
      { title: 'Token Interceptors', detail: 'Automatic Bearer header & 401 refresh handling' },
      { title: 'Modular Primitives', detail: 'Reusable modals, tables & responsive layouts' },
    ],
    securityNote:
      'Enforces client-side route guards, strict input sanitization, and XSS-safe JSX rendering.',
    usedIn: ['CampusFix', 'Queue Flow', 'The Pink Edit', 'Vantage'],
  },
  {
    id: 'api',
    index: '02',
    label: 'REST API Gateway',
    category: 'Backend & APIs',
    role: 'Modular Business Logic & Service Contracts',
    summary:
      'Structured HTTP endpoints and service layers that enforce state-machine rules, isolate business logic, and return predictable JSON contracts.',
    tools: ['Python', 'Flask', 'Java', 'Spring Boot', 'RESTful JSON'],
    patterns: [
      { title: 'Blueprint Modularity', detail: 'Domain-separated auth, ticket & ledger routes' },
      { title: 'State Validation', detail: 'Server-enforced workflow transition rules' },
      { title: 'DTO Boundaries', detail: 'Clean request parsing & structured error codes' },
      { title: 'Cost Ledger Logic', detail: 'Automated KSh spare-parts & order totals' },
    ],
    securityNote:
      'Applies strict payload validation, parameterized ORM queries, and explicit CORS origin allowlists.',
    usedIn: ['CampusFix', 'Queue Flow', 'The Pink Edit', 'Vantage'],
  },
  {
    id: 'security',
    index: '03',
    label: 'JWT Auth & RBAC',
    category: 'Data & Security',
    role: 'Identity, Authorization & Defensive Hardening',
    summary:
      'Stateless token sessions and signed identity claims keep each workflow scoped to the right role, informed by hands-on penetration testing.',
    tools: ['JWT (Bearer)', 'RBAC Middleware', 'Bcrypt / Hashing', 'Flask-Limiter', 'OWASP'],
    patterns: [
      { title: 'Stateless Sessions', detail: 'Signed access tokens with expiration windows' },
      { title: 'Role Scoping', detail: 'Granular Admin, Staff & End-User permissions' },
      { title: 'Abuse Throttling', detail: 'Endpoint rate limiting on auth & form routes' },
      { title: 'Audit Accountability', detail: 'User-attributed ticket & escalation logs' },
    ],
    securityNote:
      'Backed by Strathmore University penetration testing training—mitigating IDOR, broken auth, and injection vectors.',
    usedIn: ['CampusFix', 'Queue Flow', 'Vantage'],
  },
  {
    id: 'database',
    index: '04',
    label: 'PostgreSQL Schema',
    category: 'Data & Security',
    role: 'Normalized Modeling & Transactional Integrity',
    summary:
      'Relational schemas preserve clear relationships between users, assets, tickets, inventory ledgers, and multi-tenant store records.',
    tools: ['PostgreSQL', 'SQLite', 'SQLAlchemy', 'Foreign Keys', 'Indexing'],
    patterns: [
      { title: '3NF Normalization', detail: 'Zero-redundancy user, asset & order tables' },
      { title: 'Atomic Commits', detail: 'Rollback-safe multi-step inventory updates' },
      { title: 'Indexed Lookups', detail: 'Fast status, priority & tenant filtering' },
      { title: 'Audit Timestamps', detail: 'Immutable created_at & escalation trails' },
    ],
    securityNote:
      'Prevents SQL injection via parameterized SQLAlchemy queries and enforces database-level constraints.',
    usedIn: ['CampusFix', 'Queue Flow', 'The Pink Edit', 'Vantage'],
  },
  {
    id: 'devops',
    index: '05',
    label: 'Linux / Docker Ops',
    category: 'Backend & APIs',
    role: 'Environment Parity & Cloud Infrastructure',
    summary:
      'Reproducible environments and hardened Linux deployments keep local development aligned with cloud production builds.',
    tools: ['Linux / Ubuntu', 'Docker', 'Git & GitHub', 'Azure CLI', 'Vercel & Render'],
    patterns: [
      { title: 'Decoupled Hosting', detail: 'Static SPA edge delivery + containerized API' },
      { title: 'Secret Isolation', detail: 'Environment-injected keys & .env templates' },
      { title: 'VM Hardening', detail: 'SSH key auth & least-privilege firewall rules' },
      { title: 'Clean Git Flow', detail: 'Feature branches, atomic commits & CI checks' },
    ],
    securityNote:
      'Zero secrets committed to source control, locked-down inbound ports, and TLS-encrypted traffic.',
    usedIn: ['CampusFix', 'Queue Flow', 'Vantage'],
  },
];

export const STACK_PILLARS = [
  {
    number: '01',
    title: 'Frontend',
    items: ['React & Vite', 'JavaScript (ES6+)', 'Tailwind CSS', 'Motion & UI Polish'],
  },
  {
    number: '02',
    title: 'Backend & APIs',
    items: ['Python & Flask', 'Java & Spring Boot', 'RESTful Architecture', 'State Machines'],
  },
  {
    number: '03',
    title: 'Data & Security',
    items: ['PostgreSQL & SQLite', 'JWT & RBAC Auth', 'Pen-Testing Mindset', 'SQLAlchemy ORM'],
  },
  {
    number: '04',
    title: 'Tools & Practice',
    items: ['Git & GitHub', 'Linux / WSL / Ubuntu', 'Docker & Azure CLI', 'Figma Prototyping'],
  },
];