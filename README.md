# Matrusri Oriental College (MOC) Web Application

Welcome to the official web application for **Matrusri Oriental College (MOC)**. This application is a modern, high-performance, and visually stunning portal designed to showcase the college's heritage, academic programs, administration, committees, and events.

Built with a premium aesthetic, it features harmonious HSL-based color palettes (Maroon and Gold accents), elegant typography, responsive layouts, interactive diagramming, and smooth micro-animations.

---

## 🚀 Quick Start & Scripts

Ensure you have [Node.js](https://nodejs.org/) installed. Run the following commands in the project root:

```bash
# Install dependencies
npm install

# Run the development server locally
npm run dev

# Build the application for production
npm run build

# Preview the production build locally
npm run preview

# Deploy the application to GitHub Pages
npm run deploy
```

---

## 🛠️ Technology Stack & Configurations

The application relies on a modern frontend stack to deliver a premium user experience:

1. **Core Framework**: React 19 and Vite 8 (acting as the fast ESM bundler).
2. **Styling**: Tailwind CSS v4. Configured in [src/index.css](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/index.css) using the new `@theme` directive:
   - Primary Color (`--color-brand-primary`): `#800000` (Maroon)
   - Secondary Color (`--color-brand-secondary`): `#facc15` (Yellow/Gold accent)
   - Dark Background (`--color-brand-dark`): `#171717` (Neutral 900)
   - Light Background (`--color-brand-light`): `#f9fafb` (Gray 50)
3. **Animations**: Framer Motion v12 for smooth, performance-optimized, and GPU-friendly micro-interactions, page transitions, and interactive floating widgets.
4. **Interactive Flowcharts**: `@xyflow/react` v12 (React Flow) to render zoomable and pannable organizational hierarchy diagrams.
5. **Carousels**: Swiper v12 for responsive, touch-friendly image and content sliders (e.g. Hero banner, gallery, testimonials).
6. **Routing**: React Router DOM (`HashRouter`) to facilitate SPA routing that works seamlessly on static hosting environments like GitHub Pages under the `/MOC-college/` base path.

---

## 📁 Project Structure

```text
MOC-college/
├── public/                 # Static assets and dynamic JSON data configurations
│   ├── json_data/          # Centralized data store driving site content
│   ├── images/             # Image galleries, logos, and banners
│   └── pdfs/               # Academic syllabi and calendar PDFs
├── src/
│   ├── assets/             # Bundled static images
│   ├── components/         # Reusable presentation components
│   │   ├── admin/          # Admin-specific components (e.g. Route protection)
│   │   ├── home/           # Homepage sections (Hero, Courses, Testimonials, etc.)
│   │   ├── insights/       # News, blogs, and events tabs
│   │   ├── layout/         # Shared layouts (Navbar, Footer, AdminLayout, Breadcrumbs)
│   │   └── ui/             # Interactive UI widgets (Modals, scroll to top, feedback)
│   ├── context/            # Global state managers (e.g. AuthContext)
│   ├── pages/              # Routing pages (About, Contact, Academics, Admin, etc.)
│   ├── App.jsx             # Main router and shell layout configuration
│   ├── index.css           # Global CSS and Tailwind CSS v4 config
│   └── main.jsx            # React root mount point
├── vite.config.js          # Vite config with base path & plugins (React + Tailwind)
├── package.json            # Node.js project manifest & script commands
└── README.md               # Project documentation and guidelines
```

---

## 📦 Key Components & Configurations

### 1. Dynamic Data Configurations (`public/json_data/`)
To make content management straightforward without a database overhead, the site reads dynamic JSON configurations:
*   `nav_links.json`: Defines the navigation structure, including mega menus and administrative categories.
*   `org_structure.json`: Defines nodes and members for the interactive Org Chart.
*   `notifications.json`: Updates the Floating Notifications Tray.
*   `governing_body.json`: Details the leadership board members.
*   `about_features.json` & `about_sections.json`: Powers the About page sections.
*   `courses.json`, `events.json`, `blogs.json`, `testimonials.json`: Dynamic homepage feeds.

### 2. Interactive Organization Hierarchy (`@xyflow/react`)
The administration page ([src/pages/Administration.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/pages/Administration.jsx)) features an interactive flowchart powered by `@xyflow/react`.
*   Users can zoom, pan, and hover over specific organizational nodes (e.g., Sree Viswajananee Parishat Trust, Correspondent, Principal, Academic/Administrative Committees) to see lists of current members.
*   It dynamically maps relationships defined in [org_structure.json](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/public/json_data/org_structure.json).

### 3. Interactive Parallax Banner (`BannerBackground.jsx`)
Located in [src/components/ui/BannerBackground.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/components/ui/BannerBackground.jsx), this component renders an ethereal spiritual smoke effect using blurred SVG-like gradients animated with Framer Motion. It listens to mouse movements on the header banner and translates them into smooth 3D parallax offsets.

### 4. Floating Update Trays & Feedback
*   **Floating Notifications** ([src/components/ui/FloatingNotifications.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/components/ui/FloatingNotifications.jsx)): A floating bell icon that rings on hover and pulses if there are unread items, rendering a drawer with dates and types of college announcements.
*   **Floating Feedback** ([src/components/ui/FloatingFeedback.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/components/ui/FloatingFeedback.jsx)): A custom floating namaste widget allowing students, parents, and visitors to submit academic or website feedback.

### 5. Sticky Scrollspy SubNav (`SubNav.jsx`)
The [src/components/ui/SubNav.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/components/ui/SubNav.jsx) component uses the browser's `IntersectionObserver` API to track the user's scroll position and dynamically highlight the active section in a sticky menu, updating the URL hash smoothly without causing default layout jumps.

### 6. Authentication Context & Admin Dashboards (`src/context/` & `src/pages/`)
*   **AuthContext** ([src/context/AuthContext.jsx](file:///c:/Users/bharg/OneDrive/Documents/GitHub/MOC-college/src/context/AuthContext.jsx)) houses authentication logic. It simulates sign-in checks and stores a mock session in `localStorage`.
*   **Admin Route Protection**: Wrapped using `ProtectedRoute` in `App.jsx` to prevent unauthorized access to admin dashboard paths.
*   **Admin Dashboard** (`AdminDashboard`, `AdminInsights`, `AdminCalendar`): Dashboards with statistics, recent audit activity logs, quick actions, and simulation tables to mock adding, editing, or deleting blogs/events.
