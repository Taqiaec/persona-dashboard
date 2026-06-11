# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Deploy (VPS)

```bash
ssh -i ~/.ssh/vps-deploy deploy@43.157.208.98
cd /home/deploy/dashboard
git pull
# Create auth.json on first deploy (gitignored):
# echo '{"username":"admin","password":"yourpass"}' > src/auth.json
npm run build
sudo chmod -R o+r /home/deploy/dashboard/dist
sudo systemctl reload caddy
```

Services on VPS (43.157.208.98):
- Caddy (port 80/443) — static file serve, reverse proxy
- ttyd (port 7681) — web SSH terminal, no auth
- filebrowser (port 7682) — web file manager, no auth
- monitor-api (port 7683) — Node.js system stats API (CPU/memory/uptime)
- netdata (port 19999) — system monitoring graphs

## Architecture

React 19 SPA with Vite. No router library — state-based page switching.

### Routing Pattern

App starts at `login` state. On successful auth → `home`. `App.jsx` holds `page` state (`login | home | projects | settings | monitor`). Links with `internal` field in `links.json` use `onClick` prop on `MenuCard` → conditional render of page component.

```jsx
if (page === 'projects') return <ProjectsPage onBack={() => setPage('home')} />
```

### Auth

`src/auth.json` (gitignored) — hardcoded credentials. Simple client-side check, keeps casual visitors out. For real security, replace with Caddy basic auth or backend session.

### Component Tree

```
App
├── LoginPage (page === 'login')
│   └── BackgroundCanvas + form
└── Dashboard (page !== 'login')
    ├── BackgroundCanvas
    ├── Header — title + live clock
    ├── MenuCard — polygon clip-path card with hover effects
    └── Page component (ProjectsPage | SettingsPage | MonitorPage)
```

### Design Tokens

- BG: `#0a0a0a`, Accent: `#e53935`, Text: `#f0f0f0`
- Font: Inter (Google Fonts CDN)
- Cards: `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))`
- Animations: CSS-only (fadeSlideIn, headerIn, hover scale/glow)
- Grid: `repeat(auto-fill, minmax(220px, 1fr))`

### Page Component Convention

All pages: `<BackgroundCanvas />` → `.content` wrapper (2rem padding, 800px max-width) → `.backBar` with BACK button + `onBack` prop → `.line` divider. CSS Modules, dark theme.

### Data

`src/links.json` — static menu card config. Fields: `title`, `url`, `icon`, `category`, optional `internal`. No backend API calls except monitor-api for live stats.
