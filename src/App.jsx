import { useState } from 'react'
import Header from './components/Header.jsx'
import BackgroundCanvas from './components/BackgroundCanvas.jsx'
import MenuCard from './components/MenuCard.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import MonitorPage from './components/MonitorPage.jsx'
import links from './links.json'
import styles from './App.module.css'

const ICONS = {
  terminal: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  activity: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  folder: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  github: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  settings: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
}

const CATEGORY_LABELS = {
  system: 'SYSTEM',
  apps: 'APPS',
  links: 'LINKS',
}

export default function App() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [page, setPage] = useState('home')

  if (page === 'projects') return <ProjectsPage onBack={() => setPage('home')} />
  if (page === 'settings') return <SettingsPage onBack={() => setPage('home')} />
  if (page === 'monitor') return <MonitorPage onBack={() => setPage('home')} />

  const grouped = links.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = []
    acc[link.category].push(link)
    return acc
  }, {})

  return (
    <div className={styles.app}>
      <BackgroundCanvas />
      <div className={styles.content}>
        <Header />

        <div className={styles.grid}>
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            return (
              <div key={cat} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionLabel}>{label}</span>
                  <span className={styles.sectionLine} />
                </div>
                <div className={styles.cardGrid}>
                  {items.map((link) => (
                    <MenuCard
                      key={link.title}
                      title={link.title}
                      icon={ICONS[link.icon]}
                      url={link.url}
                      hovered={hoveredCard === link.title}
                      onHover={() => setHoveredCard(link.title)}
                      onLeave={() => setHoveredCard(null)}
                      onClick={link.internal ? () => setPage(link.internal) : undefined}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerLine} />
          <span className={styles.footerText}>PERSONA DASHBOARD v1.0</span>
        </footer>
      </div>
    </div>
  )
}
