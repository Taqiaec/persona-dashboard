import styles from './BackgroundCanvas.module.css'

export default function BackgroundCanvas() {
  return (
    <div className={styles.bg}>
      <div className={styles.diagonalLines} />
      <div className={styles.vignette} />
      <div className={styles.redGlow} />
    </div>
  )
}
