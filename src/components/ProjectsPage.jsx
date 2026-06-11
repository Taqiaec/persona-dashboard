import BackgroundCanvas from './BackgroundCanvas.jsx'
import styles from './ProjectsPage.module.css'

const PROJECTS = [
  { name: '9router', status: 'stopped', desc: 'Router management' },
  { name: 'Hermes', status: 'stopped', desc: 'Messaging service' },
  { name: 'Odysseus', status: 'stopped', desc: 'Odyssey project' },
]

export default function ProjectsPage({ onBack }) {
  return (
    <div className={styles.page}>
      <BackgroundCanvas />
      <div className={styles.backBar}>
        <button className={styles.backBtn} onClick={onBack}>&#x25C0; BACK</button>
        <span className={styles.title}>PROJECTS</span>
      </div>
      <div className={styles.line} />
      <div className={styles.grid}>
        {PROJECTS.map((p) => (
          <div key={p.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.name}>{p.name}</span>
              <span className={`${styles.badge} ${styles[p.status]}`}>{p.status}</span>
            </div>
            <p className={styles.desc}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
