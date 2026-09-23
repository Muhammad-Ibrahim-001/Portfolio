# Technical Design Specification: Systems Engineer Portfolio (Ultra-Premium Redesign)
**Target Subject:** Muhammad Ibrahim — Software & Systems Engineer  
**Core Aesthetic:** High-Tech Obsidian Systems Workspace & Interactive Command Center  
**Document Version:** 3.0.0  

---

## 1. Executive Vision & Aesthetic Foundations
This document specifies the technical design system and interactive component architecture for Muhammad Ibrahim's portfolio.

The portfolio is designed as an **ultra-premium, high-tech systems engineering workspace**. It combines deep obsidian backgrounds (`#07090e`), ambient technical spotlight glows (`radial-gradient` cyan/emerald), glassmorphic panels (`#0e1217` with `1px solid rgba(56, 189, 248, 0.2)` borders), typography (`Space Grotesk` + `Inter` + `Fira Code`), interactive terminal tab switches, and instant project category filtering.

---

## 2. Global Design Tokens

### 2.1 Color & Surface Palette
All colors are configured via CSS custom properties in `:root`.

| Token Key | Value | Purpose & Usage |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#07090e` | Canvas background with subtle grid texture |
| `--panel` | `#0e1217` | Secondary cards and section containers |
| `--panel-raised` | `#141a21` | Interactive terminal widgets & lead cards |
| `--border-glow` | `rgba(56, 189, 248, 0.18)` | Glowing 1px panel borders |
| `--border-bright` | `rgba(56, 189, 248, 0.45)` | Active state borders & focus rings |
| `--text-white` | `#f8fafc` | Primary titles and high-contrast text |
| `--text-muted` | `#94a3b8` | Body text, descriptions, and labels |
| `--cyan` | `#38bdf8` | System accent, section headers, command prompts |
| `--emerald` | `#34d399` | Status indicators, active tab badges, success states |
| `--amber` | `#fbbf24` | Emphasis text, warning badges, tech tags |
| `--violet` | `#818cf8` | Secondary tech chips & category indicators |
| `--red` | `#f87171` | Terminal close window control dot |

### 2.2 Typography Pairings
- **Display Headings:** `Space Grotesk`, `sans-serif` (bold, geometric, futuristic weight 700).
- **Body Text:** `Inter`, `sans-serif` (clean, readable weight 400–500, line height 1.65).
- **Monospace Technical:** `Fira Code`, `monospace` (ligatures enabled, code blocks, terminal tabs, labels).

---

## 3. Section Rhythm & Eyebrow Indexing

Top-level sections feature numerical index eyebrows prefixing titles:

1. **`01 // SYSTEM OVERVIEW`** — `#hero`
2. **`02 // PROFILE & BACKGROUND`** — `#about`
3. **`03 // DOMAIN CAPABILITIES`** — `#skills`
4. **`04 // FEATURED ARCHITECTURE & CODE`** — `#projects`
5. **`05 // ACADEMIC & INDUSTRY CHRONOLOGY`** — `#education`
6. **`06 // COMMUNICATIONS & ENDPOINTS`** — `#contact`

---

## 4. Component Architecture & Interactivity

### 4.1 Header & Navigation Drawer
- **Sticky Header:** Height `70px`, dark obsidian fill with bottom border `1px solid var(--border-glow)`.
- **Wordmark:** `./Muhammad Ibrahim` in `Fira Code` with green `./` prompt.
- **Mobile Menu Drawer:** Slide-in navigation drawer with keyboard `Escape` support and backdrop overlay.

### 4.2 Hero Section (Interactive Command Center)
- **Grid Layout:** Asymmetric 2-column split (`1.1fr 0.9fr`).
- **Left Column:**
  - Status pill: `● OPERATIONAL // SIEMENS INTERN & FAST NUCES`.
  - Gradient title: **Muhammad Ibrahim** (white to slate high-impact font).
  - Subtitle: `Software & Systems Engineer`.
  - Action button group (`View Projects`, `Download Resume`, `Contact Endpoint`) with cyan neon hover glow.
- **Right Column (Interactive Hero Terminal Workspace):**
  - **Window Controls:** `● ● ●` controls + interactive tab buttons (`[profile.sh]`, `[systemctl.log]`, `[stack.json]`).
  - **Interactive Tab Switching:** Clicking tabs dynamically swaps the code output inside the terminal view!
  - **Cursor:** Amber blinking cursor (`_`) at 1s intervals.

### 4.3 Interactive Project Showcase
- **Category Filter Tabs:** Interactive buttons (`[ALL]`, `[SYSTEMS & ASM]`, `[ML & SECURITY]`, `[FULL-STACK]`). Clicking a category dynamically filters visible projects with smooth fade transitions.
- **Lead Project Card (`bootloader`):** Spans full grid width (`grid-column: 1 / -1`) with a 3px cyan glowing left border, architecture details, and tech tags.
- **Card Hover Effects:** `-3px` elevation, cyan border highlight, and background subtle glow shadow.

### 4.4 Systems Focus & Skill Matrix
- 2x2 modular grid with hover elevation and green prompt bullets (`>`).

### 4.5 Chronological Timeline & Achievements
- Vertical cyan axis line with animated node pulses.
- Entries for FAST NUCES Data Science (3.37 CGPA, 3x Dean's List) & Siemens Systems Engineering Internship.
- 2-column Awards & Honors grid with badges.

### 4.6 Communications & Interactive Contact Dispatch Terminal
- Left column: Direct phone, email, location, GitHub, LinkedIn, and PDF CV links.
- Right column: Interactive terminal form (`contact@ibrahim:~ $`) with inputs for `SENDER_NAME`, `SENDER_EMAIL`, `PAYLOAD`, and simulated live status dispatch feedback.

---

## 5. Animation & Performance Guidelines
- Smooth reveal on scroll using `IntersectionObserver`.
- Neon hover glow effects (`box-shadow: 0 0 20px rgba(56, 189, 248, 0.25)`).
- Fast page load performance, clean semantic HTML5, zero external framework overhead.

---

**End of Design Specification (Version 3.0.0)**