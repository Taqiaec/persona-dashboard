import { useState } from 'react'
import BackgroundCanvas from './BackgroundCanvas.jsx'
import styles from './LoginPage.module.css'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password, setError)
  }

  return (
    <div className={styles.page}>
      <BackgroundCanvas />
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.glitchBar} />
          <div className={styles.cardInner}>
            <span className={styles.accent}>&#x25A0;</span>
            <h1 className={styles.title}>DASHBOARD</h1>
            <p className={styles.subtitle}>AUTHENTICATION REQUIRED</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                spellCheck={false}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className={styles.error}>{error}</p>}
              <button className={styles.btn} type="submit">ENTER</button>
            </form>

            <div className={styles.footer}>
              <span className={styles.footerAccent} />
            </div>
          </div>
          <div className={styles.bottomAccent} />
        </div>
      </div>
    </div>
  )
}
