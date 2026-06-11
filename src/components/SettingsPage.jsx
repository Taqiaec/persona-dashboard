import BackgroundCanvas from './BackgroundCanvas.jsx'
import styles from './SettingsPage.module.css'

export default function SettingsPage({ onBack }) {
  return (
    <div className={styles.page}>
      <BackgroundCanvas />
      <div className={styles.backBar}>
        <button className={styles.backBtn} onClick={onBack}>&#x25C0; BACK</button>
        <span className={styles.title}>SETTINGS</span>
      </div>
      <div className={styles.line} />
      <div className={styles.placeholder}>
        <div className={styles.icon}>&#x2699;</div>
        <p className={styles.placeholderText}>Dashboard management coming soon</p>
        <p className={styles.subText}>Edit links, change appearance, manage services</p>
      </div>
    </div>
  )
}
