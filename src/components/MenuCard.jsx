import styles from './MenuCard.module.css'

export default function MenuCard({ title, icon, url, hovered, onHover, onLeave }) {
  return (
    <a
      href={url}
      className={`${styles.card} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      target={url.startsWith('http') ? '_blank' : undefined}
      rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <div className={styles.glitchBar} />
      <div className={styles.iconWrap}>
        {icon}
      </div>
      <div className={styles.textWrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>&#x25B6;</span>
      </div>
      <div className={styles.bottomAccent} />
    </a>
  )
}
