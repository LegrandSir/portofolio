export const PROJECTS = [
  {
    id: 'campusfix',
    number: '01',
    title: 'CampusFix',
    subtitle: 'Campus Asset & Facility Maintenance Platform',
    category: 'Full-Stack',
    status: 'Core System • Demo Ready',
    problem:
      'University maintenance requests often stall in paper logs or disconnected chats without technician accountability or spare-parts cost visibility.',
    solution:
      'Architected a role-based facility maintenance platform with a live Kanban workflow, automated technician assignment, KSh inventory cost tracking, and escalation pipelines.',
    highlights: [
      'Role-based access control (Admin, Technician, Student) secured via JWT tokens',
      'Interactive Kanban board with status transitions, priority triage, and escalation rules',
      'Asset registry & spare-parts inventory tracker with automated KSh cost calculations',
    ],
    stack: ['React', 'Flask', 'PostgreSQL', 'JWT Auth', 'Tailwind CSS'],
    githubUrl: 'https://github.com/LegrandSir',
    videoUrl: '/demos/campusfix-walkthrough.mp4',
    metrics: [
      { label: 'Workflow States', value: '4-Stage Kanban' },
      { label: 'Auth Model', value: 'Stateless JWT + RBAC' },
      { label: 'Currency & Ledger', value: 'KSh Cost Tracking' },
    ],
    architecture: {
      client: 'React SPA + Protected Routes + Axios Interceptors',
      api: 'Flask Blueprints REST API + Role Middleware',
      database: 'PostgreSQL (Users, Assets, Tickets, Inventory Ledger)',
      security: 'Hashed Passwords + Bearer JWT + Input Validation',
    },
    previewTheme: 'campusfix',
  },
  {
    id: 'queue-flow',
    number: '02',
    title: 'Queue Flow',
    subtitle: 'Real-Time Ticketing & Workflow State-Machine',
    category: 'Workflow & SaaS',
    status: 'Production Architecture',
    problem:
      'Service teams handling high-volume operational tickets lose throughput when ticket state changes lack validation and clear queue ownership.',
    solution:
      'Built a full-stack ticketing engine combining a responsive React operations board with a Flask REST backend enforcing strict state transitions.',
    highlights: [
      'Drag-and-drop queue lanes with optimistic UI state updates',
      'Stateless JWT authentication with persistent session refresh handling',
      'Structured ticket lifecycle auditing from intake to resolution',
    ],
    stack: ['React', 'Flask', 'PostgreSQL', 'REST API', 'JWT'],
    githubUrl: 'https://github.com/LegrandSir/Queue-Flow',
    videoUrl: '/demos/queueflow-walkthrough.mp4',
    metrics: [
      { label: 'State Engine', value: 'Deterministic Transitions' },
      { label: 'API Style', value: 'RESTful JSON' },
      { label: 'UI Pattern', value: 'Optimistic Drag & Drop' },
    ],
    architecture: {
      client: 'React Dashboard + State Reducer + Filter Engine',
      api: 'Flask REST Endpoints + Payload Schema Checks',
      database: 'PostgreSQL Relational Ticket & Audit Tables',
      security: 'JWT Token Verification + CORS Policy Isolation',
    },
    previewTheme: 'queueflow',
  },
  {
    id: 'the-pink-edit',
    number: '03',
    title: 'The Pink Edit',
    subtitle: 'E-Commerce Storefront & Admin Operations Suite',
    category: 'Full-Stack',
    status: 'Completed Build',
    problem:
      'Boutique retail storefronts require a fast, visual shopping experience for buyers alongside clean stock and order controls for store operators.',
    solution:
      'Engineered a decoupled customer storefront paired with an administrative dashboard for catalog updates, stock levels, and fulfillment tracking.',
    highlights: [
      'Responsive product catalog with dynamic filtering and cart state persistence',
      'Dedicated admin operations console for CRUD inventory and order status updates',
      'Clean separation between public storefront endpoints and protected admin routes',
    ],
    stack: ['React', 'Flask', 'SQLite', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/LegrandSir',
    videoUrl: '/demos/pinkedit-walkthrough.mp4',
    metrics: [
      { label: 'Architecture', value: 'Storefront + Admin Split' },
      { label: 'Catalog Ops', value: 'Real-Time Stock Sync' },
      { label: 'Checkout Flow', value: 'Validated Cart Pipeline' },
    ],
    architecture: {
      client: 'React Storefront + Admin Management Views',
      api: 'Flask Product, Cart & Order Management API',
      database: 'Relational Catalog, Order Items & User Schema',
      security: 'Admin Route Guards + Server-Side Price Verification',
    },
    previewTheme: 'pinkedit',
  },
  {
    id: 'vantage',
    number: '04',
    title: 'Vantage',
    subtitle: 'Multi-Tenant E-Commerce SaaS Platform',
    category: 'Workflow & SaaS',
    status: 'In Active Development',
    problem:
      'Growing merchants need modular storefront infrastructure that scales beyond single-store templates without sacrificing API performance.',
    solution:
      'Designing a multi-tenant commerce engine pairing a modern React client with a strongly typed Java Spring Boot backend and PostgreSQL.',
    highlights: [
      'Tenant-isolated catalog, pricing, and order processing architecture',
      'Strongly typed Spring Boot service layer with clean DTO boundaries',
      'Built for horizontal scalability and automated merchant onboarding',
    ],
    stack: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/LegrandSir',
    videoUrl: '/demos/vantage-walkthrough.mp4',
    metrics: [
      { label: 'Backend Core', value: 'Java Spring Boot' },
      { label: 'Tenancy', value: 'Multi-Store Isolation' },
      { label: 'Target', value: 'SaaS Commerce Engine' },
    ],
    architecture: {
      client: 'React Modular Storefront & Merchant Console',
      api: 'Spring Boot REST Controllers + Service Layer',
      database: 'PostgreSQL Multi-Tenant Schema',
      security: 'Spring Security + Role & Tenant Scoping',
    },
    previewTheme: 'vantage',
  },
];