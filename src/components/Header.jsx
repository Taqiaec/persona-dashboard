import { useState, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()

  return (
    <header className={styles.header}>
      <div className={styles.titleWrap}>
        <span className={styles.accent}>&#x25A0;</span>
        <h1 className={styles.title}>DASHBOARD</h1>
        <span className={styles.accent}>&#x25A0;</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.clock}>{formatTime(time)}</span>
        <span className={styles.date}>{formatDate(time)}</span>
      </div>
    </header>
  )
}
