import { useState, useEffect } from 'react'
import BackgroundCanvas from './BackgroundCanvas.jsx'
import styles from './MonitorPage.module.css'

function fmtBytes(b) {
  const mb = b / (1024 * 1024)
  return mb.toFixed(0)
}

function fmtUptime(s) {
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const parts = []
  if (d) parts.push(`${d}d`)
  if (h) parts.push(`${h}h`)
  parts.push(`${m}m`)
  return parts.join(' ')
}

export default function MonitorPage({ onBack }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://43.157.208.98:7683/api/stats')
        const data = await res.json()
        setStats(data)
      } catch {}
    }
    fetchStats()
    const id = setInterval(fetchStats, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.page}>
      <BackgroundCanvas />
      <div className={styles.content}>
        <div className={styles.backBar}>
          <button className={styles.backBtn} onClick={onBack}>&#x25C0; BACK</button>
          <span className={styles.title}>SYSTEM MONITOR</span>
        </div>
        <div className={styles.line} />

        {!stats ? (
          <div className={styles.loading}>LOADING...</div>
        ) : (
          <>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>CPU</div>
                <div className={styles.bigValue}>{stats.cpuAvg}%</div>
                <div className={styles.barOuter}>
                  <div className={styles.barInner} style={{ width: `${Math.min(stats.cpuAvg, 100)}%` }} />
                </div>
                {stats.cpu.map((c, i) => (
                  <div key={i} className={styles.coreRow}>
                    <span className={styles.coreLabel}>CORE {i}</span>
                    <div className={styles.barOuterSmall}>
                      <div className={styles.barInnerSmall} style={{ width: `${Math.min(c.usage, 100)}%` }} />
                    </div>
                    <span className={styles.coreValue}>{c.usage}%</span>
                  </div>
                ))}
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>MEMORY</div>
                <div className={styles.bigValue}>
                  {stats ? fmtBytes(stats.memory.total - stats.memory.free) : '-'}
                  <span className={styles.unit}> MB</span>
                </div>
                <div className={styles.barOuter}>
                  <div className={styles.barInnerMem} style={{
                    width: `${stats ? ((stats.memory.total - stats.memory.free) / stats.memory.total * 100).toFixed(1) : 0}%`
                  }} />
                </div>
                <div className={styles.memRow}>
                  <span>USED {stats ? fmtBytes(stats.memory.total - stats.memory.free) : '-'} MB</span>
                  <span>TOTAL {stats ? fmtBytes(stats.memory.total) : '-'} MB</span>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>UPTIME</div>
                <div className={styles.bigValue}>{stats ? fmtUptime(stats.uptime) : '-'}</div>
                <div className={styles.nodeInfo}>
                  <div className={styles.infoRow}><span className={styles.infoLabel}>HOST</span><span>VM-7-188-ubuntu</span></div>
                  <div className={styles.infoRow}><span className={styles.infoLabel}>CPU CORES</span><span>{stats ? stats.cpu.length : '-'}</span></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
